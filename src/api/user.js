import service from '@/utils/service'

// 获取用户信息
export function getUserInfo() {
    return service({
        url: '/user/getInfo',
        method: 'post',
    })
}

// 新增用户
export function userRegister(data) {
    return service({
        url: '/user/register',
        method: 'post',
        data
    })
}

// 获取用户列表
export function userList(data) {
    return service({
        url: '/user/list',
        method: 'post',
        data
    })
}

// 设置用户信息
export function setUserInfo(data) {
    return service({
        url: '/user/setInfo',
        method: 'post',
        data
    })
}

// 删除用户
export function userDelete(id) {
    return service({
        url: 'user/delete/' + id,
        method: 'post',
    })
}