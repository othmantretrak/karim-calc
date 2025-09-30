import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-background">
            <header className="border-b">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Link href="/admin" className="text-xl font-bold">
                                Admin Dashboard
                            </Link>
                            <nav className="hidden md:flex space-x-4">
                                <Link href="/dashboard">
                                    <Button variant="ghost">Products</Button>
                                </Link>
                            </nav>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link href="/">
                                <Button variant="outline">View Store</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>
            <main>{children}</main>
        </div>
    )
}