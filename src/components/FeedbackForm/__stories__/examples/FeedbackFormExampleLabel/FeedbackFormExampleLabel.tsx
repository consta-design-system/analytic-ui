import React, { useState } from 'react';

import { Button } from '@consta/uikit/Button';

import { FeedbackForm } from '@/components/FeedbackForm/FeedbackForm';

export const FeedbackFormExampleLabel = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      <FeedbackForm
        title="Здесь может быть ваш текст"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <Button label="Открыть виджет" onClick={() => setIsOpen(true)} />
    </div>
  );
};
