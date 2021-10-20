import React, { useState } from 'react';

import { Button } from '@consta/uikit/Button';

import { FeedbackForm } from '@/components/FeedbackForm/FeedbackForm';

export const FeedbackFormExampleQuestion = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      <FeedbackForm
        title="Пример с вопросом"
        isOpen={isOpen}
        withOpenQuestion
        openQuestionTitle="Заголовок вопроса"
        onClose={() => setIsOpen(false)}
      />
      <Button label="Открыть виджет" onClick={() => setIsOpen(true)} />
    </div>
  );
};
