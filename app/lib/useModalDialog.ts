"use client";

import { RefObject, useEffect } from "react";

const stack: symbol[] = [];
let previousOverflow = "";

// Share the scroll lock and keyboard ownership when dialogs overlap.
export function useModalDialog(ref: RefObject<HTMLElement>, open: boolean, onClose: () => void) {
  useEffect(() => {
    if (!open) return;
    const token = Symbol("dialog");
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    if (stack.length === 0) {
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    }
    stack.push(token);
    const controls = () => Array.from(ref.current?.querySelectorAll<HTMLElement>(
      'button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), a[href], [tabindex]:not([tabindex="-1"])'
    ) ?? []).filter(element => element.getClientRects().length > 0 && element.tabIndex >= 0);
    (controls()[0] ?? ref.current)?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (stack[stack.length - 1] !== token) return;
      if (event.key === "Escape") { event.preventDefault(); event.stopImmediatePropagation(); onClose(); }
      if (event.key !== "Tab") return;
      const elements = controls();
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (!first) { event.preventDefault(); ref.current?.focus(); return; }
      if (!ref.current?.contains(document.activeElement) || (event.shiftKey && document.activeElement === first) || (!event.shiftKey && document.activeElement === last)) {
        event.preventDefault(); (event.shiftKey ? last : first).focus();
      }
    };
    document.addEventListener("keydown", onKey, true);
    return () => {
      const wasTop = stack[stack.length - 1] === token;
      stack.splice(stack.indexOf(token), 1);
      document.removeEventListener("keydown", onKey, true);
      if (stack.length === 0) document.body.style.overflow = previousOverflow;
      if (wasTop && previousFocus?.isConnected) previousFocus.focus();
    };
  }, [ref, open, onClose]);
}
