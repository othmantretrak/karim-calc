import { getProductBySlug, getAllProducts } from '@/app/actions/productActions'
import ProductDisplay, { VariationMatch } from '@/app/components/ProductDisplay'
import { notFound } from 'next/navigation'

// Generate static params for all existing products
export async function generateStaticParams() {
    try {
        const products = await getAllProducts()
        return products.map((product) => ({
            slug: product.slug,
        }))
    } catch (error) {
        console.error('Error generating static params:', error)
        return []
    }
}

// Generate metadata for the page
export async function generateMetadata({ params }: { params: { slug: string } }) {
    const product = await getProductBySlug(params.slug)

    if (!product) {
        return {
            title: 'Product Not Found',
        }
    }

    return {
        title: product.name,
        description: product.description || `Check out ${product.name}`,
    }
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
    // Fetch product data with all related information
    const product = await getProductBySlug(params.slug)

    if (!product) {
        notFound()
    }

    // Ensure description, baseImage, and variation.image are never null
    const safeProduct = {
        ...product,
        description: product.description === null ? undefined : product.description,
        baseImage: product.baseImage === null ? undefined : product.baseImage,
        variations: product.variations?.map(variation => ({
            ...variation,
            image: variation.image === null ? undefined : variation.image,
        })) ?? [],
    }

    return (
        <div className="container mx-auto py-8">
            <ProductDisplay product={safeProduct} />
        </div>
    )
}