<script setup lang="ts">
  useHead({
    title: 'Список автомобілів',
    meta: [
      { name: 'description', content: 'Перелік авто' }
    ]
  })
</script>

<template>
  <section class="w-full py-12 px-4 bg-[#f1f5f9]">
    <div class="relative w-full h-full max-w-7xl mx-auto">
      <HpToolbar />
      <div class="py-10">
        <div class="grid grid-cols-12 md:gap-12 pb-20">
          <HpFilters />
          <HpProductList />
        </div>
      </div>
    </div>
  </section>
</template>