// ProductFormBuilder.tsx (Refactored)

'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

// Component imports
import { ProductInfoForm } from '@/components/product/ProductInfoForm'
import { FormStepEditor } from '@/components/product/FormStepEditor'
import { StepFormData, OptionData } from '@/app/types/productFormTypes'

// Action imports
import { createProduct, updateProduct } from '@/app/actions/productActions'

interface ProductFormBuilderProps {
    initialData?: any
    isEdit?: boolean
}

export default function ProductFormBuilder({ initialData, isEdit = false }: ProductFormBuilderProps) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [productName, setProductName] = useState(initialData?.name || '')
    const [productSlug, setProductSlug] = useState(initialData?.slug || '')
    const [productDescription, setProductDescription] = useState(initialData?.description || '')
    const [steps, setSteps] = useState<StepFormData[]>(initialData?.steps || [])
    const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(!!initialData?.slug)

    // Auto-generate slug from product name
    useEffect(() => {
        if (!isSlugManuallyEdited && productName) {
            const autoSlug = productName
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '')
            setProductSlug(autoSlug)
        }
    }, [productName, isSlugManuallyEdited])

    // --- STEP MANAGEMENT HANDLERS ---

    const addStep = () => {
        const newStep: StepFormData = {
            tempId: `step-${Date.now()}`,
            order: steps.length,
            type1: 'SELECT',
            question1: '',
            required1: true,
            pricingImpact1: 'NONE',
            pricePerUnit1: null,
            unit1: null,
            minValue1: null,
            maxValue1: null,
            defaultValue1: null,
            type2: null,
            question2: null,
            required2: false,
            pricingImpact2: 'NONE',
            pricePerUnit2: null,
            unit2: null,
            minValue2: null,
            maxValue2: null,
            defaultValue2: null,
            conditionalOn: null,
            options: [],
        }
        setSteps([...steps, newStep])
    }

    const updateStep = (tempId: string, updates: Partial<StepFormData>) => {
        setSteps(steps.map(step =>
            step.tempId === tempId ? { ...step, ...updates } : step
        ))
    }

    const deleteStep = (tempId: string) => {
        setSteps(steps.filter(step => step.tempId !== tempId).map((step, index) => ({
            ...step,
            order: index
        })))
    }

    const moveStep = (tempId: string, direction: 'up' | 'down') => {
        const index = steps.findIndex(s => s.tempId === tempId)
        if ((direction === 'up' && index === 0) || (direction === 'down' && index === steps.length - 1)) return

        const newSteps = [...steps]
        const targetIndex = direction === 'up' ? index - 1 : index + 1
            ;[newSteps[index], newSteps[targetIndex]] = [newSteps[targetIndex], newSteps[index]]
        setSteps(newSteps.map((step, idx) => ({ ...step, order: idx })))
    }

    // --- OPTION MANAGEMENT HANDLERS ---

    const addOption = (stepTempId: string, questionNum: number) => {
        setSteps(steps.map(step => {
            if (step.tempId === stepTempId) {
                const newOption: OptionData = {
                    tempId: `option-${Date.now()}-${Math.random()}`,
                    questionNum,
                    label: '',
                    value: '',
                    price: null,
                    order: step.options.filter(o => o.questionNum === questionNum).length,
                }
                return { ...step, options: [...step.options, newOption] }
            }
            return step
        }))
    }

    const updateOption = (stepTempId: string, optionTempId: string, updates: Partial<OptionData>) => {
        setSteps(steps.map(step => {
            if (step.tempId === stepTempId) {
                return {
                    ...step,
                    options: step.options.map(opt =>
                        opt.tempId === optionTempId ? { ...opt, ...updates } : opt
                    )
                }
            }
            return step
        }))
    }

    const deleteOption = (stepTempId: string, optionTempId: string) => {
        setSteps(steps.map(step => {
            if (step.tempId === stepTempId) {
                return {
                    ...step,
                    options: step.options.filter(opt => opt.tempId !== optionTempId)
                }
            }
            return step
        }))
    }

    // --- SUBMISSION LOGIC ---

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const slug = productSlug || productName.toLowerCase().replace(/\s+/g, '-')

            // Prepare data for submission
            const data = {
                name: productName,
                slug,
                description: productDescription,
                steps: steps.map(({ tempId, options, conditionalOn, ...step }) => {

                    // Map conditionalOn stepId from tempId back to the real ID (if editing existing steps)
                    // If it's a new step referencing another new step, the tempId will be used for mapping in the action.
                    let processedConditionalOn = conditionalOn;

                    if (conditionalOn && conditionalOn.stepId) {
                        const originalStep = initialData?.steps?.find((s: StepFormData) => s.tempId === conditionalOn.stepId);

                        if (originalStep && originalStep.id) {
                            // If we are referencing an existing step, use its actual ID
                            processedConditionalOn = {
                                ...conditionalOn,
                                stepId: originalStep.id
                            };
                        }
                    }

                    return {
                        ...step,
                        tempId, // Keep tempId for conditional logic mapping in server action
                        conditionalOn: processedConditionalOn,
                        options: options.map(({ tempId, ...option }) => option)
                    }
                })
            }

            const result = isEdit && initialData?.id
                ? await updateProduct(initialData.id, data)
                : await createProduct(data)

            if (result.success) {
                toast.success(`Product ${isEdit ? 'updated' : 'created'} successfully!`)
                router.push(`/products/${result.slug}`)
            } else {
                toast.error(result.error || "Failed to save product")
            }
        } catch (error) {
            console.error(error)
            toast.error("An error occurred while saving the product")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* 1. Product Information */}
            <ProductInfoForm
                productName={productName}
                setProductName={setProductName}
                productSlug={productSlug}
                setProductSlug={setProductSlug}
                setIsSlugManuallyEdited={setIsSlugManuallyEdited}
                productDescription={productDescription}
                setProductDescription={setProductDescription}
            />

            {/* 2. Form Steps Builder */}
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Form Steps (Each step can have 1-2 questions)</CardTitle>
                        <Button type="button" onClick={addStep} size="sm">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Step
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    {steps.length === 0 ? (
                        <p className="text-muted-foreground text-center py-8">
                            No steps added yet. Click &quot;Add Step&quot; to create your first form step.
                        </p>
                    ) : (
                        steps.map((step, index) => (
                            <FormStepEditor
                                key={step.tempId}
                                step={step}
                                index={index}
                                totalSteps={steps.length}
                                allSteps={steps} // Pass all steps for conditional logic options
                                updateStep={updateStep}
                                deleteStep={deleteStep}
                                moveStep={moveStep}
                                addOption={addOption}
                                updateOption={updateOption}
                                deleteOption={deleteOption}
                            />
                        ))
                    )}
                </CardContent>
            </Card>

            {/* 3. Submission Footer */}
            <div className="flex justify-end gap-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    disabled={isSubmitting}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    className="bg-green-700 hover:bg-green-800"
                    disabled={isSubmitting}
                >
                    {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    {isSubmitting ? 'Saving...' : isEdit ? 'Update Product' : 'Save Product'}
                </Button>
            </div>
        </form>
    )
}