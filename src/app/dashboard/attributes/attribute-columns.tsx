// FILE: app/dashboard/attributes/attribute-columns.tsx
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { IconDotsVertical, IconTag } from "@tabler/icons-react"
import { DragHandle } from "@/components/data-table" // Assuming DragHandle is exported
import { Badge } from "@/components/ui/badge"

// Define the expected structure for table data
interface AttributeTableData {
    id: string;
    name: string;
    createdAt: Date;
    values: Array<{ id: string; value: string }>;
}

export const attributeColumns: ColumnDef<AttributeTableData>[] = [
    {
        id: "drag",
        cell: ({ row }) => <DragHandle id={row.original.id} />,
        header: () => null,
        enableSorting: false,
        size: 30,
    },
    {
        accessorKey: "name",
        header: "Attribute Name",
        cell: ({ row }) => (
            <div className="flex items-center gap-2 font-medium">
                <IconTag className="size-4 text-primary" />
                {row.original.name}
            </div>
        ),
    },
    {
        accessorKey: "values",
        header: "Values",
        cell: ({ row }) => {
            const values = row.original.values;
            const displayValues = values.slice(0, 3);
            const remainingCount = values.length - 3;

            return (
                <div className="flex flex-wrap gap-2">
                    {displayValues.map((val) => (
                        <Badge key={val.id} variant="secondary">
                            {val.value}
                        </Badge>
                    ))}
                    {remainingCount > 0 && (
                        <Badge variant="outline" className="opacity-70">
                            +{remainingCount} more
                        </Badge>
                    )}
                </div>
            )
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