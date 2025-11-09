import { RouterRule } from "./storage";
import { getServiceById, getServiceByUrl } from "./services";

/**
 * URLがルールにマッチするかチェック
 */
export function matchesRule(url: string, rule: RouterRule): boolean {
  if (!rule.enabled) {
    return false;
  }

  const service = getServiceById(rule.serviceId);
  if (!service) {
    return false;
  }

  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname;

    // サービスのホストパターンにマッチするかチェック
    return hostname.includes(service.hostPattern);
  } catch (e) {
    return false;
  }
}

/**
 * URLをアカウント指定付きURLに変換
 */
export function buildRedirectUrl(
  originalUrl: string,
  rule: RouterRule
): string {
  const service = getServiceById(rule.serviceId);
  if (!service) {
    console.error("Service not found:", rule.serviceId);
    return originalUrl;
  }

  // サービス固有のリダイレクトURL生成関数を呼び出し
  return service.buildRedirectUrl(originalUrl, rule.accountEmail);
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
 * URLから現在のauthuserパラメータを取得
 */
export function getCurrentAccountEmail(url: string): string | null {
  try {
    const urlObj = new URL(url);
    return urlObj.searchParams.get("authuser");
  } catch (e) {
    return null;
  }
}

/**
 * URLが既に何らかのアカウント指定を持っているかチェック
 * - クエリパラメータ: ?authuser=...
 * - パスパターン: /u/{number}/
 */
export function hasAccountSpecified(url: string): boolean {
  try {
    const urlObj = new URL(url);

    // authuserクエリパラメータをチェック
    if (urlObj.searchParams.has("authuser")) {
      return true;
    }

    // /u/{number}/ パスパターンをチェック
    const pathPattern = /\/u\/\d+\//;
    if (pathPattern.test(urlObj.pathname)) {
      return true;
    }

    return false;
  } catch (e) {
    return false;
  }
}
