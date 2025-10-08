// app/page.tsx
import prisma from '@/app/lib/prisma'
import HomePage from '@/components/Homepage'
import { Product, Question } from './types/formBuilder'

export default async function Page() {
  // Fetch all products with their form steps and options
  const productsData = await prisma.product.findMany({
    include: {
      steps: {
        orderBy: {
          order: 'asc'
        },
        include: {
          questions: {
            orderBy: {
              order: 'asc'
            },
            include: {
              options: {
                orderBy: {
                  order: 'asc'
                }
              }
            }
          }
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  // Transform the data to match the Product type
  // Cast `conditionalOn` from JsonValue to the correct object type.
  const products = productsData.map((product): Product => ({
    ...product,
    baseImage: product.baseImageUrl, // Map DB field `baseImageUrl` to the `baseImage` type property
    steps: product.steps.map((step) => ({
      ...step,
      questions: step.questions.map(q => ({ ...q, conditionalOn: q.conditionalOn as Question['conditionalOn'] }))
    }))
  }));

  return <HomePage products={products} />
}