<script>
import SearchBar from "./components/SearchBar.vue";
import WeatherCard from "./components/WeatherCard.vue";
import noonBg from "./assets/backgrounds/noon.png";
import nightBg from "./assets/backgrounds/night.png";

export default {
  name: "App",
  components: {
    SearchBar,
    WeatherCard,
  },
  data() {
    return {
      weatherData: null,
      loading: false,
      error: null,
      currentCity: "",
    };
  },
  computed: {
    isNightTime() {
      if (this.weatherData && this.weatherData.sys && this.weatherData.dt) {
        const { dt, sys } = this.weatherData;
        return dt < sys.sunrise || dt > sys.sunset;
      }
      return false;
    },
    backgroundStyle() {
      let bgImage = noonBg; // default starting image

      if (this.isNightTime) {
        bgImage = nightBg;
      }

      // Bind inline CSS instead of a tailwind class
      return { backgroundImage: `url(${bgImage})` };
    },
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
    },
  },
  mounted() {},
};
</script>

<template>
  <div
    class="min-h-screen bg-cover bg-center transition-all duration-[2000ms] flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 w-full [image-rendering:pixelated]"
    :style="backgroundStyle"
  >
    <div class="z-10 w-full max-w-lg mt-8 mb-auto">
      <!-- Interactive Search -->
      <SearchBar @search="getApi" />

      <!-- Loading State -->
      <div
        v-if="loading"
        class="text-white text-center mt-8 text-xl font-medium animate-pulse"
      >
        Fetching weather...
      </div>

      <!-- Error State -->
      <div
        v-if="error"
        class="text-red-300 bg-red-900/40 border border-red-500/50 rounded-xl p-4 text-center mt-8 backdrop-blur-md"
      >
        {{ error }}
      </div>

      <div
        v-if="!this.currentCity"
        class="text-red-300 bg-red-900/40 border border-red-500/50 rounded-xl p-4 text-center mt-8 backdrop-blur-md"
      >
        Please search up for the city .
      </div>

      <!-- Weather Card -->
      <div class="mt-8 transition-all duration-700">
        <WeatherCard
          v-if="weatherData && !loading"
          :weatherData="weatherData"
          :isNight="isNightTime"
        />
      </div>
    </div>
  </div>
</template>
