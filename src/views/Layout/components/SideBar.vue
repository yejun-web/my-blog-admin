<template>
    <div class="side-bar">
        <el-menu :default-active="data.active" router>
            <el-menu-item
                v-for="item in data.menuList"
                :key="item.path"
                :index="item.path"
            >
                <el-icon>
                    <component :is="item.icon"></component>
                </el-icon>
                <span>{{ item.name }}</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
import { reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import {
    House,
    User,
    Postcard,
    Document,
    Operation,
    PriceTag
} from '@element-plus/icons-vue'

export default {
    components: {
        House,
        User,
        Postcard,
        Document,
        Operation,
        PriceTag
    },
    setup(props, ctx) {
        const data = reactive({
            active: '',
            menuList: [
                {
                    name: '首页',
                    icon: 'House',
                    path: '/index'
                },
                {
                    name: '用户管理',
                    icon: 'User',
                    path: '/user-management'
                },
                {
                    name: '角色列表',
                    icon: 'Postcard',
                    path: '/role-management'
                },
                {
                    name: '文章管理',
                    icon: 'Document',
                    path: '/article-management'
                },
                {
                    name: '分类管理',
                    icon: 'Operation',
                    path: '/category-management'
                },
                {
                    name: '标签管理',
                    icon: 'PriceTag',
                    path: '/tag-management'
                }
            ]
        })

        // 路由监听
        const route = useRoute()
        watch(
            () => route.path,
            value => {
                data.active = value
                console.log(data.active)
            },
            {
                deep: true,
                immediate: true
            }
        )

        return {
            data
        }
    }
}
</script>

<style lang="less">
.side-bar {
    width: 220px;
    height: 100%;
    .el-menu {
        height: 100%;
        padding: 20px 0 50px;
        .el-menu-item {
            font-size: 15px;
            &[class^='el-icon'] {
                margin-right: 10px;
            }
            &.is-active {
                background-color: #eaf3fc;
                &::after {
                    opacity: 1;
                    transform: scale(1);
                }
            }
            &::after {
                content: '';
                display: inline-block;
                width: 3px;
                height: 56px;
                background-color: #2a82e4;
                position: absolute;
                top: 0;
                right: 0;
                opacity: 0;
                transform: scaleY(0);
                transition: all 0.3s ease;
            }
        }
    }
}
</style>
