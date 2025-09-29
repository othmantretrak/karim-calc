import Link from 'next/link'
import { Button } from '@/components/ui/button'
import HomePage from '@/components/Homepage'
import { getProductsForCalculator } from './actions/calculatorActions'

export const revalidate = 1 // Revalidate every second

export default async function Home() {
  const productForCalc = await getProductsForCalculator()

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Zorgeloos een klus uitbesteden tegen een scherpe prijs</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Gedreven door vakmanschap gaan we samen op zoek naar een passende en duurzame oplossing voor uw project.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/admin">
              <Button variant="outline">Admin Dashboard</Button>
            </Link>
          </div>
        </div>

        <HomePage products={productForCalc} />
      </div>
    </div>
  )
}