# [Дизайн-система Consta](http://consta.consta.design/) | Analytic UI

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

Чтобы начать работу, установите библиотеку [`@consta/uikit`](https://www.npmjs.com/package/@consta/uikit) и [настройте тему](https://consta.design/libs/portal/theme-themeabout).

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

## Документация

[Посмотреть документацию и примеры](http://consta.design/libs/analytic-ui)

## Разработка

### Подготовка окружения

Рабочее окружение должно содержать NodeJS и Yarn.

Чтобы установить зависимости, выполните команду:

```sh
$ yarn install
```

### Основные команды

```sh
# Запуск локального сервера для разработки
$ yarn start

# Сборка пакета
$ yarn build

# Сборка стенда
$ yarn stand:build

# Запуск тестов
$ yarn test
```

## Контрибьюторам

Будем рады, если вы захотите принять участие в разработке дизайн-системы =) Но сначала прочитайте [инструкцию для контрибьюторов](https://consta.design/libs/portal/contributers-code).

## Лицензия

Дизайн-систему можно использовать бесплатно, она распространяется на условиях открытой [лицензии MIT](https://consta.design/static/licence_mit.pdf).
