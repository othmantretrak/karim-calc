import { getProductById } from '@/app/actions/productActions'
import { notFound } from 'next/navigation'
import ProductFormBuilder from '@/components/ProductFormBuilder';

interface EditProductPageProps {
    params: Promise<{ id: string }>
}

// Helper to map Prisma types to FormBuilder types, ensuring tempIds are present for the frontend state management
function mapProductToInitialData(product: Awaited<ReturnType<typeof getProductById>>) {
    if (!product) return null;

    return {
        id: product.id,
        name: product.name,
        slug: product.slug,
        description: product.description,
        steps: product.steps.map(step => ({
            tempId: step.id, // Use real ID as tempId
            order: step.order,
            questions: step.questions.map(question => ({
                tempId: question.id, // Use real ID as tempId
                order: question.order,
                type: question.type,
                question: question.question,
                required: question.required,
                pricingImpact: question.pricingImpact,
                pricePerUnit: question.pricePerUnit,
                unit: question.unit,
                minValue: question.minValue,
                maxValue: question.maxValue,
                defaultValue: question.defaultValue,
                conditionalOn: question.conditionalOn,
                options: question.options.map(option => ({
                    tempId: option.id, // Use real ID as tempId
                    questionTempId: question.id,
                    label: option.label,
                    value: option.value,
                    price: option.price,
                    imageUrl: option.imageUrl,
                    imagePublicId: option.imagePublicId,
                    order: option.order,
                })),
            })),
        })),
    };
}


export default async function EditProductPage({
    params,
}: EditProductPageProps) {
    const { id } = await params;

    // Fetch product data using the new action
    const product = await getProductById(id)

    if (!product) {
        notFound()
    }

    const initialData = mapProductToInitialData(product);

    return (
        <div className="container mx-auto max-w-4xl py-8">
            <h2 className="text-2xl font-bold mb-6">Edit Product: {product.name}</h2>
            <ProductFormBuilder
                initialData={initialData}
                isEdit={true}
            />
        </div>
    )
}

// Generate metadata for the page
export async function generateMetadata({ params }: EditProductPageProps) {
    const { id } = await params;
    try {
        const product = await getProductById(id)

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