import Image from "next/image";
import type React from "react";
import { useEffect, useRef } from "react";
import { getOptimizedImage } from "@/utils/common";
import type { PortfolioItem } from "./Portfolio";
import styles from "./PortfolioModal.module.scss";
import { PortfolioSlider } from "./PortfolioSlider";

interface PortfolioModalProps {
  item: PortfolioItem;
  onClose: () => void;
}

export const PortfolioModal = ({ item, onClose }: PortfolioModalProps) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dialog = modalRef.current;
    if (!dialog) return;

    dialog.showModal();

    const handleClose = () => onClose();

    dialog.addEventListener("cancel", handleClose);
    dialog.addEventListener("close", handleClose);

    return () => {
      dialog.removeEventListener("cancel", handleClose);
      dialog.removeEventListener("close", handleClose);
    };
  }, [onClose]);

  const handleOutsideClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const dialog = e.currentTarget;
    const rect = dialog.getBoundingClientRect();
    if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
      onClose();
    }
  };

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <dialog ref={modalRef} data-theme="light" className={styles["modal-wrapper"]} onClick={handleOutsideClick}>
      <div className={styles.modal}>
        <div className={styles.modal__header} data-slider={item.media.length > 1 ? "true" : undefined}>
          {(() => {
            const media = item.media;
            if (!media) return null;

            const mediaArray = Array.isArray(media) ? media : [media];

            if (mediaArray.length > 1) {
              // Multiple images → use your slider
              return <PortfolioSlider media={mediaArray} />;
            }

            // Single image → display optimized image
            const thumb = mediaArray[0];
            const { url, width, height } = getOptimizedImage(thumb, 700, "100");
            if (!url) return null;

            return (
              <Image src={url} width={width} height={height} alt={thumb.alt || "Portfolio image"} loading="lazy" />
            );
          })()}
        </div>

        <div className={styles.modal__content}>
          <div className={styles.modal__content__name}>
            {item.url ? (
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                {item.name}
              </a>
            ) : (
              <span>{item.name}</span>
            )}
          </div>
          {item.description && <p>{item.description}</p>}
          {item.types && <div className={styles.modal__categories}>{item.types}</div>}
        </div>

        <div className={styles.modal__footer}>
          {item.url && (
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              Visit
            </a>
          )}
          <button type="button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};
