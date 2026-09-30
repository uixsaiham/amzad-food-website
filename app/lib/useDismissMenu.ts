"use client";

import { RefObject, useEffect } from "react";

export function useDismissMenu(open: boolean, menuRef: RefObject<HTMLElement>, triggerSelector: string, onClose: () => void) {
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Node) || menuRef.current?.contains(target)) return;
      // Let the trigger's click handler toggle the menu without reopening it.
      if (target instanceof Element && target.closest(triggerSelector)) return;
      onClose();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, menuRef, triggerSelector, onClose]);
}
