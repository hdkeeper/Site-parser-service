# Тестовое задание: Парсер сайтов

## Задание

Написать сервис, который через реализованный API принимает URL общедоступной страницы в интернете и генерирует PDF документ, в котором содержатся 10 самых длинных слов, которые встретились на странице. Документ передается инициатору запроса.

## Требования

* Язык Typescript
* Запуск API сервера на порту 8080 командой npm start
* Библиотеки на свой выбор
* Предоставить проект в публичном репозитории либо в zip-архиве

## Проверяем

* Умение построить архитектуру приложения
* Оптимальность выбранных решений
* Использование современных возможностей JS/TS

## Плюсом

* Описать в README текущие недочеты проекта, которые не решались в рамках тестового задания и способы их устранения
* Линтер кода
* Форматирование вывода в PDF

## Как запустить

Запускаем сервер:
```
npm install -g typescript ts-node
npm install
npm start
```

После запуска сервера -- запускаем тест:
```
npm install -g jest
npm test
```
Полученный отчёт будет в файле [report.pdf](report.pdf).

## API

### POST /analyze

Параметры в теле запроса:

* **url** - строка, URL анализируемой страницы

## Известные ограничения

Сервис проверялся для русского и английского языка. Для других языков может потребоваться 
настройка знаков пунктуации и подбор шрифтов для создания отчёта.

Не поддерживаются веб-страницы, наполнение на которых создаётся при помощи JavaScript.
Для поддержки подобных страниц JSDOM придётся заменить на Selenium.
