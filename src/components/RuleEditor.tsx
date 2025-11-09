import React, { useState } from "react";
import { RouterRule } from "../logic/storage";
import { SUPPORTED_SERVICES } from "../logic/services";

interface RuleEditorProps {
  rule?: RouterRule; // 編集モードの場合は既存ルールを渡す
  onSave: (rule: Omit<RouterRule, "id">) => void;
  onCancel: () => void;
}

export const RuleEditor: React.FC<RuleEditorProps> = ({
  rule,
  onSave,
  onCancel,
}) => {
  const [serviceId, setServiceId] = useState(rule?.serviceId || "");
  const [accountEmail, setAccountEmail] = useState(rule?.accountEmail || "");
  const [label, setLabel] = useState(rule?.label || "");
  const [enabled, setEnabled] = useState(rule?.enabled ?? true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!serviceId) {
      alert("サービスを選択してください");
      return;
    }

    if (!accountEmail.trim()) {
      alert("アカウントのメールアドレスを入力してください");
      return;
    }

    // 簡易的なメールアドレス検証
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(accountEmail.trim())) {
      alert("有効なメールアドレスを入力してください");
      return;
    }

    onSave({
      serviceId,
      accountEmail: accountEmail.trim(),
      label: label.trim(),
      enabled,
    });
  };

  return (
    <div style={styles.container}>
      <h3>{rule ? "ルールを編集" : "新しいルールを追加"}</h3>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>
            サービス:
            <select
              value={serviceId}
              onChange={(e) => setServiceId(e.target.value)}
              style={styles.select}
              required
            >
              <option value="">-- サービスを選択してください --</option>
              {SUPPORTED_SERVICES.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.displayName}
                </option>
              ))}
            </select>
          </label>
          <small style={styles.hint}>
            自動切り替えを適用するGoogleサービスを選択
          </small>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>
            アカウントメールアドレス:
            <input
              type="email"
              value={accountEmail}
              onChange={(e) => setAccountEmail(e.target.value)}
              placeholder="例: user@example.com"
              style={styles.input}
              required
            />
          </label>
          <small style={styles.hint}>
            切り替え先のGoogleアカウントのメールアドレス
          </small>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>
            ラベル（任意）:
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="例: 仕事用Gmail"
              style={styles.input}
            />
          </label>
          <small style={styles.hint}>ルールの説明（わかりやすい名前）</small>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={enabled}
              onChange={(e) => setEnabled(e.target.checked)}
              style={styles.checkbox}
            />
            有効にする
          </label>
        </div>

        <div style={styles.buttonGroup}>
          <button type="submit" style={styles.saveButton}>
            保存
          </button>
          <button type="button" onClick={onCancel} style={styles.cancelButton}>
            キャンセル
          </button>
        </div>
      </form>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "20px",
    marginBottom: "20px",
    backgroundColor: "#f9f9f9",
  },
  formGroup: {
    marginBottom: "16px",
  },
  label: {
    display: "block",
    fontWeight: "bold",
    marginBottom: "4px",
  },
  input: {
    width: "100%",
    padding: "8px",
    marginTop: "4px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "14px",
    boxSizing: "border-box",
  },
  select: {
    width: "100%",
    padding: "8px",
    marginTop: "4px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "14px",
    boxSizing: "border-box",
    backgroundColor: "white",
  },
  hint: {
    display: "block",
    color: "#666",
    fontSize: "12px",
    marginTop: "4px",
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    fontWeight: "normal",
  },
  checkbox: {
    marginRight: "8px",
    width: "auto",
  },
  buttonGroup: {
    display: "flex",
    gap: "10px",
    marginTop: "20px",
  },
  saveButton: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
  },
  cancelButton: {
    padding: "10px 20px",
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
  },
};
