// app/utils/productUtils.ts
import { CalculatorProduct, Attribute, Variation, ProductUnitPrice } from '@/app/types'

/**
 * Find a matching variation based on SELECT-type attributes only
 */
export function findMatchingVariation(
    product: CalculatorProduct,
    selectedAttributes: Record<string, string>
): Variation | null {
    return product.variations.find((variation) => {
        // Get only SELECT type attributes for matching
        const selectAttributes = product.attributes.filter(attr => attr.type === 'SELECT')

        return selectAttributes.every((attr) => {
            const selectedValue = selectedAttributes[attr.name]
            if (!selectedValue) return false

            return variation.attributes.some(
                (va) => va.attributeId === attr.id && va.value === selectedValue
            )
        })
    }) || null
}

/**
 * Calculate final price including number-based attributes
 */
export function calculatePrice(
    variation: Variation,
    unitPrices: ProductUnitPrice[],
    numberInputs: Record<string, number>
): number {
    let finalPrice = variation.price

    // For each number attribute, calculate the delta from default
    unitPrices.forEach((unitPrice) => {
        const inputQuantity = numberInputs[unitPrice.attribute.name] || unitPrice.defaultQuantity
        const delta = inputQuantity - unitPrice.defaultQuantity
        const additionalCost = delta * unitPrice.pricePerUnit

        finalPrice += additionalCost
    })

    return finalPrice
}

/**
 * Calculate the "starting from" price with current selections
 * This finds the minimum price among variations that match selected attributes
 */
export function calculateStartingPrice(
    product: CalculatorProduct,
    selectedAttributes: Record<string, string>,
    numberInputs: Record<string, number>
): number {
    // Filter variations that match the currently selected attributes
    const selectAttributes = product.attributes.filter(attr => attr.type === 'SELECT')
    const selectedAttrNames = Object.keys(selectedAttributes)

    const matchingVariations = product.variations.filter((variation) => {
        return selectedAttrNames.every((attrName) => {
            const attr = selectAttributes.find(a => a.name === attrName)
            if (!attr) return true

            const selectedValue = selectedAttributes[attrName]
            return variation.attributes.some(
                (va) => va.attributeId === attr.id && va.value === selectedValue
            )
        })
    })

    if (matchingVariations.length === 0) return 0

    // Calculate price for each matching variation and return the minimum
    const prices = matchingVariations.map(variation =>
        calculatePrice(variation, product.unitPrices, numberInputs)
    )

    return Math.min(...prices)
}

/**
 * Get filtered attributes with available values based on current selection
 */
export function getFilteredAttributes(
    product: CalculatorProduct,
    selectedAttributes: Record<string, string>
): Attribute[] {
    const selectAttributes = product.attributes.filter(attr => attr.type === 'SELECT')

    return selectAttributes.map((attribute) => {
        // Find variations that match currently selected attributes (excluding this one)
        const otherSelectedAttrs = Object.entries(selectedAttributes).filter(
            ([key]) => key !== attribute.name
        )

        const matchingVariations = product.variations.filter((variation) => {
            return otherSelectedAttrs.every(([attrName, attrValue]) => {
                const attr = selectAttributes.find((a) => a.name === attrName)
                if (!attr) return true

                return variation.attributes.some(
                    (va) => va.attributeId === attr.id && va.value === attrValue
                )
            })
        })

        // Get unique available values from matching variations
        const availableValues = new Set<string>()
        matchingVariations.forEach((variation) => {
            variation.attributes.forEach((va) => {
                if (va.attributeId === attribute.id) {
                    availableValues.add(va.value)
                }
            })
        })

        return {
            ...attribute,
            availableValues: Array.from(availableValues).sort(),
        }
    })
}

/**
 * Get number-type attributes for a product
 */
export function getNumberAttributes(product: CalculatorProduct): Attribute[] {
    return product.attributes.filter(attr => attr.type === 'NUMBER')
}

/**
 * Get select-type attributes for a product
 */
export function getSelectAttributes(product: CalculatorProduct): Attribute[] {
    return product.attributes.filter(attr => attr.type === 'SELECT')
}