import { Fade } from "react-awesome-reveal";
import type { SiteConfig, Theme } from "@/types/types";
import styles from "./Footer.module.scss";

interface FooterProps {
  theme?: Theme;
  siteConfig?: SiteConfig;
  links?: any;
}

export const Footer = ({ siteConfig, theme = "dark" }: FooterProps) => (
  <footer className={styles.footer} data-theme={theme}>
    <Fade delay={300}>
      <div className={styles.footer__copyright}>
        &copy; {new Date().getFullYear()} {siteConfig?.copyright} {siteConfig?.fineprint}
      </div>
    </Fade>
  </footer>
);
