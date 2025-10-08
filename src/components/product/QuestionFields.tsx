// components/product/QuestionFields.tsx

import {
    AddOptionHandler,
    DeleteOptionHandler,
    StepFormData,
    UpdateOptionHandler,
    UpdateStepHandler
} from '@/app/types/productFormTypes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import { ConditionalLogicSelector } from './ConditionalLogicSelector';

interface QuestionFieldsProps {
    step: StepFormData
    questionNum: 1 | 2
    updateStep: UpdateStepHandler
    addOption: AddOptionHandler
    updateOption: UpdateOptionHandler
    deleteOption: DeleteOptionHandler
    allSteps: StepFormData[]
    index: number
}

export function QuestionFields({
    step,
    questionNum,
    updateStep,
    addOption,
    updateOption,
    deleteOption,
    allSteps,
    index,
}: QuestionFieldsProps) {
    // Determine which field keys to use based on questionNum
    const typeKey = `type${questionNum}` as keyof StepFormData
    const questionKey = `question${questionNum}` as keyof StepFormData
    const pricingImpactKey = `pricingImpact${questionNum}` as keyof StepFormData
    const unitKey = `unit${questionNum}` as keyof StepFormData
    const pricePerUnitKey = `pricePerUnit${questionNum}` as keyof StepFormData
    const minValueKey = `minValue${questionNum}` as keyof StepFormData
    const maxValueKey = `maxValue${questionNum}` as keyof StepFormData
    const defaultValueKey = `defaultValue${questionNum}` as keyof StepFormData

    const type = step[typeKey] as 'SELECT' | 'NUMBER' | null
    const pricingImpact = step[pricingImpactKey] as 'BASE' | 'MULTIPLIER' | 'ADDITIVE' | 'NONE'

    const handleUpdate = (key: keyof StepFormData, value: any) => {
        updateStep(step.tempId, { [key]: value })
    }

    // --- Conditional Rendering for Q2 initiation/removal ---
    if (questionNum === 2 && !step.type2) {
        return (
            <div className="p-4 border-2 border-dashed rounded-lg">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleUpdate('type2', 'SELECT')}
                    className="w-full"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Second Question (Optional)
                </Button>
            </div>
        )
    }

    if (!type) return null // Should not happen for Q1, handled above for Q2

    const currentOptions = step.options.filter(o => o.questionNum === questionNum)

    return (
        <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
            <div className="flex justify-between items-center">
                <h4 className="font-medium">Question {questionNum}</h4>
                {questionNum === 2 && (
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => updateStep(step.tempId, {
                            type2: null,
                            question2: null,
                            required2: false,
                            pricingImpact2: 'NONE',
                            pricePerUnit2: null,
                            unit2: null,
                            minValue2: null,
                            maxValue2: null,
                            defaultValue2: null,
                        })}
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                )}
            </div>

            {/* Type and Pricing Impact Selects */}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Question Type *</Label>
                    <Select
                        value={type}
                        onValueChange={(value: 'SELECT' | 'NUMBER') => handleUpdate(typeKey, value)}
                    >
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="SELECT">Dropdown Selection</SelectItem>
                            <SelectItem value="NUMBER">Number Input</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label>Pricing Impact *</Label>
                    <Select
                        value={pricingImpact}
                        onValueChange={(value: any) => handleUpdate(pricingImpactKey, value)}
                    >
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="BASE">Base Price (Options define the base)</SelectItem>
                            <SelectItem value="MULTIPLIER">Multiplier (Scales the total)</SelectItem>
                            <SelectItem value="ADDITIVE">Additive (Adds fixed cost)</SelectItem>
                            <SelectItem value="NONE">None</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Question Label */}
            <div className="space-y-2">
                <Label>Question *</Label>
                <Input
                    value={step[questionKey] || ''}
                    onChange={(e) => handleUpdate(questionKey, e.target.value)}
                    placeholder="e.g., Which service package?"
                    required
                />
            </div>

            {/* NUMBER Input Specific Fields */}
            {type === 'NUMBER' && (
                <>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Unit (optional)</Label>
                            <Input
                                value={step[unitKey] || ''}
                                onChange={(e) => handleUpdate(unitKey, e.target.value || null)}
                                placeholder="e.g., m², meters"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Default Value</Label>
                            <Input
                                type="number"
                                value={step[defaultValueKey] || ''}
                                onChange={(e) => handleUpdate(defaultValueKey, parseFloat(e.target.value) || null)}
                                placeholder="1"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Min Value</Label>
                            <Input
                                type="number"
                                value={step[minValueKey] || ''}
                                onChange={(e) => handleUpdate(minValueKey, parseFloat(e.target.value) || null)}
                                placeholder="1"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Max Value</Label>
                            <Input
                                type="number"
                                value={step[maxValueKey] || ''}
                                onChange={(e) => handleUpdate(maxValueKey, parseFloat(e.target.value) || null)}
                                placeholder="Optional"
                            />
                        </div>
                    </div>
                </>
            )}

            {/* ADDITIVE Pricing Field */}
            {pricingImpact === 'ADDITIVE' && (
                <div className="space-y-2">
                    <Label>Price Per Unit *</Label>
                    <Input
                        type="number"
                        step="0.01"
                        value={step[pricePerUnitKey] || ''}
                        onChange={(e) => handleUpdate(pricePerUnitKey, parseFloat(e.target.value) || null)}
                        placeholder="e.g., 50.00"
                        required
                    />
                </div>
            )}

            {/* SELECT Options Field */}
            {type === 'SELECT' && (
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <Label>Options</Label>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => addOption(step.tempId, questionNum)}
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Option
                        </Button>
                    </div>

                    {currentOptions.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No options added yet.</p>
                    ) : (
                        <div className="space-y-3">
                            {currentOptions.map((option) => (
                                <div key={option.tempId} className="p-3 border rounded-lg bg-white space-y-2">
                                    <div className="flex gap-2 items-start">
                                        <div className="flex-1">
                                            <Label className="text-xs text-muted-foreground mb-1">Label *</Label>
                                            <Input
                                                value={option.label}
                                                onChange={(e) => updateOption(step.tempId, option.tempId, {
                                                    label: e.target.value,
                                                    value: e.target.value.toLowerCase().replace(/\s+/g, '-')
                                                })}
                                                placeholder="Option label"
                                                required
                                            />
                                        </div>
                                        {pricingImpact === 'BASE' && (
                                            <div className="w-32">
                                                <Label className="text-xs text-muted-foreground mb-1">Price</Label>
                                                <Input
                                                    type="number"
                                                    step="0.01"
                                                    value={option.price || ''}
                                                    onChange={(e) => updateOption(step.tempId, option.tempId, {
                                                        price: parseFloat(e.target.value) || null
                                                    })}
                                                    placeholder="0.00"
                                                />
                                            </div>
                                        )}
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => deleteOption(step.tempId, option.tempId)}
                                            className="mt-5"
                                        >
                                            <Trash2 className="w-4 h-4 text-destructive" />
                                        </Button>
                                    </div>

                                    {/* Image URL Input */}
                                    <div className="space-y-1">
                                        <Label className="text-xs text-muted-foreground flex items-center gap-1">
                                            <ImageIcon className="w-3 h-3" />
                                            Image URL (Optional)
                                        </Label>
                                        <Input
                                            value={option.imageUrl || ''}
                                            onChange={(e) => updateOption(step.tempId, option.tempId, {
                                                imageUrl: e.target.value || null
                                            })}
                                            placeholder="https://example.com/image.jpg"
                                            className="text-sm"
                                        />
                                        {option.imageUrl && (
                                            <div className="mt-2">
                                                <img
                                                    src={option.imageUrl}
                                                    alt={option.label}
                                                    className="w-20 h-20 object-cover rounded border"
                                                    onError={(e) => {
                                                        e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="80" height="80"%3E%3Crect width="80" height="80" fill="%23ddd"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23999"%3ENo Image%3C/text%3E%3C/svg%3E'
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Conditional Logic Selector for this question */}
            <ConditionalLogicSelector
                step={step}
                questionNum={questionNum}
                allSteps={allSteps}
                index={index}
                updateStep={updateStep}
            />
        </div>
    )
}