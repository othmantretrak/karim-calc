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
import { Product, FormStep } from '@/app/types/formBuilder'
import {
    calculatePrice,
    calculatePartialPrice,
    getVisibleSteps,
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


    const handleAnswer = (stepId: string, questionNum: number, value: string | number | null) => {
        const key = `${stepId}_q${questionNum}`
        // Use null to explicitly clear the answer
        setAnswer(key, value === null ? '' : value)
    }

    // Check if a question is answered
    const isQuestionAnswered = (stepId: string, questionNum: number) => {
        const key = `${stepId}_q${questionNum}`
        const answer = answers[key]
        return answer !== undefined && answer !== '' && answer !== null
    }

    // Get all answered steps (both questions answered if step has 2 questions)
    const getAnsweredSteps = () => {
        return visibleSteps.filter(step => {
            const q1Answered = isQuestionAnswered(step.id, 1)
            if (!step.question2) return q1Answered
            const q2Answered = isQuestionAnswered(step.id, 2)
            return q1Answered && q2Answered
        })
    }

    // Get the first unanswered step
    const getFirstUnansweredStep = () => {
        return visibleSteps.find(step => {
            const q1Answered = isQuestionAnswered(step.id, 1)
            if (!q1Answered) return true
            if (step.question2) {
                const q2Answered = isQuestionAnswered(step.id, 2)
                return !q2Answered
            }
            return false
        })
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
            if (stepToClear) {
                handleAnswer(stepToClear.id, 1, null);
                if (stepToClear.question2) {
                    handleAnswer(stepToClear.id, 2, null);
                }
            }
            return;
        }

        const activeStep = currentUnansweredStep;

        if (activeStep) {
            const q1Answered = isQuestionAnswered(activeStep.id, 1);
            const q2Answered = activeStep.question2 && isQuestionAnswered(activeStep.id, 2);

            if (q2Answered) {
                // Clear Q2
                handleAnswer(activeStep.id, 2, null);
            }
            else if (q1Answered) {
                // Clear Q1
                handleAnswer(activeStep.id, 1, null);
            }
            else if (currentStepIndex > 0) {
                // Q1 is unanswered, go back to the PREVIOUS step and clear its answers.
                const prevStep = visibleSteps[currentStepIndex - 1];
                handleAnswer(prevStep.id, 1, null);
                if (prevStep.question2) {
                    handleAnswer(prevStep.id, 2, null);
                }
            }
        }
    };


    const renderQuestion = (step: FormStep, questionNum: 1 | 2, isDisabled: boolean = false) => {
        const type = questionNum === 1 ? step.type1 : step.type2
        const question = questionNum === 1 ? step.question1 : step.question2
        const unit = questionNum === 1 ? step.unit1 : step.unit2
        const minValue = questionNum === 1 ? step.minValue1 : step.minValue2
        const maxValue = questionNum === 1 ? step.maxValue1 : step.maxValue2
        const defaultValue = questionNum === 1 ? step.defaultValue1 : step.defaultValue2
        const pricePerUnit = questionNum === 1 ? step.pricePerUnit1 : step.pricePerUnit2

        if (!question) return null

        const answerKey = `${step.id}_q${questionNum}`
        const answer = answers[answerKey]

        if (type === 'SELECT') {
            const options = step.options.filter(o => o.questionNum === questionNum)
            const selectedOption = options.find(o => o.value === answer)

            return (
                <div className="space-y-2">
                    <Label htmlFor={answerKey} className="font-semibold">
                        {question}
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
                        onValueChange={(value) => handleAnswer(step.id, questionNum, value)}
                        disabled={isDisabled}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={`Select ${question.toLowerCase()}`} />
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
                <div className="space-y-2">
                    <Label htmlFor={answerKey} className="font-semibold">
                        {question} {unit && `(${unit})`}
                        <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id={answerKey}
                        type="number"
                        min={minValue || 1}
                        max={maxValue || undefined}
                        step="1"
                        value={numValue}
                        onChange={(e) => {
                            const value = parseInt(e.target.value) || (minValue || 1)
                            handleAnswer(step.id, questionNum, Math.max(minValue || 1, value))
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

                        {/* Question 1 */}
                        {renderQuestion(currentUnansweredStep, 1, false)}

                        {/* Question 2 (only if Q1 is answered AND Q2 exists) */}
                        {currentUnansweredStep.question2 &&
                            isQuestionAnswered(currentUnansweredStep.id, 1) && (
                                <div className="pt-4 border-t mt-4">
                                    {renderQuestion(currentUnansweredStep, 2, false)}
                                </div>
                            )}
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