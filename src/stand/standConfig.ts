import { createConfig } from '@consta/stand';

import image from './ConstaImage.png';

export const { createStand } = createConfig({
  title: 'Consta Analytic UI',
  id: 'analytic-ui',
  groups: [
    {
      title: 'Документация',
      id: 'docs',
      initialOpen: true,
    },
    {
      title: 'Компоненты',
      id: 'components',
      view: 'card',
      initialOpen: true,
    },
  ],
  group: 'Специальные компоненты',
  image,
  description:
    'Компоненты для аналитики и обратной связи, входят в дизайн-систему Consta.',
  repositoryUrl: 'https://github.com/consta-design-system/analytic-ui',
});
