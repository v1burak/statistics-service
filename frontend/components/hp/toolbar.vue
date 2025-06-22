<script setup lang="ts">
import { useSearch } from "@/composables/useSearch";

const { filters, uniqueValues, loading, setFilter, clearFilter } = useSearch();

const activeBrand = computed(() => filters.value.brand);
</script>

<template>
  <div
    v-if="loading"
    class="sticky top-4 w-full flex bg-white border border-[#e2e8f0]rounded divide-x divide-[#e2e8f0] shadow-xl shadow-[#cbd5e1]/30 overflow-x-auto z-30"
  >
    <button
      class="group flex-1 flex items-center gap-2 px-5 py-3 whitespace-nowrap font-sans text-[#1e293b] hover:bg-[#f8fafc] transition-colors duration-300"
      :class="activeBrand === 'all' || !activeBrand ? 'bg-[#f8fafc]' : ''"
      @click="clearFilter('brand')"
    >
      <span
        class="block h-10 w-10 group-hover:text-gray-500"
        :class="!activeBrand ? 'text-red-500' : ''"
      >
        <Icon name="cars:list" class="!h-full !w-full" mode="svg" />
      </span>
      <span>All</span>
    </button>
  </div>
  <div
    v-else-if="!loading && uniqueValues.brands.length > 0"
    class="sticky top-4 w-full flex bg-white border border-[#e2e8f0]rounded divide-x divide-[#e2e8f0] shadow-xl shadow-[#cbd5e1]/30 overflow-x-auto z-30"
  >
    <button
      class="group flex-1 flex items-center gap-2 px-5 py-3 whitespace-nowrap font-sans text-[#1e293b] hover:bg-[#f8fafc] transition-colors duration-300"
      :class="activeBrand === 'all' || !activeBrand ? 'bg-[#f8fafc]' : ''"
      @click="clearFilter('brand')"
    >
      <span
        class="block h-10 w-10 group-hover:text-gray-500"
        :class="!activeBrand ? 'text-red-500' : ''"
      >
        <Icon name="cars:list" class="!h-full !w-full" mode="svg" />
      </span>
      <span>All</span>
    </button>
    <button
      v-for="brand in uniqueValues.brands"
      :key="brand.value"
      class="group flex-1 flex items-center gap-2 px-5 py-3 whitespace-nowrap font-sans text-[#1e293b] hover:bg-[#f8fafc] transition-colors duration-300"
      :class="activeBrand === brand.value ? 'bg-[#f8fafc]' : ''"
      @click="setFilter('brand', brand.value)"
    >
      <span
        class="block h-10 w-10 group-hover:text-gray-500"
        :class="activeBrand === brand.value ? 'text-red-500' : ''"
      >
        <Icon
          :name="`cars:${brand.value}`"
          class="!h-full !w-full"
          mode="svg"
        />
      </span>
      <span>{{ brand.label }}</span>
    </button>
  </div>
</template>