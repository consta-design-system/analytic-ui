import React, { useState } from 'react';

import { IconFavorite } from '@consta/uikit/IconFavorite';
import { Text } from '@consta/uikit/Text';

import { cn } from '../../../utils/bem';

import './FeedbackFormCsi.css';

type Props = {
  label?: string;
  onChange: (prop: { e: React.MouseEvent; value: number }) => void;
  value?: number;
  required?: boolean;
  requiredText?: string;
  view?: 'clear' | 'default';
};

const cnFeedbackFormCsi = cn('FeedbackFormCsi');

const stars = [1, 2, 3, 4, 5] as const;

export const FeedbackFormCsi = (props: Props) => {
  const {
    label,
    onChange,
    value = 0,
    required,
    requiredText,
    view = 'default',
    ...otherProps
  } = props;

  const [focusedItemId, setFocusedItemId] = useState<number>(-1);

  return (
    <div className={cnFeedbackFormCsi()} {...otherProps}>
      {view === 'default' && (
        <Text size="s" className={cnFeedbackFormCsi('Label')}>
          {label}
          {required && <span className={cnFeedbackFormCsi('Label-Required')}>{requiredText}</span>}
        </Text>
      )}
      <div className={cnFeedbackFormCsi('Rating')} onMouseLeave={() => setFocusedItemId(-1)}>
        {stars.map((id) => (
          <button
            type="button"
            key={cnFeedbackFormCsi('Rating', { id })}
            className={cnFeedbackFormCsi('Rating-Button', {
              active: id <= focusedItemId || (typeof value === 'number' && id <= value),
            })}
            onMouseEnter={() => setFocusedItemId(id)}
            onClick={(e) => onChange?.({ e, value: id })}
          >
            <IconFavorite />
          </button>
        ))}
      </div>
    </div>
  );
};
