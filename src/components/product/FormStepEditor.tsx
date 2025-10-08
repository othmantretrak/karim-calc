// components/product/FormStepEditor.tsx

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSortable } from '@dnd-kit/sortable';
import { Trash2, GripVertical, ChevronUp, ChevronDown, Plus } from 'lucide-react';
import { QuestionFields } from './QuestionFields';
import {
    StepFormData,
    UpdateStepHandler,
    DeleteStepHandler,
    MoveStepHandler,
    AddQuestionHandler,
    UpdateQuestionHandler,
    DeleteQuestionHandler,
    AddOptionHandler,
    UpdateOptionHandler,
    DeleteOptionHandler
} from '@/app/types/productFormTypes';

interface FormStepEditorProps {
    step: StepFormData;
    index: number;
    totalSteps: number;
    allSteps: StepFormData[]
    updateStep: UpdateStepHandler
    deleteStep: DeleteStepHandler
    moveStep: MoveStepHandler
    addQuestion: AddQuestionHandler
    updateQuestion: UpdateQuestionHandler
    deleteQuestion: DeleteQuestionHandler
    addOption: AddOptionHandler
    updateOption: UpdateOptionHandler
    deleteOption: DeleteOptionHandler
}

export function FormStepEditor({
    step,
    index,
    totalSteps,
    allSteps,
    updateStep,
    deleteStep,
    moveStep,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    addOption,
    updateOption,
    deleteOption,
}: FormStepEditorProps) {

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: step.tempId });

    const style = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        transition,
        zIndex: isDragging ? 10 : undefined,
    };

    return (
        <Card ref={setNodeRef} style={style} className="border-2 relative">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2" {...attributes} {...listeners}>
                        <GripVertical className="w-5 h-5 text-muted-foreground cursor-grab" />
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

                {step.questions.map((question, qIndex) => (
                    <QuestionFields
                        key={question.tempId}
                        step={step}
                        question={question}
                        questionNum={qIndex + 1}
                        updateQuestion={updateQuestion}
                        deleteQuestion={deleteQuestion}
                        addOption={addOption}
                        updateOption={updateOption}
                        deleteOption={deleteOption}
                        allSteps={allSteps}
                        index={index}
                    />
                ))}

                <div className="p-4 border-2 border-dashed rounded-lg">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => addQuestion(step.tempId)}
                        className="w-full"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Question to Step {index + 1}
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}