<template>
    <div class="tag-management">
        <div class="tag-management__top">
            <el-button
                type="primary"
                size="large"
                @click="tagFormVisible = !tagFormVisible"
                >新增标签</el-button
            >
        </div>
        <div class="tag-management__main">
            <el-table :data="tagData" stripe border>
                <el-table-column
                    prop="tagId"
                    label="标签ID"
                    align="center"
                />
                <el-table-column
                    prop="tagName"
                    label="标签名称"
                    align="center"
                />
                <el-table-column label="操作" align="center">
                    <template #default="scope">
                        <el-button @click="handleEdit(scope.row)"
                            >编辑</el-button
                        >
                        <el-button
                            type="danger"
                            @click="handleDelete(scope.row.tagId)"
                            >删除</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                class="table-pagination"
                v-model:currentPage="queryInfo.current"
                :page-size="queryInfo.pageSize"
                :total="totalData"
                @current-change="handleCurrentChange"
                layout="prev, pager, next, jumper"
                background
            >
            </el-pagination>
        </div>
        <el-dialog
            v-model="tagFormVisible"
            width="500px"
            :title="tagForm.tagId ? '编辑标签' : '新增标签'"
            @closed="handleClosed"
        >
            <el-form
                :model="tagForm"
                :rules="tagFormRules"
                label-position="left"
                label-width="80px"
                ref="tagFormRef"
            >
                <el-form-item label="标签名称" prop="tagName">
                    <el-input
                        v-model="tagForm.tagName"
                        placeholder="请输入标签名称"
                        size="large"
                        clearable
                    />
                </el-form-item>
                <div class="handle-group">
                    <el-button type="primary" @click="handleSubmit" size="large"
                        >确定</el-button
                    >
                    <el-button
                        size="large"
                        @click="tagFormVisible = !tagFormVisible"
                        >取消</el-button
                    >
                </div>
            </el-form>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { tagList, setTag, deleteTag } from '@/api/tag'

let tagData = ref([])
const totalData = ref(0)
const queryInfo = reactive({
    current: 1,
    pageSize: 10,
})

// tag form
const tagFormVisible = ref(false)
const tagFormRef = ref(null)
const tagForm = reactive({
    tagId: '',
    tagName: '',
})
const tagFormRules = reactive({
    tagName: {
        required: true,
        message: '请填写标签名',
        trigger: 'blur',
    },
})

const getTagList = async () => {
    const { data } = await tagList(queryInfo)
    tagData.value = data.records
    totalData.value = data.total
}
const handleCurrentChange = (value) => {
    queryInfo.current = value
    getTagList()
}
const handleSubmit = () => {
    tagFormRef.value.validate(async (value) => {
        if (!value) return
        const res = await setTag(tagForm)
        tagFormVisible.value = false
        getTagList()
        ElMessage({
            message: res.msg,
            type: 'success',
        })
    })
}
const handleEdit = (data) => {
    tagFormVisible.value = true
    nextTick(() => {
        tagForm.tagId = data.tagId
        tagForm.tagName = data.tagName
    })
}
const handleDelete = async (id) => {
    await ElMessageBox.confirm('你确定要删除该标签吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    })
    const res = await deleteTag(id)
    getTagList()
    ElMessage({
        message: res.msg,
        type: 'success',
    })
}
const handleClosed = () => {
    tagForm.tagId = ''
    tagFormRef.value.resetFields()
}

onMounted(() => {
    getTagList()
})
</script>

<style lang="less">
.tag-management {
    .tag-management__top {
        text-align: right;
        margin-bottom: 20px;
    }
}
</style>
