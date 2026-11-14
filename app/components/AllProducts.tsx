"use client";
import Storefront, { ProductCatalog } from "./Storefront";
import Reviews from "./Reviews";

export default function AllProducts() {
  return <Storefront>{(actions) => <><ProductCatalog {...actions} /><Reviews /></>}</Storefront>;
}
