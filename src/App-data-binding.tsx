import { TableKit, Column, UserRow } from "./index";

// Example custom data types
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "active" | "inactive" | "discontinued";
  lastUpdated: string;
}

interface Order {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    email: string;
  };
  total: number;
  status: "pending" | "shipped" | "delivered" | "cancelled";
  items: Array<{ name: string; quantity: number }>;
  createdAt: string;
}

function App() {
  // Sample product data
  const products: Product[] = [
    {
      id: "p1",
      name: 'MacBook Pro 16"',
      category: "Laptops",
      price: 2499,
      stock: 12,
      status: "active",
      lastUpdated: "2024-08-20",
    },
    {
      id: "p2",
      name: "iPhone 15 Pro",
      category: "Phones",
      price: 999,
      stock: 0,
      status: "inactive",
      lastUpdated: "2024-08-19",
    },
    {
      id: "p3",
      name: "AirPods Pro",
      category: "Audio",
      price: 249,
      stock: 25,
      status: "active",
      lastUpdated: "2024-08-21",
    },
  ];

  // Sample order data
  const orders: Order[] = [
    {
      id: "o1",
      orderNumber: "ORD-2024-001",
      customer: { name: "John Doe", email: "john@example.com" },
      total: 2748,
      status: "delivered",
      items: [
        { name: "MacBook Pro", quantity: 1 },
        { name: "AirPods", quantity: 1 },
      ],
      createdAt: "2024-08-15",
    },
    {
      id: "o2",
      orderNumber: "ORD-2024-002",
      customer: { name: "Jane Smith", email: "jane@example.com" },
      total: 999,
      status: "shipped",
      items: [{ name: "iPhone 15 Pro", quantity: 1 }],
      createdAt: "2024-08-20",
    },
  ];

  // Define custom columns for products
  const productColumns: Column<Product>[] = [
    {
      id: "name",
      header: "Product Name",
      accessorKey: "name",
    },
    {
      id: "category",
      header: "Category",
      accessorKey: "category",
      cell: (value) => (
        <span
          style={{
            padding: "0.25rem 0.5rem",
            background: "#f3f4f6",
            borderRadius: "0.375rem",
            fontSize: "0.75rem",
            fontWeight: "500",
          }}
        >
          {String(value)}
        </span>
      ),
    },
    {
      id: "price",
      header: "Price",
      accessorKey: "price",
      cell: (value) => (
        <span style={{ fontWeight: "600" }}>
          ${typeof value === "number" ? value.toLocaleString() : String(value)}
        </span>
      ),
    },
    {
      id: "stock",
      header: "Stock",
      accessorKey: "stock",
      cell: (value, row) => (
        <span
          style={{
            color: (row as Product).stock === 0 ? "#ef4444" : "#10b981",
            fontWeight: "500",
          }}
        >
          {String(value)} {(row as Product).stock === 0 ? "(Out of stock)" : ""}
        </span>
      ),
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      cell: (value) => {
        const status = String(value);
        const colors = {
          active: { bg: "#ecfdf5", text: "#065f46" },
          inactive: { bg: "#fef2f2", text: "#991b1b" },
          discontinued: { bg: "#f3f4f6", text: "#374151" },
        };
        const color = colors[status as keyof typeof colors] || colors.inactive;

        return (
          <span
            style={{
              padding: "0.25rem 0.75rem",
              background: color.bg,
              color: color.text,
              borderRadius: "9999px",
              fontSize: "0.75rem",
              fontWeight: "500",
              textTransform: "capitalize",
            }}
          >
            {status}
          </span>
        );
      },
    },
  ];

  // Define custom columns for orders
  const orderColumns: Column<Order>[] = [
    {
      id: "orderNumber",
      header: "Order #",
      accessorKey: "orderNumber",
      cell: (value) => (
        <span style={{ fontFamily: "monospace", fontSize: "0.875rem" }}>
          {String(value)}
        </span>
      ),
    },
    {
      id: "customer",
      header: "Customer",
      cell: (_, row) => {
        const order = row as Order;
        return (
          <div>
            <div style={{ fontWeight: "500" }}>{order.customer.name}</div>
            <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>
              {order.customer.email}
            </div>
          </div>
        );
      },
    },
    {
      id: "items",
      header: "Items",
      cell: (_, row) => {
        const order = row as Order;
        const totalItems = order.items.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        return (
          <div>
            <div>
              {totalItems} item{totalItems !== 1 ? "s" : ""}
            </div>
            <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>
              {order.items
                .map((item) => `${item.name} (${item.quantity})`)
                .join(", ")}
            </div>
          </div>
        );
      },
    },
    {
      id: "total",
      header: "Total",
      accessorKey: "total",
      cell: (value) => (
        <span style={{ fontWeight: "600", fontSize: "1rem" }}>
          ${typeof value === "number" ? value.toLocaleString() : String(value)}
        </span>
      ),
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      cell: (value) => {
        const status = String(value);
        const colors = {
          pending: { bg: "#fef3c7", text: "#92400e" },
          shipped: { bg: "#dbeafe", text: "#1e40af" },
          delivered: { bg: "#ecfdf5", text: "#065f46" },
          cancelled: { bg: "#fef2f2", text: "#991b1b" },
        };
        const color = colors[status as keyof typeof colors] || colors.pending;

        return (
          <span
            style={{
              padding: "0.25rem 0.75rem",
              background: color.bg,
              color: color.text,
              borderRadius: "9999px",
              fontSize: "0.75rem",
              fontWeight: "500",
              textTransform: "capitalize",
            }}
          >
            {status}
          </span>
        );
      },
    },
  ];

  // Custom User columns with different data binding approach
  const customUserColumns: Column<UserRow>[] = [
    {
      id: "user",
      header: "User",
      cell: (_, row) => (
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div
            style={{
              width: "2rem",
              height: "2rem",
              borderRadius: "50%",
              background: "#3b82f6",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.875rem",
              fontWeight: "500",
            }}
          >
            {(row as UserRow).name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <div style={{ fontWeight: "500" }}>{(row as UserRow).name}</div>
            <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>
              {(row as UserRow).email}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "access",
      header: "Permissions",
      accessorKey: "access",
      cell: (value) => {
        const permissions = value as string[];
        return (
          <div style={{ display: "flex", gap: "0.25rem", flexWrap: "wrap" }}>
            {permissions.map((permission, index) => (
              <span
                key={index}
                style={{
                  padding: "0.125rem 0.375rem",
                  background: "#e0e7ff",
                  color: "#3730a3",
                  borderRadius: "0.25rem",
                  fontSize: "0.625rem",
                  fontWeight: "500",
                }}
              >
                {permission}
              </span>
            ))}
          </div>
        );
      },
    },
    {
      id: "activity",
      header: "Activity",
      cell: (_, row) => {
        const user = row as UserRow;
        return (
          <div>
            <div style={{ fontSize: "0.875rem" }}>
              Last: {String(user.lastActive)}
            </div>
            <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>
              Joined: {String(user.dateAdded)}
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <h1>🔗 Data Binding Examples</h1>
      <p style={{ color: "#6b7280", marginBottom: "2rem" }}>
        Comprehensive examples showing how to bind different data types to the
        TableKit component.
      </p>

      {/* 1. Default dummy data */}
      <div style={{ marginBottom: "3rem" }}>
        <h2>1. Zero Configuration (Dummy Data)</h2>
        <p style={{ color: "#6b7280", marginBottom: "1rem" }}>
          No props needed - automatically shows dummy user data with default
          columns
        </p>
        <div
          style={{
            background: "#f8fafc",
            padding: "1rem",
            borderRadius: "0.5rem",
            marginBottom: "1rem",
          }}
        >
          <code style={{ fontSize: "0.875rem" }}>{`<TableKit />`}</code>
        </div>
        <TableKit />
      </div>

      {/* 2. Custom data with auto columns */}
      <div style={{ marginBottom: "3rem" }}>
        <h2>2. Custom Data (Auto Columns)</h2>
        <p style={{ color: "#6b7280", marginBottom: "1rem" }}>
          Provide data array - columns auto-generated from object keys
        </p>
        <div
          style={{
            background: "#f8fafc",
            padding: "1rem",
            borderRadius: "0.5rem",
            marginBottom: "1rem",
          }}
        >
          <code style={{ fontSize: "0.875rem" }}>
            {`<TableKit data={products} />`}
          </code>
        </div>
        <TableKit data={products} title="Products (Auto Columns)" />
      </div>

      {/* 3. Custom data with custom columns */}
      <div style={{ marginBottom: "3rem" }}>
        <h2>3. Custom Data + Custom Columns</h2>
        <p style={{ color: "#6b7280", marginBottom: "1rem" }}>
          Full control over data display with custom column definitions
        </p>
        <div
          style={{
            background: "#f8fafc",
            padding: "1rem",
            borderRadius: "0.5rem",
            marginBottom: "1rem",
          }}
        >
          <code style={{ fontSize: "0.875rem" }}>
            {`<TableKit data={products} columns={productColumns} />`}
          </code>
        </div>
        <TableKit
          data={products}
          columns={productColumns}
          title="Products (Custom Styling)"
        />
      </div>

      {/* 4. Different data type */}
      <div style={{ marginBottom: "3rem" }}>
        <h2>4. Different Data Type (Orders)</h2>
        <p style={{ color: "#6b7280", marginBottom: "1rem" }}>
          Complex objects with nested data and custom rendering
        </p>
        <div
          style={{
            background: "#f8fafc",
            padding: "1rem",
            borderRadius: "0.5rem",
            marginBottom: "1rem",
          }}
        >
          <code style={{ fontSize: "0.875rem" }}>
            {`<TableKit data={orders} columns={orderColumns} />`}
          </code>
        </div>
        <TableKit data={orders} columns={orderColumns} title="Recent Orders" />
      </div>

      {/* 5. Custom user data styling */}
      <div style={{ marginBottom: "3rem" }}>
        <h2>5. Default Data + Custom Columns</h2>
        <p style={{ color: "#6b7280", marginBottom: "1rem" }}>
          Use default user data but with completely custom column styling
        </p>
        <div
          style={{
            background: "#f8fafc",
            padding: "1rem",
            borderRadius: "0.5rem",
            marginBottom: "1rem",
          }}
        >
          <code style={{ fontSize: "0.875rem" }}>
            {`<TableKit columns={customUserColumns} />`}
          </code>
        </div>
        <TableKit columns={customUserColumns} title="Users (Custom Styling)" />
      </div>
    </div>
  );
}

export default App;
