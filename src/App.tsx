import { useState } from "react";
import { TableKit, TableAction, UserRow } from "./index";

// Demo search component
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
      }}
    />
  );
}

// Demo filter button
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

// Demo add button
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

function App() {
  const [currentDemo, setCurrentDemo] = useState("zero-config");
  const [loading, setLoading] = useState(false);

  // Custom actions for the demo
  const customActions: TableAction<UserRow>[] = [
    {
      id: "impersonate",
      label: "Impersonate",
      icon: "👤",
      onClick: (user) => {
        alert(`Impersonating ${user.name}`);
      },
      show: (user) => user.access.includes("Admin"),
    },
    {
      id: "sendEmail",
      label: "Send Email",
      icon: "✉️",
      onClick: (user) => {
        window.location.href = `mailto:${user.email}`;
      },
    },
  ];

  // Custom sample data
  const customUsers: UserRow[] = [
    {
      id: "1",
      name: "John Doe",
      email: "john@company.com",
      access: ["Editor", "Viewer"],
      lastActive: "Dec 15, 2024",
      dateAdded: "Jan 1, 2024",
      avatarUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@company.com",
      access: ["Admin", "Editor"],
      lastActive: "Dec 14, 2024",
      dateAdded: "Feb 15, 2024",
      avatarUrl:
        "https://images.unsplash.com/photo-1494790108755-2616b612b647?w=40&h=40&fit=crop&crop=face",
    },
  ];

  const toggleLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  const demoStyle = {
    fontFamily: "system-ui, -apple-system, sans-serif",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "2rem",
  };

  const navStyle = {
    display: "flex",
    gap: "1rem",
    marginBottom: "2rem",
    padding: "1rem",
    background: "#f9fafb",
    borderRadius: "0.5rem",
  };

  const buttonStyle = (isActive: boolean) => ({
    padding: "0.5rem 1rem",
    border: isActive ? "2px solid #3b82f6" : "1px solid #e5e7eb",
    borderRadius: "0.375rem",
    background: isActive ? "#eff6ff" : "white",
    cursor: "pointer",
    fontSize: "0.875rem",
    fontWeight: isActive ? "600" : "400",
    color: isActive ? "#3b82f6" : "#374151",
  });

  return (
    <div style={demoStyle}>
      <h1 style={{ marginBottom: "1rem", color: "#111827" }}>
        🚀 table-kit Demo
      </h1>
      <p style={{ marginBottom: "2rem", color: "#6b7280" }}>
        A reusable React + TypeScript table component with zero-config dummy
        data and full customization.
      </p>

      {/* Demo Navigation */}
      <nav style={navStyle}>
        <button
          style={buttonStyle(currentDemo === "zero-config")}
          onClick={() => setCurrentDemo("zero-config")}
        >
          Zero Config
        </button>
        <button
          style={buttonStyle(currentDemo === "with-header")}
          onClick={() => setCurrentDemo("with-header")}
        >
          With Header Slots
        </button>
        <button
          style={buttonStyle(currentDemo === "custom-data")}
          onClick={() => setCurrentDemo("custom-data")}
        >
          Custom Data
        </button>
        <button
          style={buttonStyle(currentDemo === "custom-actions")}
          onClick={() => setCurrentDemo("custom-actions")}
        >
          Custom Actions
        </button>
        <button
          style={buttonStyle(currentDemo === "loading")}
          onClick={() => setCurrentDemo("loading")}
        >
          Loading State
        </button>
      </nav>

      {/* Demo Content */}
      <div style={{ marginBottom: "2rem" }}>
        {currentDemo === "zero-config" && (
          <div>
            <h2 style={{ marginBottom: "1rem", color: "#111827" }}>
              Zero Configuration
            </h2>
            <p style={{ marginBottom: "1rem", color: "#6b7280" }}>
              Just import and use - no props required!
            </p>
            <pre
              style={{
                background: "#f3f4f6",
                padding: "1rem",
                borderRadius: "0.5rem",
                marginBottom: "1rem",
                fontSize: "0.875rem",
                overflow: "auto",
              }}
            >
              {`import { TableKit } from 'table-kit';

export default function App() {
  return <TableKit />;
}`}
            </pre>
            <TableKit />
          </div>
        )}

        {currentDemo === "with-header" && (
          <div>
            <h2 style={{ marginBottom: "1rem", color: "#111827" }}>
              With Header Slots
            </h2>
            <p style={{ marginBottom: "1rem", color: "#6b7280" }}>
              Inject custom components into the header for search, filters, and
              actions.
            </p>
            <TableKit
              title="All users 44"
              renderHeaderLeft={() => <SearchInput />}
              renderHeaderRight={() => (
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <FilterButton />
                  <AddUserButton />
                </div>
              )}
            />
          </div>
        )}

        {currentDemo === "custom-data" && (
          <div>
            <h2 style={{ marginBottom: "1rem", color: "#111827" }}>
              Custom Data
            </h2>
            <p style={{ marginBottom: "1rem", color: "#6b7280" }}>
              Provide your own data while keeping the same user experience.
            </p>
            <TableKit
              data={customUsers}
              title="Team Members"
              onEdit={(user) => alert(`Editing ${user.name}`)}
              onDelete={(user) => {
                if (confirm(`Delete ${user.name}?`)) {
                  alert(`Deleted ${user.name}`);
                }
              }}
            />
          </div>
        )}

        {currentDemo === "custom-actions" && (
          <div>
            <h2 style={{ marginBottom: "1rem", color: "#111827" }}>
              Custom Actions
            </h2>
            <p style={{ marginBottom: "1rem", color: "#6b7280" }}>
              Add your own actions while keeping the defaults, or override them
              completely.
            </p>
            <TableKit
              title="Admin Users"
              actions={customActions}
              onEdit={(user) => alert(`Opening edit form for ${user.name}`)}
              onDelete={(user) => alert(`Deleting ${user.name}`)}
            />
          </div>
        )}

        {currentDemo === "loading" && (
          <div>
            <h2 style={{ marginBottom: "1rem", color: "#111827" }}>
              Loading State
            </h2>
            <p style={{ marginBottom: "1rem", color: "#6b7280" }}>
              Beautiful skeleton loading animation while data is being fetched.
            </p>
            <button
              onClick={toggleLoading}
              style={{
                padding: "0.5rem 1rem",
                background: "#3b82f6",
                color: "white",
                border: "none",
                borderRadius: "0.375rem",
                cursor: "pointer",
                marginBottom: "1rem",
              }}
            >
              {loading ? "Loading..." : "Trigger Loading"}
            </button>
            <TableKit
              loading={loading}
              title="Users"
              emptyState={
                <div style={{ textAlign: "center", padding: "2rem" }}>
                  <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>
                    📄
                  </div>
                  <p style={{ color: "#6b7280", marginBottom: "1rem" }}>
                    No users found
                  </p>
                  <button
                    style={{
                      padding: "0.5rem 1rem",
                      background: "#3b82f6",
                      color: "white",
                      border: "none",
                      borderRadius: "0.375rem",
                      cursor: "pointer",
                    }}
                  >
                    Invite Users
                  </button>
                </div>
              }
            />
          </div>
        )}
      </div>

      {/* Footer */}
      <footer
        style={{
          marginTop: "3rem",
          padding: "2rem",
          background: "#f9fafb",
          borderRadius: "0.5rem",
          textAlign: "center",
          color: "#6b7280",
        }}
      >
        <p>
          Built with ❤️ by{" "}
          <a
            href="https://github.com/SachithWickramasekara"
            style={{ color: "#3b82f6", textDecoration: "none" }}
          >
            Sachith Wickramasekara
          </a>
        </p>
        <p style={{ marginTop: "0.5rem", fontSize: "0.875rem" }}>
          View source on{" "}
          <a
            href="https://github.com/SachithWickramasekara/table-kit"
            style={{ color: "#3b82f6", textDecoration: "none" }}
          >
            GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
