import service from '@/utils/service'

// 单文件上传
export function upload(data) {
    return service({
        url: '/common/upload',
        method: 'post',
        data
    })
}

// 多文件上传
export function multipleUpload(data) {
    return service({
        url: '/common/upload/multiple',
        method: 'post',
        data
    })
}
