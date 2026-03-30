<script>
import nightWidgetBg from "../assets/widgets/night-widget.png";
import dayWidgetBg from "../assets/widgets/day-widget.png";

export default {
  name: "WeatherCard",
  props: {
    weatherData: {
      type: Object,
      required: true,
    },
    isNight: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      nightWidgetBg,
      dayWidgetBg,
    };
  },
  computed: {
    temp() {
      return Math.round(this.weatherData.main.temp);
    },
    feelsLike() {
      return Math.round(this.weatherData.main.feels_like);
    },
    dateString() {
      return new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
    cardStyle() {
      const bgImage = this.isNight ? this.nightWidgetBg : this.dayWidgetBg;
      return {
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      };
    },
  },
};
</script>

<template>
  <div
    v-if="weatherData"
    :class="[
      'w-full p-6 sm:p-8 shadow-2xl text-white transition-all duration-500 overflow-hidden relative border-none rounded-3xl',
    ]"
    :style="cardStyle"
  >
    <!-- Overlay for better text readability on widget images, optional -->
    <div class="absolute inset-0 bg-black/10 pointer-events-none z-0"></div>

    <div class="relative z-10 w-full h-full flex flex-col">
      <!-- Header: City & Date -->
      <div class="text-center mt-6 sm:mt-10 mb-3 block w-full px-2">
        <h2
          class="text-2xl sm:text-4xl lg:text-4xl font-bold tracking-wide leading-tight drop-shadow-md"
        >
          {{ weatherData.name }}, {{ weatherData.sys.country }}
        </h2>
        <p
          class="text-xs sm:text-sm text-white/90 mt-1 sm:mt-2 font-medium drop-shadow-md"
        >
          {{ dateString }}
        </p>
      </div>

      <!-- Main Temps -->
      <div
        class="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 my-6 sm:my-8 text-center sm:text-left"
      >
        <div class="flex text-center flex-col drop-shadow-lg">
          <span
            class="text-6xl sm:text-7xl lg:text-8xl font-light tracking-tighter"
            >{{ temp }}&deg;</span
          >
          <span
            class="text-base text-center mt-3 sm:text-lg lg:text-xl capitalize text-white/90 font-medium"
          >
            {{ weatherData.weather[0].description }}
          </span>
        </div>
      </div>

      <!-- Details Grid -->
      <div class="grid grid-cols-2 gap-3 sm:gap-4 mt-6 sm:mt-8 w-full">
        <div
          class="bg-white/10 rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-center backdrop-blur-md shadow-inner text-center"
        >
          <span
            class="text-[10px] sm:text-xs uppercase text-white/80 tracking-wider mb-1"
            >Feels Like</span
          >
          <span class="text-lg sm:text-2xl font-semibold"
            >{{ feelsLike }}&deg;</span
          >
        </div>
        <div
          class="bg-white/10 rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-center backdrop-blur-md shadow-inner text-center"
        >
          <span
            class="text-[10px] sm:text-xs uppercase text-white/80 tracking-wider mb-1"
            >Humidity</span
          >
          <span class="text-lg sm:text-2xl font-semibold"
            >{{ weatherData.main.humidity }}%</span
          >
        </div>
        <div
          class="bg-white/10 rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-center backdrop-blur-md shadow-inner text-center"
        >
          <span
            class="text-[10px] sm:text-xs uppercase text-white/80 tracking-wider mb-1"
            >Wind</span
          >
          <span class="text-lg sm:text-2xl font-semibold"
            >{{ weatherData.wind.speed }} m/s</span
          >
        </div>
        <div
          class="bg-white/10 rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-center backdrop-blur-md shadow-inner text-center"
        >
          <span
            class="text-[10px] sm:text-xs uppercase text-white/80 tracking-wider mb-1"
            >Pressure</span
          >
          <span class="text-lg sm:text-2xl font-semibold"
            >{{ weatherData.main.pressure }} hPa</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
