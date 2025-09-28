import { getProductForEdit } from '@/app/actions/productActions'
import EditProductForm from '@/app/components/EditProductForm'
import { notFound } from 'next/navigation'

interface EditProductPageProps {
    params: {
        id: string
    }
}

export default async function EditProductPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    try {
        const product = await getProductForEdit(id)

        if (!product) {
            notFound()
        }

        return (
            <EditProductForm
                product={{
                    ...product,
                    description: product.description ?? undefined,
                    baseImage: product.baseImage ?? undefined,
                    variations: product.variations?.map(v => ({
                        ...v,
                        image: v.image ?? undefined,
                        attributes: v.attributes?.map(a => ({
                            ...a,
                            attribute: {
                                id: a.attribute.id,
                                name: a.attribute.name
                            }
                        })) ?? []
                    })) ?? []
                }}
            />
        )
    } catch (error) {
        console.error('Error loading product for edit:', error)
        notFound()
    }
}

// Generate metadata for the page
export async function generateMetadata({ params }: EditProductPageProps) {
    try {
        const product = await getProductForEdit(params.id)

        return {
            title: `Edit ${product?.name || 'Product'} | Admin`,
            description: `Edit product: ${product?.name || 'Unknown'}`
        }
    } catch (error) {
        return {
            title: 'Edit Product | Admin',
            description: 'Edit product information'
        }
    }
}