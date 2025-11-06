import cx from "clsx";
import { Fade } from "react-awesome-reveal";
import type { Theme } from "@/types/types";
import styles from "./Section.module.scss";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  heading?: string;
  description?: string;
  theme?: Theme;
  type?: string;
  size?: "full" | "breakout" | "content";
}

export const Section = ({ children, heading, theme, description, size }: SectionProps) => (
  <section id={heading?.toLowerCase()} className={styles.section} data-theme={theme}>
    <div className={styles.section__inner}>
      <Fade triggerOnce delay={300} cascade>
        <h2>{heading}</h2>
        {description && <h3>{description}</h3>}
      </Fade>
    </div>
    <div className={cx(styles.section__content, size && styles[`section__content--${size}`])}>{children}</div>
  </section>
);
