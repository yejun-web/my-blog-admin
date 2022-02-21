<template>
    <div class="article-management">
        <div class="category-management__top">
            <div>
                <el-input
                    v-model="queryInfo.categoryName"
                    size="large"
                    placeholder="请输入分类名称"
                    clearable
                    @clear="handleSearch"
                ></el-input>
                <el-input
                    v-model="queryInfo.tagName"
                    size="large"
                    placeholder="请输入标签名称"
                    clearable
                    @clear="handleSearch"
                ></el-input>
                <el-button size="large" type="primary" @click="handleSearch"
                    >搜索</el-button
                >
            </div>
            <el-button
                size="large"
                type="primary"
                @click="articleFormVisible = !articleFormVisible"
                >新增文章</el-button
            >
        </div>
        <div class="article-management__main">
            <el-table :data="articleData" stripe border>
                <el-table-column label="缩略图" align="center" width="150">
                    <template #default="scope">
                        <el-image :src="baseUrl + scope.row.imgUrl">
                            <template #error>
                                <div class="image-slot">
                                    <el-icon><icon-picture /></el-icon>
                                </div>
                            </template>
                        </el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="title" label="标题" align="left" />
                <el-table-column label="分类名称" align="center" width="150">
                    <template #default="scope">
                        {{
                            scope.row.categoryName
                                ? scope.row.categoryName
                                : '— —'
                        }}
                    </template>
                </el-table-column>
                <el-table-column label="文章标签" align="center" width="180">
                    <template #default="scope">
                        {{ scope.row.tags ? scope.row.tags.join('、') : '— —' }}
                    </template>
                </el-table-column>
                <el-table-column label="创建日期" align="center" width="180">
                    <template #default="scope">
                        {{
                            scope.row.createTime ? scope.row.createTime : '— —'
                        }}
                    </template>
                </el-table-column>
                <el-table-column label="更新日期" align="center" width="180">
                    <template #default="scope">
                        {{
                            scope.row.updateTime ? scope.row.updateTime : '— —'
                        }}
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="200">
                    <template #default="scope">
                        <el-button @click="handleEdit(scope.row)"
                            >编辑</el-button
                        >
                        <el-button
                            type="danger"
                            @click="handleDelete(scope.row.id)"
                            >删除</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                v-model:currentPage="queryInfo.current"
                class="table-pagination"
                :page-size="queryInfo.pageSize"
                :total="totalData"
                layout="prev, pager, next, jumper"
                background
                @current-change="handleCurrentChange"
            >
            </el-pagination>
        </div>
        <!-- articleForm -->
        <el-dialog
            v-model="articleFormVisible"
            width="60%"
            :title="articleForm.id ? '编辑文章' : '新增文章'"
            @closed="handleClosed"
        >
            <el-form
                ref="articleFormRef"
                :model="articleForm"
                :rules="articleFormRules"
                label-position="left"
                label-width="80px"
            >
                <el-form-item label="文章标题" prop="title">
                    <el-input
                        v-model="articleForm.title"
                        placeholder="请输入文章标题"
                        size="large"
                        clearable
                    />
                </el-form-item>
                <el-form-item label="文章描述" prop="desc">
                    <el-input
                        v-model="articleForm.desc"
                        :rows="2"
                        type="textarea"
                        placeholder="请输入文章描述"
                        size="large"
                        clearable
                    />
                </el-form-item>
                <el-form-item label="文章内容" prop="content">
                    <TextbusEditor v-model="articleForm.content" />
                </el-form-item>
                <el-form-item label="创建时间" prop="createTime">
                    <el-date-picker
                        v-model="articleForm.createTime"
                        type="datetime"
                        placeholder="请选择创建时间"
                        value-format="YYYY-MM-DD hh:mm:ss"
                        size="large"
                        clearable
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="更新时间" prop="updateTime">
                    <el-date-picker
                        v-model="articleForm.updateTime"
                        type="datetime"
                        placeholder="请选择更新时间"
                        value-format="YYYY-MM-DD hh:mm:ss"
                        size="large"
                        clearable
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="预览图" prop="imgUrl">
                    <ImageUpload v-model="articleForm.imgUrl" />
                </el-form-item>
                <el-form-item label="分类" prop="categoryId">
                    <el-select
                        v-model="articleForm.categoryId"
                        placeholder="请选择分类"
                        size="large"
                        clearable
                    >
                        <el-option
                            v-for="item in categorylist"
                            :key="item.categoryId"
                            :label="item.categoryName"
                            :value="item.categoryId"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="标签" prop="tags">
                    <el-select
                        v-model="articleForm.tags"
                        multiple
                        collapse-tags
                        placeholder="请选择标签"
                        size="large"
                        clearable
                    >
                        <el-option
                            v-for="item in taglist"
                            :key="item.tagId"
                            :label="item.tagName"
                            :value="item.tagName"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <div class="handle-group">
                    <el-button type="primary" size="large" @click="handleSubmit"
                        >确定</el-button
                    >
                    <el-button
                        size="large"
                        @click="articleFormVisible = !articleFormVisible"
                        >取消</el-button
                    >
                </div>
            </el-form>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, toRef, reactive, onMounted, nextTick } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Picture as IconPicture } from '@element-plus/icons-vue'
import { articleList, setArticle, deleteArticle } from '@/api/article'
import useCategoryList from '@/hooks/useCategoryList'
import useTagList from '@/hooks/useTagList'
import ImageUpload from '@/components/ImageUpload'
import TextbusEditor from '@/components/TextbusEditor'

const baseUrl = import.meta.env.VITE_BASE_URL
const articleData = ref([])
const totalData = ref(0)
const queryInfo = reactive({
    current: 1,
    pageSize: 10,
    categoryName: '',
    tagName: ''
})
const categorylist = useCategoryList()
const taglist = useTagList()

// articleForm
const articleFormRef = ref(null)
const articleFormVisible = ref(false)
const articleForm = reactive({
    id: '',
    title: '',
    desc: '',
    content: '',
    createTime: '',
    updateTime: '',
    imgUrl: '',
    tags: [],
    categoryId: ''
})
const articleFormRules = reactive({
    title: {
        required: true,
        message: '请输入文章标题',
        trigger: 'blur'
    },
    desc: {
        required: true,
        message: '请输入文章描述',
        trigger: 'blur'
    },
    content: {
        required: true,
        message: '请输入文章内容',
        trigger: 'blur'
    },
    createTime: {
        required: true,
        message: '请选择创建时间',
        trigger: 'blur'
    },
    updateTime: {
        required: true,
        message: '请选择更新时间',
        trigger: 'blur'
    },
    categoryId: {
        required: true,
        message: '请选择分类',
        trigger: 'blur'
    }
})

const getArticleList = async () => {
    const { data } = await articleList(queryInfo)
    articleData.value = data.records
    totalData.value = data.total
}
const handleCurrentChange = value => {
    queryInfo.current = value
    getArticleList()
}
const handleSearch = () => {
    queryInfo.current = 1
    getArticleList()
}

// articleForm
const handleSubmit = () => {
    articleFormRef.value.validate(async value => {
        if (!value) return
        const res = await setArticle(articleForm)
        articleFormVisible.value = false
        getArticleList()
        ElMessage({
            message: res.msg,
            type: 'success'
        })
    })
}
const handleClosed = () => {
    articleForm.id = ''
    articleFormRef.value.resetFields()
}
const handleEdit = data => {
    articleFormVisible.value = true
    nextTick(() => {
        articleForm.id = data.id
        articleForm.title = data.title
        articleForm.desc = data.desc
        articleForm.content = data.content
        articleForm.createTime = data.createTime
        articleForm.updateTime = data.updateTime
        articleForm.imgUrl = data.imgUrl
        articleForm.tags = data.tags
        articleForm.categoryId = data.categoryId
    })
}
const handleDelete = async id => {
    await ElMessageBox.confirm('你确定要删除该分类吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    })
    const res = await deleteArticle(id)
    getArticleList()
    ElMessage({
        message: res.msg,
        type: 'success'
    })
}

onMounted(() => {
    getArticleList()
})
</script>

<style lang="less">
.article-management {
    .category-management__top {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        > div:first-child {
            display: flex;
            .el-input {
                width: 230px;
                margin-right: 15px;
            }
        }
    }
    .article-management__main {
        .el-table {
            .el-image {
                width: 75px;
                height: 75px;
                border: 1px solid #ebeef5;
                .image-slot {
                    height: 100%;
                    line-height: 75px;
                    font-size: 20px;
                    color: var(--el-text-color-secondary);
                    background: #f5f7fa;
                }
            }
        }
    }
    .el-dialog {
        .el-input {
            width: 250px;
        }
    }
}
</style>
