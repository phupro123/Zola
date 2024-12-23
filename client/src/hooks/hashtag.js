import { useQuery } from "@tanstack/react-query"
import { hashtagAPI } from "../api/Hashtag"

export const useHashtagTrending = () => {
  return useQuery({
    queryKey: ['hashtagTrending'],
    queryFn: () => hashtagAPI.gelHashtagTreding()
  })
}