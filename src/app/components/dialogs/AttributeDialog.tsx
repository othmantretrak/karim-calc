
'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { X, Plus } from 'lucide-react'
import { createAttribute } from '@/app/actions/attributeActions'
import { toast } from 'sonner'

function AttributeDialog({ }) {

    const [isPending, startTransition] = useTransition()
    const [isModalOpen, setIsModalOpen] = useState(false)

    // Attribute form state
    const [attributeName, setAttributeName] = useState('')
    const [attributeValues, setAttributeValues] = useState<string[]>([''])

    // Add new value input
    const addValueInput = () => {
        setAttributeValues(prev => [...prev, ''])
    }

    // Remove value input
    const removeValueInput = (index: number) => {
        if (attributeValues.length > 1) {
            setAttributeValues(prev => prev.filter((_, i) => i !== index))
        }
    }

    // Update value at index
    const updateValue = (index: number, value: string) => {
        setAttributeValues(prev => prev.map((v, i) => i === index ? value : v))
    }

    // Reset form
    const resetForm = () => {
        setAttributeName('')
        setAttributeValues([''])
    }

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!attributeName.trim()) {
            toast.error('Please enter an attribute name')
            return
        }

        const validValues = attributeValues.filter(v => v.trim() !== '')
        if (validValues.length === 0) {
            toast.error('Please enter at least one attribute value')
            return
        }

        startTransition(async () => {
            try {
                await createAttribute({
                    name: attributeName.trim(),
                    values: validValues.map(v => v.trim())
                })

                toast.success('Attribute created successfully!')
                setIsModalOpen(false)
                resetForm()
                // The page will automatically revalidate due to server action
            } catch (error) {
                toast.error('Failed to create attribute')
                console.error(error)
            }
        })
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    Create Attribute
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Create New Attribute</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="attributeName">Attribute Name *</Label>
                        <Input
                            id="attributeName"
                            value={attributeName}
                            onChange={(e) => setAttributeName(e.target.value)}
                            placeholder="e.g., Color, Size, Material"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Attribute Values *</Label>
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                            {attributeValues.map((value, index) => (
                                <div key={index} className="flex gap-2">
                                    <Input
                                        value={value}
                                        onChange={(e) => updateValue(index, e.target.value)}
                                        placeholder={`Value ${index + 1}`}
                                        className="flex-1"
                                    />
                                    {attributeValues.length > 1 && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => removeValueInput(index)}
                                        >
                                            <X className="w-4 h-4" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={addValueInput}
                            className="w-full"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Value
                        </Button>
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            disabled={isPending}
                        >
                            {isPending ? 'Creating...' : 'Create Attribute'}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default AttributeDialog