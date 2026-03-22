<script>
export default {
  name: "WeatherCard",
  props: {
    weatherData: {
      type: Object,
      required: true
    }
  },
  computed: {
    temp() {
      return Math.round(this.weatherData.main.temp);
    },
    feelsLike() {
      return Math.round(this.weatherData.main.feels_like);
    },
    dateString() {
      return new Date().toLocaleDateString('en-US', {
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric'
      });
    }
  }
}
</script>

<template>
  <div v-if="weatherData" class="w-full bg-black/30 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl text-white">
    <!-- Header: City & Date -->
    <div class="text-center mb-6">
      <h2 class="text-4xl font-bold tracking-wide">{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>
      <p class="text-sm text-white/70 mt-1 font-medium">{{ dateString }}</p>
    </div>
    
    <!-- Main Temps -->
    <div class="flex items-center justify-center gap-6 my-8">
      <!-- Icon based on the API data (optional, but nice!) -->
      <img 
        :src="`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`" 
        alt="Weather icon"
        class="w-24 h-24 drop-shadow-lg"
      />
      <div class="flex flex-col">
        <span class="text-7xl font-light tracking-tighter">{{ temp }}&deg;</span>
        <span class="text-lg capitalize text-white/90 font-medium">
          {{ weatherData.weather[0].description }}
        </span>
      </div>
    </div>
    
    <!-- Details Grid -->
    <div class="grid grid-cols-2 gap-4 mt-8">
      <div class="bg-white/10 rounded-2xl p-4 flex flex-col items-center justify-center backdrop-blur-md">
        <span class="text-xs uppercase text-white/60 tracking-wider">Feels Like</span>
        <span class="text-2xl font-semibold">{{ feelsLike }}&deg;</span>
      </div>
      <div class="bg-white/10 rounded-2xl p-4 flex flex-col items-center justify-center backdrop-blur-md">
        <span class="text-xs uppercase text-white/60 tracking-wider">Humidity</span>
        <span class="text-2xl font-semibold">{{ weatherData.main.humidity }}%</span>
      </div>
      <div class="bg-white/10 rounded-2xl p-4 flex flex-col items-center justify-center backdrop-blur-md">
        <span class="text-xs uppercase text-white/60 tracking-wider">Wind</span>
        <span class="text-2xl font-semibold">{{ weatherData.wind.speed }} m/s</span>
      </div>
      <div class="bg-white/10 rounded-2xl p-4 flex flex-col items-center justify-center backdrop-blur-md">
        <span class="text-xs uppercase text-white/60 tracking-wider">Pressure</span>
        <span class="text-2xl font-semibold">{{ weatherData.main.pressure }} hPa</span>
      </div>
    </div>
  </div>
</template>
