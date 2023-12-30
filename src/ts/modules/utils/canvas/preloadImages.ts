export default function preloadImages(
  urls: string[]
): Promise<HTMLImageElement[]> {
  const promises = urls.map((url) => {
    return new Promise<HTMLImageElement>((resolve) => {
      const image = new Image();
      image.src = url;
      image.onload = () => resolve(image);
    });
  });

  return Promise.all(promises);
}
