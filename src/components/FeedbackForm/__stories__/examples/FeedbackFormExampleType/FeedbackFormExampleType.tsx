import React, { useState } from 'react';

import { Button } from '@consta/uikit/Button';

import { FeedbackForm } from '@/components/FeedbackForm/FeedbackForm';

export const FeedbackFormExampleTypeCsi = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      <FeedbackForm
        title="Как вам наш модуль по созданию сценариев?"
        type="CSI"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <Button label="Открыть виджет" onClick={() => setIsOpen(true)} />
    </div>
  );
};

export const FeedbackFormExampleTypeNps = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      <FeedbackForm
        title="Как вам наш модуль по созданию сценариев?"
        type="NPS"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <Button label="Открыть виджет" onClick={() => setIsOpen(true)} />
    </div>
  );
};

export const FeedbackFormExampleTypeCombo = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      <FeedbackForm
        title="Как вам наш модуль по созданию сценариев?"
        type="combo"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <Button label="Открыть виджет" onClick={() => setIsOpen(true)} />
    </div>
  );
};
