import { CalculatorProduct, Product, Attribute, VariationMatch } from "../types"

// utils/productUtils.ts
const getAttribute = (attr: any): { name: string; value: string } => {
    if ('name' in attr) {
        // This is for CalculatorProduct variation attributes
        return { name: attr.name, value: attr.value }
    }
    // This is for Product variation attributes
    return { name: attr.attribute.name, value: attr.value }
}

export function getFilteredAttributes(
    product: CalculatorProduct | Product,
    selections: Record<string, string>
): Attribute[] {
    const variations = product.variations || []
    const attributes = new Set<string>()

    // Collect all attribute names
    variations.forEach((variation) => {
        variation.attributes.forEach((attr) => attributes.add(getAttribute(attr).name))
    })

    return Array.from(attributes).map((attributeName) => ({
        id: attributeName,
        name: attributeName,
        availableValues: getAvailableValuesForAttributeFiltered(product, attributeName, selections),
    }))
}

export function getAvailableValuesForAttributeFiltered(
    product: CalculatorProduct | Product,
    targetAttributeName: string,
    selections: Record<string, string>
): string[] {
    const variations = product.variations || []
    const otherSelections = Object.entries(selections).filter(([attrName]) => attrName !== targetAttributeName)

    const compatibleVariations = variations.filter((variation) => {
        return otherSelections.every(([attrName, selectedValue]) => {
            return variation.attributes.some((attr) => {
                const { name, value } = getAttribute(attr)
                return name === attrName && value === selectedValue
            })
        })
    })

    const availableValues = new Set<string>()
    compatibleVariations.forEach((variation) => {
        const attr = variation.attributes.find((a) => getAttribute(a).name === targetAttributeName)
        if (attr) availableValues.add(getAttribute(attr).value)
    })

    return Array.from(availableValues).sort()
}

export function findMatchingVariation(
    product: CalculatorProduct | Product,
    selections: Record<string, string>
): VariationMatch | null {
    const variations = product.variations || []
    const matchedVariation = variations.find((variation) => {
        return Object.entries(selections).every(([attrName, selectedValue]) => {
            return variation.attributes.some((attr) => {
                const { name, value } = getAttribute(attr)
                return name === attrName && value === selectedValue
            })
        })
    })

    if (!matchedVariation) return null

    return {
        id: matchedVariation.id,
        sku: 'sku' in matchedVariation ? matchedVariation.sku : matchedVariation.id,
        price: matchedVariation.price,
        image: 'image' in matchedVariation ? matchedVariation.image : undefined,
        attributes: matchedVariation.attributes.map((attr) => {
            const { name, value } = getAttribute(attr)
            return { attributeName: name, value }
        }),
    }
}