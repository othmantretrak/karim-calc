"use client"
import { ColumnDef } from "@tanstack/react-table"
import { IconDotsVertical, IconListCheck } from "@tabler/icons-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
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
    createdAt: Date;
    steps: Array<{ id: string }>; // Array of steps (we only need the count)
}
const DeleteProductDialog = ({ productId, open, setOpen }: { productId: string, open: boolean, setOpen: (v: boolean) => void }) => {
    const router = useRouter()
    const [isDeleting, setIsDeleting] = useState(false)
    const handleDeleteProduct = async () => {
        setIsDeleting(true)
        try {
            const result = await deleteProduct(productId)
            if (result.success) {
                toast.success('Product deleted successfully!')
                setOpen(false)
                router.refresh() // Refresh data table
            } else {
                toast.error(result.error || 'Failed to delete product')
            }
        } catch (error) {
            toast.error('An unexpected error occurred during deletion')
            console.error(error)
        } finally {
            setIsDeleting(false)
        }
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Product</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this product? This action cannot be undone and will delete all associated form steps and options.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline" onClick={() => setOpen(false)} disabled={isDeleting}>Cancel</Button>
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
        accessorKey: "steps",
        header: "Form Steps",
        cell: ({ row }) => (
            <div className="flex items-center gap-1">
                <IconListCheck className="size-4 text-muted-foreground" />
                {row.original.steps?.length || 0}
            </div>
        ),
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }) => {
            const date = row.original.createdAt ? new Date(row.original.createdAt).toLocaleDateString() : 'N/A'
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
function ActionsCell({ row }: { row: { original: ProductTableData } }) {
    const [deleteOpen, setDeleteOpen] = useState(false);
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild className="justify-self-end">
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
                    <DropdownMenuItem asChild>
                        <Link href={`/dashboard/products/edit/${row.original.id}`} className="flex items-center">
                            Edit
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={() => setDeleteOpen(true)}
                        className="text-red-600 focus:text-red-600 focus:bg-red-50"
                    >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <DeleteProductDialog productId={row.original.id} open={deleteOpen} setOpen={setDeleteOpen} />
        </>
    );
}