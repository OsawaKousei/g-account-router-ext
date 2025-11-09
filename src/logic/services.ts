/**
 * サポート対象のGoogleサービス定義
 */

export interface ServiceDefinition {
  id: string;
  name: string;
  displayName: string;
  hostPattern: string; // ホスト名のパターン（例: "mail.google.com"）
  buildRedirectUrl: (originalUrl: string, accountEmail: string) => string;
}

/**
 * Gmail用のリダイレクトURL生成
 */
function buildGmailRedirectUrl(
  originalUrl: string,
  accountEmail: string
): string {
  try {
    const url = new URL(originalUrl);
    url.searchParams.delete("authuser");
    url.searchParams.set("authuser", accountEmail);
    return url.toString();
  } catch (e) {
    console.error("Invalid URL:", originalUrl, e);
    return originalUrl;
  }
}

/**
 * Google Calendar用のリダイレクトURL生成
 */
function buildCalendarRedirectUrl(
  originalUrl: string,
  accountEmail: string
): string {
  try {
    const url = new URL(originalUrl);
    url.searchParams.delete("authuser");
    url.searchParams.set("authuser", accountEmail);
    return url.toString();
  } catch (e) {
    console.error("Invalid URL:", originalUrl, e);
    return originalUrl;
  }
}

/**
 * Google Drive用のリダイレクトURL生成
 */
function buildDriveRedirectUrl(
  originalUrl: string,
  accountEmail: string
): string {
  try {
    const url = new URL(originalUrl);
    url.searchParams.delete("authuser");
    url.searchParams.set("authuser", accountEmail);
    return url.toString();
  } catch (e) {
    console.error("Invalid URL:", originalUrl, e);
    return originalUrl;
  }
}

/**
 * Google Docs用のリダイレクトURL生成
 */
function buildDocsRedirectUrl(
  originalUrl: string,
  accountEmail: string
): string {
  try {
    const url = new URL(originalUrl);
    url.searchParams.delete("authuser");
    url.searchParams.set("authuser", accountEmail);
    return url.toString();
  } catch (e) {
    console.error("Invalid URL:", originalUrl, e);
    return originalUrl;
  }
}

/**
 * Google Sheets用のリダイレクトURL生成
 */
function buildSheetsRedirectUrl(
  originalUrl: string,
  accountEmail: string
): string {
  try {
    const url = new URL(originalUrl);
    url.searchParams.delete("authuser");
    url.searchParams.set("authuser", accountEmail);
    return url.toString();
  } catch (e) {
    console.error("Invalid URL:", originalUrl, e);
    return originalUrl;
  }
}

/**
 * Google Slides用のリダイレクトURL生成
 */
function buildSlidesRedirectUrl(
  originalUrl: string,
  accountEmail: string
): string {
  try {
    const url = new URL(originalUrl);
    url.searchParams.delete("authuser");
    url.searchParams.set("authuser", accountEmail);
    return url.toString();
  } catch (e) {
    console.error("Invalid URL:", originalUrl, e);
    return originalUrl;
  }
}

/**
 * YouTube用のリダイレクトURL生成
 */
function buildYouTubeRedirectUrl(
  originalUrl: string,
  accountEmail: string
): string {
  try {
    const url = new URL(originalUrl);
    url.searchParams.delete("authuser");
    url.searchParams.set("authuser", accountEmail);
    return url.toString();
  } catch (e) {
    console.error("Invalid URL:", originalUrl, e);
    return originalUrl;
  }
}

/**
 * Google Keep用のリダイレクトURL生成
 */
function buildKeepRedirectUrl(
  originalUrl: string,
  accountEmail: string
): string {
  try {
    const url = new URL(originalUrl);
    url.searchParams.delete("authuser");
    url.searchParams.set("authuser", accountEmail);
    return url.toString();
  } catch (e) {
    console.error("Invalid URL:", originalUrl, e);
    return originalUrl;
  }
}

/**
 * Google Maps用のリダイレクトURL生成
 */
function buildMapsRedirectUrl(
  originalUrl: string,
  accountEmail: string
): string {
  try {
    const url = new URL(originalUrl);
    url.searchParams.delete("authuser");
    url.searchParams.set("authuser", accountEmail);
    return url.toString();
  } catch (e) {
    console.error("Invalid URL:", originalUrl, e);
    return originalUrl;
  }
}

/**
 * サポート対象のサービス一覧
 */
export const SUPPORTED_SERVICES: ServiceDefinition[] = [
  {
    id: "gmail",
    name: "gmail",
    displayName: "Gmail",
    hostPattern: "mail.google.com",
    buildRedirectUrl: buildGmailRedirectUrl,
  },
  {
    id: "calendar",
    name: "calendar",
    displayName: "Google Calendar",
    hostPattern: "calendar.google.com",
    buildRedirectUrl: buildCalendarRedirectUrl,
  },
  {
    id: "drive",
    name: "drive",
    displayName: "Google Drive",
    hostPattern: "drive.google.com",
    buildRedirectUrl: buildDriveRedirectUrl,
  },
  {
    id: "docs",
    name: "docs",
    displayName: "Google Docs",
    hostPattern: "docs.google.com/document",
    buildRedirectUrl: buildDocsRedirectUrl,
  },
  {
    id: "sheets",
    name: "sheets",
    displayName: "Google Sheets",
    hostPattern: "docs.google.com/spreadsheets",
    buildRedirectUrl: buildSheetsRedirectUrl,
  },
  {
    id: "slides",
    name: "slides",
    displayName: "Google Slides",
    hostPattern: "docs.google.com/presentation",
    buildRedirectUrl: buildSlidesRedirectUrl,
  },
  {
    id: "youtube",
    name: "youtube",
    displayName: "YouTube",
    hostPattern: "youtube.com",
    buildRedirectUrl: buildYouTubeRedirectUrl,
  },
  {
    id: "keep",
    name: "keep",
    displayName: "Google Keep",
    hostPattern: "keep.google.com",
    buildRedirectUrl: buildKeepRedirectUrl,
  },
  {
    id: "maps",
    name: "maps",
    displayName: "Google Maps",
    hostPattern: "maps.google.com",
    buildRedirectUrl: buildMapsRedirectUrl,
  },
];

/**
 * サービスIDからサービス定義を取得
 */
export function getServiceById(serviceId: string): ServiceDefinition | null {
  return SUPPORTED_SERVICES.find((s) => s.id === serviceId) || null;
}

/**
 * URLからマッチするサービスを取得
 */
export function getServiceByUrl(url: string): ServiceDefinition | null {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname;

    return (
      SUPPORTED_SERVICES.find((service) =>
        hostname.includes(service.hostPattern)
      ) || null
    );
  } catch (e) {
    return null;
  }
}
