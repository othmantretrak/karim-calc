// app/utils/priceCalculator.ts
import { Product, FormStep, PriceBreakdown, Question } from '@/app/types/formBuilder'

/**
 * Calculate the total price based on user answers
 */
export function calculatePrice(
    product: Product,
    answers: Record<string, string | number>
): PriceBreakdown {
    let basePrice = 0
    const multipliers: Array<{ label: string; factor: number }> = []
    const additions: Array<{ label: string; amount: number }> = []

    // 1. Determine which steps are visible and should be included in calculation
    const visibleSteps = getVisibleSteps(product, answers);

    for (const step of visibleSteps) {
        const visibleQuestions = getVisibleQuestionsForStep(step, answers);

        for (const question of visibleQuestions) {
            const answer = answers[question.id];
            // Normalize checkbox answers stored as comma-separated strings into arrays when needed
            if (question.type === 'SELECT' || question.type === 'NUMBER' || question.type === 'CHECKBOX') {
                // nothing special here, but for CHECKBOX we'll accept comma-separated strings below
            }

            if (answer === undefined || answer === '' || answer === null) {
                continue;
            }

            switch (question.pricingImpact) {
                case 'BASE': {
                    // For checkbox multi-selects, base pricing should add prices for all selected options
                    if (question.type === 'CHECKBOX') {
                        const vals = typeof answer === 'string' ? (answer as string).split(',').filter(Boolean) : Array.isArray(answer) ? answer : [];
                        for (const v of vals) {
                            const opt = question.options?.find(o => o.value === v);
                            if (opt && opt.price !== null && opt.price !== undefined) basePrice += opt.price;
                        }
                    } else {
                        const selectedOption = question.options?.find(opt => opt.value === answer);
                        if (selectedOption?.price !== null && selectedOption?.price !== undefined) {
                            basePrice += selectedOption.price;
                        }
                    }
                    break;
                }
                case 'MULTIPLIER': {
                    const multiplier = typeof answer === 'number' ? answer : parseFloat(answer as string);
                    if (!isNaN(multiplier) && multiplier > 0) {
                        multipliers.push({
                            label: question.question || '',
                            factor: multiplier,
                        });
                    }
                    break;
                }
                case 'ADDITIVE': {
                    const quantity = typeof answer === 'number' ? answer : parseFloat(answer as string);
                    if (!isNaN(quantity) && question.pricePerUnit !== null && question.pricePerUnit !== undefined) {
                        const addition = quantity * question.pricePerUnit;
                        additions.push({
                            label: question.question || '',
                            amount: addition,
                        });
                    }
                    break;
                }
                case 'NONE':
                default:
                    break;
            }
        }
    }

    let total = basePrice
    // Apply all multipliers
    const prodMult = multipliers.reduce((acc, m) => acc * m.factor, 1)
    total *= prodMult
    // Apply all additions
    const sumAdd = additions.reduce((acc, a) => acc + a.amount, 0)
    total += sumAdd

    return {
        basePrice,
        multipliers,
        additions,
        total,
    }
}

/**
 * Get all visible steps for the current answers
 */
export function getVisibleSteps(product: Product, answers: Record<string, string | number>): FormStep[] {
    if (!product || !product.steps) return []

    // A step is visible if at least one of its questions is visible.
    const visibleSteps = product.steps.filter(step => {
        return getVisibleQuestionsForStep(step, answers).length > 0;
    });

    return visibleSteps.sort((a, b) => a.order - b.order);
}

/**
 * Get visible questions for a given step based on answers.
 */
export function getVisibleQuestionsForStep(step: FormStep, answers: Record<string, string | number>): Question[] {
    if (!step || !step.questions) return [];

    return step.questions
        .filter(question => {
            if (!question.conditionalOn) {
                return true; // Always visible if no condition
            }
            const { questionId, value } = question.conditionalOn;
            const actualAnswer = answers[questionId];
            if (actualAnswer === undefined || actualAnswer === null) return false;

            // If the referenced question is a checkbox multi-select saved as comma-separated values,
            // check whether the required value is included.
            if (typeof actualAnswer === 'string' && actualAnswer.includes(',')) {
                const parts = actualAnswer.split(',').filter(Boolean);
                return parts.includes(String(value));
            }

            return actualAnswer === value;
        })
        .sort((a, b) => a.order - b.order);
}

/**
 * Check if all required questions in a step are answered
 */
function areStepQuestionsComplete(questions: Question[], answers: Record<string, string | number>): boolean {
    for (const question of questions) {
        if (question.required) {
            const answer = answers[question.id];
            if (answer === undefined || answer === '' || answer === null) {
                return false;
            }
        }
    }
    return true;
}

/**
 * Check if all required steps are answered
 */
export function areAllStepsComplete(
    product: Product,
    answers: Record<string, string | number>
): boolean {
    const visibleSteps = getVisibleSteps(product, answers);
    for (const step of visibleSteps) {
        const visibleQuestions = getVisibleQuestionsForStep(step, answers);
        if (!areStepQuestionsComplete(visibleQuestions, answers)) {
            return false;
        }
    }
    return true;
}

/**
 * Calculate a partial/preview price (for showing "starting from" prices)
 */
export function calculatePartialPrice(
    product: Product,
    answers: Record<string, string | number>
): number {
    let basePrice = 0;
    const multipliers: Array<{ factor: number }> = [];
    const additions: Array<{ amount: number }> = [];
    let basePriceSet = false;

    const visibleSteps = getVisibleSteps(product, answers);

    for (const step of visibleSteps) {
        const visibleQuestions = getVisibleQuestionsForStep(step, answers);

        for (const question of visibleQuestions) {
            const answer = answers[question.id];
            if (answer === undefined || answer === '' || answer === null) {
                continue;
            }

            switch (question.pricingImpact) {
                case 'BASE': {
                    if (question.type === 'CHECKBOX') {
                        const vals = typeof answer === 'string' ? (answer as string).split(',').filter(Boolean) : Array.isArray(answer) ? answer : [];
                        for (const v of vals) {
                            const opt = question.options?.find(o => o.value === v);
                            if (opt && opt.price !== null && opt.price !== undefined) {
                                basePrice += opt.price;
                                basePriceSet = true;
                            }
                        }
                    } else {
                        const selectedOption = question.options?.find(opt => opt.value === answer);
                        if (selectedOption?.price !== null && selectedOption?.price !== undefined) {
                            basePrice += selectedOption.price;
                            basePriceSet = true;
                        }
                    }
                    break;
                }
                case 'MULTIPLIER': {
                    const multiplier = typeof answer === 'number' ? answer : parseFloat(answer as string);
                    if (!isNaN(multiplier) && multiplier > 0) {
                        multipliers.push({ factor: multiplier });
                    }
                    break;
                }
                case 'ADDITIVE': {
                    const quantity = typeof answer === 'number' ? answer : parseFloat(answer as string);
                    if (!isNaN(quantity) && question.pricePerUnit !== null && question.pricePerUnit !== undefined) {
                        const addition = quantity * question.pricePerUnit;
                        additions.push({ amount: addition });
                    }
                    break;
                }
                case 'NONE':
                default:
                    break;
            }
        }
    }

    if (!basePriceSet) return 0; // If no BASE option was ever selected, return 0

    let price = basePrice
    // Apply all multipliers
    const prodMult = multipliers.reduce((acc, m) => acc * m.factor, 1)
    price *= prodMult
    // Apply all additions
    const sumAdd = additions.reduce((acc, a) => acc + a.amount, 0)
    price += sumAdd

    return price
}