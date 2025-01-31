import flushPromises from 'flush-promises';

const { shallowMount } = require('@vue/test-utils');
const { getSolutionPath } = require('taskbook-test-utils');
const { ImageService } = require(getSolutionPath('ImageService'));
const ImageUploader = require(getSolutionPath('components/ImageUploader.vue')).default;

const IMAGE_ID = 123;
jest.mock('../ImageService');
jest.spyOn(ImageService, 'uploadImage').mockResolvedValue({ id: IMAGE_ID });
jest.spyOn(ImageService, 'getImageURL').mockImplementation((id) => id);

function createInputFileMock(input) {
  let FileBrowseMock;
  let fileValue = '';

  Object.defineProperty(input.element, 'files', {
    get: (FileBrowseMock = jest.fn()),
    set: () => {},
  });

  Object.defineProperty(input.element, 'value', {
    get: () => fileValue,
    set: (newValue) => {
      fileValue = newValue;
    },
  });

  return async () => {
    fileValue = '/fake_path/image.png';
    const file = new File([], 'image.png');
    FileBrowseMock.mockReturnValue([file]);
    await input.trigger('change');
    return { file };
  };
}

describe('wrappers/ImageUploader', () => {
  describe('ImageUploader', () => {
    const LOADING_TEXT = 'Загрузка...';
    const EMPTY_TEXT = 'Загрузить изображение';
    const DELETE_TEXT = 'Удалить изображение';

    it('ImageUploader должен иметь параметр imageId со значением null по умолчанию', async () => {
      const wrapper = shallowMount(ImageUploader);
      expect(wrapper.vm.$options.props.imageId).toBeTruthy();
    });

    describe('ImageUploader без изображения', () => {
      let wrapper;
      let mockFile;

      beforeEach(() => {
        wrapper = shallowMount(ImageUploader);
        mockFile = createInputFileMock(wrapper.find('input'));
      });

      it(`ImageUploader должен иметь текст "${EMPTY_TEXT}", когда изображение не выбрано`, async () => {
        expect(wrapper.text()).toContain(EMPTY_TEXT);
        expect(wrapper.find('label').classes('image-uploader__preview-loading')).toBe(false);
      });

      it(`ImageUploader должен переходить выводить "${LOADING_TEXT}" и иметь .image-uploader__preview-loading после выбора изображения на время загрузки`, async () => {
        jest.spyOn(ImageService, 'uploadImage').mockResolvedValueOnce(new Promise(() => {}));
        await mockFile();
        expect(wrapper.text()).toContain(LOADING_TEXT);
        expect(wrapper.find('label').classes('image-uploader__preview-loading')).toBe(true);
      });

      it('ImageUploader должен загружать файл через ImageService.uploadImage', async () => {
        const { file } = await mockFile();

        await flushPromises();
        await wrapper.vm.$nextTick();

        expect(ImageService.uploadImage).toHaveBeenLastCalledWith(file);
      });

      it('ImageUploader должен порождать событие change с ID изображения после загрузки изображения', async () => {
        await mockFile();

        await flushPromises();
        await wrapper.vm.$nextTick();

        expect(wrapper.emitted().change).toBeDefined();
        expect(wrapper.emitted().change).toHaveLength(1);
        expect(wrapper.emitted().change[0]).toEqual([IMAGE_ID]);
      });

      it(`ImageUploader должен иметь текст "${DELETE_TEXT}" после загрузки изображения`, async () => {
        await mockFile();

        await flushPromises();
        await wrapper.vm.$nextTick();
        await wrapper.setProps({ imageId: IMAGE_ID });

        expect(wrapper.text()).toContain(DELETE_TEXT);
      });

      it(`ImageUploader должен показывать загруженное изображение в --bg-image`, async () => {
        await mockFile();

        await flushPromises();
        await wrapper.vm.$nextTick();
        await wrapper.setProps({ imageId: IMAGE_ID });

        expect(getComputedStyle(wrapper.find('label').element).getPropertyValue('--bg-image')).toContain(IMAGE_ID);
      });

      it(`ImageUploader должен сбрасывать value у input при удалении после загрузки`, async () => {
        await mockFile();

        await flushPromises();
        await wrapper.vm.$nextTick();
        await wrapper.setProps({ imageId: IMAGE_ID });

        await wrapper.find('label').trigger('click');
        await wrapper.setProps({ imageId: null });

        expect(wrapper.find('input').element.value).toBeFalsy();
      });
    });

    describe('ImageUploader с изначально выбранным изображением', () => {
      let wrapper;

      beforeEach(() => {
        wrapper = shallowMount(ImageUploader, { propsData: { imageId: IMAGE_ID } });
      });

      it(`ImageUploader должен иметь текст "${DELETE_TEXT}", когда изображение выбрано`, () => {
        expect(wrapper.text()).toContain(DELETE_TEXT);
      });

      it('ImageUploader должен выводить выбранное изображение через --bg-image', () => {
        expect(
          getComputedStyle(wrapper.find('.image-uploader__preview').element).getPropertyValue('--bg-image'),
        ).toContain(IMAGE_ID);
      });

      it(`ImageUploader должен порождать change с null при удалении выбранного изображения по клику`, async () => {
        await wrapper.find('label').trigger('click');
        expect(wrapper.emitted().change).toBeDefined();
        expect(wrapper.emitted().change).toHaveLength(1);
        expect(wrapper.emitted().change[0]).toEqual([null]);
      });

      it(`ImageUploader должен убирать выбранное изображение из '--bg-url' при удалении выбранного изображения по клику`, async () => {
        await wrapper.trigger('click');
        await wrapper.setProps({ imageId: null });
        expect(wrapper.text()).toContain(EMPTY_TEXT);
        expect(wrapper.find('.image-uploader__preview').attributes().style).toBeFalsy();
      });

      it(`ImageUploader должен сменять текст на ${EMPTY_TEXT} при удалении выбранного изображения по клику`, async () => {
        await wrapper.trigger('click');
        await wrapper.setProps({ imageId: null });
        expect(wrapper.text()).toContain(EMPTY_TEXT);
      });
    });
  });
});
