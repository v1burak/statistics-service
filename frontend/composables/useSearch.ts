import { useQueryFilters } from "./useQueryFilters";
import { computed } from "vue";
import type { ICar } from "@/mock/cars";

export function useSearch() {
  const { filters, setFilter, clearFilter, clearAllFilters } = useQueryFilters();

  const { data: cars, pending, error } = useAsyncData<ICar[]>(
    "cars",
    () => $fetch("/api/search"),
    { server: true }
  );

  const uniqueValues = computed(() => {
    const allCars = cars.value || [];

    const getUniqueString = (key: keyof ICar) =>
      [...new Set(allCars.map((car: ICar) => car[key] as string))].sort();

    const getUniqueObject = (key: keyof ICar) => {
      const seen = new Set<string>();
      const result: { value: string; label: string }[] = [];

      for (const car of allCars) {
        const item = car[key] as { value: string; label: string };
        if (!seen.has(item.value)) {
          seen.add(item.value);
          result.push(item);
        }
      }

      return result.sort((a, b) => a.label.localeCompare(b.label));
    };

    return {
      brands: getUniqueObject("brand"),
      colors: getUniqueObject("color"),
      concepts: getUniqueObject("concept"),
      inventoryTypes: getUniqueObject("inventory"),
      wheelSizes: getUniqueString("wheelSize"),
    };
  });

  const filteredCars = computed(() => {
    const query = filters.value;
    const allCars = cars.value || [];

    const brandFilter = query.brand;
    const validBrandValues = new Set(allCars.map((car: ICar) => car.brand.value));

    return allCars.filter((car: ICar) => {
      const brandMatches =
        !brandFilter ||
        brandFilter === "all" ||
        !validBrandValues.has(brandFilter as string) ||
        car.brand.value === brandFilter;

      return (
        brandMatches &&
        (!query.color || car.color.value === query.color) &&
        (!query.concept || car.concept.value === query.concept) &&
        (!query.inventory || car.inventory.value === query.inventory) &&
        (!query.wheelSize ||
          String(car.wheelSize) === String(query.wheelSize)) &&
        (!query.maxPrice || car.price <= Number(query.maxPrice))
      );
    });
  });

  return {
    filters,
    setFilter,
    clearFilter,
    clearAllFilters,
    uniqueValues,
    filteredCars,
    loading: pending,
    error,
  };
}
