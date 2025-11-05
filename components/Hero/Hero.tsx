import cx from "clsx";
import Image from "next/image";
import Plx from "react-plx";
import type { Theme } from "@/types/types";
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
}

export const Hero = ({ heading, subHeading, description, media, links, theme }: HeroProps) => {
  const mainImage = media?.[0].image?.[0];
  const { url, width, height } = getOptimizedImage(mainImage, 800, "100");
  return (
    <section className={styles.intro} data-theme={theme}>
      <div className={styles.hero} data-hero>
        <Plx
          parallaxData={[
            {
              start: 1,
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
      {/* <Social data={social} /> */}
    </section>
  );
};
