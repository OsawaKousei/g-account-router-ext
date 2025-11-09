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
 * Google Keep用のリダイレクトURL生成
 */
function buildgeminiRedirectUrl(
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
    id: "gemini",
    name: "gemini",
    displayName: "Google Gemini",
    hostPattern: "gemini.google.com",
    buildRedirectUrl: buildgeminiRedirectUrl,
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
