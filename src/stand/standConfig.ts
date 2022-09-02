import { createConfig } from '@consta/stand';

import image from './ConstaImage.png';

const groups = [
  {
    title: 'Компоненты',
    id: 'components',
  },
] as const;

export const { createStand } = createConfig({
  title: 'Consta Analytic UI',
  id: 'analytic-ui',
  groups,
  group: 'Библиотеки компонентов',
  image,
  description:
    'Компоненты для аналитики и обратной связи, входят в дизайн-систему Consta.',
});
