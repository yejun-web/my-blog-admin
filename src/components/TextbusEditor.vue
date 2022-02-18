<template>
    <div class="textbus-editor">
        <div ref="editorContainer"></div>
        <input
            ref="editorFileInput"
            type="file"
            accept="image/png, image/gif, image/jpeg, image/bmp, image/x-icon"
        />
    </div>
</template>

<script setup>
import { ref, onMounted, defineProps, defineEmits } from 'vue'
import { ElMessage } from 'element-plus'
import { createEditor } from '@textbus/textbus'
import '@textbus/textbus/bundles/textbus.min.css'
import { upload } from '@/api/common'

const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    }
})
const emit = defineEmits(['update:modelValue'])

const baseUrl = import.meta.env.VITE_BASE_URL
const editorContainer = ref(null)
const editorFileInput = ref(null)
const editorInstance = ref(null)

/**
 * https://textbus.tanboui.com/doc/upload
 */
const uploader = (type, prevValue) => {
    if (type !== 'image') {
        return ElMessage.error('请选择正确格式的文件！')
    }
    editorFileInput.value.click()
    return new Promise((resolve, reject) => {
        editorFileInput.value.addEventListener('change', async e => {
            let formObj = new FormData()
            formObj.append('file', e.target.files[0])
            const { data: res } = await upload(formObj)
            resolve(baseUrl + res.file_url)
        })
    })
}
const createEditorInstance = () => {
    editorInstance.value = createEditor(editorContainer.value, {
        uploader
    })
    // initialize
    if (props.modelValue) {
        editorInstance.value.setContents(props.modelValue)
    }
    // listener
    editorInstance.value.onChange.subscribe(() => {
        const content = editorInstance.value.getContents().content
        emit('update:modelValue', content)
    })
}

onMounted(() => {
    createEditorInstance()
})
</script>

<style lang="less">
.textbus-editor {
    > input[type='file'] {
        display: none;
    }
}
</style>
