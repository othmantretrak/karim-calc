'use client'

import { useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { Trash2, Save, ArrowLeft } from 'lucide-react'
import { updateProduct, deleteProduct, deleteVariation } from '@/app/actions/productActions'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Product {
    id: string
    name: string
    slug: string
    description?: string
    basePrice: number
    baseImage?: string
    variations: Array<{
        id: string
        sku: string
        price: number
        image?: string
        attributes: Array<{
            id: string
            value: string
            attribute: {
                id: string
                name: string
            }
        }>
    }>
    attributes: Array<{
        attribute: {
            id: string
            name: string
            values: Array<{
                id: string
                value: string
            }>
        }
    }>
}

interface EditProductFormProps {
    product: Product
}

export default function EditProductForm({ product: initialProduct }: EditProductFormProps) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [isDeleting, setIsDeleting] = useState(false)

    // Product form state
    const [productData, setProductData] = useState({
        name: initialProduct.name,
        slug: initialProduct.slug,
        description: initialProduct.description || '',
        basePrice: initialProduct.basePrice,
        baseImage: initialProduct.baseImage || ''
    })

    // Variations state
    const [variations, setVariations] = useState(initialProduct.variations)

    // Handle product data changes
    const handleProductChange = (field: string, value: string | number) => {
        setProductData(prev => ({ ...prev, [field]: value }))

        // Auto-generate slug from name
        if (field === 'name') {
            const slug = value.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
            setProductData(prev => ({ ...prev, slug }))
        }
    }

    // Handle variation change
    const handleVariationChange = (variationId: string, field: string, value: string | number) => {
        setVariations(prev => prev.map(v =>
            v.id === variationId ? { ...v, [field]: value } : v
        ))
    }

    // Handle variation deletion
    const handleDeleteVariation = async (variationId: string) => {
        if (variations.length <= 1) {
            toast.error('Cannot delete the last variation. Products must have at least one variation.')
            return
        }

        startTransition(async () => {
            try {
                await deleteVariation(variationId)
                setVariations(prev => prev.filter(v => v.id !== variationId))
                toast.success('Variation deleted successfully!')
            } catch (error) {
                toast.error('Failed to delete variation')
                console.error(error)
            }
        })
    }

    // Handle product deletion
    const handleDeleteProduct = async () => {
        setIsDeleting(true)
        try {
            await deleteProduct(initialProduct.id)
            toast.success('Product deleted successfully!')
            router.push('/dashboard')
        } catch (error) {
            toast.error('Failed to delete product')
            console.error(error)
            setIsDeleting(false)
        }
    }

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!productData.name || !productData.slug) {
            toast.error('Please fill in product name and slug')
            return
        }

        // Validate all variations have SKU and price
        const invalidVariations = variations.filter(v => !v.sku || v.price <= 0)
        if (invalidVariations.length > 0) {
            toast.error('All variations must have a valid SKU and price')
            return
        }

        startTransition(async () => {
            try {
                await updateProduct(initialProduct.id, {
                    product: productData,
                    variations: variations
                })

                toast.success('Product updated successfully!')
                router.push('/dashboard')
            } catch (error) {
                toast.error('Failed to update product')
                console.error(error)
            }
        })
    }

    return (
        <div className="container mx-auto py-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard">
                            <Button variant="outline" size="sm">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Products
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Edit Product</h1>
                            <p className="text-muted-foreground">
                                Update product information and manage variations
                            </p>
                        </div>
                    </div>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="destructive" size="sm">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete Product
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Delete Product</DialogTitle>
                                <DialogDescription>
                                    Are you sure you want to delete &quot;{initialProduct.name}&quot;? This action cannot be undone and will delete all variations.
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <DialogClose>Cancel</DialogClose>
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
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Product Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Product Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Product Name *</Label>
                                    <Input
                                        id="name"
                                        value={productData.name}
                                        onChange={(e) => handleProductChange('name', e.target.value)}
                                        placeholder="Enter product name"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="slug">Slug *</Label>
                                    <Input
                                        id="slug"
                                        value={productData.slug}
                                        onChange={(e) => handleProductChange('slug', e.target.value)}
                                        placeholder="product-slug"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={productData.description}
                                    onChange={(e) => handleProductChange('description', e.target.value)}
                                    placeholder="Enter product description"
                                    rows={3}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="basePrice">Base Price</Label>
                                    <Input
                                        id="basePrice"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        value={productData.basePrice}
                                        onChange={(e) => handleProductChange('basePrice', parseFloat(e.target.value) || 0)}
                                        placeholder="0.00"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="baseImage">Base Image URL</Label>
                                    <Input
                                        id="baseImage"
                                        value={productData.baseImage}
                                        onChange={(e) => handleProductChange('baseImage', e.target.value)}
                                        placeholder="https://example.com/image.jpg"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Product Attributes Display */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Product Attributes</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {initialProduct.attributes.map(({ attribute }) => (
                                    <Badge key={attribute.id} variant="secondary">
                                        {attribute.name}: {attribute.values.map(v => v.value).join(', ')}
                                    </Badge>
                                ))}
                            </div>
                            <p className="text-sm text-muted-foreground mt-2">
                                Product attributes cannot be changed during editing. Create a new product to change attributes.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Variations */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Variations ({variations.length})</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {variations.map((variation, index) => (
                                    <div key={variation.id} className="border rounded-lg p-6 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex flex-wrap gap-2">
                                                {variation.attributes.map((attr) => (
                                                    <Badge key={attr.id} variant="outline">
                                                        {attr.attribute.name}: {attr.value}
                                                    </Badge>
                                                ))}
                                            </div>

                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        disabled={variations.length <= 1}
                                                        className="text-destructive hover:text-destructive"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Delete Variation</DialogTitle>
                                                        <DialogDescription>
                                                            Are you sure you want to delete this variation? This action cannot be undone.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <DialogFooter>
                                                        <DialogClose>Cancel</DialogClose>
                                                        <Button
                                                            onClick={() => handleDeleteVariation(variation.id)}
                                                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                        >
                                                            Delete Variation
                                                        </Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor={`sku-${variation.id}`}>SKU *</Label>
                                                <Input
                                                    id={`sku-${variation.id}`}
                                                    value={variation.sku}
                                                    onChange={(e) => handleVariationChange(variation.id, 'sku', e.target.value)}
                                                    placeholder="SKU-001"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor={`price-${variation.id}`}>Price *</Label>
                                                <Input
                                                    id={`price-${variation.id}`}
                                                    type="number"
                                                    step="0.01"
                                                    min="0"
                                                    value={variation.price}
                                                    onChange={(e) => handleVariationChange(variation.id, 'price', parseFloat(e.target.value) || 0)}
                                                    placeholder="0.00"
                                                    required
                                                />
                                            </div>

                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor={`image-${variation.id}`}>Image URL (Optional)</Label>
                                            <Input
                                                id={`image-${variation.id}`}
                                                value={variation.image || ''}
                                                onChange={(e) => handleVariationChange(variation.id, 'image', e.target.value)}
                                                placeholder="https://example.com/variation-image.jpg"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Submit Button */}
                    <div className="flex justify-end gap-4">
                        <Link href="/dashboard">
                            <Button variant="outline" type="button">
                                Cancel
                            </Button>
                        </Link>
                        <Button
                            type="submit"
                            disabled={isPending}
                            className="min-w-[120px]"
                        >
                            <Save className="w-4 h-4 mr-2" />
                            {isPending ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}