<script setup lang="ts">
import type { ICar } from "@/mock/cars";

defineProps<{
  car: ICar;
}>();
</script>
<template>
  <div
    class="group flex flex-col rounded-md p-8 bg-white border border-[#e2e8f0]"
  >
    <div class="flex items-center gap-4 mb-8">
      <div
        class="h-10 w-10 min-w-[2.5rem] flex items-center justify-center text-[#64748b]"
      >
        <Icon
          v-if="car.brand"
          :name="`cars:${car.brand.value}`"
          class="!h-full !w-full"
          mode="svg"
        />
      </div>
      <div class="leading-tight">
        <h3
          v-if="car.brand && car.model"
          class="font-sans font-semibold text-lg text-[#1e293b]"
        >
          {{ car.brand.label }} {{ car.model }}
        </h3>
        <p v-if="car.availability" class="font-sans text-xs text-[#94a3b8]">
          {{ car.availability }}
        </p>
      </div>
      <div class="ml-auto" v-if="car.price">
        <span
          class="font-sans font-semibold text-xl text-[#1e293b]"
        >
          {{
            car.price.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })
          }}
        </span>
      </div>
    </div>
    <div class="h-48 flex items-center">
      <NuxtImg
        class="object-contain w-full max-w-xs mx-auto"
        :src="car.image"
        alt="Vehicle image"
      />
    </div>
    <div
      v-if="car.specs"
      class="relative w-full flex my-4 divide-x divide-[#e2e8f0]"
    >
      <div
        v-if="car.specs.acceleration"
        class="flex-1 flex items-center justify-center px-4 group-hover:opacity-0 transition-opacity duration-300"
      >
        <div class="text-center">
          <span
            class="block font-sans font-semibold text-[#1e293b]"
          >
            {{ car.specs.acceleration }}
            <small class="font-normal text-[#64748b]">
              с
            </small>
          </span>
          <small class="block font-sans text-[#64748b]">
            0-100 км/г
          </small>
        </div>
      </div>
      <div
        v-if="car.specs.topSpeed"
        class="flex-1 flex items-center justify-center px-4 group-hover:opacity-0 transition-opacity duration-300"
      >
        <div class="text-center">
          <span
            class="block font-sans font-semibold text-[#1e293b]"
          >
            {{ car.specs.topSpeed }}
            <small class="font-normal text-[#64748b]">
              км
            </small>
          </span>
          <small class="block font-sans text-[#64748b]">
            Найвища швидкість
          </small>
        </div>
      </div>
      <div
        v-if="car.specs.autonomy"
        class="flex-1 flex items-center justify-center px-4 group-hover:opacity-0 transition-opacity duration-300"
      >
        <div class="text-center">
          <span
            class="block font-sans font-semibold text-[#1e293b]"
          >
            {{ car.specs.autonomy }}
            <small class="font-normal text-[#64748b]">
              км
            </small>
          </span>
          <small class="block font-sans text-[#64748b]">
            Автономія
          </small>
        </div>
      </div>
      <div
        class="absolute top-0 inset-x-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
      >
        <NuxtLink
          :href="`/${car.id}`"
          class="relative font-sans font-normal inline-flex items-center justify-center leading-5 no-underline w-full space-x-1 border-2 border-[#1e293b] hover:bg-[#1e293b] text-[#1e293b] hover:text-white h-10 px-5 py-3 text-sm tw-accessibility transition-all duration-300 pointer-events-none group-hover:pointer-events-auto"
        >
          View Details
        </NuxtLink>
      </div>
    </div>
    <div class="mt-4" v-if="car.features && car.features.length">
      <ul
        class="font-sans text-xs space-y-2 text-[#64748b] grid grid-cols-2"
      >
        <li class="flex items-center gap-2" v-for="feature in car.features" :key="feature">
          <span>{{feature}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>