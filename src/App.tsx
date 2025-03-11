/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import DynamicTable from "./components/dynamic-table";

function App() {
  // Example data
  const customersData = [
    {
      id: 1,
      registeredDate: "2025-02-28",
      name: "Prabhath Wijewardha",
      email: "prabhath.pw@example.com",
      status: "Active",
      address: "123 Main St",
      city: "Colombo",
      country: "Sri Lanka",
      phone: "+94 1234567890",
      lastLogin: "2025-03-10",
      memberSince: "2023-05-15",
    },
    {
      id: 2,
      registeredDate: "2025-02-27",
      name: "Sachintha QA",
      email: "sachinthaga@gmail.com",
      status: "Active",
      address: "456 Park Ave",
      city: "Kandy",
      country: "Sri Lanka",
      phone: "+94 9876543210",
      lastLogin: "2025-03-09",
      memberSince: "2024-01-20",
    },
    {
      id: 3,
      registeredDate: "2025-02-27",
      name: "Wishmi Hiranya",
      email: "wishess.hi@gmail.com",
      status: "Inactive",
      address: "789 Beach Rd",
      city: "Galle",
      country: "Sri Lanka",
      phone: "+94 5555555555",
      lastLogin: "2025-02-15",
      memberSince: "2023-11-10",
    },
    {
      id: 4,
      registeredDate: "2025-02-27",
      name: "Customer Demo",
      email: "customerdemo11@gmail.com",
      status: "Active",
      address: "101 Hill St",
      city: "Negombo",
      country: "Sri Lanka",
      phone: "+94 1122334455",
      lastLogin: "2025-03-08",
      memberSince: "2024-02-01",
    },
  ];

  const columns = [
    { key: "name", label: "Customer Name", fixed: "left", width: "200px" },
    { key: "email", label: "Email", fixed: "left", width: "250px" },
    {
      key: "status",
      label: "Status",
      fixed: "left",
      width: "120px",
      render: (value: any) => (
        <span
          style={{
            backgroundColor: value === "Active" ? "#e6f7e6" : "#ffebee",
            color: value === "Active" ? "#2e7d32" : "#c62828",
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "14px",
          }}
        >
          {value}
        </span>
      ),
    },
    { key: "registeredDate", label: "Registered Date" },
    { key: "address", label: "Address" },
    { key: "city", label: "City" },
    { key: "country", label: "Country" },
    { key: "phone", label: "Phone Number" },
    { key: "lastLogin", label: "Last Login" },
    { key: "memberSince", label: "Member Since" },
  ];

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Action handlers
  const handleEdit = (record: any) => {
    alert(`Editing customer: ${record.name}`);
  };

  const handleView = (record: any) => {
    alert(`Viewing customer: ${record.name}`);
  };

  const handleDelete = (record: any) => {
    alert(`Deleting customer: ${record.name}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Customer Management</h1>

      <DynamicTable
        data={customersData}
        columns={columns}
        headerStyles={{
          backgroundColor: "#f8f9fa",
          fontWeight: "bold",
          padding: "12px 16px",
        }}
        rowStyles={{
          padding: "12px 16px",
          borderBottom: "1px solid #dee2e6",
        }}
        tableStyles={{
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        }}
        containerStyles={{
          maxHeight: "600px",
        }}
        actions={{
          show: true,
          position: "right",
          buttons: [
            { label: "View", onClick: handleView },
            { label: "Edit", onClick: handleEdit },
            { label: "Delete", onClick: handleDelete },
          ],
        }}
        responsive={{
          breakpoint: 768,
          cardStyles: {
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          },
        }}
        pagination={{
          currentPage,
          pageSize,
          totalRecords: customersData.length,
          onPageChange: setCurrentPage,
        }}
      />
    </div>
  );
}

export default App;
