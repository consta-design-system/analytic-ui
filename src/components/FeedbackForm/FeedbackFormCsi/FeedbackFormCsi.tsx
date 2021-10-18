import React, { useState } from 'react';

import { IconFavorite } from '@consta/uikit/IconFavorite';
import { Text } from '@consta/uikit/Text';

import { cn } from '../../../utils/bem';

import './FeedbackFormCsi.css';

type Props = {
  label?: string;
  onChange: (prop: { e: React.MouseEvent; value: number }) => void;
  value?: number;
  view?: 'clear' | 'default';
};

const cnFeedbackFormCsi = cn('FeedbackFormCsi');

export const FeedbackFormCsi = (props: Props) => {
  const { label, onChange, value = 0, view = 'default', ...otherProps } = props;
  const [focusedItemId, setFocusedItemId] = useState<number>(-1);

  return (
    <div className={cnFeedbackFormCsi()} {...otherProps}>
      {view === 'default' && (
        <Text size="s" className={cnFeedbackFormCsi('Label')}>
          {label}
          <span className={cnFeedbackFormCsi('Label-Required')}>Это обязательное поле</span>
        </Text>
      )}
      <div className={cnFeedbackFormCsi('Rating')}>
        {[1, 2, 3, 4, 5].map((id) => (
          <button
            type="button"
            key={`FeedbackCsiRating-${id}`}
            className={cnFeedbackFormCsi('Rating-Button', {
              active: id <= focusedItemId || (typeof value === 'number' && id <= value),
            })}
            onMouseEnter={() => setFocusedItemId(id)}
            onMouseLeave={() => setFocusedItemId(-1)}
            onClick={(e) => onChange?.({ e, value: id })}
          >
            <IconFavorite />
          </button>
        ))}
      </div>
    </div>
  );
};
