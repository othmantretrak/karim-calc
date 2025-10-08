// app/types/formBuilder.ts

export type StepType = 'SELECT' | 'NUMBER' | 'TEXT' | 'CHECKBOX'
export type PricingImpact = 'BASE' | 'MULTIPLIER' | 'ADDITIVE' | 'NONE'

export interface StepOption {
    id: string
    stepId: string
    questionNum: number // 1 or 2
    label: string
    value: string
    imageUrl?: string | null // Optional image URL
    price: number | null
    order: number
}

export interface FormStep {
    id: string
    productId: string
    order: number

    // Question 1 (required)
    type1: StepType
    question1: string
    required1: boolean
    pricingImpact1: PricingImpact
    pricePerUnit1: number | null
    unit1: string | null
    minValue1: number | null
    maxValue1: number | null
    defaultValue1: number | null

    // Question 2 (optional)
    type2: StepType | null
    question2: string | null
    required2: boolean
    pricingImpact2: PricingImpact
    pricePerUnit2: number | null
    unit2: string | null
    minValue2: number | null
    maxValue2: number | null
    defaultValue2: number | null

    conditionalOn1: { stepId: string; value: string, questionNum: 1 | 2 } | null
    conditionalOn2: { stepId: string; value: string, questionNum: 1 | 2 } | null
    options: StepOption[]
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
    answers: Record<string, string | number>
}