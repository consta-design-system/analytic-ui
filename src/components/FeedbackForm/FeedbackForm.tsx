import React, { useEffect, useRef, useState } from 'react';

import { Button } from '@consta/uikit/Button';
import { IconCheck } from '@consta/uikit/IconCheck';
import { IconClose } from '@consta/uikit/IconClose';
import { Modal } from '@consta/uikit/Modal';
import { Text } from '@consta/uikit/Text';
import { TextField } from '@consta/uikit/TextField';
import { presetGpnDark, presetGpnDefault, Theme, ThemePreset, useTheme } from '@consta/uikit/Theme';

import { cn } from '../../utils/bem';

import { FeedbackFormProps } from './helper';
import './FeedbackForm.css';
import { FeedbackFormCsi } from './FeedbackFormCsi/FeedbackFormCsi';
import { FeedbackFormNps } from './FeedbackFormNps/FeedbackFormNps';

const cnFeedbackForm = cn('FeedbackForm');

type ViewType = 'form' | 'message';

export const FeedbackForm = (props: FeedbackFormProps) => {
  const {
    label,
    onSubmit,
    type,
    isOpen,
    onClose,
    withOpenQuestion,
    openQuestionTitle,
    ...otherProps
  } = props;
  const [csiValue, setCsiValue] = useState<number | undefined>();
  const [nspValue, setNspValue] = useState<number | undefined>();
  const [questionAnswer, setQuestionAnswer] = useState<string | null>('');
  const [buttonIsDisabled, setButtonIsDisabled] = useState<boolean>(true);
  const [view, setView] = useState<ViewType>('form');
  const [themePreset, setThemePreset] = useState<ThemePreset>(presetGpnDark);

  const formRef = useRef<HTMLDivElement>(null);

  const { theme } = useTheme();

  useEffect(() => {
    if (theme.color.primary === 'gpnDefault') {
      setThemePreset(presetGpnDark);
    } else {
      setThemePreset(presetGpnDefault);
    }
  }, [theme]);

  const handleSubmitClick = (e: React.MouseEvent) => {
    onSubmit?.({
      e,
      data: {
        NSP: nspValue,
        CSI: csiValue,
        question: questionAnswer !== null ? questionAnswer : '',
      },
    });
    setView('message');
  };

  const onCsiClick = (e: React.MouseEvent, rating: number) => {
    if (type !== 'CSI') {
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
        setButtonIsDisabled(typeof nspValue !== 'number');
        break;
      case 'combo':
        setButtonIsDisabled(typeof csiValue !== 'number' || typeof nspValue !== 'number');
        break;
    }
  }, [type, csiValue, nspValue]);

  return (
    <Theme preset={themePreset} className={cnFeedbackForm()}>
      <Modal className={cnFeedbackForm('Modal')} isOpen={isOpen} hasOverlay={false}>
        <div
          className={cnFeedbackForm('Container', {
            view: type === 'CSI' ? 'center' : 'default',
          })}
          ref={formRef}
          {...otherProps}
        >
          <button
            className={cnFeedbackForm('CloseButton')}
            type="button"
            onClick={() => onClose?.()}
          >
            <IconClose size="s" />
          </button>
          {view === 'form' ? (
            <>
              <Text lineHeight="xs" size="2xl" weight="semibold">
                {label}
              </Text>
              {(type === 'CSI' || type === 'combo') && (
                <FeedbackFormCsi
                  label="Общая оценка"
                  value={csiValue}
                  view={type !== 'CSI' ? 'default' : 'clear'}
                  onChange={({ e, value }) => onCsiClick(e, value)}
                />
              )}
              {(type === 'NPS' || type === 'combo') && (
                <FeedbackFormNps value={nspValue} onChange={({ value }) => setNspValue(value)} />
              )}
              {withOpenQuestion && (
                <TextField
                  placeholder="Ваш текст"
                  type="textarea"
                  width="full"
                  label={openQuestionTitle}
                  rows={4}
                  size="s"
                  value={questionAnswer}
                  className={cnFeedbackForm('Textarea')}
                  onChange={({ value }) => setQuestionAnswer(value)}
                />
              )}
              {type !== 'CSI' && (
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
    </Theme>
  );
};
