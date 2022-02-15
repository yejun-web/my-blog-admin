<template>
    <div class="layout">
        <div class="layout-header">
            <NavBar :user-info="userInfo" :logout="handleLogout" />
        </div>
        <div class="layout-content">
            <div class="layout-content__left">
                <SideBar />
            </div>
            <div class="layout-content__right">
                <router-view v-slot="{ Component }">
                    <transition name="content" mode="out-in">
                        <component :is="Component" />
                    </transition>
                </router-view>
            </div>
        </div>
    </div>
</template>

<script setup>
import NavBar from './components/NavBar'
import SideBar from './components/SideBar'
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { ElMessageBox } from 'element-plus'

const store = useStore()
const userInfo = computed(() => store.state.user.userInfo)
const getUserInfo = () => store.dispatch('getUserInfo')
const logout = () => store.commit('logout')
const handleLogout = () => {
    ElMessageBox.confirm('你确定要退出登录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        logout()
    })
}

onMounted(() => {
    getUserInfo()
})
</script>

<style lang="less" scoped>
.layout {
    .layout-content {
        height: calc(100vh - 78px);
        display: flex;
        .layout-content__right {
            flex: 1;
            padding: 20px;
            overflow-x: hidden;
            overflow-y: auto;
        }
    }
}
</style>
