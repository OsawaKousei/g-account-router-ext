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
 * 指定されたサービスIDのルールが既に存在するかチェック
 * @param serviceId チェックするサービスID
 * @param excludeRuleId 除外するルールID（編集時に自分自身を除外するため）
 * @returns 既に存在する場合はtrue
 */
export async function hasRuleForService(
  serviceId: string,
  excludeRuleId?: string
): Promise<boolean> {
  const rules = await getRules();
  return rules.some(
    (rule) => rule.serviceId === serviceId && rule.id !== excludeRuleId
  );
}

/**
 * 新規ルールを追加
 */
export async function addRule(rule: Omit<RouterRule, "id">): Promise<void> {
  // 同じサービスのルールが既に存在しないかチェック
  const exists = await hasRuleForService(rule.serviceId);
  if (exists) {
    throw new Error(
      `このサービスのルールは既に存在します。既存のルールを編集してください。`
    );
  }

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
  // サービスIDを変更する場合、同じサービスのルールが既に存在しないかチェック
  if (updates.serviceId) {
    const exists = await hasRuleForService(updates.serviceId, id);
    if (exists) {
      throw new Error(
        `このサービスのルールは既に存在します。別のサービスを選択してください。`
      );
    }
  }

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
