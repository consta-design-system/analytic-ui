import React, { useState } from 'react';

import { IconMoon } from '@consta/uikit/IconMoon';
import { IconSun } from '@consta/uikit/IconSun';
import { Button } from '@consta/uikit/Button';
import { presetGpnDark, presetGpnDefault, Theme, ThemePreset } from '@consta/uikit/Theme';
import { ThemeToggler } from '@consta/uikit/ThemeToggler';
import { boolean, select, text } from '@storybook/addon-knobs';

import { cn } from '../../../utils/bem';
import { createMetadata } from '../../../utils/storybook';
import { defaultFeedbackFormPropType, feedbackFormPropType } from '../helper';
import { FeedbackForm } from '../FeedbackForm';

import './FeedbackFormStories.css';

const defaultKnobs = () => ({
  label: text('label', 'Как вам наш модуль по созданию сценариев?'),
  type: select('type', feedbackFormPropType, defaultFeedbackFormPropType),
  withOpenQuestion: boolean('withOpenQuestion', false),
  openQuestionTitle: text('openQuestionTitle', 'Расскажите, что нам стоит добавить или изменить'),
});

type ThemeName = 'gpnDefault' | 'gpnDark';

const items = ['Default', 'Dark'];

function getPreset(themeName: ThemeName): ThemePreset {
  const obj = {
    gpnDefault: presetGpnDefault,
    gpnDark: presetGpnDark,
  };
  return obj[themeName] || presetGpnDefault;
}

const cnFeedbackFormStories = cn('FeedbackFormStories');

export function Playground() {
  const { label, type, withOpenQuestion, openQuestionTitle } = defaultKnobs();
  const [theme, setTheme] = useState<ThemeName>('gpnDefault');
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <Theme preset={getPreset(theme)} className={cnFeedbackFormStories()}>
      <ThemeToggler
        size="l"
        items={items}
        className={cnFeedbackFormStories('Toggler')}
        value={theme}
        onChange={() => setTheme(theme === 'gpnDefault' ? 'gpnDark' : 'gpnDefault')}
        getItemIcon={(theme) => (theme === 'Default' ? IconSun : IconMoon)}
        getItemLabel={(theme) => theme}
      />
      <FeedbackForm
        label={label}
        type={type}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        withOpenQuestion={withOpenQuestion}
        openQuestionTitle={openQuestionTitle}
        onSubmit={() => console.log}
      />
      <Button label="Открыть виджет" onClick={() => setIsOpen(true)} />
    </Theme>
  );
}

export default createMetadata({
  title: 'FeedbackForm',
  id: 'FeedbackForm',
  parameters: {
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/XtWiNHuHASrbdyGdoNQASV/СПА%3A-виджет-оценки-CSI-NPS?node-id=170%3A38467',
    },
  },
});
