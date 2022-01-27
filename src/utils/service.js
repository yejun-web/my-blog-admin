import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import store from '@/store'

const service = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
})

// request
service.interceptors.request.use(
    (config) => {
        if (store.getters.token) {
            config.headers['Authorization'] = store.getters.token
        }
        return config
    },
    (err) => {
        console.log(err)
        ElMessage({
            message: err || 'Error',
            type: 'error',
            duration: 3 * 1000,
        })
    }
)

// response
service.interceptors.response.use(
    (config) => {
        let res = config.data
        if (res.code === 201) {
            ElMessageBox.alert('登录已过期，请重新登录', '提示', {
                confirmButtonText: '确定',
                type: 'warning',
            }).then(() => {
                store.commit('logout')
            })
        } else if (res.code !== 200) {
            ElMessage({
                message: res.msg || 'Error',
                type: 'error',
                duration: 3 * 1000,
            })
        }
        return res
    },
    (err) => {
        console.log(err)
        ElMessage({
            message: err || 'Error',
            type: 'error',
            duration: 3 * 1000,
        })
    }
)

export default service
