export function removeDiacritics(name?: string) {
  if (!name) return;
  
  return name
    .replaceAll(" ", "")
    .replaceAll("/", "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export function isFileList(value: unknown): value is FileList {
  return value instanceof FileList;
}

export function formatCurrency(amount: number) {
  return amount.toLocaleString("sk-SK", {
    style: "currency",
    currency: "EUR",
  });
}
