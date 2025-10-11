import React, { useEffect, useRef, useState } from 'react'
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Question } from '@/app/types/formBuilder';
import useStore from '@/lib/store';
import { Input } from '../ui/input';

type RenderQuestionProps = {
    question: Question
    isDisabled?: boolean
}

const RenderQuestion: React.FC<RenderQuestionProps> = ({ question, isDisabled = false }) => {
    const { answers, setAnswer } = useStore()
    const {
        id: questionId,
        type,
        question: questionText,
        unit,
        minValue,
        maxValue,
        pricePerUnit,
        options
    } = question;
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
    if (!questionText) return null

    const answer = answers[questionId]



    const handleAnswer = (questionId: string, value: string | number | null) => {
        setAnswer(questionId, value === null ? '' : value)
    }

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
                                            className="w-8 h-8 object-cover rounded transform transition-transform duration-200 hover:scale-110"
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
                                <span className="text-sm text-muted-foreground">{selectedValues.length > 0 ? `${selectedValues.length} geselecteerd` : `Select ${questionText.toLowerCase()}`}</span>
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
                                        <label key={option.id} className="flex items-center justify-between gap-4 p-2 border rounded-md ">
                                            <div className="flex items-center gap-3">
                                                <span>{option.label}</span>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                {option.price !== null && option.price !== undefined && (
                                                    <span className="text-sm text-muted-foreground">€{option.price.toFixed(2)}</span>
                                                )}
                                                {option.imageUrl && (
                                                    <div className="group">
                                                        <img
                                                            src={option.imageUrl}
                                                            alt={option.label}
                                                            className="w-8 h-8 object-cover rounded transform transition-transform duration-200 group-hover:scale-150"
                                                        />
                                                        <img
                                                            src={option.imageUrl}
                                                            alt={option.label}
                                                            className="absolute w-0.5 h-0.5 object-cover transform transition-transform duration-200 group-hover:scale-10000 right-15"
                                                        />
                                                    </div>
                                                )}
                                                <input type="checkbox" checked={checked} onChange={() => toggleValue(option.value)} />
                                            </div>
                                        </label>
                                    )
                                })}
                            </div>
                            <div className="mt-3 flex justify-end">
                                <button type="button" className="text-sm px-3 py-1 bg-green-700 text-white rounded" onClick={() => setOpenMultiSelect(null)}>Klaar</button>
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
                    {questionText}
                    <span className="text-red-500">*</span>
                </Label>
                <Input
                    id={questionId}
                    type="number"
                    min={minValue || 0}
                    max={maxValue || undefined}
                    required
                    step="1"
                    value={numValue === 0 ? "" : numValue}
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


export default RenderQuestion