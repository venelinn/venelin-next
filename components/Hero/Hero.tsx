import cx from "clsx";
import Image from "next/image";
import { useMemo } from "react";
import Plx from "react-plx";
import { Social } from "@/components/Social";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import type { SocialType, Theme } from "@/types/types";
import { getOptimizedImage } from "@/utils/common";
import styles from "./Hero.module.scss";

interface HeroProps {
  id: string;
  heading: string;
  subHeading: string;
  description: string;
  media: any;
  links: any;
  theme: Theme[];
  hasHue?: boolean;
  hasOverlay?: boolean;
  random?: boolean;
  social?: SocialType[];
}

export const Hero = ({
  heading,
  subHeading,
  description,
  media,
  links,
  theme,
  hasHue,
  hasOverlay,
  random,
  social,
}: HeroProps) => {
  const selectedImage = useMemo(() => {
    if (!media.length) return undefined;
    if (random && media.length > 1) {
      const idx = Math.floor(Math.random() * media.length);
      return media[idx];
    }
    return media[0];
  }, [media, random]);

  // Safely get optimized image
  const { url, width, height } = getOptimizedImage(selectedImage, 1500, "100");
  return (
    <section className={cx(styles.intro, "full-width")} data-theme={theme}>
      <div className={cx(styles.hero, hasHue && styles["hero--hue"], hasOverlay && styles["hero--overlay"])} data-hero>
        <Plx
          parallaxData={[
            {
              start: 0,
              end: 600,
              duration: "[data-hero]",
              properties: [{ startValue: 1, endValue: 1.3, property: "scale" }],
            },
          ]}
        >
          <Image
            src={url}
            alt={`Venelin Nikolov: ${description}`}
            width={width}
            height={height}
            priority={true}
            unoptimized={false}
            className={styles.hero__image}
          />
        </Plx>
      </div>
      <div className={styles.intro__content}>
        <div className={cx(styles.intro__msg, "title--h2")}>{subHeading}</div>
        <h1 className={cx(styles.intro__title, "title title--h1")}>{heading}</h1>
        <p className={styles.intro__position}>
          <span>{description}</span>
        </p>
        <ul className={cx(styles.intro__cta, styles.btn__group)}>
          {links.map((link) => (
            <li key={link.id}>
              <a className={styles.button} href={link.url} title={link.name}>
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <ThemeSwitcher />
      <Social data={social ?? []} />
    </section>
  );
};
