import { useBoolean, useSelect, useText } from '@consta/stand';
import { Button } from '@consta/uikit/Button';
import React, { useState } from 'react';

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
};

export default Variants;
