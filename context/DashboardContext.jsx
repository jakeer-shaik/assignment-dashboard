import React, { createContext, useState, useContext } from "react";
import initialData from '../widgets.json'

const Context = createContext();
const DashboardContext = ({ children }) => {
  const [dashboardData, setDashboardData] = useState(initialData);

  const handleAddWidget = (newWidget, categoryId) => {
    setDashboardData((prevData) => {
      const updatedCategories = prevData.categories.map((cat) =>
        cat.id === categoryId
          ? { ...cat, widgets: [...cat.widgets, newWidget] }
          : cat
      );
      return { ...prevData, categories: updatedCategories };
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
  const initialValues = {
    dashboardData,
    handleAddWidget,
    handleRemoveWidget,
  };
  return <Context.Provider value={initialValues}>{children}</Context.Provider>;
};

export default DashboardContext;

export function useAddWidget() {
  return useContext(Context);
}
