import service from '@/utils/service'

// 获取用户信息
export function getUserInfo(data) {
    return service({
        url: '/user/getInfo',
        method: 'post',
    })
}