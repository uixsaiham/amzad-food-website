"use client";
import Storefront, { ProductCatalog } from "./Storefront";
import Reviews from "./Reviews";
import BlogSection from "./BlogSection";

export default function AllProducts() {
  return <Storefront>{(actions) => <><ProductCatalog {...actions} /><Reviews /><BlogSection /></>}</Storefront>;
}
