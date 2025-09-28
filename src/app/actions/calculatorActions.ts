'use server'

import prisma from '../lib/prisma'

export interface CalculatorProduct {
    id: string
    name: string
    variations: Array<{
        id: string
        price: number
        attributes: Array<{
            name: string
            value: string
        }>
    }>
}

export async function getProductsForCalculator(): Promise<CalculatorProduct[]> {
    try {
        const products = await prisma.product.findMany({
            include: {
                variations: {
                    include: {
                        attributes: {
                            include: {
                                attribute: true
                            }
                        }
                    }
                }
            },

        })

        // Transform the data for the calculator
        return products.map(product => ({
            id: product.id,
            name: product.name,
            variations: product.variations.map(variation => ({
                id: variation.id,
                price: variation.price,
                attributes: variation.attributes.map(attr => ({
                    name: attr.attribute.name,
                    value: attr.value
                }))
            }))
        }))
    } catch (error) {
        console.error('Error fetching products for calculator:', error)
        throw new Error('Failed to fetch products for calculator')
    }
}