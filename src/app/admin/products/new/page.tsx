import ProductForm from '@/app/components/ProductForm'
import prisma from '@/app/lib/prisma'

export default async function NewProductPage() {
    // Fetch all attributes with their values from the database
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

    return (
        <div className="container mx-auto py-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Create New Product</h1>
                    <p className="text-muted-foreground">
                        Add a new variable product with multiple variations
                    </p>
                </div>

                <ProductForm attributes={attributes} />
            </div>
        </div>
    )
}