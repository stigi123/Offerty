"use client";

import Link from "next/link";
import type { ComponentProps, ComponentPropsWithoutRef } from "react";
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

type AnchorProps = ComponentPropsWithoutRef<"a"> & {
  event: OffertlyEvent;
};

/** Native <a> for mailto and other non-app URLs. */
export function TrackedAnchor({ event, onClick, ...props }: AnchorProps) {
  return (
    <a
      {...props}
      onClick={(mouseEvent) => {
        trackEvent(event);
        onClick?.(mouseEvent);
      }}
    />
  );
}
