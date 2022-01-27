import service from '@/utils/service'

// 登录
export function login(data) {
    return service({
        url: '/login',
        method: 'post',
        data,
    })
}