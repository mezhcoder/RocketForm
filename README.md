![RocketFormPicture](https://user-images.githubusercontent.com/49750349/123769717-eb924a00-d90c-11eb-8f96-c57655366f0a.png)
# RocketForm

<h3>
"Рокетная" библиотека на JS, 
которая позволит создать гибкую форму из JSON
</h3>

# Описание библиотеки
Данная библиотека способна из JSON файла создать готовую форму, которая будет автоматически сверстана и к ней будут добавлены стили и не только.

# Возможности
- Создать из JSON готовую вертску
- Применить к ней стили
- Добавить по желанию аддон на анимацию

# Установка
Добавьте все фалйы из этого репозитория к себе в проект.
Пример созданный формы: https://mezhcoder.github.io/RocketForm/result.html
Для корректного отображения шрифта на сайте, установите дополнительные шрифты из папки files/fonts

# Использование
Для начала вы должны убедиться, что можете импортировать файлы JavaScript.
В данном примере для импорта использовался Node Core. Код описан в файле demo.js

```js
const { generate } = require('./generator') //подключение библиотеки

let json = JSON.parse(require('fs').readFileSync('config.json').toString()); //подключение json 
let data = generate(json); //генерация формы. На вывод приходит строка с готовой версткой 

fs = require('fs');
fs.writeFileSync("result.html", data); //создание файла result.html и заполнение готовой версткой
```

# Настройка
Для работы с библиотекой используется лишь один файл config.json

```json
{
  "layout": {
    "title": "Форма\nдля полёта на Марс \uD83D\uDE80",
    "inputs": [
      {
        "label": "Фамилия",
        "type": "text",
        "id": "surname",
        "placeholder": "Введите фамилию"
      },
      {
        "label": "Имя",
        "type": "text",
        "id": "name",
        "placeholder": "Введите имя"
      },
      {
        "label": "Отчество",
        "type": "text",
        "id": "lastname",
        "placeholder": "Введите отчество"
      },
      {
        "label": "Фамилия латиницей",
        "type": "text",
        "id": "lat_surname",
        "placeholder": "Введите фамилию латиницей"
      },
      {
        "label": "Имя латиницей",
        "type": "text",
        "id": "lat_name",
        "placeholder": "Введите имя латиницей"
      },
      {
        "label": "День рождения",
        "type": "date",
        "id": "birthday",
        "placeholder": ""
      }
    ],
    "radios": [
      {
        "type": "radio",
        "name": "marriage",
        "value": "married",
        "text": "Женат"
      },
      {
        "type": "radio",
        "name": "marriage",
        "value": "notmarried",
        "text": "Не женат"
      }
    ],
    "hr": "",
    "subtitle": "Контактные данные",
    "_inputs": [
      {
        "label": "Номер телефона",
        "type": "tel",
        "id": "tel",
        "placeholder": "Введите номер телефона"
      },
      {
        "label": "Электронная почта",
        "type": "email",
        "id": "email",
        "placeholder": "Введите электронную почту"
      }
    ],
    "submit": {
      "url": "www.example.com",
      "text": "Отправить"
    }
  },
  "settings": {
    "addonAnimated": true
  }
}
```
Сайт верстается от верхнего элемента до нижнего, по порядку. Вы можете расставить элементы в любом порядке.
| Объект | Из чего должен состоять объект | Функция объекта |
| ------ | ------ | ------ |
| input | label(str),type(str),id(str),placeholder(str) | Input форма для ввода данных |
| title | сразу присваивание текста (str) | Главный заголовок |
| subtitle | сразу присваивание текста (str) | Дополнительные заголовок |
| radios | type(str),name(str),value(str),text(str) | Radio кнопки |
| submit | url(str),text(str) | Кнопка отправление формы |

Если вдруг вы захотите продублировать элементы, используйте перед названием объекта несколько символов _
В примере описано , как происходит дублирование с объектом input

# TODO
- Сделать более подробную документацию
- Произвести рефакторинг кода библиотеки
- Добавить больше анимаций и возможность их настроек
- Добавить темную тему
