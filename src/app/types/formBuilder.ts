// app/types/formBuilder.ts

export type StepType = 'SELECT' | 'NUMBER' | 'TEXT' | 'CHECKBOX'
export type PricingImpact = 'BASE' | 'MULTIPLIER' | 'ADDITIVE' | 'NONE'

// StepOption now belongs to a Question
export interface StepOption {
    id: string
    questionId: string // Belongs to a question
    label: string
    value: string
    imageUrl?: string | null
    price: number | null
    order: number
}

// The new Question type, which holds all question-specific data
export interface Question {
    id: string
    stepId: string
    order: number // Order within the step
    type: StepType
    question: string
    required: boolean
    pricingImpact: PricingImpact
    pricePerUnit: number | null
    unit: string | null
    minValue: number | null
    maxValue: number | null
    defaultValue: number | null
    conditionalOn: { questionId: string; value: string } | null
    options: StepOption[] // Each question holds its own options
}

// FormStep now contains an array of Questions
export interface FormStep {
    id: string
    productId: string
    order: number
    questions: Question[]
}

export interface Product {
    id: string
    name: string
    slug: string
    description: string | null
    baseImage: string | null
    steps: FormStep[]
}

export interface PriceBreakdown {
    basePrice: number
    additions: Array<{ label: string; amount: number }>
    multipliers: Array<{ label: string; factor: number }>
    total: number
}

export interface UserSelection {
    productSlug: string | null
    answers: Record<string, string | number> // Key will likely be `question-${questionId}`
}