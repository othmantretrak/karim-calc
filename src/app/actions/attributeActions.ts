'use server'

import { revalidatePath } from 'next/cache'
import prisma from '../lib/prisma'

interface CreateAttributeData {
    name: string
    values: string[]
}

export async function createAttribute(data: CreateAttributeData) {
    try {
        // Check if attribute with this name already exists
        const existingAttribute = await prisma.attribute.findUnique({
            where: { name: data.name }
        })

        if (existingAttribute) {
            throw new Error(`Attribute "${data.name}" already exists`)
        }

        // Create the attribute with its values
        const attribute = await prisma.attribute.create({
            data: {
                name: data.name,
                values: {
                    create: data.values.map(value => ({ value }))
                }
            },
            include: {
                values: true
            }
        })

        // Revalidate relevant paths
        revalidatePath('/admin/products')
        revalidatePath('/admin/products/new')

        return attribute
    } catch (error: any) {
        console.error('Error creating attribute:', error)
        throw new Error(`Failed to create attribute: ${error.message}`)
    }
}

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

export async function deleteAttribute(attributeId: string) {
    try {
        // Check if the attribute is being used in any products
        const productsUsingAttribute = await prisma.productAttribute.findMany({
            where: { attributeId },
            include: {
                product: {
                    select: { name: true }
                }
            }
        })

        if (productsUsingAttribute.length > 0) {
            const productNames = productsUsingAttribute.map(pa => pa.product.name).join(', ')
            throw new Error(`Cannot delete attribute. It's being used by: ${productNames}`)
        }

        // Delete the attribute (this will cascade delete values due to schema)
        await prisma.attribute.delete({
            where: { id: attributeId }
        })

        // Revalidate relevant paths
        revalidatePath('/admin/products')
        revalidatePath('/admin/products/new')

        return { success: true }
    } catch (error: any) {
        console.error('Error deleting attribute:', error)
        throw new Error(`Failed to delete attribute: ${error.message}`)
    }
}

export async function updateAttribute(attributeId: string, data: CreateAttributeData) {
    try {
        // Check if another attribute with this name exists
        const existingAttribute = await prisma.attribute.findFirst({
            where: {
                name: data.name,
                id: { not: attributeId }
            }
        })

        if (existingAttribute) {
            throw new Error(`Attribute "${data.name}" already exists`)
        }

        // Update in a transaction
        const updatedAttribute = await prisma.$transaction(async (tx) => {
            // Delete existing values
            await tx.attributeValue.deleteMany({
                where: { attributeId }
            })

            // Update attribute and create new values
            return await tx.attribute.update({
                where: { id: attributeId },
                data: {
                    name: data.name,
                    values: {
                        create: data.values.map(value => ({ value }))
                    }
                },
                include: {
                    values: true
                }
            })
        })

        // Revalidate relevant paths
        revalidatePath('/admin/products')
        revalidatePath('/admin/products/new')

        return updatedAttribute
    } catch (error: any) {
        console.error('Error updating attribute:', error)
        throw new Error(`Failed to update attribute: ${error.message}`)
    }
}