// app/types.ts

export type AttributeType = 'SELECT' | 'NUMBER'

export interface AttributeValue {
    id: string
    value: string
    attributeId: string
}

export interface Attribute {
    id: string
    name: string
    type: AttributeType
    unit?: string | null
    values?: AttributeValue[]
    availableValues?: string[] // For filtered attributes in the UI
}

export interface ProductUnitPrice {
    id: string
    productId: string
    attributeId: string
    pricePerUnit: number
    defaultQuantity: number
    attribute: Attribute
}

export interface Variation {
    id: string
    sku: string
    price: number
    image?: string | null
    productId: string
    attributes: AttributeValue[]
}

export interface CalculatorProduct {
    id: string
    name: string
    slug: string
    description?: string | null
    basePrice: number
    baseImage?: string | null
    variations: Variation[]
    attributes: Attribute[]
    unitPrices: ProductUnitPrice[]
}

export interface SelectionState {
    productSlug: string | undefined
    attributes: Record<string, string> // { attributeName: selectedValue }
    numberInputs: Record<string, number> // { attributeName: quantity }
    variationId: string | undefined
}