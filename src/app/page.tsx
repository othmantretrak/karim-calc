// app/page.tsx
import prisma from '@/app/lib/prisma'
import HomePage from '@/components/Homepage'
import { Product, FormStep } from './types/formBuilder'

export default async function Page() {
  // Fetch all products with their form steps and options
  const productsData = await prisma.product.findMany({
    include: {
      steps: {
        include: {
          options: {
            orderBy: {
              order: 'asc'
            }
          }
        },
        orderBy: {
          order: 'asc'
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  // Transform the data to match the Product type
  // Convert conditionalOn from Json to proper type and ensure it includes questionNum
  const products = productsData.map((product): Product => ({
    ...product,
    steps: product.steps.map((step): FormStep => ({
      ...step,
      conditionalOn1: step.conditionalOn1
        ? {
          ...(step.conditionalOn1 as { stepId: string; value: string }),
          questionNum: (step.conditionalOn1 as { questionNum?: 1 | 2 }).questionNum || 1
        }
        : null,
      conditionalOn2: step.conditionalOn2
        ? {
          ...(step.conditionalOn2 as { stepId: string; value: string }),
          questionNum: (step.conditionalOn2 as { questionNum?: 1 | 2 }).questionNum || 1
        }
        : null
    }))
  }))

  return <HomePage products={products} />
}