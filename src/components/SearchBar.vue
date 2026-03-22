<script>
export default {
  name: "SearchBar",
  data() {
    return {
      searchQuery: ""
    }
  },
  methods: {
    submitSearch() {
      if (this.searchQuery.trim()) {
        this.$emit('search', this.searchQuery.trim());
        this.searchQuery = '';
      }
    }
  }
}
</script>

<template>
  <form @submit.prevent="submitSearch" class="w-full mb-6">
    <div class="flex items-center gap-2">
      <input 
        v-model="searchQuery"
        type="text" 
        placeholder="Enter city name... (e.g. Bagan, Yangon)" 
        class="flex-1 px-4 py-3 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-white/50 transition-all shadow-lg"
      />
      <button 
        type="submit"
        class="px-6 py-3 bg-white/30 hover:bg-white/40 backdrop-blur border border-white/30 text-white font-medium rounded-xl transition-all shadow-lg active:scale-95"
      >
        Search
      </button>
    </div>
  </form>
</template>
