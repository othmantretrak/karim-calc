// app/components/Homepage.tsx
'use client'
import { useState, useMemo, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from "@/components/ui/progress"
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
import { uploadToCloudinary } from '@/app/utils/cloudinary'

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
        if (currentStepIndex <= visibleSteps.length) {
            setCurrentStepIndex(prev => prev + 1);
        }
    };


    const handleAnswer = (questionId: string, value: string | number | null) => {
        setAnswer(questionId, value === null ? '' : value)
    }

    // Local state to control which checkbox-dropdown is open (questionId or null)
    const [openMultiSelect, setOpenMultiSelect] = useState<string | null>(null);
    const multiSelectRef = useRef<HTMLDivElement | null>(null);

    // Close dropdown on outside click
    useEffect(() => {
        function onDocClick(e: MouseEvent) {
            if (!openMultiSelect) return;
            if (multiSelectRef.current && !multiSelectRef.current.contains(e.target as Node)) {
                setOpenMultiSelect(null);
            }
        }
        document.addEventListener('mousedown', onDocClick);
        return () => document.removeEventListener('mousedown', onDocClick);
    }, [openMultiSelect]);

    // Check if a question is answered
    const isQuestionAnswered = (questionId: string) => {
        const answer = answers[questionId];
        return answer !== undefined && answer !== '' && answer !== null
    }

    const allComplete = useMemo(() => {
        return productSlug && visibleSteps.length > 0 && currentStepIndex >= visibleSteps.length;
    }, [productSlug, visibleSteps, currentStepIndex]);

    const isStepComplete = (step: FormStep) => {
        if (!selectedProduct) return false;
        const visibleQuestions = getVisibleQuestionsForStep(step, answers);

        for (const question of visibleQuestions) {
            if (question.required) {
                const answer = answers[question.id];
                if (answer === undefined || answer === '' || answer === null) {
                    return false; // If any required visible question is unanswered, step is not complete
                }
            }
        }
        return true; // All required visible questions are answered
    };


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
        /* upload first file */
        uploadToCloudinary(files[0]).then((data) => {
            setUploadedImages((prev: string[]) => [...prev, data.secure_url]);
        });
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
        if (currentStepIndex === 0) return false;
        if (currentStepIndex > visibleSteps.length) return true;

        const currentStep = visibleSteps[currentStepIndex];
        if (!currentStep) return true;

        return !isStepComplete(currentStep);
    }, [productSlug, currentStepIndex, visibleSteps, answers]);


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
            return (
                <div key={questionId} className="space-y-2">
                    <Label htmlFor={questionId} className="font-semibold">
                        {questionText}
                        <span className="text-red-500">*</span>
                    </Label>
                    <Select
                        value={answer as string || ''}
                        onValueChange={(value) => handleAnswer(questionId, value)}
                        disabled={isDisabled}
                        required
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={`Select ${questionText.toLowerCase()}`} />
                        </SelectTrigger>
                        <SelectContent className='w-full'>
                            {options.map((option) => (
                                <SelectItem key={option.id} value={option.value} className='w-full'>
                                    <div className="flex justify-evenly items-center w-full gap-4 group">
                                        <div className="flex items-center gap-3">
                                            <span>{option.label}</span>
                                        </div>
                                        {option.price !== null && option.price !== undefined && (
                                            <span className="text-sm text-muted-foreground">
                                                €{option.price.toFixed(2)}
                                            </span>
                                        )}
                                        {option.imageUrl && (
                                            <img
                                                src={option.imageUrl}
                                                alt={option.label}
                                                className="w-8 h-8 object-cover rounded transform transition-transform duration-200 group-hover:scale-110"
                                            />
                                        )}
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            )
        }

        if (type === 'CHECKBOX') {
            // Multi-select behavior using checkboxes. Store as comma-separated values in answers.
            const selectedValues = typeof answer === 'string' && answer !== '' ? (answer as string).split(',') : [];
            const toggleValue = (val: string) => {
                const set = new Set(selectedValues);
                if (set.has(val)) set.delete(val);
                else set.add(val);
                const arr = Array.from(set);
                handleAnswer(questionId, arr.join(','));
            };
            return (
                <div key={questionId} className="space-y-2">
                    <Label htmlFor={questionId} className="font-semibold">
                        {questionText}
                        <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setOpenMultiSelect(openMultiSelect === questionId ? null : questionId)}
                            className="w-full text-left"
                        >
                            <div className="border-input flex w-full items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-muted-foreground">{selectedValues.length > 0 ? `${selectedValues.length} selected` : `Select ${questionText.toLowerCase()}`}</span>
                                </div>
                                <svg className="w-4 h-4 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </div>
                        </button>
                        {openMultiSelect === questionId && (
                            <div ref={multiSelectRef} className="absolute z-50 mt-2 w-full bg-white border rounded-md shadow-lg p-3">
                                <div className="space-y-2 max-h-64 overflow-auto">
                                    {options.map((option) => {
                                        const checked = selectedValues.includes(option.value);
                                        return (
                                            <label key={option.id} className="flex items-center justify-between gap-4 p-2 border rounded-md group">
                                                <div className="flex items-center gap-3">
                                                    <span>{option.label}</span>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    {option.price !== null && option.price !== undefined && (
                                                        <span className="text-sm text-muted-foreground">€{option.price.toFixed(2)}</span>
                                                    )}
                                                    {option.imageUrl && (
                                                        <>
                                                            <img
                                                                src={option.imageUrl}
                                                                alt={option.label}
                                                                className="w-8 h-8 object-cover rounded transform transition-transform duration-200 group-hover:scale-150"
                                                            />

                                                            <img
                                                                src={option.imageUrl}
                                                                alt={option.label}
                                                                className="absolute w-0.5 h-0.5 object-cover transform transition-transform duration-200 group-hover:scale-10000 right-20"
                                                            />
                                                        </>
                                                    )}
                                                    <input type="checkbox" checked={checked} onChange={() => toggleValue(option.value)} />
                                                </div>
                                            </label>
                                        )
                                    })}
                                </div>
                                <div className="mt-3 flex justify-end">
                                    <button type="button" className="text-sm px-3 py-1 bg-green-700 text-white rounded" onClick={() => setOpenMultiSelect(null)}>Done</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )
        }

        if (type === 'NUMBER') {
            const numValue = typeof answer === 'number' ? answer : (answer ? parseFloat(answer as string) : minValue || 0)

            return (
                <div key={questionId} className="space-y-2">
                    <Label htmlFor={questionId} className="font-semibold">
                        {questionText} {unit && `(${unit})`}
                        <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id={questionId}
                        type="number"
                        min={minValue || 0}
                        max={maxValue || undefined}
                        required
                        step="1"
                        value={numValue}
                        onChange={(e) => {
                            const value = parseInt(e.target.value) || (minValue || 0)
                            handleAnswer(questionId, Math.max(minValue || 0, value))
                        }}
                        className="w-full"
                        disabled={isDisabled}
                    />
                    {pricePerUnit !== null && pricePerUnit !== undefined && (
                        <div className="text-sm text-muted-foreground bg-blue-50 p-3 rounded-md">
                            <div className="flex justify-between">
                                <span>Prijs per {unit || 'unit'}:</span>
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
                        <div className='flex flex-col items-end mr-5'>

                            <Progress value={((currentStepIndex) / visibleSteps.length) * 100} className="w-40" />
                        </div>
                    )}

                    <CardContent className="p-6 space-y-6">

                        {currentStepIndex === 0 && (
                            <div>
                                <h3 className="font-semibold mb-2">
                                    Categorie
                                    <span className="text-red-500">*</span>
                                </h3>
                                <Select value={productSlug || ''} onValueChange={handleProductSelect} >
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

                        {currentStepIndex >= 0 && visibleSteps.map((step, index) => {
                            if (index !== currentStepIndex) return null;

                            const visibleQuestions = getVisibleQuestionsForStep(step, answers);

                            return (
                                <div key={step.id} className="space-y-4 p-4 rounded-lg bg-white shadow-sm">
                                    {visibleQuestions.map(question => renderQuestion(question))}
                                    {visibleQuestions.length === 0 && <p className="text-muted-foreground">This step is currently hidden.</p>}
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
                                        Foto uploaden
                                    </button>
                                    <span className="text-gray-400">|</span>
                                    <button
                                        onClick={() => setShowComments(true)}
                                        className="text-green-700 hover:text-green-900 font-medium"
                                    >
                                        Opmerkingen toevoegen
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
                                    Vorige
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
                        {/* show a debugger block */}
                        {process.env.NODE_ENV === 'development' && (
                            <div className="border-t pt-4">
                                <h3 className="text-lg font-semibold">Debug Information</h3>
                                <p>allComplete: {allComplete ? 'Yes' : 'No'}</p>
                                <p>currentStepIndex: {currentStepIndex}</p>
                                <p>visibleSteps length: {visibleSteps.length}</p>
                                <pre className="text-xs bg-gray-100 p-2 rounded mt-2 overflow-auto">
                                    {JSON.stringify({ answers }, null, 2)}
                                </pre>
                            </div>
                        )}

                        {/* Price Display */}
                        {(priceInfo.total > 0 || priceInfo.partial > 0) && !showThankYou && (
                            <div className="border-t pt-4">
                                <div className="flex justify-between items-center text-lg font-semibold">
                                    <span>
                                        Totaal incl. btw.
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
                                    <ArrowLeft className="w-4 h-4 mr-2" /> Vorige
                                </Button>}

                                {!allComplete ? (
                                    <Button onClick={handleNext} disabled={isNextDisabled}>
                                        Volgende
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={handleContactSubmit}
                                        disabled={!isContactFormValid()}
                                    >
                                        Volgende
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
                            <h2 className="text-lg font-semibold">Snel uw prijs berekenen!</h2>
                        </div>

                        <div className="p-6 space-y-4">
                            <button
                                onClick={() => setShowImageUpload(false)}
                                className="flex items-center text-sm text-gray-600 hover:text-gray-900"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Ga terug
                            </button>

                            <div
                                onDrop={handleDrop}
                                onDragOver={(e) => e.preventDefault()}
                                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center"
                            >
                                <p className="text-gray-700 mb-2">Sleep bestanden hierheen of upload ze</p>
                                <p className="text-sm text-gray-500 mb-4">Geaccepteerde bestandstypen: JPEG, PNG</p>
                                <label className="inline-block">
                                    <input
                                        type="file"
                                        accept="image/jpeg,image/png"
                                        multiple
                                        onChange={handleFileUpload}
                                        className="hidden"
                                    />
                                    <span className="border-2 border-orange-500 text-orange-500 px-6 py-2 rounded cursor-pointer hover:bg-orange-500 hover:text-white transition-colors duration-300 ease-in-out">
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
                                className="w-full bg-green-700 hover:bg-white cursor-pointer hover:text-green-700 hover:border-green-700 border border-green-700 text-white py-3 rounded font-medium"
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
                            <h2 className="text-lg font-semibold">Snel uw prijs berekenen!</h2>
                        </div>

                        <div className="p-6 space-y-4">
                            <button
                                onClick={() => setShowComments(false)}
                                className="flex items-center text-sm text-gray-600 hover:text-gray-900"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Ga terug
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