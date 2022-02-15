/**
 * https://cloud.tencent.com/developer/doc/1078
 * https://eslint.bootcss.com/docs/user-guide/getting-started
 * https://eslint.vuejs.org
 */
module.exports = {
    root: true,
    parserOptions: {
        // 定义ESLint的解析器
        parser: 'babel-eslint',
        sourceType: 'module'
    },
    // 指定代码的运行环境
    env: {
        browser: true,
        node: true,
        es6: true
    },
    extends: [
        // 继承 vue 的标准特性
        'plugin:vue/vue3-recommended',
        // 避免与 prettier 冲突
        'plugin:prettier/recommended'
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'space-before-function-paren': ['error', 'always'],
        // 'vue/attributes-order': 'off',
        'vue/one-component-per-file': 'off',
        'vue/multiline-html-element-content-newline': 'off',
        'vue/singleline-html-element-content-newline': 'off',
        'vue/require-explicit-emits': [
            'error',
            {
                allowProps: false
            }
        ],
        'vue/v-on-event-hyphenation': [
            'error',
            'always',
            {
                autofix: true,
                ignore: []
            }
        ]
    },
    // 当使用第三方的SDK时，eslint会报找不到，可以加入到globals，取消对这个的检查
    globals: {}
}
