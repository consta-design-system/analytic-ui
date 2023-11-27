import './FeedbackFormCsi.css';

import { IconFavoriteFilled } from '@consta/icons/IconFavoriteFilled';
import { Text } from '@consta/uikit/Text';
import React, { useState } from 'react';

import { cn } from '##/utils/bem';

type Props = {
  label?: string;
  onChange: (value: number, prop: { e: React.MouseEvent }) => void;
  value?: number;
  required?: boolean;
  requiredText?: string;
  view?: 'clear' | 'default';
  isMobile?: boolean;
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
    isMobile = false,
    ...otherProps
  } = props;

  const [focusedItemId, setFocusedItemId] = useState<number>(-1);

  return (
    <div className={cnFeedbackFormCsi()} {...otherProps}>
      {view === 'default' && (
        <Text
          size={isMobile ? 'xs' : 's'}
          className={cnFeedbackFormCsi('Label')}
        >
          {label}
          {required && (
            <span className={cnFeedbackFormCsi('Label-Required')}>
              {requiredText}
            </span>
          )}
        </Text>
      )}
      <div
        className={cnFeedbackFormCsi('Rating')}
        onMouseLeave={() => setFocusedItemId(-1)}
      >
        {stars.map((id) => (
          <button
            type="button"
            key={cnFeedbackFormCsi('Rating', { id })}
            className={cnFeedbackFormCsi('Rating-Button', {
              active:
                id <= focusedItemId ||
                (typeof value === 'number' && id <= value),
            })}
            onMouseEnter={() => setFocusedItemId(id)}
            onClick={(e) => onChange?.(id, { e })}
          >
            <IconFavoriteFilled className={cnFeedbackFormCsi('Icon')} />
          </button>
        ))}
      </div>
    </div>
  );
};
