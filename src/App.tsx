/* eslint-disable @typescript-eslint/no-explicit-any */
import DynamicTable from "./components/dynamic-table";

function App() {
  const categories = {
    data: [
      {
        id: 1,
        name: "Apple",
        category: "Fruits",
        active: true,
        Country: "USA",
      },
      {
        id: 2,
        name: "Banana",
        category: "Fruits",
        active: true,
        Country: "USA",
      },
      {
        id: 3,
        name: "Carrot",
        category: "Vegetables",
        active: true,
        Country: "USA",
      },
      {
        id: 4,
        name: "Tesla",
        category: "Cars",
        active: true,
        Country: "India",
      },
      { id: 5, name: "BMW", category: "Cars", active: true, Country: "India" },
      { id: 6, name: "BMW", category: "Cars", active: true, Country: "India" },
    ],
  };

  const columns = [
    "name",
    "category",
    { key: "active", label: "Is Active?" },
    "Country",
    "State",
    "City",
    "Address",
    "Province",
  ];

  const customHeaders = {
    name: "Product Name",
    category: "Product Category",
  };

  const response = {
    data: [
      {
        id: 17,
        name: "Dealer Admin",
        active: true,
        userCount: 0,
        type: "dealer",
        permissions: [
          {
            id: 13,
            name: "package.view",
          },
          {
            id: 25,
            name: "settings.view",
          },
        ],
      },
      {
        id: 21,
        name: "Dealer Driver",
        active: false,
        userCount: 0,
        type: "dealer",
        permissions: [
          {
            id: 14,
            name: "package.add",
          },
          {
            id: 30,
            name: "notifications.add",
          },
          {
            id: 32,
            name: "notifications.deactivate",
          },
          {
            id: 28,
            name: "settings.deactivate",
          },
          {
            id: 16,
            name: "package.deactivate",
          },
          {
            id: 33,
            name: "dashboard.view",
          },
          {
            id: 15,
            name: "package.edit",
          },
          {
            id: 29,
            name: "notifications.view",
          },
          {
            id: 13,
            name: "package.view",
          },
          {
            id: 25,
            name: "settings.view",
          },
          {
            id: 27,
            name: "settings.edit",
          },
          {
            id: 31,
            name: "notifications.edit",
          },
          {
            id: 26,
            name: "settings.add",
          },
        ],
      },
      {
        id: 20,
        name: "Dealer Role ",
        active: true,
        userCount: 0,
        type: "dealer",
        permissions: [
          {
            id: 15,
            name: "package.edit",
          },
          {
            id: 8,
            name: "role.deactivate",
          },
          {
            id: 7,
            name: "role.edit",
          },
          {
            id: 13,
            name: "package.view",
          },
          {
            id: 14,
            name: "package.add",
          },
          {
            id: 6,
            name: "role.add",
          },
          {
            id: 16,
            name: "package.deactivate",
          },
          {
            id: 5,
            name: "role.view",
          },
        ],
      },
      {
        id: 16,
        name: "TestingRole775",
        active: true,
        userCount: 1,
        type: "dealer",
        permissions: [
          {
            id: 13,
            name: "package.view",
          },
          {
            id: 25,
            name: "settings.view",
          },
        ],
      },
      {
        id: 14,
        name: "TestRole233",
        active: true,
        userCount: 1,
        type: "dealer",
        permissions: [
          {
            id: 27,
            name: "settings.edit",
          },
          {
            id: 25,
            name: "settings.view",
          },
          {
            id: 28,
            name: "settings.deactivate",
          },
          {
            id: 26,
            name: "settings.add",
          },
        ],
      },
    ],
    current_page: 1,
    total_pages: 4,
    total_record: 18,
    page_size: 5,
  };

  const columnsexampleTwo = [
    { key: "name", label: "Role Name" },
    { key: "userCount", label: "Number of Users" },
    { key: "active", label: "Status" },
    { key: "actions", label: "Action" },
    { key: "actions", label: "Action" },
  ];

  const headerStyles = {
    backgroundColor: "#f8f9fa",
    textAlign: "left",
    fontWeight: "bold",
    padding: "10px",
  };

  const rowStyles = {
    padding: "10px",
    borderBottom: "1px solid #dee2e6",
  };

  
  return (
    <>
      <DynamicTable
        data={categories.data}
        columns={columns}
        customHeaders={customHeaders}
        headerStyles={headerStyles as React.CSSProperties}
        rowStyles={rowStyles}
      />
      <DynamicTable
        data={response.data}
        columns={columnsexampleTwo}
        customHeaders={customHeaders}
      />
    </>
  );
}

export default App;
