import React, { useState } from 'react';

import { PropOnChange } from '@consta/uikit/__internal__/src/components/SliderCanary/helper';
import { Button } from '@consta/uikit/Button';
import { Slider } from '@consta/uikit/SliderCanary';
import { Text } from '@consta/uikit/Text';

import { cn } from '../../../utils/bem';

import './FeedbackFormNps.css';

type ChangeEventType =
  | React.MouseEvent
  | React.TouchEvent
  | React.KeyboardEvent
  | React.ChangeEvent
  | Event;

type Props = {
  onChange?: (props: { e?: ChangeEventType; value: number }) => void;
  value?: number;
  label?: string;
  isMobile?: boolean;
};

const buttons = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

const cnFeedbackFormNps = cn('FeedbackFormNps');

export const FeedbackFormNps = (props: Props) => {
  const { onChange, value, label, isMobile = false, ...otherProps } = props;
  const [focusedItemId, setFocusedItemId] = useState<number>(-1);

  const handleSliderChange: PropOnChange<false> = (event) => {
    onChange?.({ e: event.e, value: event.value as number });
  };

  return (
    <div className={cnFeedbackFormNps()} {...otherProps}>
      <Text
        size={isMobile ? 'xs' : 's'}
        lineHeight={isMobile ? 'xs' : 's'}
        className={cnFeedbackFormNps('Label')}
      >
        {label}
      </Text>
      {!isMobile ? (
        <div className={cnFeedbackFormNps('Rating')} onMouseLeave={() => setFocusedItemId(-1)}>
          {buttons.map((id) => (
            <Button
              key={cnFeedbackFormNps('Rating', { id })}
              size="xs"
              className={cnFeedbackFormNps('Rating-Button')}
              view={
                id <= focusedItemId || (typeof value === 'number' && id <= value)
                  ? 'primary'
                  : 'ghost'
              }
              onMouseEnter={() => setFocusedItemId(id)}
              label={id}
              onClick={(e) => onChange?.({ e, value: id })}
            />
          ))}
        </div>
      ) : (
        <Slider
          value={value || 0}
          className={cnFeedbackFormNps('Rating')}
          onChange={handleSliderChange}
          step={1}
          withTooltip
          min={0}
          max={10}
          view="division"
        />
      )}

      <div className={cnFeedbackFormNps('Scale')}>
        <Text view="ghost" size="2xs" lineHeight="m">
          Не буду советовать
        </Text>
        <Text view="ghost" size="2xs" lineHeight="m">
          Обязательно посоветую
        </Text>
      </div>
    </div>
  );
};
