import browser from "webextension-polyfill";
import { getRules } from "./logic/storage";
import {
  findMatchingRule,
  buildRedirectUrl,
  hasAccountSpecified,
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

    // 既に何らかのアカウントが指定されている場合はスキップ
    // (authuserクエリパラメータ または /u/{number}/ パスパターン)
    if (hasAccountSpecified(url)) {
      console.log(
        "[Google Account Router] Account already specified, skipping redirect"
      );
      return;
    }

    // リダイレクト先URLを生成（サービス固有の処理を使用）
    const redirectUrl = buildRedirectUrl(url, matchedRule);
    console.log("[Google Account Router] Redirecting to:", redirectUrl);

    // リダイレクト実行
    await browser.tabs.update(details.tabId, { url: redirectUrl });
  },
  {
    url: [{ hostContains: "google.com" }, { hostContains: "youtube.com" }],
  }
);
