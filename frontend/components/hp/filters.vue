<script setup lang="ts">
  import { useSearch } from '@/composables/useSearch';

  const {filters, uniqueValues, loading, setFilter, clearFilter, clearAllFilters} = useSearch();

  const activeBrand = computed(() => filters.value.brand);
  const activeColor = computed(() => filters.value.color);
  const activeWheelSize = computed(() => filters.value.wheelSize);
  const activeInventory = computed(() => filters.value.inventory);
  const activeConcept = computed(() => filters.value.concept);
</script>

<template>
  <div class="hidden lg:block col-span-12 lg:col-span-3">
    <div v-if="loading" class="px-2 py-10 flex justify-center items-center min-h-[200px]">
      <span class="font-sans text-[#94a3b8] text-lg">Завантаження фільтрів...</span>
    </div>
    <div class="px-2" v-else>
      <div class="pt-6 pb-10 border-b border-[#cbd5e1]" v-if="uniqueValues.concepts.length > 0">
        <h3
          class="font-sans font-light text-lg mb-6 text-[#1e293b] "
        >
          Паливо
        </h3>
        <div class="space-y-4">
          <div class="flex items-center gap-3 cursor-pointer">
            <div
              class="bg-white  rounded-full w-4 h-4 flex flex-shrink-0 justify-center items-center relative"
            >
              <input
                id="radio-0"
                type="radio"
                name="radio_concept"
                class="peer appearance-none ring-offset-white  focus:opacity-100 focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 focus:outline-none border rounded-full border-[#94a3b8] absolute cursor-pointer w-full h-full checked:border-none"
                :checked="!activeConcept"
                @change="clearFilter('concept')"
              />
              <div
                class="border-2 border-transparent peer-checked:border-gray-600 rounded-full w-full h-full z-1 pointer-events-none"
              ></div>
            </div>
            <label
              for="radio-0"
              class="ml-2 text-sm leading-4 font-normal text-[#1e293b] cursor-pointer"
            >
              Всі типи палива
            </label>
          </div>
          <div class="flex items-center gap-3 cursor-pointer" v-for="concept in uniqueValues.concepts" :key="concept.value">
            <div
              class="bg-white  rounded-full w-4 h-4 flex flex-shrink-0 justify-center items-center relative"
            >
              <input
                :id="`radio-concept-${concept.value}`"
                type="radio"
                name="radio_concept"
                class="peer appearance-none ring-offset-white  focus:opacity-100 focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 focus:outline-none border rounded-full border-[#94a3b8] absolute cursor-pointer w-full h-full checked:border-none"
                :checked="activeConcept === concept.value"
                @change="setFilter('concept', activeConcept === concept.value ? '' : concept.value)"
              />
              <div
                class="border-2 border-transparent peer-checked:border-gray-600 rounded-full w-full h-full z-1 pointer-events-none"
              ></div>
            </div>
            <label
              :for="`radio-concept-${concept.value}`"
              class="ml-2 text-sm leading-4 font-normal text-[#1e293b] cursor-pointer"
            >
              {{concept.label}}
            </label>
          </div>
        </div>
      </div>
      <div class="pt-6 pb-10 border-b border-[#cbd5e1]" v-if="uniqueValues.inventoryTypes.length > 0">
        <h3
          class="font-sans font-light text-lg mb-6 text-[#1e293b]"
        >
          Тип транспорту
        </h3>
        <div class="space-y-4">
          <div class="flex items-center gap-3 cursor-pointer" v-for="type in uniqueValues.inventoryTypes" :key="type.value">
            <div
              class="bg-white rounded-full w-4 h-4 flex flex-shrink-0 justify-center items-center relative"
            >
              <input
                :id="`radio-type-${type.value}`"
                type="radio"
                name="radio_type"
                class="peer appearance-none ring-offset-white focus:opacity-100 focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 focus:outline-none border rounded-full border-[#94a3b8] absolute cursor-pointer w-full h-full checked:border-none"
                :checked="activeInventory === type.value"
                @change="setFilter('inventory', activeInventory === type.value ? '' : type.value)"
              />
              <div
                class="border-2 border-transparent peer-checked:border-gray-600 rounded-full w-full h-full z-1 pointer-events-none"
              ></div>
            </div>
            <label
              :for="`radio-type-${type.value}`"
              class="ml-2 text-sm leading-4 font-normal text-[#1e293b] cursor-pointer"
            >
              {{type.label}}
            </label>
          </div>
        </div>
      </div>
      <div class="pt-6 pb-10 border-b border-[#cbd5e1] " v-if="uniqueValues.colors.length > 0">
        <h3
          class="font-sans font-light text-lg mb-6 text-[#1e293b] "
        >
          Колір
        </h3>
        <div class="flex flex-wrap gap-3">
          <div class="relative" v-for="color in uniqueValues.colors" :key="color.value">
            <input
              type="radio"
              :checked="activeColor === color.value"
              @change="setFilter('color', activeColor === color.value ? '' : color.value)"
              class="peer absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div
              class="h-8 w-8 rounded-full border border-[#cbd5e1]  ring-offset-white  ring-offset-4 peer-checked:ring-1 peer-checked:ring-[#1e293b]"
              :style="{ backgroundColor: color.value }"
            ></div>
          </div>
        </div>
      </div>
      <div class="pt-6 pb-10" v-if="uniqueValues.wheelSizes.length > 0">
        <h3
          class="font-sans font-light text-lg mb-6 text-[#1e293b] "
        >
          Розмір коліс
        </h3>
        <div class="space-y-4">
          <div class="flex items-center gap-3 cursor-pointer" v-for="wheelSize in uniqueValues.wheelSizes" :key="wheelSize">
            <div
              class="bg-white  rounded-full w-4 h-4 flex flex-shrink-0 justify-center items-center relative"
            >
              <input
                :id="`radio-wheel-${wheelSize}`"
                type="radio"
                name="radio_wheels"
                class="peer appearance-none ring-offset-white  focus:opacity-100 focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 focus:outline-none border rounded-full border-[#94a3b8] absolute cursor-pointer w-full h-full checked:border-none cursor-pointer"
                :checked="activeWheelSize === wheelSize"
                @change="setFilter('wheelSize', activeWheelSize === wheelSize ? '' : wheelSize)"
              />
              <div
                class="border-2 border-transparent peer-checked:border-gray-600 rounded-full w-full h-full z-1 pointer-events-none"
              ></div>
            </div>
            <label
              :for="`radio-wheel-${wheelSize}`"
              class="ml-2 text-sm leading-4 font-normal text-[#1e293b] cursor-pointer"
            >
              {{wheelSize}}" коліса
            </label>
          </div>
        </div>
      </div>
      <button v-if="uniqueValues.concepts.length > 0 || uniqueValues.inventoryTypes.length > 0 || uniqueValues.colors.length > 0 || uniqueValues.wheelSizes.length > 0" @click="clearAllFilters" class="cursor-pointer relative font-sans font-normal inline-flex items-center justify-center leading-5 no-underline w-full space-x-1 border-2 border-[#1e293b] hover:bg-[#1e293b] text-[#1e293b] hover:text-white h-10 px-5 py-3 text-sm tw-accessibility transition-all duration-300">
        Скинути фільтри
      </button>
    </div>
  </div>
</template>