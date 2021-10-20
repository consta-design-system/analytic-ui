import React from 'react';

export const feedbackFormPropType = ['NPS', 'CSI', 'combo'] as const;
export type FeedbackFormPropType = typeof feedbackFormPropType[number];
export const defaultFeedbackFormPropType: FeedbackFormPropType = feedbackFormPropType[0];

type FeedbackFormResult = {
  CSI?: number;
  question?: string;
  NPS?: number;
};

export type FeedbackFormProps = {
  title?: string;
  isOpen?: boolean;
  type?: FeedbackFormPropType;
  withOpenQuestion?: boolean;
  openQuestionTitle?: string;
  onClose?: () => void;
  onSubmit?: (props: { e: React.MouseEvent; data: FeedbackFormResult }) => void;
};
