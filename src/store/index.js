import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import SecureLS from 'secure-ls'
import user from './modules/user'

/**
 * Secure localStorage data with high level of encryption and data compression
 * https://github.com/softvar/secure-ls
 */
const ls = new SecureLS({ isCompression: false })
const persistedState = createPersistedState({
    storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
    },
})

const store = createStore({
    modules: {
        user,
    },
    plugins: [
        persistedState
    ],
})

export default store
