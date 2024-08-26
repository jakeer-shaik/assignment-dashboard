# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


Here’s a sample README file for your project:

---

# Dynamic Dashboard Application

## Overview

This project is a dynamic and responsive dashboard application built with React, allowing users to add, remove, and manage widgets within different categories. The application is designed to be user-friendly and scalable, making it easy to personalize dashboards based on individual needs.

## Features

- **Dynamic Categories and Widgets**: The dashboard is driven by a JSON configuration, enabling dynamic creation of categories and widgets.
- **Add/Remove Widgets**: Users can easily add new widgets to any category or remove existing ones using an intuitive interface.
- **Search Functionality**: A search bar is provided to quickly find widgets across all categories.
- **Responsive Design**: The layout is fully responsive, ensuring a seamless experience across devices, from mobile phones to desktops.
- **Customizable Widgets**: Users can add custom text and names to each widget when creating them.
  
## Tech Stack

- **Frontend**: React, Tailwind CSS
- **Icons**: React Icons (FaSearch, IoIosNotificationsOutline, etc.)
- **State Management**: React useState, useEffect
- **CSS Framework**: Tailwind CSS for responsive and utility-first styling

## Installation

1. **Clone the Repository**

   git clone https://github.com/jakeer-shaik/assignment-dashboard

   cd assignment-dashboard
   

2. **Install Dependencies**

   Ensure you have Node.js and npm installed. Then, run:

   npm install

3. **Start the Application**

   npm run dev

   The application will be available at `http://localhost:3000`.

## Usage

### 1. Adding a New Widget

- Click on the `+ Add Widget` button.
- A sidebar will appear, allowing you to enter the widget's name and text.
- Select the desired category and click `Confirm`.
- The new widget will be added to the selected category.

### 2. Removing a Widget

- Hover over the widget you wish to remove.
- Click on the `X` icon in the top-right corner of the widget.
- The widget will be removed from the category.

### 3. Searching for Widgets

- Use the search bar at the top of the dashboard to filter widgets by name.
- The list of displayed widgets will update dynamically as you type.

## JSON Configuration

The dashboard's structure is defined by a JSON object that contains categories and their corresponding widgets. Below is a sample structure:

```json
{
  "categories": [
    {
      "id": 1,
      "name": "CSPM Executive Dashboard",
      "widgets": [
        {
          "id": 101,
          "name": "Compliance Overview",
          "text": "Random text for widget content"
        },
        {
          "id": 102,
          "name": "Risk Analysis",
          "text": "Random text for widget content"
        }
      ]
    },
    {
      "id": 2,
      "name": "Threat Detection",
      "widgets": [
        {
          "id": 201,
          "name": "Security Alerts",
          "text": "Random text for widget content"
        }
      ]
    }
  ]
}
```

### Modifying the JSON
You can modify the JSON structure to add new categories or widgets, or to change the names and content of existing ones. The application will render the dashboard based on this configuration.


## Contact

For any questions or feedback, please reach out to [jakeershaik202@gmail.com](mailto:jakeershaik202@gmail.com).

---