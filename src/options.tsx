import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { RuleEditor } from "./components/RuleEditor";
import {
  RouterRule,
  getRules,
  saveRules,
  deleteRule,
  hasRuleForService,
} from "./logic/storage";
import { getServiceById } from "./logic/services";

const OptionsPage: React.FC = () => {
  const [rules, setRules] = useState<RouterRule[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // ルールを読み込む
  useEffect(() => {
    loadRules();
  }, []);

  const loadRules = async () => {
    const loadedRules = await getRules();
    setRules(loadedRules);
  };

  // ルールを追加
  const handleAddRule = async (newRule: Omit<RouterRule, "id">) => {
    try {
      // 同じサービスのルールが既に存在しないかチェック
      const exists = await hasRuleForService(newRule.serviceId);
      if (exists) {
        const service = getServiceById(newRule.serviceId);
        alert(
          `${
            service?.displayName || newRule.serviceId
          }のルールは既に存在します。\n既存のルールを編集してください。`
        );
        return;
      }

      const ruleWithId: RouterRule = {
        ...newRule,
        id: crypto.randomUUID(),
      };
      const updatedRules = [...rules, ruleWithId];
      await saveRules(updatedRules);
      setRules(updatedRules);
      setIsAdding(false);
    } catch (error) {
      console.error("Error adding rule:", error);
      alert(
        `ルールの追加に失敗しました: ${
          error instanceof Error ? error.message : "不明なエラー"
        }`
      );
    }
  };

  // ルールを更新
  const handleUpdateRule = async (
    id: string,
    updates: Omit<RouterRule, "id">
  ) => {
    try {
      // サービスIDが変更された場合、同じサービスのルールが既に存在しないかチェック
      const currentRule = rules.find((r) => r.id === id);
      if (currentRule && updates.serviceId !== currentRule.serviceId) {
        const exists = await hasRuleForService(updates.serviceId, id);
        if (exists) {
          const service = getServiceById(updates.serviceId);
          alert(
            `${
              service?.displayName || updates.serviceId
            }のルールは既に存在します。\n別のサービスを選択してください。`
          );
          return;
        }
      }

      const updatedRules = rules.map((rule) =>
        rule.id === id ? { ...rule, ...updates } : rule
      );
      await saveRules(updatedRules);
      setRules(updatedRules);
      setEditingId(null);
    } catch (error) {
      console.error("Error updating rule:", error);
      alert(
        `ルールの更新に失敗しました: ${
          error instanceof Error ? error.message : "不明なエラー"
        }`
      );
    }
  };

  // ルールを削除
  const handleDeleteRule = async (id: string) => {
    if (confirm("このルールを削除してもよろしいですか?")) {
      await deleteRule(id);
      setRules(rules.filter((r) => r.id !== id));
    }
  };

  // ルールの有効/無効を切り替え
  const handleToggleEnabled = async (id: string) => {
    const updatedRules = rules.map((rule) =>
      rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
    );
    await saveRules(updatedRules);
    setRules(updatedRules);
  };

  // 既に設定されているサービスIDのリスト
  const existingServiceIds = rules.map((rule) => rule.serviceId);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Google Account Router 設定</h1>
      <p style={styles.description}>
        Googleサービスへのアクセス時に、指定したアカウントに自動的に切り替えるルールを設定できます。
      </p>

      {/* 新規追加フォーム */}
      {isAdding && (
        <RuleEditor
          existingServiceIds={existingServiceIds}
          onSave={handleAddRule}
          onCancel={() => setIsAdding(false)}
        />
      )}

      {/* ルール一覧 */}
      <div style={styles.rulesContainer}>
        <div style={styles.header}>
          <h2 style={styles.subtitle}>登録済みルール</h2>
          {!isAdding && (
            <button onClick={() => setIsAdding(true)} style={styles.addButton}>
              + 新しいルールを追加
            </button>
          )}
        </div>

        {rules.length === 0 ? (
          <p style={styles.emptyMessage}>
            ルールが登録されていません。新しいルールを追加してください。
          </p>
        ) : (
          <div>
            {rules.map((rule) => (
              <div key={rule.id} style={styles.ruleCard}>
                {editingId === rule.id ? (
                  <RuleEditor
                    rule={rule}
                    existingServiceIds={existingServiceIds}
                    onSave={(updates) => handleUpdateRule(rule.id, updates)}
                    onCancel={() => setEditingId(null)}
                  />
                ) : (
                  <>
                    <div style={styles.ruleHeader}>
                      <div style={styles.ruleTitle}>
                        {rule.label ||
                          getServiceById(rule.serviceId)?.displayName ||
                          rule.serviceId}
                        {!rule.enabled && (
                          <span style={styles.disabledBadge}>無効</span>
                        )}
                      </div>
                      <div style={styles.ruleActions}>
                        <button
                          onClick={() => handleToggleEnabled(rule.id)}
                          style={{
                            ...styles.actionButton,
                            ...styles.toggleButton,
                          }}
                        >
                          {rule.enabled ? "無効化" : "有効化"}
                        </button>
                        <button
                          onClick={() => setEditingId(rule.id)}
                          style={{
                            ...styles.actionButton,
                            ...styles.editButton,
                          }}
                        >
                          編集
                        </button>
                        <button
                          onClick={() => handleDeleteRule(rule.id)}
                          style={{
                            ...styles.actionButton,
                            ...styles.deleteButton,
                          }}
                        >
                          削除
                        </button>
                      </div>
                    </div>
                    <div style={styles.ruleDetails}>
                      <div style={styles.ruleDetail}>
                        <strong>サービス:</strong>{" "}
                        {getServiceById(rule.serviceId)?.displayName ||
                          rule.serviceId}
                      </div>
                      <div style={styles.ruleDetail}>
                        <strong>アカウント:</strong> {rule.accountEmail}
                      </div>
                      {rule.label && (
                        <div style={styles.ruleDetail}>
                          <strong>ラベル:</strong> {rule.label}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    fontFamily: "sans-serif",
    padding: "20px",
    maxWidth: "900px",
    margin: "0 auto",
  },
  title: {
    fontSize: "28px",
    marginBottom: "10px",
  },
  description: {
    color: "#666",
    marginBottom: "30px",
  },
  rulesContainer: {
    marginTop: "20px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  subtitle: {
    fontSize: "20px",
    margin: 0,
  },
  addButton: {
    padding: "10px 20px",
    backgroundColor: "#2196F3",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
  },
  emptyMessage: {
    textAlign: "center",
    color: "#999",
    padding: "40px",
    backgroundColor: "#f5f5f5",
    borderRadius: "8px",
  },
  ruleCard: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "16px",
    marginBottom: "16px",
    backgroundColor: "white",
  },
  ruleHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
  },
  ruleTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  disabledBadge: {
    fontSize: "12px",
    padding: "2px 8px",
    backgroundColor: "#999",
    color: "white",
    borderRadius: "4px",
    fontWeight: "normal",
  },
  ruleActions: {
    display: "flex",
    gap: "8px",
  },
  actionButton: {
    padding: "6px 12px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "13px",
  },
  toggleButton: {
    backgroundColor: "#FF9800",
    color: "white",
  },
  editButton: {
    backgroundColor: "#2196F3",
    color: "white",
  },
  deleteButton: {
    backgroundColor: "#f44336",
    color: "white",
  },
  ruleDetails: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    color: "#555",
  },
  ruleDetail: {
    fontSize: "14px",
  },
};

// DOMに描画
const root = createRoot(document.getElementById("root")!);
root.render(<OptionsPage />);
