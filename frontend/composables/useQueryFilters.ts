import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";

export function useQueryFilters() {
  const route = useRoute();
  const router = useRouter();

  const filters = computed(() => route.query);

  const setFilter = (key: string, value: string | number | boolean) => {
    router.push({
      query: {
        ...route.query,
        [key]: String(value),
      },
    });
  };

  const clearFilter = (key: string) => {
    const { [key]: _, ...rest } = route.query;
    router.push({ query: rest });
  };

  const clearAllFilters = () => {
    router.push({ query: {} });
  };

  return {
    filters,
    setFilter,
    clearFilter,
    clearAllFilters,
  };
}
