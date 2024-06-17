export function formatPrice(price: any) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

export function formatDate(dateString: any) {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  return date.toLocaleDateString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function normalizeText(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export function deSlugify(slug: string): string {
  return slug.replace(/-/g, " ");
}

// export function deSlugify(slug: string): string {
//   return slug
//     .split("-")
//     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//     .join(" ");
// }
