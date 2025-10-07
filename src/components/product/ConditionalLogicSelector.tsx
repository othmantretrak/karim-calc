// components/product/ConditionalLogicSelector.tsx

import { StepFormData, UpdateStepHandler } from '@/app/types/productFormTypes';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ConditionalLogicSelectorProps {
    step: StepFormData;
    questionNum: 1 | 2;
    allSteps: StepFormData[];
    index: number;
    updateStep: UpdateStepHandler;
}

export function ConditionalLogicSelector({
    step,
    questionNum,
    allSteps,
    index,
    updateStep,
}: ConditionalLogicSelectorProps) {
    const conditionalOnKey = `conditionalOn${questionNum}` as keyof StepFormData;

    const handleUpdate = (key: keyof StepFormData, value: any) => {
        updateStep(step.tempId, { [key]: value });
    };

    // Filter potential parent steps for conditional logic.
    // A question can only depend on questions from previous steps or the first question of the current step (if it's Q2).
    const availableParentSteps = allSteps.filter(s => {
        if (s.order < step.order) return true;
        if (s.order === step.order && questionNum === 2) return true;
        return false;
    });

    return (
        <div className="space-y-2 p-4 border rounded-lg bg-white shadow-sm">
            <Label className="font-semibold">Conditional Logic (Optional)</Label>
            <Select
                value={step[conditionalOnKey] ? JSON.stringify(step[conditionalOnKey]) : 'none'}
                onValueChange={(value) => {
                    if (value === 'none') {
                        handleUpdate(conditionalOnKey, null);
                    } else {
                        handleUpdate(conditionalOnKey, JSON.parse(value));
                    }
                }}
                disabled={index === 0 && questionNum === 1} // First question of the first step cannot be conditional
            >
                <SelectTrigger>
                    <SelectValue placeholder={index === 0 && questionNum === 1 ? "Cannot be conditional" : "Always show (Default)"} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="none">Always show (Default)</SelectItem>
                    {availableParentSteps.map(s => (
                        s.options.filter(o => o.questionNum === 1 && (s.order < step.order || questionNum === 2)).map(opt => (
                            <SelectItem
                                key={`${s.tempId}-${opt.tempId}_q1`}
                                value={JSON.stringify({ stepId: s.tempId, value: opt.value, questionNum: 1 })}
                            >
                                Show if Step {s.order + 1} Q1 = {opt.label}
                            </SelectItem>
                        ))
                    ))}
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
                Only show this question if a specific option was selected in a previous &apos;Dropdown Selection&apos; question.
            </p>
        </div>
    );
}