// components/icon.tsx
import {
    Bookmark,
    Ellipsis,
    Sparkles,
    CheckCircle2,
    Play,
    Pause,
    X,
  } from "lucide-react";
  
  export type IconName =
    | "sparkles"
    | "bookmark"
    | "bookmarkFilled"
    | "more"
    | "check"
    | "play"
    | "pause"
    | "close";

  function BookmarkFilled(props: { size?: number; className?: string }) {
    return (
      <Bookmark
        size={props.size}
        className={props.className}
        fill="currentColor"
        strokeWidth={0}
      />
    );
  }
  
  const ICONS = {
    sparkles: Sparkles,
    bookmark: Bookmark,
    bookmarkFilled: BookmarkFilled,
    more: Ellipsis,
    check: CheckCircle2,
    play: Play,
    pause: Pause,
    close: X,
  } as const;
  
  type Props = {
    name: IconName;
    size?: number;
    className?: string;
    strokeWidth?: number;
  };
  
  export function Icon({ name, size = 20, className, strokeWidth = 2 }: Props) {
    const Comp = ICONS[name];
    return <Comp size={size} className={className} strokeWidth={strokeWidth} />;
  }