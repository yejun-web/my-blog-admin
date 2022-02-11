import service from '@/utils/service'

// 获取标签列表
export function tagList (data) {
    return service({
        url: '/tag/list',
        method: 'post',
        data
    })
}

// 新增、编辑标签
export function setTag (data) {
    return service({
        url: '/tag/set',
        method: 'post',
        data
    })
}

// 删除标签
export function deleteTag (id) {
    return service({
        url: '/tag/delete/' + id,
        method: 'post',
    })
}