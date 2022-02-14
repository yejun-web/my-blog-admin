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
    // 自定义eslint规则，严格按照StandardJS
    rules: {
        'vue/max-attributes-per-line': [
            'error',
            {
                singleline: {
                    max: 1
                },
                multiline: {
                    max: 1
                }
            }
        ],
        'vue/singleline-html-element-content-newline': 'off',
        'vue/multiline-html-element-content-newline': 'off',
        'vue/name-property-casing': ['error', 'PascalCase'],
        'vue/no-v-html': 'off',
        // 四个空格缩进
        indent: ['error', 4],
        // 单引号
        quotes: [
            2,
            'single',
            {
                avoidEscape: true,
                allowTemplateLiterals: true
            }
        ],
        // 未使用的变量
        'no-unused-vars': [
            2,
            {
                vars: 'all',
                args: 'after-used'
            }
        ],
        // 关键字前后空格
        'keyword-spacing': [
            2,
            {
                before: true,
                after: true
            }
        ],
        // function关键字和函数名后面的空格
        'space-before-function-paren': [2, 'never'],
        // 除了null,其他用===而不是==
        eqeqeq: ['error', 'always', { null: 'ignore' }],
        // 字符串拼接操作符直接用空格
        'space-infix-ops': 2,
        // 逗号前面不用空格，逗号后面用空格
        'comma-spacing': [
            2,
            {
                before: false,
                after: true
            }
        ],
        // else必须和反花括号一行
        'brace-style': [
            2,
            '1tbs',
            {
                allowSingleLine: true
            }
        ],
        // 多行 if 语句的的括号不能省
        curly: [2, 'multi-line'],
        // 使用浏览器全局变量时加上 window. 前缀
        'no-undef': 2,
        // 不允许有连续多行空行
        'no-multiple-empty-lines': [
            2,
            {
                max: 1
            }
        ],
        // 换行符在运算符的位置
        'operator-linebreak': [
            2,
            'after',
            {
                overrides: {
                    '?': 'before',
                    ':': 'before'
                }
            }
        ],
        // 条件语句中赋值语句
        'no-cond-assign': 2,
        // 单行代码块两边加空格
        'block-spacing': [2, 'always'],
        // 对属性名强制使用驼峰
        camelcase: [
            0,
            {
                properties: 'always'
            }
        ],
        // 不允许有多余的行末逗号
        'comma-dangle': [2, 'never'],
        // 始终将逗号置于行末
        'comma-style': [2, 'last'],
        // 点号操作符须与属性需在同一行
        'dot-location': [2, 'property'],
        // 函数调用时标识符与括号间不留间隔
        'func-call-spacing': ['error', 'never'],
        // 键值对当中冒号与值之间要留空白
        'key-spacing': [
            2,
            {
                beforeColon: false,
                afterColon: true
            }
        ],
        // 构造函数要以大写字母开头, 但调用大写字母开头的函数不一定需要new
        'new-cap': [
            2,
            {
                newIsCap: true,
                capIsNew: false
            }
        ],
        // 无参的构造函数调用时要带上括号
        'new-parens': 2,
        // 对象中定义了存值器，一定要对应的定义取值器
        'accessor-pairs': 2,
        // 子类的构造器中一定要调用 super
        'constructor-super': 2,
        // 使用数组字面量而不是构造器
        'no-array-constructor': 'error',
        // 避免使用 arguments.callee 和 arguments.caller
        'no-caller': 2,
        // 避免对类名重新赋值
        'no-class-assign': 2,
        // 避免修改使用 const 声明的变量
        'no-const-assign': 2,
        // 正则中不要使用控制符
        'no-control-regex': 'error',
        // 不要对变量使用 delete 操作。
        'no-delete-var': 2,
        // 不要定义冗余的函数参数
        'no-dupe-args': 2,
        // 类中不要定义冗余的属性
        'no-dupe-class-members': 2,
        // 对象字面量中不要定义重复的属性
        'no-dupe-keys': 2,
        // switch 语句中不要定义重复的 case 分支
        'no-duplicate-case': 2,
        // 同一模块有多个导入时一次性写完
        'no-duplicate-imports': 'error',
        // 正则中不要使用空字符
        'no-empty-character-class': 2,
        // 不要解构空值
        'no-empty-pattern': 2,
        //
        'no-eval': 2,
        'no-ex-assign': 2,
        'no-extend-native': 2,
        'no-extra-bind': 2,
        'no-extra-boolean-cast': 2,
        'no-extra-parens': [2, 'functions'],
        'no-fallthrough': 2,
        'no-floating-decimal': 2,
        'no-func-assign': 2,
        'no-implied-eval': 2,
        'no-inner-declarations': [2, 'functions'],
        'no-invalid-regexp': 2,
        'no-irregular-whitespace': 2,
        'no-iterator': 2,
        'no-label-var': 2,
        'no-labels': [
            2,
            {
                allowLoop: false,
                allowSwitch: false
            }
        ],
        'no-lone-blocks': 2,
        'no-mixed-spaces-and-tabs': 2,
        'no-multi-spaces': 2,
        'no-multi-str': 2,
        'no-new-func': 'error',
        'no-new-object': 2,
        'no-new-require': 2,
        'no-new-symbol': 2,
        'no-new-wrappers': 2,
        'no-obj-calls': 2,
        'no-octal': 2,
        'no-octal-escape': 2,
        'no-path-concat': 2,
        'no-proto': 2,
        'no-redeclare': 2,
        'no-regex-spaces': 2,
        'no-return-assign': [2, 'except-parens'],
        'no-self-assign': 2,
        'no-self-compare': 2,
        'no-sequences': 2,
        'no-shadow-restricted-names': 2,
        'no-sparse-arrays': 2,
        'no-template-curly-in-string': 'error',
        'no-this-before-super': 2,
        'no-throw-literal': 2,
        'no-trailing-spaces': 2,
        'no-undef-init': 2,
        'no-unmodified-loop-condition': 2,
        'no-unneeded-ternary': [
            2,
            {
                defaultAssignment: false
            }
        ],
        'no-unreachable': 2,
        'no-unsafe-finally': 2,
        'no-unsafe-negation': 'error',
        'no-useless-call': 2,
        'no-useless-computed-key': 2,
        'no-useless-escape': 0,
        'no-useless-rename': 2,
        'no-whitespace-before-property': 2,
        'no-with': 2,
        'padded-blocks': [2, 'never'],
        'rest-spread-spacing': ['error', 'never'],
        'semi-spacing': [
            2,
            {
                before: false,
                after: true
            }
        ],
        'space-before-blocks': [2, 'always'],
        'space-in-parens': [2, 'never'],
        'space-unary-ops': [
            2,
            {
                words: true,
                nonwords: false
            }
        ],
        'spaced-comment': [
            2,
            'always',
            {
                markers: [
                    'global',
                    'globals',
                    'eslint',
                    'eslint-disable',
                    '*package',
                    '!',
                    ','
                ]
            }
        ],
        'template-curly-spacing': [2, 'never'],
        'use-isnan': 2,
        'valid-typeof': 2,
        'wrap-iife': [2, 'any'],
        'yield-star-spacing': [2, 'both'],
        yoda: [2, 'never'],
        // 分号
        semi: [2, 'never'],
        'no-unexpected-multiline': 2,
        'arrow-spacing': [
            2,
            {
                before: true,
                after: true
            }
        ],
        'eol-last': 2,
        'generator-star-spacing': [
            2,
            {
                before: true,
                after: true
            }
        ],
        'handle-callback-err': [2, '^(err|error)$'],
        'jsx-quotes': [2, 'prefer-single'],
        'no-console': 'off',
        'no-native-reassign': 2,
        'no-negated-in-lhs': 2,
        'no-spaced-func': 2,
        'no-useless-constructor': 2,
        'one-var': [
            2,
            {
                initialized: 'never'
            }
        ],
        'prefer-const': 2,
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        'object-curly-spacing': [
            2,
            'always',
            {
                objectsInObjects: false
            }
        ],
        'array-bracket-spacing': [2, 'never']
    },
    // 当使用第三方的SDK时，eslint会报找不到，可以加入到globals，取消对这个的检查
    globals: {
        fengmap: true
    }
}
