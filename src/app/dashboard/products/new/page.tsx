import ProductForm from '@/app/components/ProductForm'
import prisma from '@/app/lib/prisma'
import { AppSidebar } from '@/components/app-sidebar'
import { SiteHeader } from '@/components/site-header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

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
        <SidebarProvider
            style={{
                "--sidebar-width": "calc(var(--spacing) * 72)",
                "--header-height": "calc(var(--spacing) * 12)",
            } as React.CSSProperties}
        >
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold mb-2">Create New Product</h1>
                        <p className="text-muted-foreground">
                            Add a new variable product with multiple variations
                        </p>
                    </div>

                    <ProductForm attributes={attributes} />
                </div>

            </SidebarInset>
        </SidebarProvider>
    )
}