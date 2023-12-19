import './FeedbackForm.css';

import { IconCheck } from '@consta/icons/IconCheck';
import { IconClose } from '@consta/icons/IconClose';
import { Button } from '@consta/uikit/Button';
import { Modal } from '@consta/uikit/Modal';
import { Text } from '@consta/uikit/Text';
import { TextField } from '@consta/uikit/TextField';
import { useTheme } from '@consta/uikit/Theme';
import { useBreakpoints } from '@consta/uikit/useBreakpoints';
import React, { useEffect, useRef, useState } from 'react';

import { cn } from '##/utils/bem';

import { FeedbackFormCsi } from './FeedbackFormCsi/FeedbackFormCsi';
import { FeedbackFormNps } from './FeedbackFormNps/FeedbackFormNps';
import { defaultFeedbackFormPropType, FeedbackFormProps } from './helper';

const cnFeedbackForm = cn('FeedbackForm');

type ViewType = 'form' | 'message';

export const FeedbackForm = (props: FeedbackFormProps) => {
  const {
    title,
    onSubmit,
    type = defaultFeedbackFormPropType,
    isOpen,
    onClose,
    csiTitle,
    withOpenQuestion,
    openQuestionTitle,
    ...otherProps
  } = props;
  const [csiValue, setCsiValue] = useState<number | undefined>();
  const [npsValue, setNpxValue] = useState<number | undefined>();
  const [questionAnswer, setQuestionAnswer] = useState<string | null>(null);
  const [buttonIsDisabled, setButtonIsDisabled] = useState<boolean>(true);
  const [view, setView] = useState<ViewType>('form');

  const { isDesktop } = useBreakpoints({
    isActive: true,
    map: { isDesktop: 480 },
  });

  const formRef = useRef<HTMLDivElement>(null);

  const { themeClassNames } = useTheme();

  const handleSubmitClick = (e: React.MouseEvent) => {
    onSubmit?.(
      {
        NPS: npsValue,
        CSI: csiValue,
        question: questionAnswer || '',
      },
      {
        e,
      },
    );
    setView('message');
  };

  const onCsiClick = (rating: number, props: { e: React.MouseEvent }) => {
    if (type !== 'CSI' || (withOpenQuestion && type === 'CSI')) {
      setCsiValue(rating);
    } else {
      onSubmit?.({ CSI: rating }, props);
      setView('message');
    }
  };

  useEffect(() => {
    switch (type) {
      case 'CSI':
        setButtonIsDisabled(typeof csiValue !== 'number');
        break;
      case 'NPS':
        setButtonIsDisabled(typeof npsValue !== 'number');
        break;
      case 'combo':
        setButtonIsDisabled(
          typeof csiValue !== 'number' || typeof npsValue !== 'number',
        );
        break;
    }
  }, [type, csiValue, npsValue]);

  return (
    <Modal
      className={cnFeedbackForm({ isDesktop }, [themeClassNames.color.invert])}
      isOpen={isOpen}
      hasOverlay={false}
      onEsc={onClose}
      key="modal"
    >
      <div
        className={cnFeedbackForm('Container', {
          view: type === 'CSI' && !withOpenQuestion ? 'center' : 'default',
        })}
        ref={formRef}
        {...otherProps}
      >
        <Button
          className={cnFeedbackForm('CloseButton')}
          iconLeft={IconClose}
          size={isDesktop ? 's' : 'xs'}
          iconSize="s"
          onClick={onClose}
          form="round"
          view="clear"
        />
        {view === 'form' ? (
          <>
            <Text
              lineHeight="xs"
              size={isDesktop ? '2xl' : 'xl'}
              weight="semibold"
              view="primary"
            >
              {title}
            </Text>
            {(type === 'CSI' || type === 'combo') && (
              <FeedbackFormCsi
                label={csiTitle}
                value={csiValue}
                required
                isMobile={!isDesktop}
                requiredText="Это обязательное поле"
                view={
                  type !== 'CSI' || (withOpenQuestion && type === 'CSI')
                    ? 'default'
                    : 'clear'
                }
                onChange={onCsiClick}
              />
            )}
            {(type === 'NPS' || type === 'combo') && (
              <FeedbackFormNps
                label="Какова вероятность, что вы это кому-нибудь посоветуете?"
                value={npsValue}
                isMobile={!isDesktop}
                onChange={setNpxValue}
              />
            )}
            {withOpenQuestion && (
              <TextField
                placeholder="Ваш текст"
                type="textarea"
                label={openQuestionTitle}
                rows={4}
                size={isDesktop ? 's' : 'xs'}
                value={questionAnswer}
                className={cnFeedbackForm('Textarea')}
                onChange={setQuestionAnswer}
              />
            )}
            {(type !== 'CSI' || (withOpenQuestion && type === 'CSI')) && (
              <Button
                label="Отправить оценку"
                onClick={handleSubmitClick}
                width="full"
                size="m"
                disabled={buttonIsDisabled}
              />
            )}
          </>
        ) : (
          <>
            <Text size="2xl" weight="semibold" view="primary" lineHeight="xs">
              Спасибо!
            </Text>
            <Text
              size="s"
              lineHeight="s"
              view="secondary"
              className={cnFeedbackForm('SubmitMessage')}
            >
              Ваш отзыв отправлен <IconCheck size="xs" />
            </Text>
          </>
        )}
      </div>
    </Modal>
  );
};
