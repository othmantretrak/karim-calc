// app/utils/priceCalculator.ts
import { Product, FormStep, PriceBreakdown } from '@/app/types/formBuilder'

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
    let baseSet = false // This variable is correctly closed over

    // 1. Determine which steps are visible and should be included in calculation
    const stepsToProcess = getVisibleSteps(product, answers);

    function processAnswer(
        step: FormStep,
        answer: string | number,
        questionNum: 1 | 2,
        mults: Array<{ label: string; factor: number }>,
        adds: Array<{ label: string; amount: number }>
    ) {
        const pricingImpact = questionNum === 1 ? step.pricingImpact1 : step.pricingImpact2
        const pricePerUnit = questionNum === 1 ? step.pricePerUnit1 : step.pricePerUnit2
        const question = questionNum === 1 ? step.question1 : step.question2

        switch (pricingImpact) {
            case 'BASE': {
                const selectedOption = step.options?.find(
                    opt => opt.value === answer && opt.questionNum === questionNum
                )
                // FIX: Removed !baseSet check and changed to += for accumulation
                if (selectedOption?.price !== null && selectedOption?.price !== undefined) {
                    basePrice += selectedOption.price // Accumulate base prices
                    baseSet = true // Indicate that at least one base price has been set
                }
                break
            }

            case 'MULTIPLIER': {
                const multiplier = typeof answer === 'number' ? answer : parseFloat(answer as string)
                if (!isNaN(multiplier) && multiplier > 0) {
                    mults.push({
                        label: question || '',
                        factor: multiplier,
                    })
                }
                break
            }

            case 'ADDITIVE': {
                const quantity = typeof answer === 'number' ? answer : parseFloat(answer as string)
                if (!isNaN(quantity) && pricePerUnit !== null && pricePerUnit !== undefined) {
                    const addition = quantity * pricePerUnit
                    adds.push({
                        label: question || '',
                        amount: addition,
                    })
                }
                break
            }

            case 'NONE':
            default:
                break
        }
    }

    // 2. Iterate only over visible steps
    for (const step of stepsToProcess) {
        // Process Question 1
        const answer1 = answers[`${step.id}_q1`]
        if (answer1 !== undefined && answer1 !== '' && answer1 !== null) {
            processAnswer(step, answer1, 1, multipliers, additions)
        }

        // Process Question 2 if exists
        if (step.question2) {
            const answer2 = answers[`${step.id}_q2`]
            if (answer2 !== undefined && answer2 !== '' && answer2 !== null) {
                processAnswer(step, answer2, 2, multipliers, additions)
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
    if (!product || !product.steps) return [];

    const visibleSteps: FormStep[] = [];

    // We iterate over all steps (which should be sorted by order initially)
    for (const step of product.steps) {
        if (!step.conditionalOn) {
            visibleSteps.push(step);
            continue;
        }

        const condition = step.conditionalOn as { stepId: string; questionNum: number | 1 | 2; value: string };

        // Construct the answer key based on the stored conditional logic
        const conditionKey = `${condition.stepId}_q${condition.questionNum}`;
        const actualAnswer = answers[conditionKey];

        // Check if the condition is met
        if (actualAnswer === condition.value) {
            visibleSteps.push(step);
        }
    }

    // Sort by order to ensure consistent progression (necessary if product.steps wasn't sorted)
    return visibleSteps.sort((a, b) => a.order - b.order);
}

/**
 * Check if all required questions in a step are answered
 */
function isStepComplete(step: FormStep, answers: Record<string, string | number>): boolean {
    const answer1 = answers[`${step.id}_q1`]
    const q1Complete = answer1 !== undefined && answer1 !== '' && answer1 !== null

    // Check if Q1 is required and answered
    if (step.required1 && !q1Complete) return false;

    if (!step.question2) return q1Complete || !step.required1

    const answer2 = answers[`${step.id}_q2`]
    const q2Complete = answer2 !== undefined && answer2 !== '' && answer2 !== null

    // Check if Q2 is required and answered
    if (step.required2 && !q2Complete) return false;

    // If Q2 exists, both must be answered if they are required/present.
    if (step.question2) {
        return q1Complete && q2Complete;
    }
    return q1Complete;
}

/**
 * Check if all required steps are answered
 */
export function areAllStepsComplete(
    product: Product,
    answers: Record<string, string | number>
): boolean {
    const visibleSteps = getVisibleSteps(product, answers)

    return visibleSteps
        .filter(step => step.required1 || (step.question2 && step.required2))
        .every(step => isStepComplete(step, answers))
}

/**
 * Calculate a partial/preview price (for showing "starting from" prices)
 */
export function calculatePartialPrice(
    product: Product,
    answers: Record<string, string | number>
): number {
    let basePrice = 0
    const multipliers: Array<{ factor: number }> = [] // Simplified, no labels needed
    const additions: Array<{ amount: number }> = []
    let baseSet = false

    // 1. Determine which steps are visible and should be included in calculation
    const stepsToProcess = getVisibleSteps(product, answers);

    function processPartialAnswer(
        step: FormStep,
        answer: string | number,
        questionNum: 1 | 2,
        mults: Array<{ factor: number }>,
        adds: Array<{ amount: number }>
    ) {
        const pricingImpact = questionNum === 1 ? step.pricingImpact1 : step.pricingImpact2
        const pricePerUnit = questionNum === 1 ? step.pricePerUnit1 : step.pricePerUnit2

        switch (pricingImpact) {
            case 'BASE': {
                const selectedOption = step.options?.find(
                    opt => opt.value === answer && opt.questionNum === questionNum
                )
                // FIX: Removed !baseSet check and changed to += for accumulation
                if (selectedOption?.price !== null && selectedOption?.price !== undefined) {
                    basePrice += selectedOption.price // Accumulate base prices
                    baseSet = true // Indicate that at least one base price has been set
                }
                break
            }

            case 'MULTIPLIER': {
                const multiplier = typeof answer === 'number' ? answer : parseFloat(answer as string)
                if (!isNaN(multiplier) && multiplier > 0) {
                    mults.push({ factor: multiplier })
                }
                break
            }

            case 'ADDITIVE': {
                const quantity = typeof answer === 'number' ? answer : parseFloat(answer as string)
                if (!isNaN(quantity) && pricePerUnit !== null && pricePerUnit !== undefined) {
                    const addition = quantity * pricePerUnit
                    adds.push({ amount: addition })
                }
                break
            }

            case 'NONE':
            default:
                break
        }
    }

    // 2. Iterate only over visible steps
    for (const step of stepsToProcess) {
        // Process Question 1
        const answer1 = answers[`${step.id}_q1`]
        if (answer1 !== undefined && answer1 !== '' && answer1 !== null) {
            processPartialAnswer(step, answer1, 1, multipliers, additions)
        }

        // Process Question 2 if exists
        if (step.question2) {
            const answer2 = answers[`${step.id}_q2`]
            if (answer2 !== undefined && answer2 !== '' && answer2 !== null) {
                processPartialAnswer(step, answer2, 2, multipliers, additions)
            }
        }
    }

    if (!baseSet) return 0 // If no BASE option was ever selected, return 0 (or a default starting price logic)

    let price = basePrice
    // Apply all multipliers
    const prodMult = multipliers.reduce((acc, m) => acc * m.factor, 1)
    price *= prodMult
    // Apply all additions
    const sumAdd = additions.reduce((acc, a) => acc + a.amount, 0)
    price += sumAdd

    return price
}