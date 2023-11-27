import { useBoolean, useSelect, useText } from '@consta/stand';
import { Button } from '@consta/uikit/Button';
import { useFlag } from '@consta/uikit/useFlag';
import React from 'react';

import { FeedbackForm } from '../FeedbackForm';
import { defaultFeedbackFormPropType, feedbackFormPropType } from '../helper';

const Variants = () => {
  const title = useText('title', 'Как вам наш модуль по созданию сценариев?');
  const type = useSelect(
    'type',
    feedbackFormPropType,
    defaultFeedbackFormPropType,
  );
  const withOpenQuestion = useBoolean('withOpenQuestion', false);
  const csiTitle = useText('csiTitle', 'Общая оценка');
  const openQuestionTitle = useText(
    'openQuestionTitle',
    'Расскажите, что нам стоит добавить или изменить',
  );

  const [isOpen, setIsOpen] = useFlag();

  return (
    <>
      <FeedbackForm
        title={title}
        type={type}
        isOpen={isOpen}
        csiTitle={csiTitle}
        onClose={setIsOpen.off}
        withOpenQuestion={withOpenQuestion}
        openQuestionTitle={openQuestionTitle}
        key={`F${type}`}
      />
      <Button label="Открыть виджет" onClick={setIsOpen.on} />
    </>
  );
};

export default Variants;
