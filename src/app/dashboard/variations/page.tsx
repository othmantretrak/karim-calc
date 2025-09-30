// FILE: app/dashboard/variations/page.tsx (Updated)
import { AppSidebar } from "@/components/app-sidebar"
import { DataTable } from "@/components/data-table"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

import { getAllProducts } from "../../actions/productActions"
import { variationColumns } from "./variation-columns" // Import client columns

export default async function VariationsPage() {
    const products = await getAllProducts();

    const flatVariations = products.flatMap(p =>
        p.variations.map(v => ({
            id: v.id,
            //show 8 character of sku
            sku: v.sku.slice(0, 8),
            price: v.price,
            image: v.image,
            createdAt: v.createdAt,
            productName: p.name,
            productSlug: p.slug,
            attributeSummary: v.attributes
                .map(attrValue => `${attrValue.attribute.name}: ${attrValue.value}`)
                .join(' / '),
        }))
    );

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
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                            <h2 className="text-xl font-bold mb-2 px-4 lg:px-6">Product Variations</h2>
                            <DataTable data={flatVariations} columns={variationColumns} label="variation" />
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}