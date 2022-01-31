# [Дизайн-система Consta](http://consta.gazprom-neft.ru/) | Analytic UI

Компоненты для аналитики и обратной связи, входят в [дизайн-систему Consta](https://github.com/consta-design-system/uikit).

# Как использовать

## Установите пакет

```sh
# NPM
$ npm install @consta/analytic-ui

# Yarn
$ yarn add @consta/analytic-ui
```

## Подключите зависимости

Чтобы начать работу, установите библиотеку [`@consta/uikit`](https://www.npmjs.com/package/@consta/uikit) и [настройте тему](https://consta-uikit.vercel.app/?path=/docs/components-theme--playground).

### Можно использовать компоненты

Например, так:

```js
import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import { FeedbackForm } from '@consta/FeedbackForm';
import { Button } from '@consta/Button';

export const FeedbackFormExampleTypeNps = () => {
  const [isOpen, setIsOpen] = useState < boolean > false;

  return (
    <>
      <FeedbackForm
        label="Как вам наш модуль по созданию сценариев?"
        type="NPS"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <Button label="Открыть виджет" onClick={() => setIsOpen(true)} />
    </>
  );
};
```

## Разработка

### Подготовка окружения

Рабочее окружение должно содержать NodeJS и Yarn, необходимые версии можно узнать в файле [package.json](./package.json) в блоке **engines**.

Чтобы установить зависимости, выполните команду:

```sh
$ yarn install
```

### Основные команды

```sh
# Сборка и старт Storybook
$ yarn start

# Сборка для production
$ yarn build

# Линтинг всех файлов
$ yarn lint

# Форматирование всех файлов prettier
$ yarn format

# Запуск юнит-тестов
$ yarn unit

# Запуск юнит-тестов, тестирование TS, линтинг файлов
$ yarn test
```

## Документация

[Посмотреть документацию и примеры](https://analytic-ui.vercel.app/?path=/story/common-start--page)

## Контрибьюторам

Будем рады, если вы захотите принять участие в разработке дизайн-системы =) Но сначала прочитайте [инструкцию для контрибьюторов](https://consta-uikit.vercel.app/?path=/docs/common-develop-contributors--page).

## Лицензия

Дизайн-систему можно использовать бесплатно, она распространяется ПАО «Газпром нефть» на условиях открытой [лицензии MIT](https://consta.gazprom-neft.ru/static/licence_mit.pdf).
