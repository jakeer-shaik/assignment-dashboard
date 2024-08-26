import React, { useState } from "react";
import { Bar, Doughnut, Pie } from "react-chartjs-2";
import initialData from "../widgets.json";
import { RxCross2 } from "react-icons/rx";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
} from "chart.js";
import Header from "./components/Header";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement
);

const App = () => {
  const [dashboardData, setDashboardData] = useState(initialData);
  const [filteredCategories, setFilteredCategories] = useState(
    dashboardData.categories
  );
  const [newWidget, setNewWidget] = useState({
    name: "",
    randomValues: "",
    categoryId: "",
  });
  const chartOptions = {
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}`,
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  const renderChart = (widget) => {
    switch (widget.chartType) {
      case "Bar":
        return <Bar data={widget.data} options={chartOptions} />;
      case "Doughnut":
        return <Doughnut data={widget.data} options={chartOptions} />;
      case "Pie":
        return <Pie data={widget.data} options={chartOptions} />;
      default:
        return null;
    }
  };

  const handleAddWidget = () => {
    if (!newWidget.name || !newWidget.randomValues || !newWidget.categoryId) {
      alert("Please fill in all the fields");
      return;
    }

    const category = dashboardData.categories.find(
      (cat) => cat.id === newWidget.categoryId
    );
    if (!category) {
      alert("Category not found");
      return;
    }

    const randomValuesArray = newWidget.randomValues.split(",").map(Number);
    const labels = randomValuesArray.map((_, index) => `Label${index + 1}`);

    const newWidgetData = {
      id: `${newWidget.name}-${Date.now()}`,
      name: newWidget.name,
      chartType: category.widgets[0].chartType,
      data: {
        labels: labels,
        datasets: [
          {
            label: newWidget.name,
            data: randomValuesArray,
            backgroundColor: [
              "#FA8072",
              "#008080",
              "#ff6384",
              "#FFD700",
              "#008000",
              "#800080",
              "#FFA500",
              "#ADFF2F",
              "#800000",
              "#0000FF",
              "#00FFFF",
              "#FFFF00",
              "#36a2eb",
              "#cc65fe",
              "#f7c242",
              "#66cc99",
              "#e66000",
              "#93c572",
              "#5984e0",
            ],
            borderWidth: 0,
          },
        ],
      },
    };

    setDashboardData((prevData) => {
      const updatedCategories = prevData.categories.map((cat) =>
        cat.id === newWidget.categoryId
          ? { ...cat, widgets: [...cat.widgets, newWidgetData] }
          : cat
      );

      return { ...prevData, categories: updatedCategories };
    });

    setNewWidget({
      name: "",
      randomValues: "",
      categoryId: "",
    });
  };

  const handleRemoveWidget = (categoryId, widgetId) => {
    setDashboardData((prevData) => {
      const updatedCategories = prevData.categories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              widgets: category.widgets.filter(
                (widget) => widget.id !== widgetId
              ),
            }
          : category
      );

      return { ...prevData, categories: updatedCategories };
    });
  };

  return (
    <>
      <Header
        dashboardData={dashboardData}
        setFilteredCategories={setFilteredCategories}
      />
      <div className="md:p-4">
        <div>
          {filteredCategories.map((category) => (
            <div key={category.id} className="mb-6 px-4">
              <h2 className="text-md font-bold mb-4">{category.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.widgets.map((widget) => (
                  <div
                    className="rounded-lg shadow-lg relative bg-white p-4"
                    key={widget.id}
                  >
                    <h3 className="text-sm font-bold mb-2">{widget.name}</h3>
                    <div className="flex justify-between items-center space-x-4">
                      <div className="w-1/2 h-40">{renderChart(widget)}</div>
                      <div className="w-1/2">
                        <ul className="list-disc text-sm pl-5">
                          {widget.data.labels.map((label, index) => (
                            <li key={index} className="flex items-center">
                              <div
                                className="w-4 h-4 mr-2"
                                style={{
                                  backgroundColor:
                                    widget.data.datasets[0].backgroundColor[
                                      index
                                    ],
                                }}
                              />
                              {label}: {widget.data.datasets[0].data[index]}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <button
                        className="absolute top-2 right-2 text-red-500"
                        onClick={() =>
                          handleRemoveWidget(category.id, widget.id)
                        }
                      >
                        <RxCross2 className="font-bold text-xl" />
                      </button>
                    </div>
                  </div>
                ))}
                <div className="bg-white p-4 rounded-md shadow-md flex justify-center items-center text-gray-400">
                  <button
                    className="flex items-center space-x-2 text-blue-500 hover:text-blue-600"
                    onClick={() =>
                      setNewWidget({ ...newWidget, categoryId: category.id })
                    }
                  >
                    <span className="text-2xl">+</span>
                    <span className="font-medium">Add Widget</span>
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredCategories.length === 0 && <p>No widgets found</p>}
        </div>
        {newWidget.categoryId && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-bold mb-4">Add New Widget</h2>
              <div className="mb-4">
                <label className="block mb-2 font-medium">Widget Name</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={newWidget.name}
                  onChange={(e) =>
                    setNewWidget({ ...newWidget, name: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-medium">
                  Random Values (comma-separated)
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={newWidget.randomValues}
                  onChange={(e) =>
                    setNewWidget({ ...newWidget, randomValues: e.target.value })
                  }
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  className="px-4 py-2 bg-gray-200 rounded"
                  onClick={() => setNewWidget({ ...newWidget, categoryId: "" })}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                  onClick={handleAddWidget}
                >
                  Add Widget
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
