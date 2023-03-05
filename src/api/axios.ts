// 封装axios
import axios from "axios";

// 创建axios实例
const service = axios.create({
    baseURL: 'http://localhost:8000/',
    timeout: 50000,
})

export default service