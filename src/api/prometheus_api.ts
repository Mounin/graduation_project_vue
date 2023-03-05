// prometheus相关请求
import type { AxiosRequestConfig } from 'axios'
import service from './axios'

const prometheus = {
    methods: {
        async showAll() {
            try {
                const config: AxiosRequestConfig = {
                    params: {}
                }
                const response = await service.get('show_mss/', config)
                return response.data
                // console.log(response.data)
            } catch (error) {
                console.error(error)
            }
        },

        async searchByMsName(ms_name: String) {
            try {
                const config: AxiosRequestConfig = {
                    params: {
                        ms_name,
                    }
                }
                const response = await service.get('search_by_name/', config)
                return response.data
                // console.log(response.data)
            } catch (error) {
                console.error(error)
            }
        }
    }
}

export default prometheus.methods

