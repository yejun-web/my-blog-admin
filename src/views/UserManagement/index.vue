<template>
    <div class="user-management">
        <div class="user-management__top">
            <el-button
                type="primary"
                size="large"
                @click="userFormVisible = !userFormVisible"
                >新增用户</el-button
            >
        </div>
        <div class="user-management__main">
            <el-table :data="userData" stripe border>
                <el-table-column
                    prop="username"
                    label="用户名称"
                    align="center"
                />
                <el-table-column
                    prop="roleName"
                    label="角色名称"
                    align="center"
                />
                <el-table-column label="操作" align="center">
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
            v-model="userFormVisible"
            width="600px"
            :title="userForm.id ? '编辑用户' : '新增用户'"
            @closed="handleClosed"
        >
            <el-form
                :model="userForm"
                :rules="userFormRules"
                label-position="left"
                label-width="80px"
                ref="userFormRef"
            >
                <el-form-item label="用户名" prop="username">
                    <el-input
                        v-model="userForm.username"
                        placeholder="请输入用户名"
                        size="large"
                        clearable
                    />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input
                        v-model="userForm.password"
                        placeholder="请输入密码"
                        size="large"
                        type="password"
                        show-password
                    />
                </el-form-item>
                <el-form-item label="角色" prop="role">
                    <el-select
                        v-model="userForm.role"
                        placeholder="请选择角色"
                        size="large"
                        style="width: 100%"
                    >
                        <el-option
                            v-for="item in roleData"
                            :key="item.roleId"
                            :label="item.roleName"
                            :value="item.roleId"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <div class="handle-group">
                    <el-button type="primary" @click="handleSubmit" size="large"
                        >确定</el-button
                    >
                    <el-button
                        size="large"
                        @click="userFormVisible = !userFormVisible"
                        >取消</el-button
                    >
                </div>
            </el-form>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { roleList } from '@/api/role'
import { userRegister, userList, setUserInfo, deleteUser } from '@/api/user'

let userData = ref([])
let roleData = ref([])
const totalData = ref(0)
const queryInfo = reactive({
    current: 1,
    pageSize: 10,
})

// user form
const userFormVisible = ref(false)
const userFormRef = ref(null)
const userForm = reactive({
    id: '',
    username: '',
    password: '',
    role: '',
})
const userFormRules = computed(() => {
    return {
        username: {
            required: true,
            message: '请填写用户名',
            trigger: 'blur',
        },
        ...(!userForm.id && {
            password: {
                required: true,
                message: '请填写密码',
                trigger: 'blur',
            },
        }),
        role: {
            required: true,
            message: '请选择角色',
            trigger: 'blur',
        },
    }
})

const getUserList = async () => {
    const { data } = await userList(queryInfo)
    userData.value = data.records
    totalData.value = data.total
}
const getRoleList = async () => {
    const { data } = await roleList({ current: 1, pageSize: 99 })
    roleData.value = data.records
}
const handleCurrentChange = (value) => {
    queryInfo.current = value
    getUserList()
}
const handleSubmit = () => {
    userFormRef.value.validate(async (value) => {
        if (!value) return
        const xhrInsnace = userForm.id ? setUserInfo : userRegister
        const res = await xhrInsnace(userForm)
        userFormVisible.value = false
        getUserList()
        ElMessage({
            message: res.msg,
            type: 'success',
        })
    })
}
const handleEdit = (data) => {
    userFormVisible.value = true
    nextTick(() => {
        userForm.id = data.id
        userForm.username = data.username
        userForm.role = data.roleId
    })
}
const handleDelete = async (id) => {
    await ElMessageBox.confirm('你确定要删除该用户吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    })
    const res = await deleteUser(id)
    getUserList()
    ElMessage({
        message: res.msg,
        type: 'success',
    })
}
const handleClosed = () => {
    userForm.id = ''
    userFormRef.value.resetFields()
}

onMounted(() => {
    getUserList()
    getRoleList()
})
</script>

<style lang="less">
.user-management {
    .user-management__top {
        text-align: right;
        margin-bottom: 20px;
    }
}
</style>
