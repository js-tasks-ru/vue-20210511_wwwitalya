# Синхронизация с query параметрами

🔥 _Задача повышенной сложности_<br />
💼 _Часть проекта_

<!--start_statement-->
Требуется разработать компонент `QuerySync`, который будет соединять `query` параметры маршрута с параметрами отображения списка митапов:

Параметры:
- `view` - представление: `list` (список) или `calendar` (календарь);
- `date` - фильтр по дате: `all` (все), `future` (ожидаемые),  `past` (прошедшие); 
- `participation` - фильтр по участию: `all` (все), `attending` (участник), `organizing` (организатор);
- `search` - поиск, любая строка;

Значения по умолчанию:
- `view`: `list`;
- `date`: `all`; 
- `participation`: `all`;
- `search`: `''`;

Для имитации страницы митапов используется компонент `MeetupsView`, который принимает 4 параметра (`view`, `date`, `participation`, `search`), отображает их и порождает события их обновления для `sync` модификатора (`update:search` и т.д.). Именно с этим компонентом должен работать `PageWithQuery`.

Компонент должен синхронизировать query-параметры маршрута с параметрами в этом компоненте в обе стороны:
- Значение параметров должны соответствовать значениям `query` параметров в маршруте;
- При изменении значения параметров должен меняться маршрут (`push` или `replace`);
- При переходе на маршрут с другими `query` параметрами, должны обновляться соответствующие параметры на странице;
- Если какой-то параметр меняется на значение по умолчанию, его не должно быть в `query` в URL.

Подсказки:
- Использовать `beforeRouteUpdate` здесь плохой вариант. Это `guard`, и он используется, когда требуется решить, делать переход или запрещать переход. Здесь можно использовать обычное отслеживание с `watch` или вычисляемые свойства (`$route` - реактивный);
- При переходе на тот же самый маршрут будет исключение с ошибкой `NavigationDuplicated`. Чтобы не проверять, не происходит ли переход на такой же маршрут, можно добавить `catch`, который будет проверять тип исключения, и игнорировать его, если причина в дублировании.

```javascript
push(/*...*/).catch((err) => {
  if (/* Причине НЕ в NavigationDuplicated */) {
    // Пробрасываем ошибку дальше 
    throw err;
  } // Иначе игнорируем исключение
});
```

Полезные ссылки:
- Документация по программной навигации: [https://router.vuejs.org/guide/essentials/navigation.html](https://router.vuejs.org/guide/essentials/navigation.html)
- API метода push: [https://router.vuejs.org/api/#router-push](https://router.vuejs.org/api/#router-push)
- Описания типа параметра `location` нет в документации, но его можно найти в исходниках: [/types/router.d.ts](https://github.com/vuejs/vue-router/blob/677f3c1f714fb61cc495345e535409b1cbb90429/types/router.d.ts#L146)
- Определение типа исключения: [https://router.vuejs.org/guide/advanced/navigation-failures.html#detecting-navigation-failures](https://router.vuejs.org/guide/advanced/navigation-failures.html#detecting-navigation-failures)

<img src="https://i.imgur.com/odxH4um.gif" alt="Example" style="max-width: 100%" />
<!--end_statement-->

---

### Инструкция

📝 Для решения задачи отредактируйте файл: `views/QuerySync.vue`.

🚀 Команда запуска для ручного тестирования: `npm run serve`;<br>
приложение будет доступно на [http://localhost:8080/04-spa/06-QuerySync](http://localhost:8080/04-spa/06-QuerySync).

✅ Доступно автоматическое тестирование: `npm test QuerySync`.
