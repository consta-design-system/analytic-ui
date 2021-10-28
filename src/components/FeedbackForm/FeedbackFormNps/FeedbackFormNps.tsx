import React, { useState } from 'react';

import { Button } from '@consta/uikit/Button';
import { Text } from '@consta/uikit/Text';

import { cn } from '../../../utils/bem';

import './FeedbackFormNps.css';

type Props = {
  onChange?: (props: { e: React.MouseEvent; value: number }) => void;
  value?: number;
  label?: string;
};

const cnFeedbackFormNps = cn('FeedbackFormNps');

export const FeedbackFormNps = (props: Props) => {
  const { onChange, value, label, ...otherProps } = props;
  const [focusedItemId, setFocusedItemId] = useState<number>(-1);

  return (
    <div className={cnFeedbackFormNps()} {...otherProps}>
      <Text size="s" lineHeight="s" className={cnFeedbackFormNps('Label')}>
        {label}
      </Text>
      <div className={cnFeedbackFormNps('Rating')}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((id) => (
          <Button
            key={`FeedbackNspRating-${id}`}
            size="xs"
            className={cnFeedbackFormNps('Rating-Button')}
            view={
              id <= focusedItemId || (typeof value === 'number' && id <= value)
                ? 'primary'
                : 'ghost'
            }
            onMouseEnter={() => setFocusedItemId(id)}
            label={id}
            onMouseLeave={() => setFocusedItemId(-1)}
            onClick={(e) => onChange?.({ e, value: id })}
          />
        ))}
      </div>
      <div className={cnFeedbackFormNps('Scale')}>
        <Text view="ghost" size="2xs" lineHeight="m">
          Не готов рекомендовать
        </Text>
        <Text view="ghost" size="2xs" lineHeight="m">
          Обязательно порекомендую
        </Text>
      </div>
    </div>
  );
};
