import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const MODAL_STYLES = `
.ak-btn {
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  min-height: 36px;
}
.ak-inline-code {
  word-break: break-word;
}
@media (max-width: 640px) {
  .ak-overlay {
    padding: 12px !important;
    align-items: flex-start !important;
    padding-top: 24px !important;
  }
  .ak-panel {
    padding: 20px !important;
    max-height: calc(100vh - 48px);
    overflow-y: auto;
  }
  .ak-btn {
    min-height: 44px !important;
    padding-top: 11px !important;
    padding-bottom: 11px !important;
    font-size: 13px !important;
  }
  .ak-input {
    font-size: 16px !important;
    padding: 12px !important;
    min-height: 44px !important;
  }
  .ak-btn-row {
    gap: 10px !important;
  }
  .ak-btn-row > button {
    flex: 1 1 auto;
  }
}
`;

function useModalStyles() {
  useEffect(() => {
    const id = "ak-modal-styles";
    if (document.getElementById(id)) return;
    const el = document.createElement("style");
    el.id = id;
    el.textContent = MODAL_STYLES;
    document.head.appendChild(el);
  }, []);
}

const STORAGE_KEY = "anthropic_api_key";
const ANTHROPIC_URL = "https://api.anthropic.com/v1/messages";
const ANTHROPIC_VERSION = "2023-06-01";

const ApiKeyContext = createContext(null);

export class MissingApiKeyError extends Error {
  constructor() {
    super("No Anthropic API key set");
    this.name = "MissingApiKeyError";
  }
}

function readKey() {
  if (typeof window === "undefined") return "";
  try {
    return window.localStorage.getItem(STORAGE_KEY) || "";
  } catch {
    return "";
  }
}

function writeKey(value) {
  if (typeof window === "undefined") return;
  try {
    if (value) window.localStorage.setItem(STORAGE_KEY, value);
    else window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore storage failures (Safari private mode, etc.)
  }
}

export function ApiKeyProvider({ children }) {
  const [key, setKeyState] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setKeyState(readKey());
  }, []);

  const setKey = useCallback((value) => {
    const trimmed = (value || "").trim();
    writeKey(trimmed);
    setKeyState(trimmed);
  }, []);

  const clearKey = useCallback(() => {
    writeKey("");
    setKeyState("");
  }, []);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ key, setKey, clearKey, isOpen, open, close }),
    [key, setKey, clearKey, isOpen, open, close]
  );

  return <ApiKeyContext.Provider value={value}>{children}</ApiKeyContext.Provider>;
}

export function useApiKey() {
  const ctx = useContext(ApiKeyContext);
  if (!ctx) throw new Error("useApiKey must be used inside ApiKeyProvider");
  return ctx;
}

const DEFAULT_SOURCE_LABEL = "the source material";

export async function requestFeedback({ key, question, answer, sourceLabel = DEFAULT_SOURCE_LABEL }) {
  if (!key) throw new MissingApiKeyError();

  const response = await fetch(ANTHROPIC_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": key,
      "anthropic-version": ANTHROPIC_VERSION,
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: `You are a Socratic tutor helping someone deeply learn ${sourceLabel}.

Your job is to evaluate their answer to a comprehension question. Be direct and specific:
1. What they got right (be specific about which insights show real understanding)
2. What they missed or got wrong. Be specific. Quote or reference the source material.
3. If their reasoning sounds like absorbed conventional wisdom rather than their own thinking, call that out gently but clearly
4. One follow-up question to push their understanding deeper

Keep it to 3-5 sentences. Be rigorous but not discouraging. If their answer is genuinely strong, say so without hedging.`,
      messages: [
        {
          role: "user",
          content: `Question: ${question}\n\nTheir answer: ${answer}`,
        },
      ],
    }),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData?.error?.message || `API returned ${response.status}`);
  }

  const data = await response.json();
  const text = data.content?.map((b) => b.text || "").filter(Boolean).join("\n");
  if (!text) throw new Error("Empty response");
  return text;
}

const COLORS = {
  bg: "#0a0e14",
  surface: "#111722",
  border: "#1e2a3a",
  borderActive: "#3d8bfd",
  text: "#c8d3e0",
  textDim: "#6b7d94",
  textBright: "#e8edf3",
  accent: "#3d8bfd",
  yellow: "#f0c060",
  teal: "#40c8b0",
};

export function ApiKeyModal() {
  const { key, setKey, clearKey, isOpen, close } = useApiKey();
  const [draft, setDraft] = useState("");
  useModalStyles();

  useEffect(() => {
    if (isOpen) setDraft(key || "");
  }, [isOpen, key]);

  if (!isOpen) return null;

  const handleSave = () => {
    setKey(draft);
    close();
  };

  const handleClear = () => {
    clearKey();
    setDraft("");
    close();
  };

  return (
    <div
      onClick={close}
      className="ak-overlay"
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.72)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        zIndex: 100,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="ak-panel"
        style={{
          background: COLORS.surface,
          border: `1px solid ${COLORS.border}`,
          padding: "24px",
          maxWidth: "480px",
          width: "100%",
          fontFamily: "'Charter', Georgia, serif",
        }}
      >
        <div
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "11px",
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            color: COLORS.teal,
            marginBottom: "14px",
          }}
        >
          Anthropic API Key
        </div>
        <p
          style={{
            fontSize: "13px",
            lineHeight: 1.6,
            color: COLORS.text,
            margin: "0 0 16px",
          }}
        >
          Paste your Anthropic API key to get AI feedback on your answers. It stays in your
          browser's localStorage and is only sent to{" "}
          <code className="ak-inline-code">api.anthropic.com</code>. Without a
          key, you'll self-evaluate using the hint.
        </p>
        <p
          style={{
            fontSize: "12px",
            lineHeight: 1.5,
            color: COLORS.textDim,
            margin: "0 0 16px",
          }}
        >
          Create one at{" "}
          <a
            href="https://console.anthropic.com/settings/keys"
            target="_blank"
            rel="noreferrer"
            className="ak-inline-code"
            style={{ color: COLORS.accent }}
          >
            console.anthropic.com/settings/keys
          </a>
          .
        </p>
        <input
          type="password"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="sk-ant-..."
          spellCheck={false}
          autoComplete="off"
          className="ak-input"
          style={{
            width: "100%",
            padding: "10px 12px",
            background: COLORS.bg,
            border: `1px solid ${COLORS.border}`,
            color: COLORS.text,
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "13px",
            outline: "none",
            boxSizing: "border-box",
          }}
          onFocus={(e) => (e.target.style.borderColor = COLORS.borderActive)}
          onBlur={(e) => (e.target.style.borderColor = COLORS.border)}
        />
        <div className="ak-btn-row" style={{ display: "flex", gap: "8px", marginTop: "16px", flexWrap: "wrap" }}>
          <button
            onClick={handleSave}
            disabled={!draft.trim()}
            className="ak-btn"
            style={{
              padding: "8px 18px",
              background: draft.trim() ? COLORS.accent : COLORS.border,
              color: draft.trim() ? "#fff" : COLORS.textDim,
              border: "none",
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "12px",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              cursor: draft.trim() ? "pointer" : "default",
            }}
          >
            Save
          </button>
          <button
            onClick={handleClear}
            disabled={!key}
            className="ak-btn"
            style={{
              padding: "8px 18px",
              background: "none",
              color: key ? COLORS.yellow : COLORS.textDim,
              border: `1px solid ${key ? COLORS.yellow : COLORS.border}`,
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "12px",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              cursor: key ? "pointer" : "default",
            }}
          >
            Clear
          </button>
          <button
            onClick={close}
            className="ak-btn"
            style={{
              padding: "8px 18px",
              background: "none",
              color: COLORS.textDim,
              border: `1px solid ${COLORS.border}`,
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "12px",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
