"use client";
import Storefront, { ProductCatalog } from "./Storefront";

export default function AllProducts() {
  return <Storefront>{(actions) => <ProductCatalog {...actions} />}</Storefront>;
}
