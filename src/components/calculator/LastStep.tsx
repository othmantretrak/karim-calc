import React, { useState, useEffect } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import useStore from '@/lib/store';

interface LastStepProps {
    /** Whether this step is currently active/visible */
    isActive?: boolean;
    /** Optional initial values for the two questions */
    initialValues?: {
        desiredTerm?: string;
        nextStep?: string;
    };
    /** Called when a question changes: (questionId, value) */
    onChange?: (id: string, value: string) => void;
    onNext?: () => void;
    onBack?: () => void;
    onOpenImageUpload?: () => void;
    onOpenComments?: () => void;
    setIsLastStepComplete: (complete: boolean) => void;
}

/**
 * A static "last step" that can be added to every product.
 * It renders two select questions and the "Foto uploaden | Opmerkingen toevoegen" buttons.
 * The parent should show the contact form when `onNext` is called.
 *
 * The component is intentionally self-contained and communicates via props so it can be
 * plugged into the existing flow in `Homepage`.
 */
const LastStep: React.FC<LastStepProps> = ({
    isActive = true,
    initialValues,
    onOpenImageUpload,
    onOpenComments,
    setIsLastStepComplete
}) => {
    // Question IDs used when reporting changes to parent
    const Q_DESIRED_TERM = 'desired_term';
    const Q_NEXT_STEP = 'next_step';

    const {
        answers,
        setAnswer,
    } = useStore()

    const desiredTermOptions = ['Spoed', 'Z.s.m', 'Binnen een week', 'Binnen een maand', 'Zodra ik de sleutel heb', 'In overleg'];
    const nextStepOptions = ['Ik wil graag een officiële offerte', 'Ik wil graag eerst persoonlijk contact'];

    const canProceed = Boolean(answers[Q_DESIRED_TERM]) && Boolean(answers[Q_NEXT_STEP]);

    useEffect(() => {
        const desiredTerm = answers[Q_DESIRED_TERM];
        const nextStep = answers[Q_NEXT_STEP];
        const isComplete = desiredTerm !== '' && desiredTerm !== undefined &&
            nextStep !== '' && nextStep !== undefined;
        setIsLastStepComplete(isComplete);
    }, []);

    // Inform parent when this static last step becomes complete.
    useEffect(() => {
        setIsLastStepComplete(canProceed);
    }, [canProceed, setIsLastStepComplete]);

    if (!isActive) return null;

    const handleAnswer = (questionId: string, value: string) => {
        setAnswer(questionId, value === null ? '' : value)
    }

    //const answer = answers[questionId]

    return (
        <div>

            {/* Question 1 */}
            <div>
                <label className="block font-semibold mb-2">Gewenste termijn voor uitvoeren?<span className="text-red-500">*</span></label>
                <Select value={answers[Q_DESIRED_TERM] as string} onValueChange={val => handleAnswer(Q_DESIRED_TERM, val)}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecteer termijn" />
                    </SelectTrigger>
                    <SelectContent>
                        {desiredTermOptions.map(opt => (
                            <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Question 2 */}
            <div>
                <label className="block font-semibold mb-2">De vervolgstap<span className="text-red-500">*</span></label>
                <Select value={answers[Q_NEXT_STEP] as string} onValueChange={val => handleAnswer(Q_NEXT_STEP, val)}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecteer vervolgstap" />
                    </SelectTrigger>
                    <SelectContent>
                        {nextStepOptions.map(opt => (
                            <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Foto / Opmerkingen buttons (only here) */}
            <div className="flex items-center gap-4 text-sm mt-4">
                <button
                    type="button"
                    onClick={() => onOpenImageUpload?.()}
                    className="text-green-700 hover:text-green-900 font-medium"
                >
                    Foto uploaden
                </button>
                <span className="text-gray-400">|</span>
                <button
                    type="button"
                    onClick={() => onOpenComments?.()}
                    className="text-green-700 hover:text-green-900 font-medium"
                >
                    Opmerkingen toevoegen
                </button>
            </div>

        </div>
    )
}

export default LastStep