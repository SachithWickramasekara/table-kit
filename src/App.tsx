import { useState } from "react";
import { TableKit, TableAction, UserRow, AccessChips } from "./index";

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
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selectAllState, setSelectAllState] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);

  // Selection handlers
  const handleSelectionChange = (newSelection: string[]) => {
    setSelectedRows(newSelection);
    console.log("Selected rows:", newSelection);
  };

  const handleSelectAll = (isSelected: boolean) => {
    setSelectAllState(isSelected);
    console.log("Select all:", isSelected);
  };

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
    {
      id: "3",
      name: "Bob Johnson",
      email: "bob@company.com",
      access: ["Viewer"],
      lastActive: "Dec 13, 2024",
      dateAdded: "Mar 1, 2024",
      avatarUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    },
    {
      id: "4",
      name: "Alice Brown",
      email: "alice@company.com",
      access: ["Admin", "Editor", "Viewer"],
      lastActive: "Dec 12, 2024",
      dateAdded: "Apr 1, 2024",
      avatarUrl:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    },
    {
      id: "5",
      name: "Charlie Wilson",
      email: "charlie@company.com",
      access: ["Editor"],
      lastActive: "Dec 11, 2024",
      dateAdded: "May 1, 2024",
      avatarUrl:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face",
    },
  ];

  // Extended data with many columns for sticky demo
  const extendedUsers = [
    {
      id: "1",
      name: "John Doe",
      email: "john@company.com",
      department: "Engineering",
      role: "Senior Developer",
      location: "San Francisco",
      salary: "$120,000",
      startDate: "2020-01-15",
      manager: "Sarah Wilson",
      projects: "Project A, Project B",
      skills: "React, TypeScript, Node.js",
      performance: "Excellent",
      lastReview: "2024-01-15",
      nextReview: "2024-07-15",
      vacationDays: 15,
      sickDays: 2,
      remoteDays: 3,
      officeDays: 2,
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
      department: "Product",
      role: "Product Manager",
      location: "New York",
      salary: "$140,000",
      startDate: "2019-03-20",
      manager: "Mike Johnson",
      projects: "Project C, Project D",
      skills: "Product Strategy, Analytics",
      performance: "Outstanding",
      lastReview: "2024-02-01",
      nextReview: "2024-08-01",
      vacationDays: 12,
      sickDays: 1,
      remoteDays: 4,
      officeDays: 1,
      access: ["Admin", "Editor"],
      lastActive: "Dec 14, 2024",
      dateAdded: "Feb 15, 2024",
      avatarUrl:
        "https://images.unsplash.com/photo-1494790108755-2616b612b647?w=40&h=40&fit=crop&crop=face",
    },
    {
      id: "3",
      name: "Bob Johnson",
      email: "bob@company.com",
      department: "Design",
      role: "UX Designer",
      location: "Austin",
      salary: "$95,000",
      startDate: "2021-06-10",
      manager: "Lisa Chen",
      projects: "Project E",
      skills: "Figma, Sketch, Prototyping",
      performance: "Good",
      lastReview: "2024-01-30",
      nextReview: "2024-07-30",
      vacationDays: 18,
      sickDays: 0,
      remoteDays: 5,
      officeDays: 0,
      access: ["Viewer"],
      lastActive: "Dec 13, 2024",
      dateAdded: "Mar 1, 2024",
      avatarUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
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
        <button
          style={buttonStyle(currentDemo === "selection")}
          onClick={() => setCurrentDemo("selection")}
        >
          Row Selection
        </button>
        <button
          style={buttonStyle(currentDemo === "pagination")}
          onClick={() => setCurrentDemo("pagination")}
        >
          Pagination
        </button>
        <button
          style={buttonStyle(currentDemo === "sticky-columns")}
          onClick={() => setCurrentDemo("sticky-columns")}
        >
          Sticky Columns
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

        {currentDemo === "selection" && (
          <div>
            <h2 style={{ marginBottom: "1rem", color: "#111827" }}>
              Row Selection
            </h2>
            <p style={{ marginBottom: "1rem", color: "#6b7280" }}>
              Select individual rows or all rows with checkboxes. State is
              managed via props.
            </p>

            <div
              style={{
                background: "#f9fafb",
                padding: "1rem",
                borderRadius: "0.5rem",
                marginBottom: "1rem",
                fontSize: "0.875rem",
              }}
            >
              <p>
                <strong>Selected rows:</strong>{" "}
                {selectedRows.length > 0 ? selectedRows.join(", ") : "None"}
              </p>
              <p>
                <strong>Select all state:</strong>{" "}
                {selectAllState ? "All selected" : "Not all selected"}
              </p>
            </div>

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
              {`const [selectedRows, setSelectedRows] = useState<string[]>([]);

<TableKit 
  selectable
  selectedRows={selectedRows}
  onSelectionChange={setSelectedRows}
  onSelectAll={(isSelected) => console.log('All selected:', isSelected)}
/>`}
            </pre>

            <TableKit
              selectable
              selectedRows={selectedRows}
              onSelectionChange={handleSelectionChange}
              selectAll={selectAllState}
              onSelectAll={handleSelectAll}
              title="Users with Selection"
            />
          </div>
        )}

        {currentDemo === "pagination" && (
          <div>
            <h2 style={{ marginBottom: "1rem", color: "#111827" }}>
              Pagination
            </h2>
            <p style={{ marginBottom: "1rem", color: "#6b7280" }}>
              Navigate through large datasets with customizable page sizes and
              page numbers.
            </p>

            <div
              style={{
                background: "#f9fafb",
                padding: "1rem",
                borderRadius: "0.5rem",
                marginBottom: "1rem",
                fontSize: "0.875rem",
              }}
            >
              <p>
                <strong>Current page:</strong> {currentPage}
              </p>
              <p>
                <strong>Page size:</strong> {pageSize} items per page
              </p>
              <p>
                <strong>Total items:</strong> 7 users
              </p>
            </div>

            <div
              style={{
                display: "flex",
                gap: "1rem",
                marginBottom: "1rem",
                alignItems: "center",
              }}
            >
              <label style={{ fontSize: "0.875rem", fontWeight: "500" }}>
                Page size:
              </label>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1); // Reset to first page when changing page size
                }}
                style={{
                  padding: "0.5rem",
                  border: "1px solid #e5e7eb",
                  borderRadius: "0.375rem",
                  fontSize: "0.875rem",
                }}
              >
                <option value={2}>2 per page</option>
                <option value={3}>3 per page</option>
                <option value={5}>5 per page</option>
                <option value={10}>10 per page</option>
              </select>
            </div>

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
              {`const [currentPage, setCurrentPage] = useState(1);
const [pageSize, setPageSize] = useState(3);

<TableKit 
  pageSize={pageSize}
  currentPage={currentPage}
  onPageChange={setCurrentPage}
  title="Users with Pagination"
/>`}
            </pre>

            <TableKit
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              title="Users with Pagination"
            />

            <h3
              style={{
                marginTop: "2rem",
                marginBottom: "1rem",
                color: "#111827",
              }}
            >
              Pagination with Custom Data
            </h3>
            <p style={{ marginBottom: "1rem", color: "#6b7280" }}>
              Pagination also works seamlessly with your own data.
            </p>

            <TableKit
              data={customUsers}
              pageSize={2}
              currentPage={1}
              onPageChange={(page) => console.log("Page changed to:", page)}
              title="Custom Team Members"
              onEdit={(user) => alert(`Editing ${user.name}`)}
              onDelete={(user) => {
                if (confirm(`Delete ${user.name}?`)) {
                  alert(`Deleted ${user.name}`);
                }
              }}
            />
          </div>
        )}

        {currentDemo === "sticky-columns" && (
          <div>
            <h2 style={{ marginBottom: "1rem", color: "#111827" }}>
              Sticky Columns
            </h2>
            <p style={{ marginBottom: "1rem", color: "#6b7280" }}>
              Keep important columns visible while scrolling through wide
              tables. The last two columns (including actions) remain fixed on
              the right.
            </p>

            <div
              style={{
                background: "#f9fafb",
                padding: "1rem",
                borderRadius: "0.5rem",
                marginBottom: "1rem",
                fontSize: "0.875rem",
              }}
            >
              <p>
                <strong>Features:</strong>
              </p>
              <ul style={{ margin: "0.5rem 0", paddingLeft: "1.5rem" }}>
                <li>Actions column stays fixed on the right</li>
                <li>Last data column (Access) also stays fixed</li>
                <li>All other columns scroll horizontally</li>
                <li>Shadow effects show the sticky boundary</li>
                <li>Works with any number of columns</li>
              </ul>
            </div>

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
              {`// Define columns with many fields
const columns = [
  { id: "name", header: "Name", accessorKey: "name" },
  { id: "email", header: "Email", accessorKey: "email" },
  { id: "department", header: "Department", accessorKey: "department" },
  // ... many more columns
  { id: "access", header: "Access", accessorKey: "access" },
];

<TableKit 
  data={extendedUsers}
  columns={columns}
  stickyActions={true}
  stickyLastColumn={true}
  title="Employee Directory"
/>`}
            </pre>

            <TableKit
              data={extendedUsers}
              columns={[
                {
                  id: "name",
                  header: "Name",
                  accessorKey: "name",
                  cell: (_, row) => (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <img
                        src={row.avatarUrl}
                        alt={row.name}
                        style={{
                          width: "2rem",
                          height: "2rem",
                          borderRadius: "50%",
                        }}
                      />
                      <div>
                        <div style={{ fontWeight: "500" }}>{row.name}</div>
                        <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                          {row.email}
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  id: "department",
                  header: "Department",
                  accessorKey: "department",
                },
                {
                  id: "role",
                  header: "Role",
                  accessorKey: "role",
                },
                {
                  id: "location",
                  header: "Location",
                  accessorKey: "location",
                },
                {
                  id: "salary",
                  header: "Salary",
                  accessorKey: "salary",
                },
                {
                  id: "startDate",
                  header: "Start Date",
                  accessorKey: "startDate",
                },
                {
                  id: "manager",
                  header: "Manager",
                  accessorKey: "manager",
                },
                {
                  id: "projects",
                  header: "Projects",
                  accessorKey: "projects",
                },
                {
                  id: "skills",
                  header: "Skills",
                  accessorKey: "skills",
                },
                {
                  id: "performance",
                  header: "Performance",
                  accessorKey: "performance",
                  cell: (value: unknown) => (
                    <span
                      style={{
                        padding: "0.25rem 0.5rem",
                        borderRadius: "0.25rem",
                        fontSize: "0.75rem",
                        fontWeight: "500",
                        background:
                          value === "Excellent" || value === "Outstanding"
                            ? "#dcfce7"
                            : "#fef3c7",
                        color:
                          value === "Excellent" || value === "Outstanding"
                            ? "#166534"
                            : "#92400e",
                      }}
                    >
                      {String(value)}
                    </span>
                  ),
                },
                {
                  id: "lastReview",
                  header: "Last Review",
                  accessorKey: "lastReview",
                },
                {
                  id: "nextReview",
                  header: "Next Review",
                  accessorKey: "nextReview",
                },
                {
                  id: "vacationDays",
                  header: "Vacation Days",
                  accessorKey: "vacationDays",
                },
                {
                  id: "sickDays",
                  header: "Sick Days",
                  accessorKey: "sickDays",
                },
                {
                  id: "remoteDays",
                  header: "Remote Days",
                  accessorKey: "remoteDays",
                },
                {
                  id: "officeDays",
                  header: "Office Days",
                  accessorKey: "officeDays",
                },
                {
                  id: "additionalField1",
                  header: "Additional Field 1",
                  accessorKey: "department", // Reusing for demo
                },
                {
                  id: "additionalField2",
                  header: "Additional Field 2",
                  accessorKey: "role", // Reusing for demo
                },
                {
                  id: "additionalField3",
                  header: "Additional Field 3",
                  accessorKey: "location", // Reusing for demo
                },
                {
                  id: "access",
                  header: "Access",
                  accessorKey: "access",
                  cell: (value: unknown) => (
                    <AccessChips access={value as string[]} />
                  ),
                },
              ]}
              stickyActions={true}
              stickyLastColumn={true}
              title="Employee Directory (18+ columns)"
              onEdit={(user) => alert(`Editing ${user.name}`)}
              onDelete={(user) => {
                if (confirm(`Delete ${user.name}?`)) {
                  alert(`Deleted ${user.name}`);
                }
              }}
            />

            <h3
              style={{
                marginTop: "2rem",
                marginBottom: "1rem",
                color: "#111827",
              }}
            >
              Simple Sticky Test
            </h3>
            <p style={{ marginBottom: "1rem", color: "#6b7280" }}>
              This table has a fixed width container to force horizontal
              scrolling.
            </p>

            {/* Simple test with inline styles */}
            <div
              style={{
                width: "600px",
                overflow: "auto",
                border: "1px solid #ccc",
                marginBottom: "2rem",
              }}
            >
              <table style={{ width: "1000px", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th
                      style={{
                        padding: "8px",
                        border: "1px solid #ccc",
                        backgroundColor: "#f0f0f0",
                      }}
                    >
                      Col 1
                    </th>
                    <th
                      style={{
                        padding: "8px",
                        border: "1px solid #ccc",
                        backgroundColor: "#f0f0f0",
                      }}
                    >
                      Col 2
                    </th>
                    <th
                      style={{
                        padding: "8px",
                        border: "1px solid #ccc",
                        backgroundColor: "#f0f0f0",
                      }}
                    >
                      Col 3
                    </th>
                    <th
                      style={{
                        padding: "8px",
                        border: "1px solid #ccc",
                        backgroundColor: "#f0f0f0",
                      }}
                    >
                      Col 4
                    </th>
                    <th
                      style={{
                        padding: "8px",
                        border: "1px solid #ccc",
                        backgroundColor: "#f0f0f0",
                      }}
                    >
                      Col 5
                    </th>
                    <th
                      style={{
                        padding: "8px",
                        border: "1px solid #ccc",
                        backgroundColor: "#f0f0f0",
                      }}
                    >
                      Col 6
                    </th>
                    <th
                      style={{
                        padding: "8px",
                        border: "1px solid #ccc",
                        backgroundColor: "#f0f0f0",
                      }}
                    >
                      Col 7
                    </th>
                    <th
                      style={{
                        padding: "8px",
                        border: "1px solid #ccc",
                        backgroundColor: "#f0f0f0",
                      }}
                    >
                      Col 8
                    </th>
                    <th
                      style={{
                        padding: "8px",
                        border: "1px solid #ccc",
                        backgroundColor: "#f0f0f0",
                        position: "sticky",
                        right: "0",
                        zIndex: 10,
                      }}
                    >
                      Sticky Col 9
                    </th>
                    <th
                      style={{
                        padding: "8px",
                        border: "1px solid #ccc",
                        backgroundColor: "#f0f0f0",
                        position: "sticky",
                        right: "100px",
                        zIndex: 9,
                      }}
                    >
                      Sticky Col 10
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                      Data 1
                    </td>
                    <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                      Data 2
                    </td>
                    <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                      Data 3
                    </td>
                    <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                      Data 4
                    </td>
                    <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                      Data 5
                    </td>
                    <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                      Data 6
                    </td>
                    <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                      Data 7
                    </td>
                    <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                      Data 8
                    </td>
                    <td
                      style={{
                        padding: "8px",
                        border: "1px solid #ccc",
                        position: "sticky",
                        right: "0",
                        zIndex: 10,
                        backgroundColor: "white",
                      }}
                    >
                      Sticky Data 9
                    </td>
                    <td
                      style={{
                        padding: "8px",
                        border: "1px solid #ccc",
                        position: "sticky",
                        right: "100px",
                        zIndex: 9,
                        backgroundColor: "white",
                      }}
                    >
                      Sticky Data 10
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div
              style={{
                width: "600px",
                overflow: "auto",
                border: "1px solid #ccc",
              }}
            >
              <TableKit
                data={extendedUsers}
                columns={[
                  { id: "name", header: "Name", accessorKey: "name" },
                  { id: "email", header: "Email", accessorKey: "email" },
                  {
                    id: "department",
                    header: "Department",
                    accessorKey: "department",
                  },
                  { id: "role", header: "Role", accessorKey: "role" },
                  {
                    id: "location",
                    header: "Location",
                    accessorKey: "location",
                  },
                  { id: "salary", header: "Salary", accessorKey: "salary" },
                  {
                    id: "startDate",
                    header: "Start Date",
                    accessorKey: "startDate",
                  },
                  { id: "manager", header: "Manager", accessorKey: "manager" },
                  {
                    id: "projects",
                    header: "Projects",
                    accessorKey: "projects",
                  },
                  { id: "skills", header: "Skills", accessorKey: "skills" },
                  {
                    id: "performance",
                    header: "Performance",
                    accessorKey: "performance",
                  },
                  {
                    id: "lastReview",
                    header: "Last Review",
                    accessorKey: "lastReview",
                  },
                  {
                    id: "nextReview",
                    header: "Next Review",
                    accessorKey: "nextReview",
                  },
                  {
                    id: "vacationDays",
                    header: "Vacation Days",
                    accessorKey: "vacationDays",
                  },
                  {
                    id: "sickDays",
                    header: "Sick Days",
                    accessorKey: "sickDays",
                  },
                  {
                    id: "remoteDays",
                    header: "Remote Days",
                    accessorKey: "remoteDays",
                  },
                  {
                    id: "officeDays",
                    header: "Office Days",
                    accessorKey: "officeDays",
                  },
                  {
                    id: "access",
                    header: "Access",
                    accessorKey: "access",
                    cell: (value: unknown) => (
                      <AccessChips access={value as string[]} />
                    ),
                  },
                ]}
                stickyActions={true}
                stickyLastColumn={true}
                title="Fixed Width Test"
              />
            </div>

            <h3
              style={{
                marginTop: "2rem",
                marginBottom: "1rem",
                color: "#111827",
              }}
            >
              Customizable Sticky Columns
            </h3>
            <p style={{ marginBottom: "1rem", color: "#6b7280" }}>
              You can control which columns are sticky and how many.
            </p>

            <TableKit
              data={customUsers}
              columns={[
                {
                  id: "name",
                  header: "Name",
                  accessorKey: "name",
                  cell: (_, row) => (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <img
                        src={row.avatarUrl}
                        alt={row.name}
                        style={{
                          width: "2rem",
                          height: "2rem",
                          borderRadius: "50%",
                        }}
                      />
                      <div>
                        <div style={{ fontWeight: "500" }}>{row.name}</div>
                        <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                          {row.email}
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  id: "email",
                  header: "Email",
                  accessorKey: "email",
                },
                {
                  id: "access",
                  header: "Access",
                  accessorKey: "access",
                  cell: (value: unknown) => (
                    <AccessChips access={value as string[]} />
                  ),
                },
                {
                  id: "lastActive",
                  header: "Last Active",
                  accessorKey: "lastActive",
                },
                {
                  id: "dateAdded",
                  header: "Date Added",
                  accessorKey: "dateAdded",
                },
              ]}
              stickyActions={true}
              stickyColumns={2} // Make last 2 data columns sticky
              title="Custom Sticky Configuration"
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
