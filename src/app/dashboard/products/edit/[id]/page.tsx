import { getProductById } from '@/app/actions/productActions'
import { notFound } from 'next/navigation'
import { FormStep, StepOption } from '@/app/types/formBuilder'
import { StepFormData } from '@/app/types/productFormTypes'
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
            // Use the real ID as the temporary ID for tracking
            tempId: step.id,
            order: step.order,

            // Question 1 fields
            type1: step.type1 as StepFormData['type1'],
            question1: step.question1,
            required1: step.required1,
            pricingImpact1: step.pricingImpact1 as StepFormData['pricingImpact1'],
            pricePerUnit1: step.pricePerUnit1,
            unit1: step.unit1,
            minValue1: step.minValue1,
            maxValue1: step.maxValue1,
            defaultValue1: step.defaultValue1,

            // Question 2 fields
            type2: step.type2 as StepFormData['type2'],
            question2: step.question2,
            required2: step.required2,
            pricingImpact2: step.pricingImpact2 as StepFormData['pricingImpact2'],
            pricePerUnit2: step.pricePerUnit2,
            unit2: step.unit2,
            minValue2: step.minValue2,
            maxValue2: step.maxValue2,
            defaultValue2: step.defaultValue2,

            // Conditional Logic (already transformed by action to JSON object)
            conditionalOn1: step.conditionalOn1,
            conditionalOn2: step.conditionalOn2,

            options: step.options.map(option => ({
                tempId: option.id, // Use the real ID as temp ID
                questionNum: option.questionNum,
                label: option.label,
                value: option.value,
                price: option.price,
                order: option.order,
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