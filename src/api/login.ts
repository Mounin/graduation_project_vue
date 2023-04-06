// 登录相关请求
import service from './axios'
import type { AxiosRequestConfig } from 'axios'

const userLogin = {
    methods: {
        // 登录
        async login(username: string, password: string) {
            try {
                const data = {
                    username,
                    password
                }
                const response = await service.post('login/', data)
                return response.data
            } catch (error) {
                console.error(error)
            }
        },
        // 注册
        async register(username: string, password: string) {
            try {
                const data = {
                    username,
                    password
                }
                const response = await service.post('register/', data)
                return response.data
            } catch (error) {
                console.error(error)
            }
        },

        // check username
        async checkUsername(username: string) {
            try {
                const config: AxiosRequestConfig = {
                    params: {
                        username
                    }
                }
                const response = await service.get('check_username/', config)
                return response.data
            } catch (error) {
                console.error(error)
            }
        },
    }
}

export default userLogin.methods

