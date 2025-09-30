import AdminProductsPage from '@/app/components/AdminProductsPage'
import { getAllProducts } from '@/app/actions/productActions'

export default async function AdminProductsPageServer() {
    const products = await getAllProducts()

    return <AdminProductsPage products={products} />
}