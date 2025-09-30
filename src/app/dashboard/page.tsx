
import { productColumns } from "./product-columns"
import { getAllProducts } from "../actions/productActions"
import { AppSidebar } from "@/components/app-sidebar"
import { DataTable } from "@/components/data-table"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"


export default async function Page() {
  // Fetch products
  const products = await getAllProducts();

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
              <h2 className="text-xl font-bold mb-2 px-4 lg:px-6">Products Management</h2>
              {/* Pass products data and defined columns to DataTable */}
              <DataTable data={products} columns={productColumns} label="product" />

              {/* Removed hardcoded Variations and Attributes list views 
                  as they should be moved to their respective pages. */}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}