import { Button } from '@consta/uikit/Button';
import { boolean, select, text } from '@storybook/addon-knobs';
import React, { useState } from 'react';

import { createMetadata } from '../../../utils/storybook';
import { FeedbackForm } from '../FeedbackForm';
import { defaultFeedbackFormPropType, feedbackFormPropType } from '../helper';
import mdx from './FeedbackForm.docs.mdx';

const defaultKnobs = () => ({
  title: text('title', 'Как вам наш модуль по созданию сценариев?'),
  type: select('type', feedbackFormPropType, defaultFeedbackFormPropType),
  withOpenQuestion: boolean('withOpenQuestion', false),
  csiTitle: text('csiTitle', 'Общая оценка'),
  openQuestionTitle: text(
    'openQuestionTitle',
    'Расскажите, что нам стоит добавить или изменить',
  ),
});

export function Playground() {
  const { title, type, withOpenQuestion, openQuestionTitle, csiTitle } =
    defaultKnobs();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <FeedbackForm
        title={title}
        type={type}
        isOpen={isOpen}
        csiTitle={csiTitle}
        onClose={() => setIsOpen(false)}
        withOpenQuestion={withOpenQuestion}
        openQuestionTitle={openQuestionTitle}
        key="FeedbackForm"
      />
      <Button label="Открыть виджет" onClick={() => setIsOpen(true)} />
    </>
  );
}

export default createMetadata({
  title: 'FeedbackForm',
  id: 'FeedbackForm',
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/XtWiNHuHASrbdyGdoNQASV/СПА%3A-виджет-оценки-CSI-NPS?node-id=170%3A38467',
    },
  },
});
