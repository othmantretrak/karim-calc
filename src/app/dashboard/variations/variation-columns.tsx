// FILE: app/dashboard/variations/variation-columns.tsx
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { IconDotsVertical } from "@tabler/icons-react"
import { DragHandle } from "@/components/data-table"

// Define the structure for a single, flattened variation row
interface FlatVariation {
    id: string;
    sku: string;
    price: number;
    image: string | null;
    createdAt: Date;
    productName: string;
    productSlug: string;
    attributeSummary: string;
}

export const variationColumns: ColumnDef<FlatVariation>[] = [
    {
        id: "drag",
        cell: ({ row }) => <DragHandle id={row.original.id} />,
        header: () => null,
        enableSorting: false,
        size: 30,
    },
    {
        accessorKey: "sku",
        header: "SKU",
        cell: ({ row }) => (
            <div className="font-mono text-xs font-medium">
                {row.original.sku}
            </div>
        ),
    },
    {
        accessorKey: "productName",
        header: "Product",
        cell: ({ row }) => (
            <div className="font-medium">
                {row.original.productName}
            </div>
        ),
    },
    {
        accessorKey: "attributeSummary",
        header: "Attributes",
        cell: ({ row }) => (
            <div className="text-muted-foreground text-sm">
                {row.original.attributeSummary || "N/A"}
            </div>
        ),
    },
    {
        accessorKey: "price",
        header: () => <div className="text-right">Price</div>,
        cell: ({ row }) => {
            const price = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }).format(row.original.price)
            return <div className="text-right font-medium">{price}</div>
        },
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }) => {
            const date = new Date(row.original.createdAt).toLocaleDateString()
            return <div className="text-sm text-muted-foreground">{date}</div>
        },
    },
    {
        id: "actions",
        header: () => <div className="text-right">Actions</div>,
        enableHiding: false,
        cell: () => (
            <div className="text-right">
                <button className="p-1">
                    <IconDotsVertical className="size-4" />
                </button>
            </div>
        ),
    },
];