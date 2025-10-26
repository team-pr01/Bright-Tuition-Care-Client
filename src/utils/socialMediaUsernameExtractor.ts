export const getLinkedInUsername = (url: string): string | null => {
  try {
    const parsedUrl = new URL(url);
    // linkedin highlights username mostly after "/in/"
    const parts = parsedUrl.pathname.split("/").filter(Boolean);
    const inIndex = parts.indexOf("in");
    if (inIndex !== -1 && parts[inIndex + 1]) {
      return parts[inIndex + 1];
    }
    // fallback: last segment
    return parts[parts.length - 1] || null;
  } catch {
    return null;
  }
};

export const getFacebookUsername = (url: string): string | null => {
  try {
    const parsedUrl = new URL(url);
    // common fb username is usually first segment after domain
    const parts = parsedUrl.pathname.split("/").filter(Boolean);
    if (parts.length > 0) {
      return parts[parts.length - 1] || null;
    }
    return null;
  } catch {
    return null;
  }
};

export const getInstagramUsername = (url: string): string | null => {
  try {
    const parsedUrl = new URL(url);
    // insta username is always first path segment
    const parts = parsedUrl.pathname.split("/").filter(Boolean);
    return parts[0] || null;
  } catch {
    return null;
  }
};
