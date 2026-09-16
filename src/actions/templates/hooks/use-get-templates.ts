import { useQuery } from "@tanstack/react-query";

import { templatesRepository } from "@/lib/storage/repositories";

import { templatesQueryKeys } from "../constants/query-keys";

export const useGetTemplates = () =>
  useQuery({
    queryKey: templatesQueryKeys.list(),
    queryFn: () => templatesRepository.list(),
  });
