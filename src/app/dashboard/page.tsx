import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"


import { getAllProducts } from "../actions/productActions"
import { getAllAttributes } from "../actions/attributeActions"

export default async function Page() {
  // Fetch products and attributes
  const products = await getAllProducts();
  const attributes = await getAllAttributes();

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
              {/* Products Table */}
              <h2 className="text-xl font-bold mb-2">Products</h2>
              <DataTable data={products} />

              {/* Variations for each product */}
              <div className="mt-6">
                <h2 className="text-xl font-bold mb-2">Variations</h2>
                {products.map((product: any) => (
                  <div key={product.id} className="mb-4">
                    <h3 className="font-semibold">{product.name}</h3>
                    <ul>
                      {product.variations.map((variation: any) => (
                        <li key={variation.id}>
                          SKU: {variation.sku}, Price: {variation.price}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Attributes Table */}
              <div className="mt-6">
                <h2 className="text-xl font-bold mb-2">Attributes</h2>
                <ul>
                  {attributes.map((attribute: any) => (
                    <li key={attribute.id}>
                      {attribute.name}: {attribute.values.map((v: any) => v.value).join(", ")}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
