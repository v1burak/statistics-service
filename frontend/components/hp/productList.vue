<script lang="ts" setup>
import { useSearch } from "@/composables/useSearch";

const { filteredCars } = useSearch();

</script>

<template>
  <div class="col-span-12 lg:col-span-9">
    <div class="grid ltablet:grid-cols-2 lg:grid-cols-2 gap-6">
      <HpProductItem v-for="car in filteredCars" :key="car.id" :car="car" />
    </div>
  </div>
</template>