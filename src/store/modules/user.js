import router from '@/router'
import { getUserInfo } from '@/api/user'

const user = {
    state() {
        return {
            token: '',
            userInfo: null
        }
    },
    mutations: {
        setToken(state, data) {
            state.token = data
        },
        async getUserInfo(state) {
            const { data } = await getUserInfo()
            state.userInfo = data
        },
        logout(state) {
            state.token = ''
            window.location.reload()
        }
    },
    actions: {
        getUserInfo({ commit }) {
            commit('getUserInfo')
        }
    },
    getters: {
        token: state => state.token,
        userInfo: state => state.userInfo
    },
}

export default user
