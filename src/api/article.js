import service from '@/utils/service'

// 获取文章列表
export function articleList(data) {
    return service({
        url: '/article/list',
        method: 'post',
        data
    })
}

// 新增、编辑分类文章
export function setArticle(data) {
    return service({
        url: '/article/set',
        method: 'post',
        data
    })
}

// 删除文章
export function deleteArticle(id) {
    return service({
        url: '/article/delete/' + id,
        method: 'post'
    })
}
