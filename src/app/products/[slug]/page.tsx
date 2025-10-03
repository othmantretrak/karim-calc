import { getProductBySlug, getAllProducts } from '@/app/actions/productActions'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import ProductCalculator from '@/components/product/ProductCalculator';


interface ProductPageProps {
    params: Promise<{ slug: string }>
}

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
export async function generateMetadata({ params }: ProductPageProps) {
    const { slug } = await params
    const product = await getProductBySlug(slug)

    if (!product) {
        return {
            title: 'Product Not Found',
        }
    }

    return {
        title: product.name,
        description: product.description || `Calculate the price for ${product.name}`,
    }
}

export default async function ProductPage({ params }: ProductPageProps) {
    // Fetch product data with all related information
    const { slug } = await params;
    const product = await getProductBySlug(slug)

    if (!product) {
        notFound()
    }

    // Ensure description, baseImage, and variation.image are never null

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md mx-auto">
                <div className="mb-4 flex justify-between items-center w-full max-w-md">
                    <Link href="/dashboard" passHref>
                        <Button variant="outline" size="sm">Back to Dashboard</Button>
                    </Link>
                    <h1 className="text-xl font-bold text-gray-800">{product.name}</h1>
                </div>
                <ProductCalculator product={product} />
            </div>
        </div>
    )
}