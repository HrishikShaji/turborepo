import { prisma, User } from "@repo/db";
import CreateProduct from "./create-product/create-product";
import Products from "./products/products";

export const dynamic = "force-dynamic"

export default async function Home() {
	const user = await prisma.user.findFirst() as User
	return (
		<div >
			{user?.email ?? "No user added yet"}
			<CreateProduct />
			<Products />
		</div>
	);
}
