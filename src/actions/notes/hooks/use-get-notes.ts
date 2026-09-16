import { useQuery } from "@tanstack/react-query";

import { notesRepository } from "@/lib/storage/repositories";

import { notesQueryKeys } from "../constants/query-keys";

export const useGetNotes = () =>
  useQuery({
    queryKey: notesQueryKeys.list(),
    queryFn: () => notesRepository.list(),
  });
