import { api } from "@/src/lib/axios";

export const getLeaderboard = async () => {
  const response = await api.get("/space/getranks");
  return response.data;
};