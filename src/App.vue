<script>
import SearchBar from "./components/SearchBar.vue";
import WeatherCard from "./components/WeatherCard.vue";
import noonBg from "./assets/backgrounds/noon.png";
import nightBg from "./assets/backgrounds/night.png";

export default {
  name: "App",
  components: {
    SearchBar,
    WeatherCard
  },
  data() {
    return {
      weatherData: null,
      loading: false,
      error: null,
      currentCity: "Bagan"
    };
  },
  computed: {
    backgroundStyle() {
      let bgImage = noonBg; // default starting image
      
      //  check in case weather data is still loading
      if (this.weatherData && this.weatherData.sys && this.weatherData.dt) {
        const { dt, sys } = this.weatherData;
        const isNight = dt < sys.sunrise || dt > sys.sunset;
        bgImage = isNight ? nightBg : noonBg;
      }
      
      // Bind inline CSS instead of a tailwind class
      return { backgroundImage: `url(${bgImage})` };
    }
  },
  methods: {
    async getApi(city) {
      this.loading = true;
      this.error = null;
      this.currentCity = city;

      const apiKey = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1d35a9dc656ef736751d2c12c4159733&units=metric`;

      try {
        const response = await fetch(apiKey);
        if (!response.ok) {
          throw new Error(`Location not found. Try a different city!`);
        }
        const data = await response.json();
        this.weatherData = data;
      } catch (err) {
        this.error = err.message || "An error occurred fetching the weather";
        this.weatherData = null;
      } finally {
        this.loading = false;
      }
    }
  },
  mounted() {
    this.getApi(this.currentCity);
  }
};
</script>

<template>
  <div 
    class="min-h-screen bg-cover bg-center transition-all duration-[2000ms] flex flex-col items-center justify-center p-6 w-full [image-rendering:pixelated]"
    :style="backgroundStyle"
  >
    <!-- Overlay filter to guarantee text readability -->
    <div class="absolute inset-0 bg-black/20 pointer-events-none z-0"></div>

    <div class="z-10 w-full max-w-lg mt-8 mb-auto">
      <h1 class="text-white text-5xl font-extrabold text-center tracking-tight drop-shadow-lg shadow-black/50 mb-10">
        Bagan Weather
      </h1>
      
      <!-- Interactive Search -->
      <SearchBar @search="getApi" />

      <!-- Loading State -->
      <div v-if="loading" class="flex flex-col items-center justify-center py-16 text-white text-lg">
        <svg class="animate-spin h-10 w-10 text-white mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="animate-pulse">Fetching latest updates...</p>
      </div>

      <!-- Error Message -->
      <div v-else-if="error" class="bg-red-500/80 backdrop-blur-md rounded-2xl p-6 text-center text-white shadow-2xl mx-auto w-full transition-all">
        <div class="text-4xl mb-2">☁️</div>
        <p class="font-medium text-lg">{{ error }}</p>
      </div>

      <!-- The Beautiful Weather Info Display -->
      <WeatherCard v-else-if="weatherData" :weatherData="weatherData" />

    </div>
    
    <div class="z-10 mt-auto text-white/50 text-sm pb-4 tracking-widest text-center">
      POWERED BY OPENWEATHER
    </div>
  </div>
</template>
