'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import prisma from '../lib/prisma'

interface ProductData {
    name: string
    slug: string
    description?: string
    basePrice: number
    baseImage?: string
}

interface VariationData {
    combination: Array<{
        attributeId: string
        attributeName: string
        valueId: string
        value: string
    }>
    price: number
    sku: string
    image?: string
    attributeValueIds: string[]
}

interface CreateProductPayload {
    product: ProductData
    variations: VariationData[]
}

export async function createProductWithVariations(payload: CreateProductPayload) {
    try {
        // Use transaction to ensure all operations succeed or fail together
        const result = await prisma.$transaction(async (tx) => {
            // Create the main product
            const product = await tx.product.create({
                data: {
                    name: payload.product.name,
                    slug: payload.product.slug,
                    description: payload.product.description,
                    basePrice: payload.product.basePrice,
                    baseImage: payload.product.baseImage,
                }
            })

            // Get all unique attribute IDs from the variations
            const uniqueAttributeIds = new Set<string>()
            payload.variations.forEach(variation => {
                variation.combination.forEach(item => {
                    uniqueAttributeIds.add(item.attributeId)
                })
            })

            // Create ProductAttribute relationships
            await Promise.all(
                Array.from(uniqueAttributeIds).map(attributeId =>
                    tx.productAttribute.create({
                        data: {
                            productId: product.id,
                            attributeId: attributeId
                        }
                    })
                )
            )

            // Create variations
            const createdVariations = await Promise.all(
                payload.variations.map(async (variation) => {
                    // Create the variation
                    const createdVariation = await tx.variation.create({
                        data: {
                            sku: variation.sku,
                            price: variation.price,
                            image: variation.image,
                            productId: product.id,
                        }
                    })

                    // Connect attribute values to the variation
                    await tx.variation.update({
                        where: { id: createdVariation.id },
                        data: {
                            attributes: {
                                connect: variation.attributeValueIds.map(id => ({ id }))
                            }
                        }
                    })

                    return createdVariation
                })
            )

            return { product, variations: createdVariations }
        })

        // Revalidate product-related paths
        revalidatePath('/dashboard')
        revalidatePath('/products')
        revalidatePath(`/products/${payload.product.slug}`)

        return result
    } catch (error) {
        console.error('Error creating product with variations:', error)
        throw new Error('Failed to create product with variations')
    }
}

// Helper function to get all products with their variations
export async function getAllProducts() {
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
                },
                attributes: {
                    include: {
                        attribute: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return products
    } catch (error) {
        console.error('Error fetching products:', error)
        throw new Error('Failed to fetch products')
    }
}

// Helper function to get a single product by slug with all related data
export async function getProductBySlug(slug: string) {
    try {
        const product = await prisma.product.findUnique({
            where: { slug },
            include: {
                variations: {
                    include: {
                        attributes: {
                            include: {
                                attribute: true
                            }
                        }
                    }
                },
                attributes: {
                    include: {
                        attribute: {
                            include: {
                                values: true
                            }
                        }
                    }
                }
            }
        })

        return product
    } catch (error) {
        console.error('Error fetching product by slug:', error)
        throw new Error('Failed to fetch product')
    }
}

// Helper function to get all attributes with their values
export async function getAllAttributes() {
    try {
        const attributes = await prisma.attribute.findMany({
            include: {
                values: {
                    orderBy: {
                        value: 'asc'
                    }
                }
            },
            orderBy: {
                name: 'asc'
            }
        })

        return attributes
    } catch (error) {
        console.error('Error fetching attributes:', error)
        throw new Error('Failed to fetch attributes')
    }
}

// Helper function to create sample attributes and values for testing
export async function createSampleAttributes() {
    try {
        const colorAttribute = await prisma.attribute.create({
            data: {
                name: 'Color',
                values: {
                    create: [
                        { value: 'Red' },
                        { value: 'Blue' },
                        { value: 'Green' },
                        { value: 'Black' },
                        { value: 'White' }
                    ]
                }
            }
        })

        const sizeAttribute = await prisma.attribute.create({
            data: {
                name: 'Size',
                values: {
                    create: [
                        { value: 'XS' },
                        { value: 'S' },
                        { value: 'M' },
                        { value: 'L' },
                        { value: 'XL' },
                        { value: 'XXL' }
                    ]
                }
            }
        })

        const materialAttribute = await prisma.attribute.create({
            data: {
                name: 'Material',
                values: {
                    create: [
                        { value: 'Cotton' },
                        { value: 'Polyester' },
                        { value: 'Wool' },
                        { value: 'Silk' }
                    ]
                }
            }
        })

        //return { colorAttribute, sizeAttribute, materialAttribute }
    } catch (error) {
        console.error('Error creating sample attributes:', error)
        throw new Error('Failed to create sample attributes')
    }
}

// Add these functions to your existing productActions.ts file

interface UpdateProductData {
    name: string
    slug: string
    description?: string
    basePrice: number
    baseImage?: string
}

interface UpdateVariationData {
    id: string
    sku: string
    price: number
    image?: string
}

interface UpdateProductPayload {
    product: UpdateProductData
    variations: UpdateVariationData[]
}

export async function updateProduct(productId: string, payload: UpdateProductPayload) {
    try {
        // Use transaction to ensure all operations succeed or fail together
        const result = await prisma.$transaction(async (tx) => {
            // Update the main product
            const updatedProduct = await tx.product.update({
                where: { id: productId },
                data: {
                    name: payload.product.name,
                    slug: payload.product.slug,
                    description: payload.product.description,
                    basePrice: payload.product.basePrice,
                    baseImage: payload.product.baseImage,
                }
            })

            // Update variations
            const updatedVariations = await Promise.all(
                payload.variations.map(async (variation) => {
                    return await tx.variation.update({
                        where: { id: variation.id },
                        data: {
                            sku: variation.sku,
                            price: variation.price,
                            image: variation.image,
                        }
                    })
                })
            )

            return { product: updatedProduct, variations: updatedVariations }
        })

        // Revalidate product-related paths
        revalidatePath('/dashboard')
        revalidatePath('/products')
        revalidatePath(`/products/${payload.product.slug}`)

        return result
    } catch (error) {
        console.error('Error updating product:', error)
        throw new Error('Failed to update product')
    }
}

export async function deleteProduct(productId: string) {
    try {
        // Delete the product (variations will be cascade deleted due to schema)
        await prisma.product.delete({
            where: { id: productId }
        })

        // Revalidate product-related paths
        revalidatePath('/dashboard')
        revalidatePath('/products')

        return { success: true }
    } catch (error) {
        console.error('Error deleting product:', error)
        throw new Error('Failed to delete product')
    }
}

export async function deleteVariation(variationId: string) {
    try {
        // Check if this is the last variation for the product
        const variation = await prisma.variation.findUnique({
            where: { id: variationId },
            include: {
                product: {
                    include: {
                        variations: true
                    }
                }
            }
        })

        if (!variation) {
            throw new Error('Variation not found')
        }

        if (variation.product.variations.length <= 1) {
            throw new Error('Cannot delete the last variation. Products must have at least one variation.')
        }

        // Delete the variation
        await prisma.variation.delete({
            where: { id: variationId }
        })

        // Revalidate product-related paths
        revalidatePath('/dashboard')
        revalidatePath('/products')
        revalidatePath(`/products/${variation.product.slug}`)

        return { success: true }
    } catch (error: any) {
        console.error('Error deleting variation:', error)
        throw new Error(error.message || 'Failed to delete variation')
    }
}

export async function getProductForEdit(productId: string) {
    try {
        const product = await prisma.product.findUnique({
            where: { id: productId },
            include: {
                variations: {
                    include: {
                        attributes: {
                            include: {
                                attribute: true
                            }
                        }
                    }
                },
                attributes: {
                    include: {
                        attribute: {
                            include: {
                                values: true
                            }
                        }
                    }
                }
            }
        })

        if (!product) {
            throw new Error('Product not found')
        }

        return product
    } catch (error) {
        console.error('Error fetching product for edit:', error)
        throw new Error('Failed to fetch product')
    }
}