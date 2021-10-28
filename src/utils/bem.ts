import { withNaming } from '@bem-react/classname';

const reactBemNaming = { n: 'aui--', e: '-', m: '_', v: '_' };

export const cn = withNaming(reactBemNaming);
