import browser from "webextension-polyfill";
import { getRules } from "./logic/storage";
import {
  findMatchingRule,
  buildRedirectUrl,
  getCurrentAccountIndex,
} from "./logic/router-rules";

/**
 * Service Worker: ナビゲーション前にルールをチェックし、必要に応じてリダイレクト
 */
browser.webNavigation.onBeforeNavigate.addListener(
  async (details) => {
    // メインフレームのみ処理（iframeは無視）
    if (details.frameId !== 0) {
      return;
    }

    const url = details.url;
    console.log("[Google Account Router] Checking URL:", url);

    // ルールを取得
    const rules = await getRules();
    const matchedRule = findMatchingRule(url, rules);

    if (!matchedRule) {
      console.log("[Google Account Router] No matching rule found");
      return;
    }

    // 現在のアカウントインデックスを取得
    const currentIndex = getCurrentAccountIndex(url);

    // 既に正しいアカウントが指定されている場合はスキップ
    if (currentIndex === matchedRule.accountIndex) {
      console.log(
        "[Google Account Router] Already on correct account:",
        currentIndex
      );
      return;
    }

    // リダイレクト先URLを生成
    const redirectUrl = buildRedirectUrl(url, matchedRule.accountIndex);
    console.log("[Google Account Router] Redirecting to:", redirectUrl);

    // リダイレクト実行
    await browser.tabs.update(details.tabId, { url: redirectUrl });
  },
  {
    url: [{ hostContains: "google.com" }, { hostContains: "youtube.com" }],
  }
);
