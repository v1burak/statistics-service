import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { useAsyncData, useFetch } from "nuxt/app";

export type StatisticEvent = "page_view" | "phone_view";

export function useStatistics(autoId: string) {
  const {
    data: statistic,
    pending: loading,
    error,
    refresh,
  } = useAsyncData(`statistic-${autoId}`, () =>
    $fetch(`/api/statistics/${autoId}`)
  );

  const updateStatistic = async (payload: {
    event: StatisticEvent;
    autoId: string;
  }) => {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    const {
      data,
      error: updateError,
      pending,
    } = await useFetch("/api/statistics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        autoId: payload.autoId,
        type: payload.event,
        fingerprint: `fingerprint-auto-${result.visitorId}`,
      },
      immediate: true,
    });
    await refresh();
    return { data, error: updateError, pending };
  };

  return {
    statistic,
    loading,
    error,
    updateStatistic,
  };
}
