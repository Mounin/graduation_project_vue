// 登录相关请求
import service from './axios'

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
    }
}

export default userLogin.methods

