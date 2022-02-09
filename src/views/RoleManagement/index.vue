<template>
    <div class="user-management">
        <el-table :data="roleData" stripe border>
            <el-table-column prop="roleId" label="角色ID" align="center" />
            <el-table-column prop="roleName" label="角色名称" align="center" />
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
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { roleList } from '@/api/role'

const roleData = ref([])
const totalData = ref(0)
const queryInfo = reactive({
    current: 1,
    pageSize: 10,
})

const getRoleList = async () => {
    const { data } = await roleList(queryInfo)
    roleData.value = data.records
    totalData.value = data.total
}

const handleCurrentChange = (value) => {
    queryInfo.current = value
    getRoleList()
}

onMounted(() => {
    getRoleList()
})
</script>

<style lang="less"></style>
