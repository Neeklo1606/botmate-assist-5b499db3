/**
 * Reveal / RevealGroup / RevealItem — обёртки над framer-motion с пресетами.
 * Поддерживают тег через `as` (div | section | article | li | ol | ul).
 * Используются в секциях лендинга и карточках кабинета.
 */
import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { fadeUp, stagger, staggerItem, inViewProps, onMountProps } from "@/lib/motion";

type AsTag = "div" | "section" | "article" | "li" | "ol" | "ul" | "header";

type CommonProps<T extends AsTag> = HTMLMotionProps<T> & {
  as?: T;
  onMount?: boolean;
};

interface RevealProps extends Omit<HTMLMotionProps<"div">, "variants" | "initial" | "animate" | "whileInView"> {
  onMount?: boolean;
  delay?: number;
}

export function Reveal({ onMount = false, delay, transition, ...rest }: RevealProps) {
  const trigger = onMount ? onMountProps : inViewProps;
  return (
    <motion.div
      variants={fadeUp}
      transition={
        delay !== undefined
          ? { delay, duration: 0.4, ease: [0.2, 0.8, 0.2, 1], ...transition }
          : transition
      }
      {...trigger}
      {...rest}
    />
  );
}

export function RevealGroup<T extends AsTag = "div">({
  as,
  onMount = false,
  ...rest
}: CommonProps<T>) {
  const Tag = (motion as unknown as Record<AsTag, React.ElementType>)[as ?? "div"];
  const trigger = onMount ? onMountProps : inViewProps;
  return <Tag variants={stagger} {...trigger} {...rest} />;
}

export function RevealItem<T extends AsTag = "div">({ as, ...rest }: CommonProps<T>) {
  const Tag = (motion as unknown as Record<AsTag, React.ElementType>)[as ?? "div"];
  return <Tag variants={staggerItem} {...rest} />;
}
