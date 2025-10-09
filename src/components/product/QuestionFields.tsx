// components/product/QuestionFields.tsx

import {
    DeleteOptionHandler,
    StepFormData,
    QuestionFormData,
    UpdateOptionHandler,
    UpdateQuestionHandler,
    DeleteQuestionHandler,
} from '@/app/types/productFormTypes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import { AddOptionHandler } from '@/app/types/productFormTypes';
import { ConditionalLogicSelector } from './ConditionalLogicSelector';
import { uploadToCloudinary } from '@/app/utils/cloudinary';

interface QuestionFieldsProps {
    step: StepFormData;
    question: QuestionFormData;
    questionNum: number;
    deleteQuestion: DeleteQuestionHandler;
    updateQuestion: UpdateQuestionHandler;
    addOption: AddOptionHandler;
    updateOption: UpdateOptionHandler;
    deleteOption: DeleteOptionHandler;
    allSteps: StepFormData[];
    index: number;
}

export function QuestionFields({
    step,
    question,
    questionNum,
    updateQuestion,
    deleteQuestion,
    addOption,
    updateOption,
    deleteOption,
    allSteps,
    index,
}: QuestionFieldsProps) {
    const { type, pricingImpact, options } = question;

    const handleUpdate = (updates: Partial<QuestionFormData>) => {
        updateQuestion(step.tempId, question.tempId, updates);
    };

    return (
        <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
            <div className="flex justify-between items-center">
                <h4 className="font-medium">Question {questionNum}</h4>
                {step.questions.length > 1 && (
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteQuestion(step.tempId, question.tempId)}
                    >
                        <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                )}
            </div>

            {/* Type and Pricing Impact Selects */}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Question Type *</Label>
                    <Select
                        value={type}
                        onValueChange={(value: 'SELECT' | 'NUMBER' | 'CHECKBOX') => handleUpdate({ type: value })}
                    >
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="SELECT">Dropdown Selection</SelectItem>
                            <SelectItem value="NUMBER">Number Input</SelectItem>
                            <SelectItem value="CHECKBOX">Checkbox</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label>Pricing Impact *</Label>
                    <Select
                        value={pricingImpact}
                        onValueChange={(value: any) => handleUpdate({ pricingImpact: value })}
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
                    value={question.question || ''}
                    onChange={(e) => handleUpdate({ question: e.target.value })}
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
                                value={question.unit || ''}
                                onChange={(e) => handleUpdate({ unit: e.target.value || null })}
                                placeholder="e.g., m², meters"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Default Value</Label>
                            <Input
                                type="number"
                                value={question.defaultValue || 0}
                                onChange={(e) => handleUpdate({ defaultValue: parseFloat(e.target.value) || null })}
                                placeholder="0"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Min Value</Label>
                            <Input
                                type="number"
                                value={question.minValue || 0}
                                onChange={(e) => handleUpdate({ minValue: parseFloat(e.target.value) || null })}
                                placeholder="0"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Max Value</Label>
                            <Input
                                type="number"
                                value={question.maxValue || ''}
                                onChange={(e) => handleUpdate({ maxValue: parseFloat(e.target.value) || null })}
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
                        value={question.pricePerUnit || ''}
                        onChange={(e) => handleUpdate({ pricePerUnit: parseFloat(e.target.value) || null })}
                        placeholder="e.g., 50.00"
                        required
                    />
                </div>
            )}

            {/* SELECT or CHECKBOX Options Field */}
            {(type === 'SELECT' || type === 'CHECKBOX') && (
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <Label>Options</Label>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => addOption(step.tempId, question.tempId)}
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Option
                        </Button>
                    </div>

                    {options.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No options added yet.</p>
                    ) : (
                        <div className="space-y-3">
                            {options.map((option) => (
                                <div key={option.tempId} className="p-3 border rounded-lg bg-white space-y-2">
                                    <div className="flex gap-2 items-start">
                                        <div className="flex-1">
                                            <Label className="text-xs text-muted-foreground mb-1">Label *</Label>
                                            <Input
                                                value={option.label}
                                                onChange={(e) => updateOption(step.tempId, question.tempId, option.tempId, {
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
                                                    onChange={(e) => updateOption(step.tempId, question.tempId, option.tempId, {
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
                                            onClick={() => deleteOption(step.tempId, question.tempId, option.tempId)}
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
                                        {/* <Input
                                            value={option.imageUrl || ''}
                                            onChange={(e) => updateOption(step.tempId, question.tempId, option.tempId, {
                                                imageUrl: e.target.value || null
                                            })}
                                            placeholder="https://example.com/image.jpg"
                                            className="text-sm"
                                        /> */}
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files ? e.target.files[0] : null;
                                                if (file) {
                                                    //const imageUrl = URL.createObjectURL(file);
                                                    uploadToCloudinary(file).then((data) => {
                                                        updateOption(step.tempId, question.tempId, option.tempId, {
                                                            imageUrl: data.secure_url
                                                        });
                                                    });

                                                }
                                            }}
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
                question={question}
                allSteps={allSteps}
                updateQuestion={updateQuestion}
            />
        </div>
    )
}
