// types/Homepage.ts
export interface CalculatorProduct {
    id: string
    name: string
    slug: string
    variations: Array<{
        id: string
        price: number
        attributes: Array<{
            name: string
            value: string
        }>
    }>
}
// types/ProductDisplay.ts
export interface Product {
    id: string
    name: string
    slug: string
    description?: string
    basePrice: number
    baseImage?: string
    variations: Array<{
        id: string
        sku: string
        price: number
        image?: string
        attributes: Array<{
            id: string
            value: string
            attribute: {
                id: string
                name: string
            }
        }>
    }>
}

export interface VariationMatch {
    id: string
    sku: string
    price: number
    image?: string
    attributes: Array<{
        attributeName: string
        value: string
    }>
}

export interface Attribute {
    id: string
    name: string
    availableValues: string[]
}