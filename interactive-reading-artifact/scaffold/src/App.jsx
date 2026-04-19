import { useEffect } from "react";
import Reader from "./Reader.jsx";
import { ApiKeyProvider, ApiKeyModal, useApiKey } from "./ApiKeyProvider.jsx";

const COLORS = {
  bg: "#0a0e14",
  border: "#1e2a3a",
  text: "#c8d3e0",
  textDim: "#6b7d94",
  accent: "#3d8bfd",
  teal: "#40c8b0",
};

const APP_STYLES = `
@media (max-width: 640px) {
  .app-key-control {
    padding: 20px 16px 32px !important;
    flex-wrap: wrap !important;
    align-items: flex-start !important;
  }
  .app-key-control > div {
    flex: 1 1 100%;
  }
  .app-key-control button {
    min-height: 44px !important;
    padding: 11px 16px !important;
    font-size: 12px !important;
    width: 100%;
  }
  .app-repo-footer {
    padding: 16px 16px 40px !important;
    line-height: 1.6;
  }
}
`;

function useAppStyles() {
  useEffect(() => {
    const id = "app-mobile-styles";
    if (document.getElementById(id)) return;
    const el = document.createElement("style");
    el.id = id;
    el.textContent = APP_STYLES;
    document.head.appendChild(el);
  }, []);
}

function KeyControl() {
  const { key, open } = useApiKey();
  return (
    <div
      className="app-key-control"
      style={{
        maxWidth: "720px",
        margin: "0 auto",
        padding: "24px 24px 48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "16px",
        borderTop: `1px solid ${COLORS.border}`,
      }}
    >
      <div
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "11px",
          color: COLORS.textDim,
          letterSpacing: "0.5px",
          lineHeight: 1.6,
        }}
      >
        AI feedback:{" "}
        <span style={{ color: key ? COLORS.teal : COLORS.textDim }}>
          {key ? "enabled (your key)" : "not set, self-evaluation only"}
        </span>
      </div>
      <button
        onClick={open}
        style={{
          padding: "6px 14px",
          background: "none",
          color: COLORS.textDim,
          border: `1px solid ${COLORS.border}`,
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "11px",
          letterSpacing: "0.5px",
          textTransform: "uppercase",
          cursor: "pointer",
        }}
      >
        {key ? "Update key" : "Set Anthropic key"}
      </button>
    </div>
  );
}

function RepoFooter() {
  return (
    <div
      className="app-repo-footer"
      style={{
        maxWidth: "720px",
        margin: "0 auto",
        padding: "16px 24px 48px",
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: "11px",
        color: COLORS.textDim,
        letterSpacing: "0.5px",
        textAlign: "center",
      }}
    >
      Built from{" "}
      <a
        href="https://github.com/mmurrs/learn-your-way"
        target="_blank"
        rel="noreferrer"
        style={{ color: COLORS.accent }}
      >
        learn-your-way
      </a>
      . Adapt the prompts to your own learning style.
    </div>
  );
}

export default function App() {
  useAppStyles();
  return (
    <ApiKeyProvider>
      <Reader />
      <KeyControl />
      <RepoFooter />
      <ApiKeyModal />
    </ApiKeyProvider>
  );
}
