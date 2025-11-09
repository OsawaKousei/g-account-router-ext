import { RouterRule } from "./storage";

/**
 * URLがルールにマッチするかチェック
 */
export function matchesRule(url: string, rule: RouterRule): boolean {
  if (!rule.enabled) {
    return false;
  }

  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname;

    // サービスパターンにマッチするかチェック
    // 例: "mail.google.com" や "youtube.com"
    return hostname.includes(rule.servicePattern);
  } catch (e) {
    return false;
  }
}

/**
 * URLをアカウント指定付きURLに変換
 */
export function buildRedirectUrl(
  originalUrl: string,
  accountIndex: number
): string {
  try {
    const url = new URL(originalUrl);

    // 既に /u/{number}/ が含まれている場合は置換
    const pathMatch = url.pathname.match(/^\/u\/\d+\//);
    if (pathMatch) {
      url.pathname = url.pathname.replace(/^\/u\/\d+\//, `/u/${accountIndex}/`);
    } else {
      // 含まれていない場合は先頭に追加
      url.pathname = `/u/${accountIndex}${url.pathname}`;
    }

    return url.toString();
  } catch (e) {
    console.error("Invalid URL:", originalUrl, e);
    return originalUrl;
  }
}

/**
 * 適用すべきルールを検索
 */
export function findMatchingRule(
  url: string,
  rules: RouterRule[]
): RouterRule | null {
  // 有効なルールの中から最初にマッチしたものを返す
  return rules.find((rule) => matchesRule(url, rule)) || null;
}

/**
 * URLが既にアカウント指定されているかチェック
 */
export function hasAccountSpecified(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return /^\/u\/\d+\//.test(urlObj.pathname);
  } catch (e) {
    return false;
  }
}

/**
 * URLから現在のアカウントインデックスを取得
 */
export function getCurrentAccountIndex(url: string): number | null {
  try {
    const urlObj = new URL(url);
    const match = urlObj.pathname.match(/^\/u\/(\d+)\//);
    if (match) {
      return parseInt(match[1], 10);
    }
    return null;
  } catch (e) {
    return null;
  }
}
