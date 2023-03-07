// prometheus相关请求
import type { AxiosRequestConfig } from 'axios'
import service from './axios'

const prometheus = {
    methods: {
        // 测试接口
        async testAll() {
            try {
                const config: AxiosRequestConfig = {
                    params: {}
                }
                const response = await service.get('test/', config)
                return response.data
            } catch (error) {
                console.error(error)
            }
        },
        // 单点监控
        async showAllSingleMonitor() {
            try {
                const config: AxiosRequestConfig = {
                    params: {}
                }
                const response = await service.get('show_single_mss/', config)
                return response.data
            } catch (error) {
                console.error(error)
            }
        },

        async singleMonitor() {
            try {
                const config: AxiosRequestConfig = {
                    params: {}
                }
                const response = await service.get('single_monitor/', config)
                return response.data
            } catch (error) {
                console.error(error)
            }
        },

        // 持续监控
        async showAllContinueMonitor(form: object) {
            try {
                const config: AxiosRequestConfig = {
                    params: {
                        form
                    }
                }
                const response = await service.get('show_continue_mss/', config)
                return response.data
            } catch (error) {
                console.error(error)
            }
        },
    }
}

export default prometheus.methods

