import { useGlobalSearchParams, useRouter } from "expo-router";
import { useCallback } from "react";

type FilterValue = string | number | undefined | null;
type FilterUpdate = string | Record<string, FilterValue>;

export function useFilter() {
  const params = useGlobalSearchParams();
  const router = useRouter();

  const updateFilter = useCallback(
    (keyOrUpdates: FilterUpdate, value?: FilterValue) => {
      const next: Record<string, string | undefined> = {};

      // copy existing params
      Object.entries(params).forEach(([k, v]) => {
        if (typeof v === "string") {
          next[k] = v;
        }
      });

      const apply = (key: string, val: FilterValue) => {
        if (val === undefined || val === null || val === "") {
          next[key] = undefined;
        } else {
          next[key] = String(val);
        }
      };

      if (typeof keyOrUpdates === "string") {
        apply(keyOrUpdates, value);
      } else {
        Object.entries(keyOrUpdates).forEach(([k, v]) => {
          apply(k, v);
        });
      }
      delete next.page;

      router.setParams(next);
    },
    [params, router]
  );

  return updateFilter;
}