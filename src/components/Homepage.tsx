// app/components/Homepage.tsx
'use client'
import { useState, useEffect, useMemo } from 'react'
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

interface HomePageProps {
    products: Product[]
}

export default function HomePage({ products }: HomePageProps) {
    const { productSlug, answers, setProductSlug, setAnswer } = useStore()

    // Get selected product
    const selectedProduct = useMemo(() => {
        return products.find(p => p.slug === productSlug)
    }, [products, productSlug])

    // Get visible steps based on current answers
    const visibleSteps = useMemo(() => {
        if (!selectedProduct) return []
        return getVisibleSteps(selectedProduct, answers)
    }, [selectedProduct, answers])

    // Calculate price
    const priceInfo = useMemo(() => {
        if (!selectedProduct) return { total: 0, isComplete: false, partial: 0 }

        const isComplete = areAllStepsComplete(selectedProduct, answers)

        if (isComplete) {
            const breakdown = calculatePrice(selectedProduct, answers)
            return { total: breakdown.total, isComplete: true, partial: 0 }
        }

        const partial = calculatePartialPrice(selectedProduct, answers)
        return { total: 0, isComplete: false, partial }
    }, [selectedProduct, answers])

    const handleProductSelect = (slug: string) => {
        setProductSlug(slug)
    }

    const handleAnswer = (stepId: string, questionNum: number, value: string | number | null) => {
        const key = `${stepId}_q${questionNum}`
        setAnswer(key, value === null ? '' : value) // Store null answers as empty string for consistency/clearing
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

    const handleGoBack = () => {
        if (!selectedProduct || visibleSteps.length === 0) return;

        // 1. If calculation is complete, target the last step
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

        // 2. We are currently stopped at currentUnansweredStep
        if (currentUnansweredStep) {
            // Case A: Q2 is pending, but Q1 is answered -> Clear Q1 (to go back to start of step, which recalculates visibility)
            // Note: Since Q1 is required before Q2 appears, if Q1 is answered, we check Q2. If Q2 is unanswered, we clear Q1 to go back.
            const q1Answered = isQuestionAnswered(currentUnansweredStep.id, 1);
            const q2Answered = currentUnansweredStep.question2 && isQuestionAnswered(currentUnansweredStep.id, 2);

            if (q2Answered) {
                // Clear Q2
                handleAnswer(currentUnansweredStep.id, 2, null);
            }
            else if (q1Answered) {
                // Clear Q1 (forces progression back to Q1 input state)
                handleAnswer(currentUnansweredStep.id, 1, null);

                // If this step became invisible due to clearing Q1, the next action should target the previous step.
                // However, simply clearing Q1 here is usually enough to let the logic re-evaluate.
            }
            else if (currentStepIndex > 0) {
                // Case C: Q1 is unanswered, go to the previous step (index - 1) and clear its answers.
                const prevStep = visibleSteps[currentStepIndex - 1];
                handleAnswer(prevStep.id, 1, null);
                if (prevStep.question2) {
                    handleAnswer(prevStep.id, 2, null);
                }
            } else if (productSlug) {
                // We are on the very first step, clear product selection
                setProductSlug('');
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

            return (
                <div className="space-y-2">
                    <Label htmlFor={answerKey} className="font-semibold">
                        {question}
                        <span className="text-red-500">*</span>
                    </Label>
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
                                    <div className="flex justify-between items-center w-full gap-4">
                                        <span>{option.label}</span>
                                        {option.price !== null && option.price !== undefined && (
                                            <span className="text-sm text-muted-foreground">
                                                €{option.price.toFixed(2)}
                                            </span>
                                        )}
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

    const showBackButton = productSlug && (currentStepIndex > 0 || answeredSteps.length > 0)

    if (products.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
                <Card className="w-full max-w-md">
                    <CardContent className="text-center py-8">
                        <Calculator className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                        <h3 className="text-lg font-semibold mb-2">No products available</h3>
                        <p className="text-muted-foreground">
                            Please add some products to enable the price calculator.
                        </p>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md mx-auto">
                <Card className="overflow-hidden shadow-xl py-0">
                    <CardHeader className="bg-gradient-to-r from-green-700 to-green-800 text-white text-center">
                        <div className="flex items-center justify-center gap-2 mb-2 my-5">
                            <Calculator className="w-5 h-5" />
                            <CardTitle className="text-lg">Snel uw prijs berekenen!</CardTitle>
                        </div>
                    </CardHeader>

                    {selectedProduct && (
                        <div className="w-full bg-green-800 rounded-full h-2">
                            <div
                                className="bg-white h-2 rounded-full transition-all duration-300"
                                style={{
                                    width: `${visibleSteps.length > 0 ? (answeredSteps.length / visibleSteps.length) * 100 : 0}%`
                                }}
                            />
                        </div>
                    )}

                    <CardContent className="p-6 space-y-6">
                        {/* Back Button / Product Selection */}
                        <div className="flex justify-between items-center">
                            {showBackButton ? (
                                <Button variant="ghost" size="sm" onClick={handleGoBack}>
                                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                                </Button>
                            ) : (
                                <div className="h-8"></div> // Spacer to keep layout stable
                            )}
                            <p className="text-sm text-muted-foreground">
                                {selectedProduct?.description || 'Waar kunnen we u mee helpen?'}
                            </p>
                        </div>

                        {!productSlug ? (
                            <div>
                                <h3 className="font-semibold mb-4">
                                    Categorie
                                    <span className="text-red-500">*</span>
                                </h3>
                                <Select value={productSlug || ''} onValueChange={handleProductSelect}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a product" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {products.map((product) => (
                                            <SelectItem key={product.id} value={product.slug}>
                                                <div className="flex flex-col">
                                                    <span className="font-medium">{product.name}</span>
                                                    {product.description && (
                                                        <span className="text-sm text-muted-foreground">
                                                            {product.description}
                                                        </span>
                                                    )}
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        ) : (
                            <>
                                {/* Render current unanswered step */}
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
                                ) : (
                                    <div className="text-center py-6 bg-green-50 border border-green-200 rounded-lg">
                                        <p className="text-xl font-bold text-green-700 mb-2">
                                            Calculation Complete!
                                        </p>
                                        <p className="text-muted-foreground">
                                            Your estimated price is ready.
                                        </p>
                                    </div>
                                )}
                            </>
                        )}

                        {/* Price Display */}
                        {(priceInfo.total > 0 || priceInfo.partial > 0) && (
                            <div className="border-t pt-4">
                                <div className="flex justify-between items-center text-lg font-semibold">
                                    <span>
                                        {priceInfo.isComplete ? 'Totaal' : 'Vanaf'} incl. btw.
                                    </span>
                                    <span className="text-green-600">
                                        {!priceInfo.isComplete && '~'} €
                                        {(priceInfo.isComplete ? priceInfo.total : priceInfo.partial).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* View Details Button */}
                        {allComplete && priceInfo.isComplete && (
                            <Link
                                className="w-full bg-green-700 hover:bg-green-800 text-white text-center py-2 rounded inline-flex items-center justify-center"
                                href={`/products/${productSlug}`}
                            >
                                View Details
                            </Link>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}