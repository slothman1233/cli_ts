import env from "../../config/env"
import http from '../http'

interface LoginInfoModel {
  username: string
  password: string
}
export const login = (info: LoginInfoModel) =>
  http.post('/login/loginByAccount', info, {
    codes: { sures: ['4601a00'], err: ['4601a12', '4601a14'] },
  })