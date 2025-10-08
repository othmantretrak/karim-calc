// app/actions/productActions.ts
'use server'

import prisma from '@/app/lib/prisma';
import { revalidatePath } from 'next/cache'

// Redefined interfaces for server-side action clarity, matching productFormTypes.ts
interface OptionData {
    label: string;
    value: string;
    price: number | null;
    order: number;
    imageUrl?: string | null;
    imagePublicId?: string | null;
    tempId?: string;
}

interface QuestionData {
    tempId?: string;
    id?: string;
    order: number;
    type: 'SELECT' | 'NUMBER' | 'CHECKBOX';
    question: string;
    required: boolean;
    pricingImpact: 'BASE' | 'MULTIPLIER' | 'ADDITIVE' | 'NONE';
    pricePerUnit?: number | null;
    unit?: string | null;
    minValue?: number | null;
    maxValue?: number | null;
    defaultValue?: number | null;
    conditionalOn?: { questionId: string, value: any } | null;
    options?: OptionData[];
}

interface StepData {
    tempId?: string;
    id?: string;
    order: number;
    questions: QuestionData[];
}

interface ProductFormData {
    name: string;
    slug: string;
    description?: string;
    steps: StepData[];
}

export async function createProduct(formData: ProductFormData) {
    try {
        if (!formData.name || !formData.slug) {
            return { success: false, error: 'Product name and slug are required' };
        }

        const existingProduct = await prisma.product.findUnique({
            where: { slug: formData.slug },
        });

        if (existingProduct) {
            return { success: false, error: 'A product with this slug already exists' };
        }

        const result = await prisma.$transaction(async (tx) => {
            const product = await tx.product.create({
                data: {
                    name: formData.name,
                    slug: formData.slug,
                    description: formData.description || null,
                },
            });

            const questionIdMap = new Map<string, string>();
            const questionsToUpdate: { id: string, conditionalOn: any }[] = [];

            for (const stepData of formData.steps) {
                const step = await tx.formStep.create({
                    data: {
                        productId: product.id,
                        order: stepData.order,
                    },
                });

                for (const questionData of stepData.questions) {
                    const { tempId, options, conditionalOn, ...restOfQuestion } = questionData;

                    const question = await tx.question.create({
                        data: {
                            stepId: step.id,
                            ...restOfQuestion,
                            options: {
                                create: options?.map((o) => {
                                    const rest = { ...(o as any) } as any;
                                    delete rest.tempId;
                                    delete rest.questionTempId;
                                    return rest;
                                }), // Remove temp IDs
                            },
                        },
                    });

                    if (tempId) {
                        questionIdMap.set(tempId, question.id);
                    }

                    if (conditionalOn && conditionalOn.questionId) {
                        questionsToUpdate.push({ id: question.id, conditionalOn });
                    }
                }
            }

            // Second pass to update conditional logic with the newly created question IDs
            for (const { id, conditionalOn } of questionsToUpdate) {
                const realQuestionId = questionIdMap.get(conditionalOn.questionId);
                if (realQuestionId) {
                    await tx.question.update({
                        where: { id },
                        data: {
                            conditionalOn: {
                                questionId: realQuestionId,
                                value: conditionalOn.value
                            },
                        },
                    });
                }
            }

            return product;
        }, { timeout: 15000 }); // <-- increased interactive transaction timeout to 30s

        revalidatePath('/products');
        revalidatePath('/');

        return { success: true, productId: result.id, slug: result.slug };
    } catch (error) {
        console.error('Error creating product:', error);
        return { success: false, error: 'Failed to create product' };
    }
}

export async function updateProduct(productId: string, formData: ProductFormData) {
    try {
        if (!formData.name || !formData.slug) {
            return { success: false, error: 'Product name and slug are required' };
        }
        console.log('Updating product with data:', formData);
        const existingProduct = await prisma.product.findUnique({
            where: { id: productId },
        });

        if (!existingProduct) {
            return { success: false, error: 'Product not found' };
        }

        const slugConflict = await prisma.product.findFirst({
            where: {
                slug: formData.slug,
                id: { not: productId },
            },
        });

        if (slugConflict) {
            return { success: false, error: 'This slug is already used by another product' };
        }

        await prisma.$transaction(async (tx) => {
            // Update product basic info
            await tx.product.update({
                where: { id: productId },
                data: {
                    name: formData.name,
                    slug: formData.slug,
                    description: formData.description || null,
                },
            });

            // Delete old steps, questions, and options
            await tx.formStep.deleteMany({ where: { productId } });

            // Re-create steps, questions, and options from formData
            const questionIdMap = new Map<string, string>();
            const questionsToUpdate: { id: string, conditionalOn: any }[] = [];

            for (const stepData of formData.steps) {
                const step = await tx.formStep.create({
                    data: {
                        productId: productId,
                        order: stepData.order,
                    },
                });

                for (const questionData of stepData.questions) {
                    const { tempId, options, conditionalOn, ...restOfQuestion } = questionData;

                    const question = await tx.question.create({
                        data: {
                            stepId: step.id,
                            ...restOfQuestion,
                            options: {
                                create: options?.map((o) => {
                                    const rest = { ...(o as any) } as any;
                                    delete rest.tempId;
                                    delete rest.questionTempId;
                                    return rest;
                                }), // Remove temp IDs
                            },
                        },
                    });

                    if (tempId) {
                        questionIdMap.set(tempId, question.id);
                    }

                    if (conditionalOn && conditionalOn.questionId) {
                        questionsToUpdate.push({ id: question.id, conditionalOn });
                    }
                }
            }

            // Second pass to update conditional logic with the newly created question IDs
            for (const { id, conditionalOn } of questionsToUpdate) {
                const realQuestionId = questionIdMap.get(conditionalOn.questionId);
                if (realQuestionId) {
                    await tx.question.update({
                        where: { id },
                        data: {
                            conditionalOn: {
                                questionId: realQuestionId,
                                value: conditionalOn.value
                            },
                        },
                    });
                }
            }
        }, { timeout: 15000 }); // <-- increased interactive transaction timeout to 30s

        revalidatePath('/products');
        revalidatePath(`/products/${formData.slug}`);
        revalidatePath('/');

        return { success: true, productId, slug: formData.slug };
    } catch (error) {
        console.error('Error updating product:', error);
        return { success: false, error: 'Failed to update product' };
    }
}

export async function deleteProduct(productId: string) {
    try {
        const product = await prisma.product.findUnique({
            where: { id: productId }
        })

        if (!product) {
            return { success: false, error: 'Product not found' }
        }

        await prisma.product.delete({
            where: { id: productId },
        })

        revalidatePath('/products')
        revalidatePath('/')

        return { success: true }
    } catch (error) {
        console.error('Error deleting product:', error)
        return { success: false, error: 'Failed to delete product' }
    }
}


export async function getAllProducts() {
    try {
        const products = await prisma.product.findMany({
            include: {
                steps: {
                    orderBy: { order: 'asc' },
                    include: {
                        questions: {
                            orderBy: { order: 'asc' },
                            include: {
                                options: {
                                    orderBy: { order: 'asc' },
                                },
                            },
                        },
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });

        // The structure should now be correct, just need to cast conditionalOn
        return products.map(product => ({
            ...product,
            baseImage: (product as any).baseImageUrl ?? null,
            steps: product.steps.map(step => ({
                ...step,
                questions: step.questions.map(question => ({
                    ...question,
                    conditionalOn: question.conditionalOn as { questionId: string, value: any } | null,
                })),
            })),
        }));
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

export async function getProductBySlug(slug: string) {
    try {
        const product = await prisma.product.findUnique({
            where: { slug },
            include: {
                steps: {
                    orderBy: { order: 'asc' },
                    include: {
                        questions: {
                            orderBy: { order: 'asc' },
                            include: {
                                options: {
                                    orderBy: { order: 'asc' },
                                },
                            },
                        },
                    },
                },
            },
        });

        if (!product) {
            return null;
        }

        // The structure should now be correct, just need to cast conditionalOn
        return {
            ...product,
            baseImage: (product as any).baseImageUrl ?? null,
            steps: product.steps.map(step => ({
                ...step,
                questions: step.questions.map(question => ({
                    ...question,
                    conditionalOn: question.conditionalOn as { questionId: string, value: any } | null,
                })),
            })),
        };
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
}

export async function getProductById(id: string) {
    try {
        const product = await prisma.product.findUnique({
            where: { id },
            include: {
                steps: {
                    orderBy: { order: 'asc' },
                    include: {
                        questions: {
                            orderBy: { order: 'asc' },
                            include: {
                                options: {
                                    orderBy: { order: 'asc' },
                                },
                            },
                        },
                    },
                },
            },
        });

        if (!product) {
            return null;
        }

        // The structure should now be correct, just need to cast conditionalOn
        return {
            ...product,
            baseImage: (product as any).baseImageUrl ?? null,
            steps: product.steps.map(step => ({
                ...step,
                questions: step.questions.map(question => ({
                    ...question,
                    conditionalOn: question.conditionalOn as { questionId: string, value: any } | null,
                })),
            })),
        };
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
}