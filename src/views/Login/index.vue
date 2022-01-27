<template>
    <div class="login">
        <div class="login-main" v-loading="loading">
            <div className="login-main__title">
                <img :src="logoPng" />
                <h2>博客后台管理系统</h2>
            </div>
            <el-form
                :model="loginForm"
                :rules="loginFormRules"
                ref="loginFormRef"
            >
                <el-form-item prop="username">
                    <el-input
                        v-model="loginForm.username"
                        placeholder="请输入用户名"
                        :prefix-icon="User"
                        clearable
                    />
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        v-model="loginForm.password"
                        placeholder="请输入密码"
                        type="password"
                        :prefix-icon="Lock"
                        show-password
                    />
                </el-form-item>
                <div class="login-main__handle">
                    <el-button type="primary" @click="handleSubmit"
                        >登&nbsp;录</el-button
                    >
                </div>
            </el-form>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { User, Lock } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { login } from '@/api/login'
import logoPng from '@/assets/images/logo.png'

const store = useStore()
const router = useRouter()

let loading = ref(false)
let loginForm = reactive({
    username: 'admin',
    password: '123456',
})
const loginFormRef = ref(null)
const loginFormRules = reactive({
    username: {
        required: true,
        message: '用户名是必填项！',
        trigger: 'blur',
    },
    password: {
        required: true,
        message: '密码是必填项！',
        trigger: 'blur',
    },
})

// 提交表单
const handleSubmit = () => {
    loginFormRef.value.validate(async (value) => {
        if (!value) return
        loading.value = true
        const res = await login(loginForm).finally(() => {
            loading.value = false
        })
        store.commit('setToken', res.data) // 设置 token
        ElMessage({
            message: res.msg,
            type: 'success',
            duration: 1500,
        })
        setTimeout(() => {
            router.push({ name: 'index' })
        }, 1000)
    })
}
</script>

<style lang="less" scoped>
.login {
    width: 100%;
    height: 100%;
    background: url('https://open.saintic.com/api/bingPic/') no-repeat center
        center;
    background-size: cover;
    position: relative;
}
.login-main {
    width: 350px;
    padding: 40px 30px 60px;
    background: linear-gradient(
        230deg,
        rgba(255, 255, 255, 0.3),
        rgba(255, 255, 255, 1)
    );
    box-shadow: -15px 15px 15px rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .login-main__title {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;
        img {
            width: 50px;
        }
        h2 {
            color: #333;
            font-size: 28px;
            font-weight: bold;
            margin-left: 10px;
        }
    }
    :deep(.el-input) {
        .el-input__inner {
            font-size: 15px;
            background: rgba(255, 255, 255, 0.6);
            height: 42px;
            line-height: 42px;
            padding-left: 40px;
            &::placeholder {
                color: #999;
            }
        }
        .el-input__prefix {
            color: #999;
            font-size: 22px;
            left: 12px;
        }
    }
    .login-main__handle {
        padding-top: 15px;
        .el-button {
            width: 100%;
            height: 40px;
            line-height: 40px;
            font-size: 18px;
        }
    }
}
</style>
