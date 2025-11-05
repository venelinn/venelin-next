import cx from "clsx";
import { Fade } from "react-awesome-reveal";
import type { Theme } from "@/types/types";
import styles from "./Section.module.scss";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  heading?: string;
  description?: string;
  theme?: Theme;
  type?: string;
}

export const Section = ({ children, className, heading, theme, description }: SectionProps) => (
  <section id={className} className={cx(styles.section, className && `section--${className}`)} data-theme={theme}>
    <div className={styles.section__inner}>
      <Fade triggerOnce delay={300}>
        <h2>{heading}</h2>
        {description && <h3>{description}</h3>}
      </Fade>
    </div>
    {children}
  </section>
);
