import { useQuery } from "@tanstack/react-query";

import { contactsRepository } from "@/lib/storage/repositories";

import { contactsQueryKeys } from "../constants/query-keys";

export const useGetContacts = () =>
  useQuery({
    queryKey: contactsQueryKeys.list(),
    queryFn: () => contactsRepository.list(),
  });
