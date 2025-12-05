// app/components/Homepage.tsx
'use client'
import { useState, useMemo, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { Progress } from "@/components/ui/progress"
import { Calculator, ArrowLeft } from 'lucide-react'
import LastStep from './calculator/LastStep'
import Thankyou from '@/components/calculator/Thankyou'
import useStore from '@/lib/store'
import Link from 'next/link'
import { Product, FormStep } from '@/app/types/formBuilder'
import {
    calculatePrice,
    calculatePartialPrice,
    getVisibleSteps,
    getVisibleQuestionsForStep,
    areAllStepsComplete,
} from '@/app/utils/priceCalculator'
import ContactForm from './calculator/ContactForm'
import RenderQuestion from './calculator/RenderQuestion'
import NoProduct from './calculator/NoProduct'
import ImageUpload from './calculator/ImageUpload'
import { set } from 'zod'
import Comments from './calculator/Comments'
import { isContactFormValid } from '@/lib/utils'

interface HomePageProps {
    products: Product[]
}

export default function HomePage({ products }: HomePageProps) {
    const {
        productSlug,
        answers,
        setProductSlug,
        setAnswer,
        comments,
        setComments,
        showThankYou,
        contactInfo,
        setShowThankYou
    } = useStore()

    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [showImageUpload, setShowImageUpload] = useState(false)
    const [showComments, setShowComments] = useState(false);
    const [isLastStepComplete, setIsLastStepComplete] = useState(false);
    const [isOnRequest, setIsOnRequest] = useState(false);

    // When the product slug changes (e.g., on first selection or reset), reset the step index.
    useEffect(() => {
        if (!productSlug) {
            setCurrentStepIndex(0);
        }
    }, [productSlug]);
    // set isOnRequest to true when answer value contains "op aanvraag"
    useEffect(() => {
        console.log("Answers updated:", answers);
        const onRequest = Object.values(answers).some(answer => typeof answer === 'string' && answer.toLowerCase().includes('op-aanvraag'));
        setIsOnRequest(onRequest);

    }, [answers]);
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

    const handleNext = () => {
        if (currentStepIndex <= visibleSteps.length) {
            setCurrentStepIndex(prev => prev + 1);
        }
    };

    const handleAnswer = (questionId: string, value: string | number | null) => {
        setAnswer(questionId, value === null ? '' : value)
    }

    const allComplete = useMemo(() => {
        // require the user to pass the static LastStep (which is rendered at index === visibleSteps.length)
        // before showing the contact form. The LastStep component reports completion via
        // `isLastStepComplete` (set by the child component), or the user may advance the step index.
        return productSlug && visibleSteps.length > 0 && currentStepIndex > visibleSteps.length;
    }, [productSlug, visibleSteps, currentStepIndex]);

    const isStepComplete = useCallback((step: FormStep) => {
        if (!selectedProduct) return false;
        const visibleQuestions = getVisibleQuestionsForStep(step, answers);

        for (const question of visibleQuestions) {
            if (question.required) {
                const answer = answers[question.id];
                if (answer === undefined || answer === '' || answer === null) {
                    return false;
                }
            }
        }


        return true;
    }, [selectedProduct, answers]);

    const handleGoBack = () => {
        if (currentStepIndex > 0) {
            setCurrentStepIndex(prev => prev - 1);
        } else if (productSlug) {
            setProductSlug('');
        }
    };





    const isNextDisabled = useMemo(() => {
        if (!productSlug) return true;
        //if (currentStepIndex === 0) return false;
        if (currentStepIndex > visibleSteps.length) return true;

        // NEW: Handle LastStep case
        if (currentStepIndex === visibleSteps.length) {
            return !isLastStepComplete;
        }

        const currentStep = visibleSteps[currentStepIndex];
        if (!currentStep) return true;

        return !isStepComplete(currentStep);
    }, [productSlug, currentStepIndex, visibleSteps, isStepComplete, isLastStepComplete]);


    if (products.length === 0) {
        return (
            <NoProduct />
        )
    }
    console.log("Rendering Homepage with products:", products);
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
            <div className="absolute top-4 left-4">
                <Link href="/dashboard" className="inline-flex items-center text-sm text-green-700 hover:text-green-900">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Dashboard
                </Link>
            </div>

            <div className="w-full max-w-md mx-auto">
                <Card className=" shadow-xl py-0">
                    <CardHeader className="bg-gradient-to-r rounded-t-lg from-green-700 to-green-800 text-white text-center">
                        <div className="flex items-center justify-center gap-2 mb-2 my-5">
                            <Calculator className="w-5 h-5" />
                            <CardTitle className="text-lg">Snel uw prijs berekenen!</CardTitle>
                        </div>
                    </CardHeader>
                    <div className="flex items-center justify-between px-6 pt-4">
                        <p className="text-sm text-[#9ca3af]">{visibleSteps[currentStepIndex]?.description}</p>
                        {selectedProduct && (
                            <div className='flex flex-col items-end mr-5'>
                                <Progress value={((currentStepIndex) / visibleSteps.length) * 100} className="w-40" />
                            </div>
                        )}
                    </div>
                    <CardContent className="p-6 space-y-6">
                        {/* Product Selection */}
                        {currentStepIndex === 0 && (
                            <div>
                                <h3 className="font-semibold mb-2">
                                    Categorie
                                    <span className="text-red-500">*</span>
                                </h3>
                                <Select value={productSlug || ''} onValueChange={handleProductSelect}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Selecteer een categorie" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {products.map((product) => (
                                            <SelectItem key={product.id} value={product.slug}>
                                                <div className="flex flex-col">
                                                    <span className="font-medium">{product.name}</span>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        {/* Dynamic Steps */}
                        {currentStepIndex >= 0 && !showImageUpload && !showComments && visibleSteps.map((step, index) => {
                            if (index !== currentStepIndex) return null;

                            const visibleQuestions = getVisibleQuestionsForStep(step, answers);

                            return (
                                <div key={step.id} className="space-y-4 p-4 rounded-lg bg-white shadow-sm">
                                    {visibleQuestions.map(question => (
                                        <RenderQuestion key={question.id} question={question} />
                                    ))}
                                    {visibleQuestions.length === 0 && <p className="text-muted-foreground">This step is currently hidden.</p>}
                                </div>
                            )
                        })}

                        {/* LastStep Component */}
                        {currentStepIndex === visibleSteps.length && currentStepIndex !== 0 && !showImageUpload && !showComments && (
                            <LastStep
                                isActive
                                onChange={(id, value) => handleAnswer(id, value)}
                                onNext={() => setCurrentStepIndex(prev => prev + 1)}
                                onBack={handleGoBack}
                                onOpenImageUpload={() => setShowImageUpload(true)}
                                onOpenComments={() => setShowComments(true)}
                                setIsLastStepComplete={setIsLastStepComplete}
                            />
                        )}

                        {/* Contact Form Component */}
                        {allComplete && !showThankYou && (
                            <ContactForm
                                onBack={handleGoBack}
                            />
                        )}

                        {/* Thank You Component */}
                        {showThankYou && <Thankyou />}
                        {/* Image Upload Modal */}
                        {showImageUpload && (

                            <ImageUpload setShowImageUpload={setShowImageUpload} />

                        )}

                        {/* Comments Modal */}
                        {showComments && (
                            <Comments setShowComments={setShowComments} setComments={setComments} comments={comments} />
                        )}

                        {/* Debug Information */}
                        {/*   {process.env.NODE_ENV === 'development' && (
                            <div className="border-t pt-4">
                                <h3 className="text-lg font-semibold">Debug Information</h3>
                                <p>allComplete: {allComplete ? 'Yes' : 'No'}</p>
                                <p>currentStepIndex: {currentStepIndex}</p>
                                <p>visibleSteps length: {visibleSteps.length}</p>
                                <pre className="text-xs bg-gray-100 p-2 rounded mt-2 overflow-auto">
                                    {JSON.stringify({ answers }, null, 2)}
                                </pre>
                            </div>
                        )} */}

                        {/* Price Display */}
                        {!showThankYou && (
                            <div className="border-t pt-4">
                                {isOnRequest ? (
                                    <div className="flex justify-between items-center text-lg font-semibold">
                                        <span className="text-card-foreground">Berekening volgt na aanvraag</span>
                                    </div>
                                ) : (
                                    <div className="flex justify-between items-center text-lg font-semibold">
                                        <span>Totaal incl. btw.</span>
                                        {(priceInfo.total > 0 || priceInfo.partial > 0) ? <span className="text-card-foreground">
                                            {!priceInfo.isComplete && '~'} €
                                            {(priceInfo.isComplete ? priceInfo.total : priceInfo.partial).toFixed(2)}
                                        </span> : <span className="text-card-foreground">
                                            €0.00

                                        </span>}
                                    </div>)}
                            </div>
                        )}

                        {/* Navigation Controls */}
                        {!showThankYou && (
                            <div className="border-t pt-4 flex justify-between items-center">
                                <Button
                                    variant="ghost"
                                    onClick={handleGoBack}
                                    disabled={!productSlug && currentStepIndex === 0}
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" /> Vorige
                                </Button>

                                {!allComplete ? (
                                    <Button onClick={handleNext} disabled={isNextDisabled}>
                                        Volgende
                                    </Button>
                                ) : (
                                    <Button onClick={() => { setShowThankYou(true) }} disabled={!isContactFormValid(contactInfo)}>
                                        Volgende
                                    </Button>
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>


        </div>
    )
}