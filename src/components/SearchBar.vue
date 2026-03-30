<script>
export default {
  name: "SearchBar",
  data() {
    return {
      searchQuery: "",
    };
  },
  methods: {
    submitSearch() {
      if (this.searchQuery.trim()) {
        this.$emit("search", this.searchQuery.trim());
        this.searchQuery = "";
      }
    },
  },
};
</script>

<template>
  <form @submit.prevent="submitSearch" class="w-full mb-6">
    <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Enter city name... (e.g. Bagan, Yangon)"
        class="flex-1 w-full px-4 py-3 sm:py-4 bg-black/20 backdrop-blur-sm rounded-xl border border-white/30 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-white/50 transition-all shadow-lg"
      />
      <button
        type="submit"
        class="w-full sm:w-auto px-6 py-3 sm:py-4 bg-black/30 backdrop-blur-sm border border-white/30 text-white font-semibold flex-shrink-0 rounded-xl transition-all shadow-lg hover:bg-black/50 active:scale-95"
      >
        Search
      </button>
    </div>
  </form>
</template>
