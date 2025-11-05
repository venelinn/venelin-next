import cx from "clsx";
import Image from "next/image";
import { getOptimizedImage } from "@/utils/common";
import type { PortfolioItem } from "./Portfolio";
import styles from "./PortfolioSlider.module.scss";

interface PortfolioSliderProps {
  media: PortfolioItem[];
}

export const PortfolioSlider = ({ media }: PortfolioSliderProps) => {
  return (
    <section className={styles.carousel} aria-label="Gallery">
      <ol className={styles.carousel__viewport}>
        {(() => {
          if (!media) return null;

          const mediaArray = Array.isArray(media) ? media : [media];

          return mediaArray.map((img, idx) => {
            const { url, width, height } = getOptimizedImage(img, 800, "100");
            if (!url) return null;

            return (
              <li key={idx} id={`carousel__slide${idx}`} tabIndex={0} className={styles.carousel__slide}>
                <Image src={url} width={width} height={height} alt={`Portfolio image ${idx}`} loading="lazy" />
                <span className={styles.carousel__snapper}>
                  {idx > 0 && (
                    <a
                      href={`#carousel__slide${idx - 1}`}
                      className={cx(styles.carousel__nav, styles["carousel__nav--prev"])}
                    >
                      Go to previous
                    </a>
                  )}
                  {idx < mediaArray.length - 1 && (
                    <a
                      href={`#carousel__slide${idx + 1}`}
                      className={cx(styles.carousel__nav, styles["carousel__nav--next"])}
                    >
                      Go to next
                    </a>
                  )}
                </span>
              </li>
            );
          });
        })()}
      </ol>
    </section>
  );
};
