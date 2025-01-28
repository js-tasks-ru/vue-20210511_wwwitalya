# Buttons

👶🏻 _Несложная задача_<br />
💼 _Часть проекта_

<!--start_statement-->
Требуется разработать компоненты кнопок.

Основным компонентом будет `BaseButton`:
- Входные параметры:
  - `block` - логический, является ли кнопка блоком (с классом `button_block`);
  - `tag` - параметр, элемент (или компонент), который используется для кнопки, по умолчанию строка `'button'`. Именно над этим элементом компонент должен быть прозрачной обёрткой. Это удобно, так как часто визуально кнопка может быть просто кнопкой, а может ссылкой или другим компонентом (например, `<router-link>`);
- Слот по умолчанию — содержимое кнопки;
- На кнопке должны работать все стандартные события (такие, как `click`) без добавления модификатора `.native`.

Ещё три кнопки основаны на `BaseButton` и являются обёртками над ним:
- `PrimaryButton` - это `BaseButton` с классом `button_primary`;
- `SecondaryButton` - это `BaseButton` с классом `button_secondary`;
- `DangerButton` - это `BaseButton` с классом `button_danger`.

<img src="https://i.imgur.com/r3wsIgF.png" alt="Example" style="max-width: 100%" />
<!--end_statement-->

---

### Инструкция

📝 Для решения задачи отредактируйте файлы: `components/BaseButton.vue`, `components/PrimaryButton.vue`, `components/SecondaryButton.vue`, `components/DangerButton.vue`.

🚀 Команда запуска для ручного тестирования: `npm run serve`;<br>
приложение будет доступно на [http://localhost:8080/06-wrappers/01-Buttons](http://localhost:8080/06-wrappers/01-Buttons).

✅ Доступно автоматическое тестирование: `npm test Buttons`.
