# Vue Weather App

A dynamic and visually-appealing weather application built with Vue 3, Vite, and Tailwind CSS. The app provides real-time weather information and geographic location data for cities across the globe via the OpenWeatherMap API.

## ✨ Features

- **Real-time Weather Data:** Search for any city to instantly view its current weather conditions.
- **Dynamic Atmosphere:** The application automatically updates its background visual (shifting between day and night themes) depending on the actual time at the searched location.
- **Interactive Search:** Smooth and responsive search functionalities with comprehensive loading and error handling.
- **Responsive Design:** Fully tailored constraints to provide a seamless user experience across a variety of devices, utilizing the power of Tailwind CSS v4.

## 🛠️ Tech Stack

- **Frontend Framework:** [Vue.js 3](https://vuejs.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Data Source:** [OpenWeatherMap API](https://openweathermap.org/api)

## 🚀 Getting Started

Follow these steps to get a local copy of the project up and running.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed before attempting to run the project.

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-link-here>
   cd weather-app
   ```

2. **Install the dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   *The application will typically start running at `http://localhost:5173`.*

4. **Build for production (optional):**
   ```bash
   npm run build
   ```

## 📂 Project Structure

Here's an overview of the key components inside the `src` directory:

- `App.vue`: The foundational file that controls the overall logic, API fetching, and dynamic background state.
- `components/SearchBar.vue`: Focuses exclusively on capturing user queries.
- `components/WeatherCard.vue`: Renders the detailed weather information and widgets.
- `assets/backgrounds`: Contains assets dedicated to visualizing dynamic day and night changes.

## 🤝 Contributing

Contributions, issues, and feature requests are always welcome! Feel free to check the issues page if you want to contribute.
