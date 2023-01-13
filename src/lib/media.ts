import { getStrapiURL } from "./strapi";

export function getStrapiMedia(media: any) {
  const { url } = media.data.attributes;
  const imageUrl = url.startsWith("/") ? getStrapiURL(url) : url;
  return imageUrl;
}

export function getStrapiMedias(media: any) {
  const urls: string[] = [];
  media.data.forEach(({ attributes }: any) => {
    const { url } = attributes;
    const imageUrl = url.startsWith("/") ? getStrapiURL(url) : url;
    urls.push(imageUrl);
  });
  return urls;
}
