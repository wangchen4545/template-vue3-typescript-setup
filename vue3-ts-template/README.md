# Vue 3 + TypeScript + 模版
> 模版中已包含mint-ui 组件，可直接使用

## 待修改文件
+ aks.js 中路径修改为正确路径

```javascript
const projectName = "templateName";
const projectPath = `/待修改路径/templateName/`; //例如小金库 const projectPath = `/ck/templateName/`

export { projectName, projectPath };

```

## 目录结构
```
├── dist // 打包输出目录
├── public 
├── src 
│    ├── assets  // 公共图片
│    ├── components // 业务组件
│    ├── css // 样式目录
│    │   ├── variable.scss // 公共变量
│    │   ├── font.scss
│    │   └── base.scss
│    ├── router // 路由配置
│    │   └── index.ts
│    ├── hooks //公共逻辑封装
│    │   └── index.ts 
│    ├── types //ts类型 interface
│    │   └── index.ts 
│    ├── utils // 工具类
│    │   ├── config.ts // 常量
│    │   ├── util.ts // 公共方法
│    │   ├── request.ts
│    │   └── service.ts
│    ├── views // 路由页面
│    │    └── index // 栗子
│    │        ├── index.vue
│    │        └── index.scss
│    ├── App.vue
│    └── main.ts //入口文件 
├── package.json 
├── tsconfig.json 
├── tsconfig.node.json
├── README.md
└── vue.config.js

```

npm i @jd/mint-ui -S --registry=http://registry.m.jd.com
