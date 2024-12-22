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

  const columns = ["name", "category", { key: "active", label: "Is Active?" } ,"Country" ,"State" ,"City" , "Address" , "Province"];

  const customHeaders = {
    name: "Product Name",
    category: "Product Category",
  };

  return (
    <>
      <DynamicTable
        data={categories.data}
        columns={columns}
        customHeaders={customHeaders}
      />
    </>
  );
}

export default App;
