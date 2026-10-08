export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function siteAsset(path: string) {
  if (!path || /^(https?:|data:|blob:)/.test(path)) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${normalized}`;
}
