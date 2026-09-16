import { useQuery } from "@tanstack/react-query";

import { tasksRepository } from "@/lib/storage/repositories";

import { tasksQueryKeys } from "../constants/query-keys";

export const useGetTasks = () =>
  useQuery({
    queryKey: tasksQueryKeys.list(),
    queryFn: () => tasksRepository.list(),
  });
