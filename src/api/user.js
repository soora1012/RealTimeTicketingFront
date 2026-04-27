import { api } from "./axios"

/**
 * 유저 List
 */
export const userList = (page = 1, size = 10, keyword = "") => {
  return api.get("/member/list", {
    params: {
      page,
      size,
      keyword,
    },
  })
}