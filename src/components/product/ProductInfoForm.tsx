// components/product/ProductInfoForm.tsx

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface ProductInfoFormProps {
    productName: string
    setProductName: (name: string) => void
    productSlug: string
    setProductSlug: (slug: string) => void
    setIsSlugManuallyEdited: (isEdited: boolean) => void
    productDescription: string
    setProductDescription: (desc: string) => void
}

export function ProductInfoForm({
    productName,
    setProductName,
    productSlug,
    setProductSlug,
    setIsSlugManuallyEdited,
    productDescription,
    setProductDescription,
}: ProductInfoFormProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Product Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Product Name *</Label>
                    <Input
                        id="name"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        placeholder="e.g., Parquet Renovation"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="slug">Slug (URL-friendly) - Auto-generated</Label>
                    <Input
                        id="slug"
                        value={productSlug}
                        onChange={(e) => {
                            setProductSlug(e.target.value)
                            setIsSlugManuallyEdited(true)
                        }}
                        placeholder="e.g., parquet-renovation"
                    />
                    <p className="text-xs text-muted-foreground">
                        Auto-generated from product name. You can edit it manually if needed.
                    </p>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                        placeholder="Brief description"
                        rows={3}
                    />
                </div>
            </CardContent>
        </Card>
    )
}