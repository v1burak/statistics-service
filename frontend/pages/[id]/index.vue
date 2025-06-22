<script setup lang="ts">
import { useCar } from "@/composables/useCar";
import { useStatistics } from "@/composables/useStatistics";

const route = useRoute();
const { car, loading } = useCar(route.params.id as string);

if (process.server) {
  while (loading.value) {
    await new Promise(resolve => setTimeout(resolve, 10));
  }
  if (!car.value) {
    throw createError({ statusCode: 404, statusMessage: 'Car not found' });
  }
}

useHead({
  title: computed(() =>
    car.value ? `${car.value.brand.label} ${car.value.model}` : "Авто"
  ),
});

const {
  statistic,
  loading: loadingStatistic,
  error: errorStatistic,
  updateStatistic,
} = useStatistics(route.params.id as string);

onMounted(() => {
  if (car.value.id) {
    updateStatistic({ event: "page_view", autoId: car.value.id });
  }
});

const activeTab = ref<"metrics" | "phone" | "details">("metrics");

const toggleTabs = (type: string) => {
  if (type === "details" || type === "phone" || type === "metrics") {
    if (type === "phone") {
       updateStatistic({ event: "phone_view", autoId: car.value.id });
    }

    activeTab.value = type as "details" | "phone";
    return;
  }
};
</script>

<template>
  <section
    class="w-full py-12 px-4 bg-[#f1f5f9] xs:overflow-hidden min-h-screen"
  >
    <div class="w-full max-w-7xl mx-auto h-full">
      <NuxtLink
        href="/"
        class="text-[#0a101f] font-sans text-sm mb-4 relative z-10 inline-block cursor-pointer hover:text-[#0a101f] transition-colors duration-300 rounded-md px-4 py-2 bg-white border border-[#e2e8f0] shadow-xl shadow-[#94a3b8]/10 /10 hover:bg-[#f8fafc] hover:shadow-lg"
      >
        <Icon name="global:arrow" class="inline-block mr-2" mode="svg" />
        Повернутися до списку
      </NuxtLink>
      <div
        v-if="loading || !car"
        class="w-full flex items-center justify-center fixed top-0 left-0 right-0 bottom-0"
      >
        <div
          class="w-16 h-16 border-4 border-t-4 border-t-[#0a101f] border-gray-200 rounded-full animate-spin"
        ></div>
      </div>
      <div
        v-else
        class="w-full flex flex-col ltablet:flex-row lg:flex-row gap-0 ltablet:gap-10 lg:gap-28"
      >
        <div class="w-full ltablet:w-7/12 lg:w-8/12">
          <div class="w-full py-12 px-4 overflow-hidden">
            <div class="w-full max-w-lg space-y-4 py-6">
              <h2
                class="font-heading font-light text-4xl md:text-5xl text-[#0a101f]"
              >
                {{ car.brand.label }} {{ car.model }}
              </h2>
            </div>

            <div class="max-w-3xl">
              <img class="max-w-xl" :src="car.image" alt="Vehicle image" />
              <div
                class="grid xs:grid-cols-2 grid-cols-3 gap-4 mt-6"
                v-if="car.features"
              >
                <div
                  class="font-sans"
                  v-for="feature in car.features"
                  :key="feature"
                >
                  <h4 class="font-medium text-[#0a101f]">
                    {{ feature }}
                  </h4>
                  <p class="text-sm text-[#64748b]">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Inventore, ratione. Velit iste voluptatum odit amet,
                    assumenda nobis rerum quas odio nostrum similique recusandae
                    placeat laboriosam incidunt quia eius soluta officia.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full ltablet:w-5/12 lg:w-4/12">
          <div class="h-full pt-10">
            <div
              class="sticky inset-x-0 top-28 left-0 p-5 md:p-8 ptablet:max-w-md ptablet:mx-auto ptablet:-mt-8 ltablet:p-6 bg-white border border-[#e2e8f0] rounded-md shadow-xl shadow-[#94a3b8]/10 /10"
            >
              <div class="w-full">
                <div class="w-full relative flex rounded-md bg-[#f1f5f9]">
                  <a
                    class="relative h-12 flex-1 flex items-center justify-center font-sans z-10 cursor-pointer select-none"
                    :class="
                      activeTab === 'metrics'
                        ? 'text-[#0a101f]'
                        : 'text-[#94a3b8]'
                    "
                    @click.prevent="toggleTabs('metrics')"
                  >
                    Статистика
                  </a>
                  <a
                    class="relative h-12 flex-1 flex items-center justify-center font-sans z-10 cursor-pointer select-none"
                    :class="
                      activeTab === 'phone'
                        ? 'text-[#0a101f]'
                        : 'text-[#94a3b8]'
                    "
                    @click.prevent="toggleTabs('phone')"
                  >
                    Телефон
                  </a>
                  <a
                    class="relative h-12 flex-1 flex items-center justify-center font-sans z-10 cursor-pointer select-none"
                    :class="
                      activeTab === 'details'
                        ? 'text-[#0a101f]'
                        : 'text-[#94a3b8]'
                    "
                    @click.prevent="toggleTabs('details')"
                  >
                    Деталі
                  </a>
                  <span
                    class="block absolute h-full w-1/3 rounded-md bg-white border border-[#e2e8f0] shadow-xl shadow-[#94a3b8]/10 /10 transition-all duration-300 ml-0 false"
                    :class="[
                                      activeTab === 'metrics' &amp;&amp; 'ml-0' ,
                                      activeTab === 'phone' &amp;&amp; 'ml-[33.3%]' ,
                                      activeTab === 'details' &amp;&amp; 'ml-[66.6%]' 
                                    ]"
                  ></span>
                </div>

                <div class="w-full pt-6">
                  <div v-show="activeTab === 'metrics'">
                    <p class="text-[#0a101f] font-sans text-lg font-medium">
                      Кількість переглядів
                    </p>
                    <div
                      v-if="!loadingStatistic && !errorStatistic"
                      class="flex items-center gap-2 mt-2 p-[15px] bg-[#f8fafc] rounded-md"
                    >
                      <Icon
                        name="global:eye"
                        class="!h-[20px] !w-[20px] text-[#13161d] inline-block"
                        mode="svg"
                      />
                      <span
                        class="text-[#64748b] text-sm border-l-[1px] border-[#e2e8f0] pl-2"
                        >{{ statistic["page_views"] || 0 }} переглядів
                        сторінки</span
                      >
                    </div>

                    <div
                      v-if="!loadingStatistic && !errorStatistic"
                      class="flex items-center gap-2 mt-2 p-[15px] bg-[#f8fafc] rounded-md"
                    >
                      <Icon
                        name="global:phone"
                        class="!h-[20px] !w-[20px] text-[#13161d] inline-block"
                        mode="svg"
                      />
                      <span
                        class="text-[#64748b] text-sm border-l-[1px] border-[#e2e8f0] pl-2"
                        >{{ statistic["phone_views"] || 0 }} переглядів
                        телефону</span
                      >
                    </div>
                  </div>
                  <div v-show="activeTab === 'phone'">
                    <p class="text-[#0a101f] font-sans text-lg font-medium">
                      Номер телефону
                    </p>
                    <a
                      href="tel:+3809875643"
                      class="flex items-center gap-2 mt-2 p-[15px] bg-[#f8fafc] rounded-md"
                    >
                      <Icon
                        name="global:phone"
                        class="!h-[20px] !w-[20px] text-[#13161d] inline-block"
                        mode="svg"
                      />
                      <span
                        class="text-[#64748b] text-sm border-l-[1px] border-[#e2e8f0] pl-2"
                        >+3809875643</span
                      >
                    </a>
                  </div>
                  <div
                    v-show="activeTab === 'details'"
                    class="flex flex-col gap-4"
                  >
                    <div
                      class="flex items-center gap-2 mt-2 p-[15px] bg-[#f8fafc] rounded-md"
                    >
                      <span class="text-[#0a101f] font-sans text-sm font-medium"
                        >Ціна</span
                      >
                      <span
                        class="text-[#64748b] text-sm border-l-[1px] border-[#e2e8f0] pl-2"
                        >{{ car.price }}</span
                      >
                    </div>
                    <div
                      class="flex items-center gap-2 mt-2 p-[15px] bg-[#f8fafc] rounded-md"
                    >
                      <span class="text-[#0a101f] font-sans text-sm font-medium"
                        >Стан</span
                      >
                      <span
                        class="text-[#64748b] text-sm border-l-[1px] border-[#e2e8f0] pl-2"
                        >{{ car.inventory.label }}</span
                      >
                    </div>
                    <div
                      class="flex items-center gap-2 mt-2 p-[15px] bg-[#f8fafc] rounded-md"
                    >
                      <span class="text-[#0a101f] font-sans text-sm font-medium"
                        >Паливо</span
                      >
                      <span
                        class="text-[#64748b] text-sm border-l-[1px] border-[#e2e8f0] pl-2"
                        >{{ car.concept.label }}</span
                      >
                    </div>
                    <div
                      class="flex items-center gap-2 mt-2 p-[15px] bg-[#f8fafc] rounded-md"
                    >
                      <span class="text-[#0a101f] font-sans text-sm font-medium"
                        >Розмір коліс</span
                      >
                      <span
                        class="text-[#64748b] text-sm border-l-[1px] border-[#e2e8f0] pl-2"
                        >{{ car.wheelSize }}</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>