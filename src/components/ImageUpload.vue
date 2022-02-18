<template>
    <div class="image-upload">
        <el-upload
            :action="baseUrl + '/common/upload'"
            :headers="headers"
            :show-file-list="false"
            :on-success="handleSuccess"
            :on-error="handleError"
        >
            <img
                v-if="imgUrl || modelValue"
                :src="baseUrl + (imgUrl || modelValue)"
            />
            <el-icon v-else class="image-upload__icon"><Plus /></el-icon>
        </el-upload>
    </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import store from '@/store'

const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    }
})
const emit = defineEmits(['update:modelValue'])

const baseUrl = import.meta.env.VITE_BASE_URL
const headers = {
    Authorization: store.getters.token
}
const imgUrl = ref('')

const handleSuccess = (response, file, fileList) => {
    imgUrl.value = response.data.file_url
    emit('update:modelValue', response.data.file_url)
}
const handleError = () => {}
</script>

<style lang="less">
.image-upload {
    .el-upload {
        width: 120px;
        height: 120px;
        line-height: 120px;
        color: #c2c6cd;
        border: 1px solid #dcdfe6;
        font-size: 40px;
        transition: border-color 0.3s ease;
        overflow: hidden;
        &:hover {
            border-color: #c0c4cc;
        }
        > img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
}
</style>
