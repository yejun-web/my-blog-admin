import service from '@/utils/service'

// 获取分类列表
export function categoryList (data) {
    return service({
        url: '/category/list',
        method: 'post',
        data
    })
}

// 新增、编辑分类
export function setCategory (data) {
    return service({
        url: '/category/set',
        method: 'post',
        data
    })
}

// 删除分类
export function deleteCategory (id) {
    return service({
        url: '/category/delete/' + id,
        method: 'post',
    })
}