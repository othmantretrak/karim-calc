"use client"

import { ColumnDef } from "@tanstack/react-table"
import { IconDotsVertical, IconListDetails } from "@tabler/icons-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { deleteProduct } from "../actions/productActions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";


// Define the expected structure for table data based on getAllProducts return
export interface ProductTableData {
    id: string;
    name: string;
    slug: string;
    basePrice: number;
    createdAt: Date;
    variations: Array<any>; // Simplified type for display
}

const DeleteProductDialog = ({ productId, open, setOpen }: { productId: string, open: boolean, setOpen: (v: boolean) => void }) => {
    const router = useRouter()
    const [isDeleting, setIsDeleting] = useState(false)
    const handleDeleteProduct = async () => {
        setIsDeleting(true)
        try {
            await deleteProduct(productId)
            toast.success('Product deleted successfully!')
            setOpen(false)
            router.push('/dashboard')
        } catch (error) {
            toast.error('Failed to delete product')
            console.error(error)
            setIsDeleting(false)
        }
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Product</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this product? This action cannot be undone and will delete all variations.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    </DialogClose>
                    <Button
                        onClick={handleDeleteProduct}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        disabled={isDeleting}
                    >
                        {isDeleting ? 'Deleting...' : 'Delete Product'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export const productColumns: ColumnDef<ProductTableData>[] = [
    {
        accessorKey: "name",
        header: "Product Name",
        cell: ({ row }) => (
            <div className="font-medium">
                {row.original.name}
            </div>
        ),
    },
    {
        accessorKey: "slug",
        header: "Slug",
        cell: ({ row }) => (
            <div className="text-muted-foreground">
                /{row.original.slug}
            </div>
        ),
    },
    {
        accessorKey: "basePrice",
        header: "Base Price",
        cell: ({ row }) => {
            const price = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }).format(row.original.basePrice)
            return <div className="text-right font-medium">{price}</div>
        },
    },
    {
        accessorKey: "variations",
        header: "Variations",
        cell: ({ row }) => (
            <div className="flex items-center gap-1">
                <IconListDetails className="size-4 text-muted-foreground" />
                {row.original.variations.length}
            </div>
        ),
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }) => {
            const date = row.original.createdAt.toLocaleDateString()
            return <div>{date}</div>
        },
    },
    {
        id: "actions",
        header: () => <div className="text-right">Actions</div>,
        enableHiding: false,
        cell: (props) => <ActionsCell {...props} />,
    },

]

// Actions cell component for product row
function ActionsCell({ row }: { row: any }) {
    const [deleteOpen, setDeleteOpen] = useState(false);
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
                        size="icon"
                    >
                        <IconDotsVertical />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-32">
                    <DropdownMenuItem>
                        <Link href={`/dashboard/products/edit/${row.original.id}`} className="flex items-center">
                            Edit
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive" onClick={() => setDeleteOpen(true)} className="text-white">
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <DeleteProductDialog productId={row.original.id} open={deleteOpen} setOpen={setDeleteOpen} />
        </>
    );
}

