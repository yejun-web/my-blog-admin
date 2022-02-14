module.exports = {
    '*.{js,jsx,vue,tsx}': ['eslint --fix'],
    '{!(package)*.json,*.code-snippets,.!(browserslist)*rc}': [
        'prettier --write--parser json'
    ]
    // '*.{scss,less,styl,css,vue}': ['stylelint --fix'],
}
