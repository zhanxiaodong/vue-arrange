# back-manager
> 后台管理服务

- [Vue](https://github.com/vuejs/vue)
- [Express](https://github.com/expressjs/express)

### 工程要求
- vue2.5 + express4.14 + es6
- node版本在7.10.0以上(建议使用 [nvm](https://github.com/creationix/nvm) 来管理node版本)
- 代码风格检查 [standard.js](https://github.com/standard/standard)

### 工程依赖
- [axios](https://github.com/mzabriskie/axios)
- [pug](https://github.com/pugjs/pug)
- [stylus](https://github.com/stylus/stylus)
- [vue](https://github.com/vuejs/vue)
- [vue-router](https://github.com/vuejs/vue-router)
- [vuex](https://github.com/vuejs/vuex)

### 安装依赖
```bash
npm install
```

### 启动工程
1. 分离模式
```bash
npm run nodemon
```
此命令用于启动Node.js主服务，借助nodemon来监听服务端代码的变化，自动重启Node.js服务。

2. 融合模式
```bash
npm start
```
此模式下如果改变了Node.js服务端代码，服务不会自动重启。

### 构建工程
```bash
npm run build
```
注：在构建工程前在server.config.js文件中配置接口地址以区分不同环境

### 目录结构
```bash
.
├── build             // 工程服务配置
├── config            // 环境配置
├── server            // 服务端代码目录
│   ├── index.js      // 服务端入口
│   ├── example.js    // 代码实例
├── src               // 客户端代码目录
│   ├── assets        // 图片、字体、样式等资源
│   ├── common        // 公用文件
│   ├── components    // Vue.js组件
│   ├── filters       // Vue.js过滤器
│   ├── pages         // 页面组件
│   ├── plugins       // Vue.js插件
│   ├── router        // 路由配置（Vue Router）
│   ├── store         // 状态管理（Vuex）
│   ├── utils         // 工具
│   ├── App.vue       // App.vue
│   └── main.js       // 应用文件
├── .babelrc          // Babel配置
├── .eslintignore     // ESLint忽略配置
├── .eslintrc.js      // ESLint忽略配置配置
├── .gitignore        // Git忽略配置
├── .npmrc            // npm配置
├── .postcssrc.js     // postcss配置
├── dev-constants.js  // 常量配置
├── server.config.js  // Node.js应用服务配置文件
├── index.html        // 首页文件
├── LICENSE           // LICENSE
├── nodemon.json      // nodemon配置文件
├── package.json      // npm包配置
└── README.md         // 读我吧~
```

### 全局组件

- 路由 `/ui`
