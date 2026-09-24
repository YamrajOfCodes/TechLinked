"use client";

import { getLeaderboard } from "@/src/API/Space/space.api";
import { useQuery } from "@tanstack/react-query";


export const leaderboardKeys = {
  all: ["leaderboard"] as const,
};

export const useLeaderboard = () => {
  return useQuery({
    queryKey: leaderboardKeys.all,
    queryFn: getLeaderboard,
    retry: 1,
  });
};