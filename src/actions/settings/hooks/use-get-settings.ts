import { useQuery } from "@tanstack/react-query";

import { settingsRepository } from "@/lib/storage/repositories";

import { settingsQueryKeys } from "../constants/query-keys";

export const useGetSettings = () =>
  useQuery({
    queryKey: settingsQueryKeys.detail(),
    queryFn: () => settingsRepository.get(),
  });
