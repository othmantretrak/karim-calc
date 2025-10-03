// types/productFormTypes.ts

export interface OptionData {
    tempId: string
    questionNum: number
    label: string
    value: string
    price: number | null
    order: number
}

export interface StepFormData {
    tempId: string
    order: number

    // Question 1
    type1: 'SELECT' | 'NUMBER'
    question1: string
    required1: boolean
    pricingImpact1: 'BASE' | 'MULTIPLIER' | 'ADDITIVE' | 'NONE'
    pricePerUnit1: number | null
    unit1: string | null
    minValue1: number | null
    maxValue1: number | null
    defaultValue1: number | null

    // Question 2 (optional)
    type2: 'SELECT' | 'NUMBER' | null
    question2: string | null
    required2: boolean
    pricingImpact2: 'BASE' | 'MULTIPLIER' | 'ADDITIVE' | 'NONE'
    pricePerUnit2: number | null
    unit2: string | null
    minValue2: number | null
    maxValue2: number | null
    defaultValue2: number | null

    conditionalOn: any
    options: OptionData[]
}

// Prop Types for handler functions
export type UpdateStepHandler = (tempId: string, updates: Partial<StepFormData>) => void
export type UpdateOptionHandler = (stepTempId: string, optionTempId: string, updates: Partial<OptionData>) => void
export type AddOptionHandler = (stepTempId: string, questionNum: number) => void
export type DeleteOptionHandler = (stepTempId: string, optionTempId: string) => void
export type DeleteStepHandler = (tempId: string) => void
export type MoveStepHandler = (tempId: string, direction: 'up' | 'down') => void