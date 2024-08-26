import React, { useEffect, useState } from "react";
import { FaPlus, FaSearch, FaRegUserCircle } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FiRefreshCcw } from "react-icons/fi";
import { CiMenuKebab } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";

const Header = ({ dashboardData, setFilteredCategories }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("cspm");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const filteredCategories = dashboardData.categories
      .map((category) => {
        const filteredWidgets = category.widgets.filter((widget) =>
          widget.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        return { ...category, widgets: filteredWidgets };
      })
      .filter((category) => category.widgets.length > 0);
    setFilteredCategories(filteredCategories);
  }, [searchQuery, dashboardData, setFilteredCategories]);

  const tabs = [
    { id: "cspm", label: "CSPM" },
    { id: "cwpp", label: "CWPP" },
    { id: "registry-scan", label: "Image" },
  ];
  const renderTabContent = () => {
    const activeCategory = dashboardData.categories.find(
      (category) => category.id === activeTab
    );

    if (!activeCategory || activeCategory.widgets.length === 0) {
      return <div>No Widgets Available</div>;
    }

    return (
      <div className="grid grid-cols-1 gap-4">
        {activeCategory.widgets.map((widget) => (
          <div key={widget.id} className="bg-white p-4 rounded-md shadow-md">
            <h3 className="font-semibold">{widget.name}</h3>
          </div>
        ))}
      </div>
    );
  };

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div>
      <header className="py-2 flex items-center justify-between bg-white md:px-4 space-x-2">
        <div className="flex items-center text-md space-x-1 text-sm">
          <p>Home</p>
          <FaChevronRight className="text-xs" />
          <p className="font-semibold">Dashboard</p>
        </div>
        <div className="flex items-center px-4 py-1 rounded-md border-2 border-blue-300 max-w-full w-full md:max-w-xl mx-auto">
          <FaSearch className="text-gray-600 mr-3 rotate-90 mt-1" />
          <input
            type="text"
            placeholder="Search anything..."
            className="w-full outline-none bg-transparent text-gray-600 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="hidden md:block">
          <div className="flex items-center space-x-4">
            <IoIosNotificationsOutline className="text-lg" />
            <FaRegUserCircle className="text-lg" />
          </div>
        </div>
      </header>

      <div className="py-4 px-6 flex flex-col md:flex-row md:justify-between items-center space-y-4 md:space-y-0">
        <h1 className="text-xl font-bold flex items-center space-x-2">
          <span>CNAPP Dashboard</span>
        </h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleToggleSidebar}
            className="px-4 py-2 bg-gray-50 rounded flex items-center space-x-2 border"
          >
            <FaPlus />
            <span className="hidden md:block">Add Widget</span>
          </button>
          <CiMenuKebab className="text-xl" />
          <FiRefreshCcw className="text-xl" />
          <select className="border rounded-md px-2 py-1 text-sm">
            <option value="last2days">Last 2 Days</option>
          </select>
        </div>
      </div>

      <div
        className={`fixed top-0 right-0 z-50 bg-white w-full max-w-lg md:max-w-sm lg:max-w-md rounded-md shadow-md min-h-screen flex flex-col transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex justify-between items-center bg-[#2675ff] p-4 text-white">
          <h2 className="text-lg font-bold">Add Widget</h2>
          <button onClick={handleToggleSidebar}>
            <RxCross2 />
          </button>
        </div>

        <div className="flex-grow p-4">
          <p className="text-gray-500 mb-4">
            Personalize your dashboard by adding the following widget
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={`cursor-pointer p-2 rounded ${
                  activeTab === tab.id ? "underline" : ""
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span>{tab.label}</span>
              </div>
            ))}
          </div>

          <div className="p-4">{renderTabContent()}</div>
        </div>

        <div className="p-4 flex justify-end">
          <button
            onClick={handleToggleSidebar}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
