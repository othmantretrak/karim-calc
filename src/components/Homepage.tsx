// app/components/Homepage.tsx
'use client'
import { useState, useMemo, useEffect } from 'react'
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
    getVisibleQuestionsForStep,
    areAllStepsComplete,
} from '@/app/utils/priceCalculator'

interface HomePageProps {
    products: Product[]
}

export default function HomePage({ products }: HomePageProps) {
    const { productSlug, answers, setProductSlug, setAnswer } = useStore()
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [showImageUpload, setShowImageUpload] = useState(false)
    const [showComments, setShowComments] = useState(false);
    const [uploadedImages, setUploadedImages] = useState<string[]>([]);

    const [comments, setComments] = useState('')
    const [showThankYou, setShowThankYou] = useState(false)
    const [contactInfo, setContactInfo] = useState({
        email: '',
        telephone: '',
        surname: '',
        zipCode: '',
        street: '',
        residence: ''
    })

    // When the product slug changes (e.g., on first selection or reset), reset the step index.
    useEffect(() => {
        if (!productSlug) {
            setCurrentStepIndex(0);
        }
    }, [productSlug]);

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
        if (currentStepIndex < visibleSteps.length) {
            setCurrentStepIndex(prev => prev + 1);
        }
    };


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

    const isStepComplete = (step: FormStep) => {
        if (!selectedProduct) return false;
        const visibleQuestions = getVisibleQuestionsForStep(step, selectedProduct, answers);

        if (visibleQuestions.includes(1) && step.required1 && !isQuestionAnswered(step.id, 1)) {
            return false;
        }

        if (visibleQuestions.includes(2) && step.required2 && !isQuestionAnswered(step.id, 2)) {
            return false;
        }

        // The step is complete if all its *visible and required* questions are answered.
        return true;
    };

    const allComplete = useMemo(() => {
        return productSlug && visibleSteps.length > 0 && currentStepIndex >= visibleSteps.length;
    }, [productSlug, visibleSteps, currentStepIndex]);

    const handleGoBack = () => {
        if (currentStepIndex > 0) {
            setCurrentStepIndex(prev => prev - 1);
        } else if (productSlug) {
            setProductSlug(''); // Go back to product selection
        }
    };
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files ? Array.from(e.target.files) : [];
        if (files.length === 0) return;
        const imageUrls = files.map(file => URL.createObjectURL(file));
        setUploadedImages((prev: string[]) => [...prev, ...imageUrls]);
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        const files = Array.from(e.dataTransfer.files)
        const imageUrls = files.map(file => URL.createObjectURL(file))
        setUploadedImages((prev: string[]) => [...prev, ...imageUrls])
    }
    const handleContactSubmit = (e: any) => {
        e.preventDefault()
        // Here you would typically send the data to your backend
        setShowThankYou(true)
    }

    const handleContactChange = (field: string, value: string) => {
        setContactInfo(prev => ({ ...prev, [field]: value }))
    }

    const isContactFormValid = () => {
        return contactInfo.email &&
            contactInfo.telephone &&
            contactInfo.surname &&
            contactInfo.zipCode &&
            contactInfo.street &&
            contactInfo.residence
    }

    const isNextDisabled = useMemo(() => {
        if (!productSlug) return true;
        if (currentStepIndex >= visibleSteps.length) return true; // Already at the end

        const currentStep = visibleSteps[currentStepIndex];
        if (!currentStep) return true;

        return !isStepComplete(currentStep);
    }, [productSlug, currentStepIndex, visibleSteps, answers]);


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

            <div className="absolute top-4 left-4">
                <Link href="/dashboard" className="inline-flex items-center text-sm text-green-700 hover:text-green-900">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Dashboard
                </Link>
            </div>
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
                                    width: `${visibleSteps.length > 0 ? (currentStepIndex / visibleSteps.length) * 100 : 0}%`
                                }}
                            />
                        </div>
                    )}

                    <CardContent className="p-6 space-y-6">

                        {currentStepIndex === 0 && (
                            <div>
                                <h3 className="font-semibold mb-2">
                                    Categorie
                                    <span className="text-red-500">*</span>
                                </h3>
                                <Select value={productSlug || ''} onValueChange={handleProductSelect} disabled={!!productSlug}>
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
                                {selectedProduct && <p className="text-sm text-muted-foreground mt-2">{selectedProduct.description}</p>}
                            </div>
                        )}

                        {visibleSteps.map((step, index) => {
                            if (index !== currentStepIndex) return null;

                            const visibleQuestions = selectedProduct ? getVisibleQuestionsForStep(step, selectedProduct, answers) : [];

                            return (
                                <div key={step.id} className="space-y-4 p-4 border rounded-lg bg-white shadow-sm">
                                    {visibleQuestions.includes(1) && renderQuestion(step, 1)}
                                    {visibleQuestions.includes(2) && step.question2 && (
                                        <div className="pt-4 border-t mt-4">
                                            {renderQuestion(step, 2)}
                                        </div>
                                    )}
                                    {visibleQuestions.length === 0 && <p className="text-muted-foreground">This step is currently hidden by conditional logic.</p>}
                                </div>
                            )
                        })}

                        {/* Complete Screen with Links */}
                        {currentStepIndex === visibleSteps.length - 1 && (
                            <div className="space-y-4">
                                <div className="flex gap-4 text-sm">
                                    <button
                                        onClick={() => setShowImageUpload(true)}
                                        className="text-green-700 hover:text-green-900 font-medium"
                                    >
                                        Add image
                                    </button>
                                    <span className="text-gray-400">|</span>
                                    <button
                                        onClick={() => setShowComments(true)}
                                        className="text-green-700 hover:text-green-900 font-medium"
                                    >
                                        Add comments
                                    </button>
                                </div>
                            </div>
                        )}
                        {/* Contact Form */}
                        {allComplete && !showThankYou && (
                            <div className="space-y-4">
                                <button
                                    onClick={handleGoBack}
                                    className="flex items-center text-sm text-gray-600 hover:text-gray-900"
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Contact
                                </button>

                                <form onSubmit={handleContactSubmit} className="space-y-4">
                                    <div>
                                        <label className="block font-medium mb-2">
                                            Email address<span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            placeholder="Enter here"
                                            value={contactInfo.email}
                                            onChange={(e) => handleContactChange('email', e.target.value)}
                                            required
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-medium mb-2">
                                            Telephone number<span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            placeholder="Enter here"
                                            value={contactInfo.telephone}
                                            onChange={(e) => handleContactChange('telephone', e.target.value)}
                                            required
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block font-medium mb-2">
                                                Surname<span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter here"
                                                value={contactInfo.surname}
                                                onChange={(e) => handleContactChange('surname', e.target.value)}
                                                required
                                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-medium mb-2">
                                                Zip code<span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter here"
                                                value={contactInfo.zipCode}
                                                onChange={(e) => handleContactChange('zipCode', e.target.value)}
                                                required
                                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block font-medium mb-2">
                                                Street / House number<span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter here"
                                                value={contactInfo.street}
                                                onChange={(e) => handleContactChange('street', e.target.value)}
                                                required
                                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-medium mb-2">
                                                Residence<span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter here"
                                                value={contactInfo.residence}
                                                onChange={(e) => handleContactChange('residence', e.target.value)}
                                                required
                                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                            />
                                        </div>
                                    </div>


                                </form>
                            </div>
                        )}

                        {/* Thank You Screen */}
                        {showThankYou && (
                            <div className="text-center py-12 space-y-4">
                                <h2 className="text-2xl font-bold text-green-700">Thank you!</h2>
                                <p className="text-gray-700">
                                    We have received your request and<br />
                                    will get back to you within 6 hours during our<br />
                                    regular working hours!
                                </p>
                                <div className="pt-4">
                                    <p className="font-medium">Kind regards</p>
                                    <p className="font-medium">GreenTeam</p>
                                </div>
                            </div>
                        )}

                        {/* Price Display */}
                        {(priceInfo.total > 0 || priceInfo.partial > 0) && !showThankYou && (
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

                        {/* Navigation */}
                        {!showThankYou && (
                            <div className="border-t pt-4 flex justify-between items-center">
                                {!showThankYou && <Button variant="ghost" onClick={handleGoBack} disabled={!productSlug && currentStepIndex === 0}>
                                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                                </Button>}

                                {!allComplete ? (
                                    <Button onClick={handleNext} disabled={isNextDisabled}>
                                        Next
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={handleContactSubmit}
                                        disabled={!isContactFormValid()}
                                    >
                                        Next
                                    </Button>
                                )}
                            </div>
                        )
                        }


                        {/* View Details Button - This is now part of the navigation footer */}
                        {/* {allComplete && priceInfo.isComplete && (
                                    <div className="text-center py-6 bg-green-50 border border-green-200 rounded-lg">
                                        <p className="text-xl font-bold text-green-700 mb-2">
                                            Calculation Complete!
                                        </p>
                                        <p className="text-muted-foreground">
                                            Your estimated price is ready.
                                        </p>
                                    </div>
                                )} */}
                    </CardContent>
                </Card>
            </div>
            {/* Image Upload Modal */}
            {showImageUpload && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                        <div className="bg-gradient-to-r from-green-700 to-green-800 text-white text-center py-6 rounded-t-lg">
                            <h2 className="text-lg font-semibold">Calculate your price quickly!</h2>
                        </div>

                        <div className="p-6 space-y-4">
                            <button
                                onClick={() => setShowImageUpload(false)}
                                className="flex items-center text-sm text-gray-600 hover:text-gray-900"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Go back
                            </button>

                            <div
                                onDrop={handleDrop}
                                onDragOver={(e) => e.preventDefault()}
                                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center"
                            >
                                <p className="text-gray-700 mb-2">Drag and drop files here or upload</p>
                                <p className="text-sm text-gray-500 mb-4">Accepted file types: JPEG, PNG</p>
                                <label className="inline-block">
                                    <input
                                        type="file"
                                        accept="image/jpeg,image/png"
                                        multiple
                                        onChange={handleFileUpload}
                                        className="hidden"
                                    />
                                    <span className="border-2 border-orange-500 text-orange-500 px-6 py-2 rounded cursor-pointer hover:bg-orange-50">
                                        Upload
                                    </span>
                                </label>
                            </div>

                            {uploadedImages.length > 0 && (
                                <div className="grid grid-cols-3 gap-2">
                                    {uploadedImages.map((img, idx) => (
                                        <img key={idx} src={img} alt="" className="w-full h-24 object-cover rounded" />
                                    ))}
                                </div>
                            )}

                            <button
                                onClick={() => setShowImageUpload(false)}
                                className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded font-medium"
                            >
                                Upload
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Comments Modal */}
            {showComments && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                        <div className="bg-gradient-to-r from-green-700 to-green-800 text-white text-center py-6 rounded-t-lg">
                            <h2 className="text-lg font-semibold">Calculate your price quickly!</h2>
                        </div>

                        <div className="p-6 space-y-4">
                            <button
                                onClick={() => setShowComments(false)}
                                className="flex items-center text-sm text-gray-600 hover:text-gray-900"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Go back
                            </button>

                            <div>
                                <label className="block font-medium mb-2">Comments</label>
                                <textarea
                                    value={comments}
                                    onChange={(e) => setComments(e.target.value)}
                                    placeholder="Leave your comment(s) here"
                                    className="w-full border border-gray-300 rounded-lg p-3 h-32 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                                />
                            </div>

                            <button
                                onClick={() => setShowComments(false)}
                                className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded font-medium"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}