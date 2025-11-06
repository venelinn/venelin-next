import Image from "next/image";
import { useState } from "react";
import { Fade } from "react-awesome-reveal";
import { getOptimizedImage } from "@/utils/common";
import { PortfolioModal } from "./";
import styles from "./Portfolio.module.scss";

export interface PortfolioItem {
  id: string;
  name: string;
  url?: string;
  description?: string;
  types?: string;
  media: any;
}

interface PortfolioProps {
  items: PortfolioItem[];
}

export const Portfolio = ({ items }: PortfolioProps) => {
  const [activeItem, setActiveItem] = useState<PortfolioItem | null>(null);

  return (
    <>
      <div className={styles.portfolio}>
        <div className={styles.portfolio__grid}>
          <Fade cascade triggerOnce damping={0.1} direction="up">
            {items.map((item) => {
              const media = item?.media;
              const thumb = Array.isArray(media) ? media[0] : media;
              const { url, width, height } = getOptimizedImage(thumb, 800, "100", 1 / 1);
              if (!thumb) return null;

              return (
                <div className={styles.folio} key={item.id}>
                  <div className={styles.folio__item}>
                    <h3 className={styles.folio__item__name}>{item.name}</h3>
                    <span className={styles.folio__item__types}>{item.types}</span>
                  </div>
                  <button
                    type="button"
                    className={styles.folio__link}
                    title={item.name}
                    onClick={() => setActiveItem(item)}
                  >
                    <Image src={url} alt={item.name} width={width} height={height} unoptimized={false} />
                  </button>
                </div>
              );
            })}
          </Fade>
        </div>
      </div>

      {activeItem && <PortfolioModal item={activeItem} onClose={() => setActiveItem(null)} />}
    </>
  );
};
