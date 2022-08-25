import { createConfig } from '@consta/stand';

import image from './ConstaImage.png';

const groups = [
  {
    title: 'Компоненты',
    id: 'components',
  },
] as const;

export const { createStand } = createConfig({
  title: 'Consta analytic-ui',
  id: 'analytic-ui',
  groups,
  group: 'Библиотеки компонентов',
  image,
  description:
    '[тут описание что это такое] Ультра топчик библиотеки с пацанскими кнопками и графиками, качай.',
});
