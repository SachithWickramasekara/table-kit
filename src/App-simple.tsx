import { TableKit, TableTheme } from "./index";

function App() {
  // Example custom themes
  const blueTheme: TableTheme = {
    colors: {
      background: "#f8fafc",
      backgroundSubtle: "#e2e8f0",
      backgroundHover: "#cbd5e1",
      border: "#94a3b8",
      textPrimary: "#0f172a",
      textSecondary: "#475569",
      accentBlue: "#3b82f6",
    },
  };

  const darkTheme: TableTheme = {
    colors: {
      background: "#1e293b",
      backgroundSubtle: "#0f172a",
      backgroundHover: "#334155",
      border: "#475569",
      textPrimary: "#f1f5f9",
      textSecondary: "#cbd5e1",
      accentBlue: "#60a5fa",
    },
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <h1>🎨 table-kit Theme Demo</h1>

      {/* Default theme */}
      <div style={{ marginBottom: "2rem" }}>
        <h2>Default Theme</h2>
        <TableKit />
      </div>

      {/* Blue theme */}
      <div style={{ marginBottom: "2rem" }}>
        <h2>Blue Theme</h2>
        <TableKit theme={blueTheme} />
      </div>

      {/* Dark theme */}
      <div style={{ marginBottom: "2rem" }}>
        <h2>Dark Theme</h2>
        <TableKit theme={darkTheme} />
      </div>
    </div>
  );
}

export default App;
