export const validateImageUrl = (url: string) => {
  if (!url.startsWith("http") && !url.startsWith("/")) {
    return "/assets/img/image_not_found.jpeg";
  }
  return url;
};
