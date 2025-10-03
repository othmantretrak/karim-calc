// components/product/FormStepEditor.tsx

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trash2, GripVertical, ChevronUp, ChevronDown } from 'lucide-react'
import { QuestionFields } from './QuestionFields'
import {
    StepFormData,
    UpdateStepHandler,
    DeleteStepHandler,
    MoveStepHandler,
    AddOptionHandler,
    UpdateOptionHandler,
    DeleteOptionHandler
} from '@/app/types/productFormTypes'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface FormStepEditorProps {
    step: StepFormData
    index: number
    totalSteps: number
    // Pass all steps to render conditional logic options
    allSteps: StepFormData[]
    updateStep: UpdateStepHandler
    deleteStep: DeleteStepHandler
    moveStep: MoveStepHandler
    addOption: AddOptionHandler
    updateOption: UpdateOptionHandler
    deleteOption: DeleteOptionHandler
}

export function FormStepEditor({
    step,
    index,
    totalSteps,
    allSteps, // New prop
    updateStep,
    deleteStep,
    moveStep,
    addOption,
    updateOption,
    deleteOption,
}: FormStepEditorProps) {

    const handleUpdate = (key: keyof StepFormData, value: any) => {
        updateStep(step.tempId, { [key]: value })
    }

    // Filter potential parent steps for conditional logic
    const availableParentSteps = allSteps.filter(s =>
        s.order < step.order && (s.type1 === 'SELECT' || s.type2 === 'SELECT')
    );

    return (
        <Card className="border-2">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <GripVertical className="w-5 h-5 text-muted-foreground" />
                        <span className="font-semibold">Step {index + 1}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        {/* Move Up/Down Controls */}
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => moveStep(step.tempId, 'up')}
                            disabled={index === 0}
                        >
                            <ChevronUp className="w-4 h-4" />
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => moveStep(step.tempId, 'down')}
                            disabled={index === totalSteps - 1}
                        >
                            <ChevronDown className="w-4 h-4" />
                        </Button>
                        {/* Delete Step Control */}
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteStep(step.tempId)}
                        >
                            <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">

                {/* Question 1 Fields */}
                <QuestionFields
                    step={step}
                    questionNum={1}
                    updateStep={updateStep}
                    addOption={addOption}
                    updateOption={updateOption}
                    deleteOption={deleteOption}
                />

                {/* Question 2 Fields (Conditional) */}
                <QuestionFields
                    step={step}
                    questionNum={2}
                    updateStep={updateStep}
                    addOption={addOption}
                    updateOption={updateOption}
                    deleteOption={deleteOption}
                />

                {/* Conditional Logic Selector */}
                <div className="space-y-2 p-4 border rounded-lg bg-white shadow-sm">
                    <Label className="font-semibold">Conditional Logic (Optional)</Label>
                    <Select
                        value={step.conditionalOn ? JSON.stringify(step.conditionalOn) : 'none'}
                        onValueChange={(value) => {
                            if (value === 'none') {
                                handleUpdate('conditionalOn', null)
                            } else {
                                handleUpdate('conditionalOn', JSON.parse(value))
                            }
                        }}
                        disabled={index === 0} // First step cannot be conditional
                    >
                        <SelectTrigger>
                            <SelectValue placeholder={index === 0 ? "Cannot be conditional" : "Always show (Default)"} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="none">Always show (Default)</SelectItem>
                            {availableParentSteps.map(s => (
                                s.options.filter(o => o.questionNum === 1).map(opt => (
                                    <SelectItem
                                        key={`${s.tempId}-${opt.tempId}_q1`}
                                        value={JSON.stringify({ stepId: s.tempId, value: opt.value, questionNum: 1 })}
                                    >
                                        Show if Step {s.order + 1} Q1 = {opt.label}
                                    </SelectItem>
                                ))
                            ))}
                            {/* Option to condition on Question 2 of previous steps */}
                            {availableParentSteps.map(s => (
                                s.type2 === 'SELECT' && s.options.filter(o => o.questionNum === 2).map(opt => (
                                    <SelectItem
                                        key={`${s.tempId}-${opt.tempId}_q2`}
                                        value={JSON.stringify({ stepId: s.tempId, value: opt.value, questionNum: 2 })}
                                    >
                                        Show if Step {s.order + 1} Q2 = {opt.label}
                                    </SelectItem>
                                ))
                            ))}
                        </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                        Only show this step if a specific option was selected in a previous &apos;Dropdown Selection&apos; step.
                    </p>
                </div>

            </CardContent>
        </Card>
    )
}