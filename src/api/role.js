import service from '@/utils/service'

// 角色列表
export function roleList(data) {
    return service({
        url: '/role/list',
        method: 'post',
        data
    })
}