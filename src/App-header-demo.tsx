import { TableKit } from "./index";

// Demo components for header slots
function SearchInput() {
  return (
    <input
      type="text"
      placeholder="Search users..."
      style={{
        padding: "0.5rem",
        border: "1px solid #e5e7eb",
        borderRadius: "0.375rem",
        fontSize: "0.875rem",
        width: "200px",
      }}
    />
  );
}

function FilterButton() {
  return (
    <button
      style={{
        padding: "0.5rem 1rem",
        border: "1px solid #e5e7eb",
        borderRadius: "0.375rem",
        background: "white",
        cursor: "pointer",
        fontSize: "0.875rem",
      }}
    >
      🔍 Filters
    </button>
  );
}

function AddUserButton() {
  return (
    <button
      style={{
        padding: "0.5rem 1rem",
        background: "#3b82f6",
        color: "white",
        border: "none",
        borderRadius: "0.375rem",
        cursor: "pointer",
        fontSize: "0.875rem",
        fontWeight: "500",
      }}
    >
      + Add User
    </button>
  );
}

function ExportButton() {
  return (
    <button
      style={{
        padding: "0.5rem 1rem",
        border: "1px solid #e5e7eb",
        borderRadius: "0.375rem",
        background: "white",
        cursor: "pointer",
        fontSize: "0.875rem",
      }}
    >
      📄 Export
    </button>
  );
}

function App() {
  return (
    <div style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <h1>📋 Header Slots Demo</h1>
      <p style={{ color: "#6b7280", marginBottom: "2rem" }}>
        The TableKit component provides flexible header slots for custom content
        positioning.
      </p>

      {/* Basic table with title only */}
      <div style={{ marginBottom: "3rem" }}>
        <h2>1. Basic Header (Title Only)</h2>
        <TableKit title="Basic User List" />
      </div>

      {/* Left slot - Search */}
      <div style={{ marginBottom: "3rem" }}>
        <h2>2. Left Slot - Search Input</h2>
        <p style={{ color: "#6b7280", marginBottom: "1rem" }}>
          <code>renderHeaderLeft</code> appears next to the title on the left
          side
        </p>
        <TableKit
          title="Users with Search"
          renderHeaderLeft={() => <SearchInput />}
        />
      </div>

      {/* Right slot - Actions */}
      <div style={{ marginBottom: "3rem" }}>
        <h2>3. Right Slot - Action Buttons</h2>
        <p style={{ color: "#6b7280", marginBottom: "1rem" }}>
          <code>renderHeaderRight</code> appears on the right side, perfect for
          actions
        </p>
        <TableKit
          title="Users with Actions"
          renderHeaderRight={() => (
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <FilterButton />
              <AddUserButton />
            </div>
          )}
        />
      </div>

      {/* Both left and right slots */}
      <div style={{ marginBottom: "3rem" }}>
        <h2>4. Left + Right Slots</h2>
        <p style={{ color: "#6b7280", marginBottom: "1rem" }}>
          Combine both slots for search on the left and actions on the right
        </p>
        <TableKit
          title="Complete Header Layout"
          renderHeaderLeft={() => <SearchInput />}
          renderHeaderRight={() => (
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <FilterButton />
              <ExportButton />
              <AddUserButton />
            </div>
          )}
        />
      </div>

      {/* Header extras slot */}
      <div style={{ marginBottom: "3rem" }}>
        <h2>5. Header Extras Slot</h2>
        <p style={{ color: "#6b7280", marginBottom: "1rem" }}>
          <code>renderHeaderExtras</code> appears below the main header for
          additional content
        </p>
        <TableKit
          title="Advanced Layout"
          renderHeaderLeft={() => <SearchInput />}
          renderHeaderRight={() => <AddUserButton />}
          renderHeaderExtras={() => (
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                background: "#f9fafb",
                padding: "0.5rem",
                borderRadius: "0.375rem",
                fontSize: "0.875rem",
                color: "#6b7280",
              }}
            >
              <span>📊 Showing 7 of 125 users</span>
              <span>•</span>
              <span>🔄 Last updated: 2 minutes ago</span>
            </div>
          )}
        />
      </div>

      {/* All slots together */}
      <div style={{ marginBottom: "3rem" }}>
        <h2>6. All Slots Combined</h2>
        <p style={{ color: "#6b7280", marginBottom: "1rem" }}>
          Demonstration of all header slots working together
        </p>
        <TableKit
          title="Complete Example"
          renderHeaderLeft={() => (
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <SearchInput />
              <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>
                🔍 Search in name, email, or access
              </span>
            </div>
          )}
          renderHeaderRight={() => (
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <FilterButton />
              <ExportButton />
              <AddUserButton />
            </div>
          )}
          renderHeaderExtras={() => (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#f1f5f9",
                padding: "0.75rem",
                borderRadius: "0.375rem",
                fontSize: "0.875rem",
              }}
            >
              <div style={{ display: "flex", gap: "1rem", color: "#475569" }}>
                <span>📊 7 active users</span>
                <span>⏱️ Last activity: 5 min ago</span>
                <span>📈 +2 new this week</span>
              </div>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button
                  style={{
                    padding: "0.25rem 0.5rem",
                    background: "white",
                    border: "1px solid #cbd5e1",
                    borderRadius: "0.25rem",
                    fontSize: "0.75rem",
                    cursor: "pointer",
                  }}
                >
                  Clear filters
                </button>
                <button
                  style={{
                    padding: "0.25rem 0.5rem",
                    background: "white",
                    border: "1px solid #cbd5e1",
                    borderRadius: "0.25rem",
                    fontSize: "0.75rem",
                    cursor: "pointer",
                  }}
                >
                  Refresh
                </button>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
}

export default App;
