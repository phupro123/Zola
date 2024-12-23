import { useQuery } from "@tanstack/react-query"
import Media from "../api/Media"

export const useUserMedia = (username) => {
  return useQuery({
    queryKey: ['getUserMedia', username],
    queryFn: () => Media.getFile(username)
  })
}