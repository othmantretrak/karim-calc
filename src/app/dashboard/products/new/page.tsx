// app/products/new/page.tsx
import { AppSidebar } from '@/components/app-sidebar'
import ProductFormBuilder from '@/components/ProductFormBuilder'
import { SiteHeader } from '@/components/site-header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

export default async function NewProductPage() {
    return (
        <SidebarProvider
            style={{
                '--sidebar-width': 'calc(var(--spacing) * 72)',
                '--header-height': 'calc(var(--spacing) * 12)',
            } as React.CSSProperties}
        >
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />
                <div className="max-w-4xl mx-auto p-6">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold mb-2">Create New Product</h1>
                        <p className="text-muted-foreground">
                            Build a custom form with questions and pricing logic
                        </p>
                    </div>

                    <ProductFormBuilder />
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}