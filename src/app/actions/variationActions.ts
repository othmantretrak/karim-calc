'use server'
import prisma from "../lib/prisma"


interface CreateVariationData {
    sku: string
    price: number
    productId: string
    attributeValues: { attributeId: string, value: string }[]
}

export async function createVariation({ sku, price, productId, attributeValues }: CreateVariationData) {
    try {
        // Check if variation with this SKU already exists
        const existingVariation = await prisma.variation.findUnique({
            where: { sku }
        })
        if (existingVariation) {
            throw new Error('Variation with this SKU already exists')
        }

        // Create the new variation and link attribute values
        const newVariation = await prisma.variation.create({
            data: {
                sku,
                price,
                productId,
                attributes: {
                    create: attributeValues.map(av => ({
                        attribute: { connect: { id: av.attributeId } },
                        value: av.value
                    }))
                }
            }
        })

        return newVariation
    } catch (error) {
        console.error('Error creating variation:', error)
        throw new Error('Failed to create variation')
    }
}
export async function getAllVariations() {
    try {
        const variations = await prisma.variation.findMany({
            include: {
                attributes: true
            }
        })
        return variations
    } catch (error) {
        console.error('Error fetching variations:', error)
        throw new Error('Failed to fetch variations')
    }
}