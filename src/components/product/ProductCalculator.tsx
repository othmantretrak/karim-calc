// app/components/ProductCalculator.tsx
'use client'

import { useEffect, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Calculator, ArrowLeft } from 'lucide-react'
import useStore from '@/lib/store'
import Link from 'next/link'
import { Product, FormStep, Question } from '@/app/types/formBuilder'
import {
    calculatePrice,
    calculatePartialPrice,
    getVisibleSteps,
    getVisibleQuestionsForStep,
    areAllStepsComplete,
} from '@/app/utils/priceCalculator'

interface ProductCalculatorProps {
    product: Product
}

export default function ProductCalculator({ product }: ProductCalculatorProps) {
    const { productSlug, answers, setProductSlug, setAnswer } = useStore()

    // Initialize productSlug and reset answers when mounting this specific calculator
    useEffect(() => {
        if (productSlug !== product.slug) {
            setProductSlug(product.slug)
        }
    }, [product.slug, productSlug, setProductSlug])

    // Get visible steps based on current answers
    const visibleSteps = useMemo(() => {
        return getVisibleSteps(product, answers)
    }, [product, answers])

    // Calculate price
    const priceInfo = useMemo(() => {
        const isComplete = areAllStepsComplete(product, answers)

        if (isComplete) {
            const breakdown = calculatePrice(product, answers)
            return { total: breakdown.total, isComplete: true, partial: 0 }
        }

        const partial = calculatePartialPrice(product, answers)
        return { total: 0, isComplete: false, partial }
    }, [product, answers])


    const handleAnswer = (questionId: string, value: string | number | null) => {
        // Use null to explicitly clear the answer
        setAnswer(questionId, value === null ? '' : value)
    }

    // Check if a question is answered
    const isQuestionAnswered = (questionId: string) => {
        const answer = answers[questionId]
        return answer !== undefined && answer !== '' && answer !== null
    }

    const areStepQuestionsAnswered = (step: FormStep) => {
        const visibleQuestions = getVisibleQuestionsForStep(step, answers);
        return visibleQuestions.every(q => isQuestionAnswered(q.id));
    };

    // Get all answered steps
    const getAnsweredSteps = () => {
        return visibleSteps.filter(areStepQuestionsAnswered);
    }

    // Get the first unanswered step
    const getFirstUnansweredStep = () => {
        return visibleSteps.find(step => !areStepQuestionsAnswered(step));
    }

    const getFirstUnansweredQuestionInStep = (step: FormStep) => {
        const visibleQuestions = getVisibleQuestionsForStep(step, answers);
        return visibleQuestions.find(q => !isQuestionAnswered(q.id));
    }

    const getLastAnsweredQuestionInStep = (step: FormStep) => {
        const visibleQuestions = getVisibleQuestionsForStep(step, answers);
        return [...visibleQuestions].reverse().find(q => isQuestionAnswered(q.id));
    }

    const answeredSteps = getAnsweredSteps()
    const currentUnansweredStep = getFirstUnansweredStep()
    const allComplete = !currentUnansweredStep && visibleSteps.length > 0
    const currentStepIndex = currentUnansweredStep
        ? visibleSteps.findIndex(s => s.id === currentUnansweredStep.id)
        : visibleSteps.length

    // Logic for navigating back
    const handleGoBack = () => {
        if (visibleSteps.length === 0) return;

        // Case A: Calculation is complete, target the last step
        if (allComplete) {
            const stepToClear = visibleSteps[visibleSteps.length - 1];
            stepToClear?.questions.forEach(q => handleAnswer(q.id, null));
            return;
        }

        const activeStep = currentUnansweredStep;

        if (activeStep) {
            const lastAnsweredQuestion = getLastAnsweredQuestionInStep(activeStep);

            if (lastAnsweredQuestion) {
                // Clear the last answered question in the current active step
                handleAnswer(lastAnsweredQuestion.id, null);
            } else if (currentStepIndex > 0) {
                // Current step is completely unanswered, so go back to the PREVIOUS step and clear its answers.
                const prevStep = visibleSteps[currentStepIndex - 1];
                prevStep.questions.forEach(q => handleAnswer(q.id, null));
            }
        }
    };


    const renderQuestion = (question: Question, isDisabled: boolean = false) => {
        const {
            id: questionId,
            type,
            question: questionText,
            unit,
            minValue,
            maxValue,
            defaultValue,
            pricePerUnit,
            options
        } = question;

        if (!questionText) return null

        const answer = answers[questionId]

        if (type === 'SELECT') {
            const selectedOption = options.find(o => o.value === answer)

            return (
                <div key={questionId} className="space-y-2">
                    <Label htmlFor={questionId} className="font-semibold">
                        {questionText}
                        <span className="text-red-500">*</span>
                    </Label>

                    {/* Show selected option with image if available */}
                    {selectedOption?.imageUrl && (
                        <div className="mb-3 p-3 border rounded-lg bg-green-50">
                            <img
                                src={selectedOption.imageUrl}
                                alt={selectedOption.label}
                                className="w-full h-48 object-cover rounded-md mb-2"
                            />
                            <p className="text-sm font-medium text-center">{selectedOption.label}</p>
                        </div>
                    )}

                    <Select
                        value={answer as string || ''}
                        onValueChange={(value) => handleAnswer(questionId, value)}
                        disabled={isDisabled}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={`Select ${questionText.toLowerCase()}`} />
                        </SelectTrigger>
                        <SelectContent>
                            {options.map((option) => (
                                <SelectItem key={option.id} value={option.value}>
                                    <div className="flex items-center gap-3 w-full">
                                        {option.imageUrl && (
                                            <img
                                                src={option.imageUrl}
                                                alt={option.label}
                                                className="w-10 h-10 object-cover rounded"
                                            />
                                        )}
                                        <div className="flex justify-between items-center flex-1 gap-4">
                                            <span>{option.label}</span>
                                            {option.price !== null && option.price !== undefined && (
                                                <span className="text-sm text-muted-foreground">
                                                    €{option.price.toFixed(2)}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            )
        }

        if (type === 'NUMBER') {
            const numValue = typeof answer === 'number' ? answer : (answer ? parseFloat(answer as string) : defaultValue || 1)

            return (
                <div key={questionId} className="space-y-2">
                    <Label htmlFor={questionId} className="font-semibold">
                        {questionText} {unit && `(${unit})`}
                        <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id={questionId}
                        type="number"
                        min={minValue || 1}
                        max={maxValue || undefined}
                        step="1"
                        value={numValue}
                        onChange={(e) => {
                            const value = parseInt(e.target.value) || (minValue || 1)
                            handleAnswer(questionId, Math.max(minValue || 1, value))
                        }}
                        className="w-full"
                        disabled={isDisabled}
                    />
                    {pricePerUnit !== null && pricePerUnit !== undefined && (
                        <div className="text-sm text-muted-foreground bg-blue-50 p-3 rounded-md">
                            <div className="flex justify-between">
                                <span>Price per {unit || 'unit'}:</span>
                                <span className="font-medium">€{pricePerUnit.toFixed(2)}</span>
                            </div>
                        </div>
                    )}
                </div>
            )
        }

        return null
    }

    const showBackButton = visibleSteps.length > 0 && (currentStepIndex > 0 || answeredSteps.length > 0)

    return (
        <Card className="overflow-hidden shadow-xl py-0">
            <CardHeader className="bg-gradient-to-r from-green-700 to-green-800 text-white text-center p-4">
                <div className="flex items-center justify-center gap-2">
                    <Calculator className="w-5 h-5" />
                    <CardTitle className="text-lg">{product.name} Calculator</CardTitle>
                </div>
            </CardHeader>

            <div className="w-full bg-green-800 rounded-full h-2">
                <div
                    className="bg-white h-2 rounded-full transition-all duration-300"
                    style={{
                        width: `${visibleSteps.length > 0 ? (answeredSteps.length / visibleSteps.length) * 100 : 0}%`
                    }}
                />
            </div>

            <CardContent className="p-6 space-y-6">

                {/* Back Button */}
                {showBackButton && (
                    <div className="flex justify-start">
                        <Button variant="ghost" size="sm" onClick={handleGoBack}>
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back
                        </Button>
                    </div>
                )}

                <p className="text-sm text-muted-foreground">
                    {product.description || 'Answer the questions below to get an instant price estimate.'}
                </p>

                {/* Display the current interactive step or completion message */}
                {currentUnansweredStep ? (
                    <div className="space-y-4 p-4 border rounded-lg bg-white shadow-sm">
                        <h3 className="font-bold text-lg mb-4 text-green-700">
                            Step {currentStepIndex + 1} of {visibleSteps.length}
                        </h3>

                        {getVisibleQuestionsForStep(currentUnansweredStep, answers).map((question, index, arr) => {
                            const isAnswered = isQuestionAnswered(question.id);
                            const prevQuestion = index > 0 ? arr[index - 1] : null;
                            const isPrevAnswered = prevQuestion ? isQuestionAnswered(prevQuestion.id) : true;

                            // A question is interactive if it's the first, or the previous one has been answered.
                            const isInteractive = index === 0 || isPrevAnswered;

                            return renderQuestion(question, !isInteractive);
                        })}
                    </div>
                ) : visibleSteps.length > 0 && allComplete ? (
                    <div className="text-center py-6 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-xl font-bold text-green-700 mb-2">
                            Calculation Complete!
                        </p>
                        <p className="text-muted-foreground">
                            Your estimated price is ready.
                        </p>
                    </div>
                ) : (
                    <p className="text-muted-foreground text-center py-4">
                        No configuration steps defined for this product.
                    </p>
                )}


                {/* Price Display */}
                {(priceInfo.total > 0 || priceInfo.partial > 0) && (
                    <div className="border-t pt-4">
                        <div className="flex justify-between items-center text-lg font-semibold">
                            <span>
                                {priceInfo.isComplete ? 'Total Price' : 'Starting from'} incl. VAT
                            </span>
                            <span className="text-green-600">
                                {!priceInfo.isComplete && '~'} €
                                {(priceInfo.isComplete ? priceInfo.total : priceInfo.partial).toFixed(2)}
                            </span>
                        </div>
                    </div>
                )}

                {/* Call to Action Button */}
                {allComplete && priceInfo.isComplete && (
                    <Button className="w-full bg-green-700 hover:bg-green-800">
                        Proceed to Quote
                    </Button>
                )}
            </CardContent>
        </Card>
    )
}