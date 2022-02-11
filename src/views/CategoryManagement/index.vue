<template>
    <div class="category-management">
        <div class="category-management__top">
            <el-button
                type="primary"
                size="large"
                @click="categoryFormVisible = !categoryFormVisible"
                >新增分类</el-button
            >
        </div>
        <div class="category-management__main">
            <el-table :data="categoryData" stripe border>
                <el-table-column
                    prop="categoryId"
                    label="分类ID"
                    align="center"
                />
                <el-table-column
                    prop="categoryName"
                    label="分类名称"
                    align="center"
                />
                <el-table-column label="操作" align="center">
                    <template #default="scope">
                        <el-button @click="handleEdit(scope.row)"
                            >编辑</el-button
                        >
                        <el-button
                            type="danger"
                            @click="handleDelete(scope.row.categoryId)"
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
            v-model="categoryFormVisible"
            width="500px"
            :title="categoryForm.categoryId ? '编辑分类' : '新增分类'"
            @closed="handleClosed"
        >
            <el-form
                :model="categoryForm"
                :rules="categoryFormRules"
                label-position="left"
                label-width="80px"
                ref="categoryFormRef"
            >
                <el-form-item label="分类名称" prop="categoryName">
                    <el-input
                        v-model="categoryForm.categoryName"
                        placeholder="请输入分类名称"
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
                        @click="categoryFormVisible = !categoryFormVisible"
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
import { categoryList, setCategory, deleteCategory } from '@/api/category'

let categoryData = ref([])
const totalData = ref(0)
const queryInfo = reactive({
    current: 1,
    pageSize: 10,
})

// category form
const categoryFormVisible = ref(false)
const categoryFormRef = ref(null)
const categoryForm = reactive({
    categoryId: '',
    categoryName: '',
})
const categoryFormRules = reactive({
    categoryName: {
        required: true,
        message: '请填写分类名',
        trigger: 'blur',
    },
})

const getCategoryList = async () => {
    const { data } = await categoryList(queryInfo)
    categoryData.value = data.records
    totalData.value = data.total
}
const handleCurrentChange = (value) => {
    queryInfo.current = value
    getCategoryList()
}
const handleSubmit = () => {
    categoryFormRef.value.validate(async (value) => {
        if (!value) return
        const res = await setCategory(categoryForm)
        categoryFormVisible.value = false
        getCategoryList()
        ElMessage({
            message: res.msg,
            type: 'success',
        })
    })
}
const handleEdit = (data) => {
    categoryFormVisible.value = true
    nextTick(() => {
        categoryForm.categoryId = data.categoryId
        categoryForm.categoryName = data.categoryName
    })
}
const handleDelete = async (id) => {
    await ElMessageBox.confirm('你确定要删除该分类吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    })
    const res = await deleteCategory(id)
    getCategoryList()
    ElMessage({
        message: res.msg,
        type: 'success',
    })
}
const handleClosed = () => {
    categoryForm.categoryId = ''
    categoryFormRef.value.resetFields()
}

onMounted(() => {
    getCategoryList()
})
</script>

<style lang="less">
.category-management {
    .category-management__top {
        text-align: right;
        margin-bottom: 20px;
    }
}
</style>
