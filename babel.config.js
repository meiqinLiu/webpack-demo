module.exports = {
    // 智能预设，能够编译es6语法
    presets: [
        [
            '@babel/preset-env',
            {
                useBuiltIns: "usage", // 按需加载兼容性的补充
                corejs: { version: "3.8", proposals: true }
            }
        ]
    ]
}