import { notFound } from "next/navigation";
import { catalog, productSlug } from "../../lib/products";
import ProductDetails from "../../components/ProductDetails";

export function generateStaticParams() {
  return catalog.map(product => ({ slug: productSlug(product.name) }));
}
export function generateMetadata({ params }: { params: { slug: string } }) {
  const product = catalog.find(item => productSlug(item.name) === params.slug);
  return { title: product ? `${product.name} | Amzad Food` : "Product not found" };
}
export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = catalog.find(item => productSlug(item.name) === params.slug);
  if (!product) notFound();
  const related = catalog.filter(item => item.name !== product.name).sort((a,b) => Number(b.category === product.category) - Number(a.category === product.category)).slice(0,4);
  return <ProductDetails product={product} related={related} />;
}
