"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { trackEvent, type OffertlyEvent } from "@/lib/analytics";

type Props = ComponentProps<typeof Link> & {
  event: OffertlyEvent;
};

export function TrackedLink({ event, onClick, ...props }: Props) {
  return (
    <Link
      {...props}
      onClick={(mouseEvent) => {
        trackEvent(event);
        onClick?.(mouseEvent);
      }}
    />
  );
}
