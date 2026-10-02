"use client";

// Next keeps a page mounted when only its query string changes, so header links that
// target the catalog while it is open announce the change with this event instead.
export const CATALOG_CATEGORY_EVENT = "amzad:catalog-category";
export const COMBO_CATEGORY = "Combo Packs";

export const normaliseOrderId = (raw: string) => raw.trim().replace(/^#/, "").toUpperCase();

export function setCatalogCategory(category: string, mode: "push" | "replace" = "replace") {
  const url = new URL(window.location.href);
  if (category === "All") url.searchParams.delete("category"); else url.searchParams.set("category", category);
  if (mode === "push") window.history.pushState(null, "", url); else window.history.replaceState(null, "", url);
  window.dispatchEvent(new Event(CATALOG_CATEGORY_EVENT));
}

export const isCatalogPath = (pathname: string) => /(?:^|\/)products\/?$/.test(pathname);
