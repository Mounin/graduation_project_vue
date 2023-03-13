// jaeger相关请求
import type { AxiosRequestConfig } from 'axios'
import service from './axios'

const jaeger = {
    methods: {
        // 获取jaeger数据
        async get_traces_and_spans() {
            try {
                const config: AxiosRequestConfig = {
                    params: {}
                }
                const response = await service.get('get_traces_and_spans/', config)
                return response.data
            } catch (error) {
                console.error(error)
            }
        },
        async get_traces() {
            try {
                const config: AxiosRequestConfig = {
                    params: {}
                }
                const response = await service.get('get_traces/', config)
                return response.data
            } catch (error) {
                console.error(error)
            }
        },
        async get_spans() {
            try {
                const config: AxiosRequestConfig = {
                    params: {}
                }
                const response = await service.get('get_spans/', config)
                return response.data
            } catch (error) {
                console.error(error)
            }
        },
        async draw_path(traceID: string) {
            try {
                const config: AxiosRequestConfig = {
                    params: {
                        traceID
                    }
                }
                const response = await service.get('draw_path/', config)
                return response.data
            } catch (error) {
                console.error(error)
            }
        },
        async get_monitor() {
            try {
                const config: AxiosRequestConfig = {
                    params: {}
                }
                const response = await service.get('get_monitor/', config)
                return response.data
            } catch (error) {
                console.error(error)
            }
        },
        async get_resource() {
            try {
                const config: AxiosRequestConfig = {
                    params: {}
                }
                const response = await service.get('get_resource/', config)
                return response.data
            } catch (error) {
                console.error(error)
            }
        },
        async get_hot_ms() {
            try {
                const config: AxiosRequestConfig = {
                    params: {}
                }
                const response = await service.get('get_hot_ms/', config)
                return response.data
            } catch (error) {
                console.error(error)
            }
        },
    }
}

export default jaeger.methods

