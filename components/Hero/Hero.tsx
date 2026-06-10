import cx from "clsx";
import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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
  const [selectedImage, setSelectedImage] = useState(() =>
    media.length ? media[0] : undefined,
  );

  useEffect(() => {
    if (random && media.length > 1) {
      setSelectedImage(media[Math.floor(Math.random() * media.length)]);
    }
  }, [media, random]);

  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!parallaxRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(parallaxRef.current, {
        scale: 1.3,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-hero]",
          start: "top top",
          end: "+=600",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const { url, width, height } = getOptimizedImage(selectedImage, 1500, "100");
  return (
    <section className={cx(styles.intro, "full-width")} data-theme={theme}>
      <div className={cx(styles.hero, hasHue && styles["hero--hue"], hasOverlay && styles["hero--overlay"])} data-hero>
        <div ref={parallaxRef}>
          <Image
            src={url}
            alt={`Venelin Nikolov: ${description}`}
            width={width}
            height={height}
            priority={true}
            unoptimized={false}
            className={styles.hero__image}
          />
        </div>
      </div>
      <div className={styles.intro__content}>
        <div className={cx(styles.intro__msg, "title--h2")}>{subHeading}</div>
        <h1 className={cx(styles.intro__title, "title title--h1")}>
          {heading}
        </h1>
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
