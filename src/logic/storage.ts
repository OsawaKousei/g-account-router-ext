import browser from "webextension-polyfill";

/**
 * ルール定義の型
 */
export interface RouterRule {
  id: string;
  serviceId: string; // サポート対象のサービスID（例: "gmail", "youtube"）
  accountEmail: string; // Googleアカウントのメールアドレス（例: user@example.com）
  enabled: boolean;
  label?: string; // ルールの説明（任意）
}

/**
 * ストレージデータ全体の型
 */
export interface StorageData {
  rules: RouterRule[];
}

const STORAGE_KEY = "routerRules";

/**
 * ストレージからルール一覧を取得
 */
export async function getRules(): Promise<RouterRule[]> {
  const result = await browser.storage.sync.get(STORAGE_KEY);
  return (result[STORAGE_KEY] as RouterRule[]) || [];
}

/**
 * ストレージにルール一覧を保存
 */
export async function saveRules(rules: RouterRule[]): Promise<void> {
  await browser.storage.sync.set({ [STORAGE_KEY]: rules });
}

/**
 * 新規ルールを追加
 */
export async function addRule(rule: Omit<RouterRule, "id">): Promise<void> {
  const rules = await getRules();
  const newRule: RouterRule = {
    ...rule,
    id: crypto.randomUUID(),
  };
  rules.push(newRule);
  await saveRules(rules);
}

/**
 * ルールを更新
 */
export async function updateRule(
  id: string,
  updates: Partial<Omit<RouterRule, "id">>
): Promise<void> {
  const rules = await getRules();
  const index = rules.findIndex((r) => r.id === id);
  if (index !== -1) {
    rules[index] = { ...rules[index], ...updates };
    await saveRules(rules);
  }
}

/**
 * ルールを削除
 */
export async function deleteRule(id: string): Promise<void> {
  const rules = await getRules();
  const filtered = rules.filter((r) => r.id !== id);
  await saveRules(filtered);
}
