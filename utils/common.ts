export const PAGE_TYPE = "page";
export const PAGE_TYPES = [PAGE_TYPE] as const;
export const SITE_CONFIG_TYPE = "siteConfiguration";

export const IS_DEV = process.env.NODE_ENV === "development";

/** Normalize slug to always start with a slash */
export function normalizeSlug(slug: string) {
  return "/" + slug.replace(/^\/+|\/+$/g, "");
}

export interface CloudinaryImage {
  src: string;
  width: number;
  height: number;
}

export interface ImageData {
  url?: string;
  width?: number;
  height?: number;
  [key: string]: any;
}

export function getOptimizedImage(
  image?: CloudinaryImage | ImageData,
  width = 500,
  quality: string | number = "auto",
  aspectRatio?: number, // optional custom aspect ratio
) {
  if (!image) return { url: "", width: 0, height: 0, aspectRatio: 0 };

  const src = "src" in image ? image.src : image.url;
  if (!src) return { url: "", width: 0, height: 0, aspectRatio: 0 };

  // Ensure HTTPS (Next.js remotePatterns requires https)
  const secureSrc = src.replace(/^http:\/\//i, "https://");

  const originalWidth = image.width || width;
  const originalHeight = image.height || width;

  // determine ratio
  const ratio = aspectRatio || originalWidth / originalHeight || 1;
  const height = Math.round(width / ratio);

  const optimizedUrl = secureSrc.replace("/upload/", `/upload/w_${width},h_${height},c_fill,q_${quality}/`);

  return {
    url: optimizedUrl,
    width,
    height,
    aspectRatio: ratio,
  };
}

/** Generate optimized Cloudinary image URL */
export function getOptimizedImageURL(image: CloudinaryImage, width = 500, quality: string | number = "auto"): string {
  if (typeof image.src === "string") {
    // Force HTTPS
    const secureSrc = image.src.replace(/^http:\/\//i, "https://");
    return secureSrc.replace("/upload/", `/upload/w_${width},q_${quality}/`);
  }
  return image.src;
}

/** Prevent WebP conversion for SVGs on Cloudinary */
export function getCloudinaryAsSvg(url: string): string {
  if (url.includes(".svg")) {
    return url.replace("/f_auto", "");
  }
  return url;
}
