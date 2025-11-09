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
