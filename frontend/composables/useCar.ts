import type { ICar } from "@/mock/cars";

export function useCar(id: string) {
  const {
    data: cars,
    pending,
    error,
  } = useAsyncData<ICar[]>("cars", () => $fetch("/api/search"), {
    server: true,
  });

  const car = computed(() => {
    return cars.value?.find((c: any) => c.id === id);
  });

  return {
    car,
    loading: pending,
    error,
  };
}
