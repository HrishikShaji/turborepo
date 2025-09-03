import CreateProduct from "./create-product/create-product";
import Products from "./products/products";

export const dynamic = "force-dynamic"

export default function Home() {
	return (
		<div className="h-screen bg-gray-200 w-full flex flex-col items-center justify-center gap-10">
			<CreateProduct />
			<Products />
		</div>
	);
}
