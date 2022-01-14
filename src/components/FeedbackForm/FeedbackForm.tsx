import React, { useEffect, useRef, useState } from 'react';

import { Button } from '@consta/uikit/Button';
import { IconCheck } from '@consta/uikit/IconCheck';
import { IconClose } from '@consta/uikit/IconClose';
import { Modal } from '@consta/uikit/Modal';
import { Text } from '@consta/uikit/Text';
import { TextField } from '@consta/uikit/TextField';
import { useTheme } from '@consta/uikit/Theme';
import { useFlag } from '@consta/uikit/useFlag';

import { cn } from '../../utils/bem';

import { defaultFeedbackFormPropType, FeedbackFormProps } from './helper';
import './FeedbackForm.css';
import { FeedbackFormCsi } from './FeedbackFormCsi/FeedbackFormCsi';
import { FeedbackFormNps } from './FeedbackFormNps/FeedbackFormNps';

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
  const [isMobile, { on, off }] = useFlag(false);

  const formRef = useRef<HTMLDivElement>(null);

  const { themeClassNames } = useTheme();

  useEffect(() => {
    const resize = () => {
      if (window.innerWidth <= 480) {
        on();
      } else {
        off();
      }
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  const handleSubmitClick = (e: React.MouseEvent) => {
    onSubmit?.({
      e,
      data: {
        NPS: npsValue,
        CSI: csiValue,
        question: !!questionAnswer ? questionAnswer : '',
      },
    });
    setView('message');
  };

  const onCsiClick = (e: React.MouseEvent, rating: number) => {
    if (type !== 'CSI' || (withOpenQuestion && type === 'CSI')) {
      setCsiValue(rating);
    } else {
      onSubmit?.({ e, data: { CSI: rating } });
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
        setButtonIsDisabled(typeof csiValue !== 'number' || typeof npsValue !== 'number');
        break;
    }
  }, [type, csiValue, npsValue]);

  return (
    <>
      <Modal
        className={cnFeedbackForm('Modal', [themeClassNames.color.invert])}
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
            size={isMobile ? 'xs' : 's'}
            iconSize="s"
            onClick={onClose}
            form="round"
            view="clear"
          />
          {view === 'form' ? (
            <>
              <Text lineHeight="xs" size={isMobile ? 'xl' : '2xl'} weight="semibold">
                {title}
              </Text>
              {(type === 'CSI' || type === 'combo') && (
                <FeedbackFormCsi
                  label={csiTitle}
                  value={csiValue}
                  required
                  isMobile={isMobile}
                  requiredText="Это обязательное поле"
                  view={
                    type !== 'CSI' || (withOpenQuestion && type === 'CSI') ? 'default' : 'clear'
                  }
                  onChange={({ e, value }) => onCsiClick(e, value)}
                />
              )}
              {(type === 'NPS' || type === 'combo') && (
                <FeedbackFormNps
                  label="Какова вероятность, что вы это кому-нибудь посоветуете?"
                  value={npsValue}
                  isMobile={isMobile}
                  onChange={({ value }) => setNpxValue(value)}
                />
              )}
              {withOpenQuestion && (
                <TextField
                  placeholder="Ваш текст"
                  type="textarea"
                  width="full"
                  label={openQuestionTitle}
                  rows={4}
                  size={isMobile ? 'xs' : 's'}
                  value={questionAnswer}
                  className={cnFeedbackForm('Textarea')}
                  onChange={({ value }) => setQuestionAnswer(value)}
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
              <Text size="2xl" weight="semibold" lineHeight="xs">
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
    </>
  );
};
