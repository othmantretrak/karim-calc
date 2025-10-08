// components/product/ConditionalLogicSelector.tsx

import { StepFormData, QuestionFormData, UpdateQuestionHandler } from '@/app/types/productFormTypes';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ConditionalLogicSelectorProps {
    step: StepFormData;
    question: QuestionFormData;
    allSteps: StepFormData[];
    updateQuestion: UpdateQuestionHandler;
}

export function ConditionalLogicSelector({
    step,
    question,
    allSteps,
    updateQuestion,
}: ConditionalLogicSelectorProps) {
    const handleUpdate = (value: any) => {
        updateQuestion(step.tempId, question.tempId, { conditionalOn: value });
    };

    // A question can depend on any question in a previous step, or a question with a lower order in the same step.
    const availableParentQuestions: { step: StepFormData, question: QuestionFormData }[] = [];
    allSteps.forEach(s => {
        if (s.order < step.order) {
            s.questions.forEach(q => {
                if (q.type === 'SELECT' || q.type === 'CHECKBOX') {
                    availableParentQuestions.push({ step: s, question: q });
                }
            });
        } else if (s.order === step.order) {
            s.questions.forEach(q => {
                if (q.order < question.order && (q.type === 'SELECT' || q.type === 'CHECKBOX')) {
                    availableParentQuestions.push({ step: s, question: q });
                }
            });
        }
    });

    const isFirstQuestionInFirstStep = step.order === 0 && question.order === 0;

    return (
        <div className="space-y-2 p-4 border rounded-lg bg-white shadow-sm">
            <Label className="font-semibold">Conditional Logic (Optional)</Label>
            <Select
                value={question.conditionalOn ? JSON.stringify(question.conditionalOn) : 'none'}
                onValueChange={(value) => {
                    if (value === 'none') {
                        handleUpdate(null);
                    } else {
                        handleUpdate(JSON.parse(value));
                    }
                }}
                disabled={isFirstQuestionInFirstStep}
            >
                <SelectTrigger>
                    <SelectValue placeholder={isFirstQuestionInFirstStep ? "Cannot be conditional" : "Always show (Default)"} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="none">Always show (Default)</SelectItem>
                    {availableParentQuestions.map(({ step: parentStep, question: parentQuestion }) => (
                        parentQuestion.options.map(opt => (
                            <SelectItem
                                key={`${parentQuestion.tempId}-${opt.tempId}`}
                                value={JSON.stringify({ questionId: parentQuestion.tempId, value: opt.value })}
                            >
                                Show if Step {parentStep.order + 1} Q{parentQuestion.order + 1} = {opt.label}
                            </SelectItem>
                        ))
                    ))}
                </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
                Only show this question if a specific option was selected in a previous question.
            </p>
        </div>
    );
}
