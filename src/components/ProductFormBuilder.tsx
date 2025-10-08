// ProductFormBuilder.tsx (Refactored with Image Support)

'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core'
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

// Component imports
import { ProductInfoForm } from '@/components/product/ProductInfoForm'
import { FormStepEditor } from '@/components/product/FormStepEditor'
import { StepFormData, QuestionFormData, OptionData } from '@/app/types/productFormTypes'

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

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

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

    // --- STEP, QUESTION, AND OPTION MANAGEMENT ---

    // Step Handlers
    const addStep = () => {
        const newQuestion: QuestionFormData = {
            tempId: `question-${Date.now()}`,
            order: 0,
            type: 'SELECT',
            question: '',
            required: true,
            pricingImpact: 'NONE',
            pricePerUnit: null,
            unit: null,
            minValue: null,
            maxValue: null,
            defaultValue: null,
            conditionalOn: null,
            options: [],
        };
        const newStep: StepFormData = {
            tempId: `step-${Date.now()}`,
            order: steps.length,
            questions: [newQuestion],
        };
        setSteps([...steps, newStep]);
    };

    const updateStep = (tempId: string, updates: Partial<StepFormData>) => {
        setSteps(steps.map(step =>
            step.tempId === tempId ? { ...step, ...updates } : step
        ));
    };

    const deleteStep = (tempId: string) => {
        setSteps(steps.filter(step => step.tempId !== tempId).map((step, index) => ({
            ...step,
            order: index,
        })));
    };

    const moveStep = (tempId: string, direction: 'up' | 'down') => {
        const index = steps.findIndex(s => s.tempId === tempId);
        if ((direction === 'up' && index === 0) || (direction === 'down' && index === steps.length - 1)) return;

        const newSteps = [...steps];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        [newSteps[index], newSteps[targetIndex]] = [newSteps[targetIndex], newSteps[index]];
        setSteps(newSteps.map((step, idx) => ({ ...step, order: idx })));
    };

    // Question Handlers
    const addQuestion = (stepTempId: string) => {
        setSteps(steps.map(step => {
            if (step.tempId === stepTempId) {
                const newQuestion: QuestionFormData = {
                    tempId: `question-${Date.now()}`,
                    order: step.questions.length,
                    type: 'SELECT',
                    question: '',
                    required: true,
                    pricingImpact: 'NONE',
                    pricePerUnit: null,
                    unit: null,
                    minValue: null,
                    maxValue: null,
                    defaultValue: null,
                    conditionalOn: null,
                    options: [],
                };
                return { ...step, questions: [...step.questions, newQuestion] };
            }
            return step;
        }));
    };

    const updateQuestion = (stepTempId: string, questionTempId: string, updates: Partial<QuestionFormData>) => {
        setSteps(steps.map(step => {
            if (step.tempId === stepTempId) {
                return {
                    ...step,
                    questions: step.questions.map(q =>
                        q.tempId === questionTempId ? { ...q, ...updates } : q
                    ),
                };
            }
            return step;
        }));
    };

    const deleteQuestion = (stepTempId: string, questionTempId: string) => {
        setSteps(steps.map(step => {
            if (step.tempId === stepTempId) {
                return {
                    ...step,
                    questions: step.questions.filter(q => q.tempId !== questionTempId).map((q, index) => ({ ...q, order: index })),
                };
            }
            return step;
        }));
    };

    // Option Handlers
    const addOption = (stepTempId: string, questionTempId: string) => {
        setSteps(steps.map(step => {
            if (step.tempId === stepTempId) {
                const newQuestions = step.questions.map(q => {
                    if (q.tempId === questionTempId) {
                        const newOption: OptionData = {
                            tempId: `option-${Date.now()}-${Math.random()}`,
                            label: '',
                            value: '',
                            price: null,
                            imageUrl: null,
                            order: q.options.length,
                        };
                        return { ...q, options: [...q.options, newOption] };
                    }
                    return q;
                });
                return { ...step, questions: newQuestions };
            }
            return step;
        }));
    };

    const updateOption = (stepTempId: string, questionTempId: string, optionTempId: string, updates: Partial<OptionData>) => {
        setSteps(steps.map(step => {
            if (step.tempId === stepTempId) {
                return {
                    ...step,
                    questions: step.questions.map(q => {
                        if (q.tempId === questionTempId) {
                            return {
                                ...q,
                                options: q.options.map(opt =>
                                    opt.tempId === optionTempId ? { ...opt, ...updates } : opt
                                ),
                            };
                        }
                        return q;
                    }),
                };
            }
            return step;
        }));
    };

    const deleteOption = (stepTempId: string, questionTempId: string, optionTempId: string) => {
        setSteps(steps.map(step => {
            if (step.tempId === stepTempId) {
                return {
                    ...step,
                    questions: step.questions.map(q => {
                        if (q.tempId === questionTempId) {
                            return {
                                ...q,
                                options: q.options.filter(opt => opt.tempId !== optionTempId),
                            };
                        }
                        return q;
                    }),
                };
            }
            return step;
        }));
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            setSteps((currentSteps) => {
                const oldIndex = currentSteps.findIndex(s => s.tempId === active.id);
                const newIndex = currentSteps.findIndex(s => s.tempId === over.id);

                const newOrder = arrayMove(currentSteps, oldIndex, newIndex);
                return newOrder.map((step, index) => ({ ...step, order: index }));
            });
        }
    };

    // --- SUBMISSION LOGIC ---

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const slug = productSlug || productName.toLowerCase().replace(/\s+/g, '-');

            // In a real scenario, you'd need a robust way to map temp question IDs to real DB IDs
            // For this refactoring, we'll assume the server action can handle temp IDs or they are already mapped
            const data = {
                name: productName,
                slug,
                description: productDescription,
                steps: steps.map(({ tempId: stepTempId, ...s }) => ({
                    ...s,
                    tempId: stepTempId, // Pass tempId for server-side mapping
                    questions: s.questions.map(({ tempId: questionTempId, options, ...q }) => ({
                        ...q,
                        tempId: questionTempId, // Pass tempId for server-side mapping
                        options: options.map(({ tempId, ...o }) => o), // Correctly strip tempId from options
                    })),
                })),
            };

            const result = isEdit && initialData?.id
                ? await updateProduct(initialData.id, data)
                : await createProduct(data);

            if (result.success) {
                toast.success(`Product ${isEdit ? 'updated' : 'created'} successfully!`);
                router.push(`/dashboard`);
            } else {
                toast.error(result.error || "Failed to save product");
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while saving the product");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* 3. Submission Header */}
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
                        <CardTitle>Form Steps</CardTitle>
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
                        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                            <SortableContext items={steps.map(s => s.tempId)} strategy={verticalListSortingStrategy}>
                                {steps.map((step, index) => (
                                    <FormStepEditor
                                        key={step.tempId}
                                        step={step}
                                        index={index}
                                        totalSteps={steps.length}
                                        allSteps={steps} // Pass all steps for conditional logic options
                                        updateStep={updateStep}
                                        deleteStep={deleteStep}
                                        moveStep={moveStep}
                                        addQuestion={addQuestion}
                                        updateQuestion={updateQuestion}
                                        deleteQuestion={deleteQuestion}
                                        addOption={addOption}
                                        updateOption={updateOption}
                                        deleteOption={deleteOption}
                                    />
                                ))}
                            </SortableContext>
                        </DndContext>
                    )}
                    <div className="flex justify-end items-center pt-4 border-t">
                        <Button type="button" onClick={addStep} size="sm">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Step
                        </Button>
                    </div>
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