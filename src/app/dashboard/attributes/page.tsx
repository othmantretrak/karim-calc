// FILE: app/dashboard/attributes/page.tsx

// Note: No need to import ColumnDef here, as it's handled in the columns file
import { AppSidebar } from "@/components/app-sidebar"
import { DataTable } from "@/components/data-table"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

import { getAllAttributes } from "../../actions/attributeActions"
// Import client columns
import { attributeColumns } from "./attribute-columns"

export default async function AttributesPage() {
    // 1. Fetch all attributes
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
                            <h2 className="text-xl font-bold mb-2 px-4 lg:px-6">Product Attributes</h2>
                            <DataTable data={attributes} columns={attributeColumns} label="attribute" />
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}