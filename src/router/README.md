# 路由架构说明

## 目录结构

```
router/
├── constants.ts      # 路由路径、名称、白名单常量
├── types.ts          # RouteMeta 扩展类型
├── guards/           # 路由守卫
│   └── index.ts      # 权限、白名单、登录态
├── routes/           # 路由定义
│   ├── index.ts      # 路由聚合
│   └── modules/      # 按模块拆分
│       ├── auth.ts   # 登录、404
│       └── dashboard.ts
├── index.ts          # 路由入口
└── README.md
```

## 核心能力

### 1. 白名单 (WHITELIST_PATHS)
- 无需登录即可访问的路径
- 当前：`/login`、`/404`
- 新增白名单：在 `constants.ts` 的 `WHITELIST_PATHS` 中添加

### 2. 权限校验 (meta.roles)
- 在路由 `meta.roles` 中声明所需角色
- 守卫会校验 `userStore.userInfo.roles`
- 无权限时重定向到 404

### 3. 页面缓存 (meta.keepAlive)
- `meta.keepAlive: true` 的页面会被 keep-alive 缓存
- 需在组件中 `defineOptions({ name: ROUTE_NAME.xxx })` 与路由 name 一致

### 4. 404 兜底
- 未知路径统一重定向到 `/404`

## 新增页面流程

1. 在 `routes/modules/` 新建或编辑模块文件
2. 在 `routes/index.ts` 中导入并挂到 `layoutRoute.children`
3. 如需缓存，在组件中 `defineOptions({ name: ROUTE_NAME.xxx })`
4. 如需权限，在 meta 中设置 `roles: ['admin']`
