// src/app/types/productFormTypes.ts

export interface OptionData {
    tempId: string;
    label: string;
    value: string;
    price: number | null;
    imageUrl?: string | null;
    imagePublicId?: string | null; // Add imagePublicId
    order: number;
}

export interface QuestionFormData {
    tempId: string;
    order: number;
    type: 'SELECT' | 'NUMBER' | 'CHECKBOX';
    question: string;
    required: boolean;
    pricingImpact: 'BASE' | 'MULTIPLIER' | 'ADDITIVE' | 'NONE';
    pricePerUnit: number | null;
    unit: string | null;
    minValue: number | null;
    maxValue: number | null;
    defaultValue: number | null;
    conditionalOn: any; // Will be { questionId: string, value: any }
    options: OptionData[];
}

export interface StepFormData {
    tempId: string;
    order: number;
    questions: QuestionFormData[];
}

// Prop Types for handler functions
export type UpdateStepHandler = (tempId: string, updates: Partial<StepFormData>) => void;
export type UpdateQuestionHandler = (stepTempId: string, questionTempId: string, updates: Partial<QuestionFormData>) => void;
export type AddQuestionHandler = (stepTempId: string) => void;
export type DeleteQuestionHandler = (stepTempId: string, questionTempId: string) => void;

export type UpdateOptionHandler = (stepTempId: string, questionTempId: string, optionTempId: string, updates: Partial<OptionData>) => void;
export type AddOptionHandler = (stepTempId: string, questionTempId: string) => void;
export type DeleteOptionHandler = (stepTempId: string, questionTempId: string, optionTempId: string) => void;

export type DeleteStepHandler = (tempId: string) => void;
export type MoveStepHandler = (tempId: string, direction: 'up' | 'down') => void;
