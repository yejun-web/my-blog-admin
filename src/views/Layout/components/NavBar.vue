<template>
    <div class="nav-bar">
        <div class="nav-bar__title">
            <img src="~@/assets/images/logo.png" />
            <h3>博客后台管理系统</h3>
        </div>
        <el-dropdown v-if="userInfo">
            <span class="el-dropdown-link">
                {{ `${userInfo.username} / ${userInfo.roleName}` }}
                <el-icon><arrow-down /></el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="logout"
                        >退出登录</el-dropdown-item
                    >
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script>
import { ArrowDown } from '@element-plus/icons-vue'

export default {
    props: {
        userInfo: {
            type: Object,
            default() {
                return {
                    username: '',
                    roleName: '',
                }
            },
        },
        logout: {
            type: Function,
            default: () => {},
        },
    },
    components: {
        ArrowDown,
    },
    setup() {},
}
</script>

<style lang="less" scoped>
.nav-bar {
    height: 78px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #409eff;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.43);
    padding: 0 40px 0 30px;
    z-index: 99;
    .nav-bar__title {
        display: flex;
        align-items: center;
        img {
            width: 40px;
            margin-right: 10px;
        }
        h3 {
            color: #fff;
            font-size: 24px;
        }
    }
    .el-dropdown-link {
        color: #fff;
        font-size: 16px;
        line-height: 30px;
        cursor: pointer;
        .el-icon {
            margin-left: 5px;
        }
    }
}
</style>
