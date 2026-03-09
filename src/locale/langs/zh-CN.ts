/**
 * 简体中文
 */
export default {
  app: {
    name: 'Monitor System',
    nameShort: 'Monitor',
  },
  common: {
    confirm: '确定',
    cancel: '取消',
    search: '查询',
    reset: '重置',
    submit: '提交',
    back: '返回',
    backHome: '返回首页',
    logout: '退出',
    enterAdmin: '进入后台',
    langSwitch: '中文 / English',
    langSwitchEn: 'English / 中文',
    pleaseInput: '请输入',
    all: '全部',
    start: '开始',
    end: '结束',
  },
  route: {
    dashboard: '首页',
    login: '登录',
    notFound: '404',
    admin: '后台',
    adminBehaviors: '行为监控',
    adminErrors: '错误监控',
  },
  menu: {
    dashboard: '首页',
    admin: '管理后台',
    adminBehaviors: '行为监控',
    adminErrors: '错误监控',
  },
  login: {
    title: 'Monitor System',
    subtitle: '前端监控系统 · 登录',
    username: '用户名',
    password: '密码',
    loginBtn: '登 录',
    success: '登录成功',
    tip: '测试阶段：任意输入均可登录',
  },
  dashboard: {
    welcome: '欢迎回来，{name}',
    defaultUser: '用户',
    desc: 'Monitor System 前端监控系统',
  },
  error404: {
    title: '页面不存在',
    desc: '抱歉，您访问的页面不存在或已被移除',
  },
  admin: {
    headerTitle: '前端监控 · 管理后台',
    backHome: '返回首页',
    breadcrumbAdmin: '后台',
    // 行为监控
    behaviors: {
      timeRange: '时间范围',
      pageUrl: '页面 URL',
      userId: '用户 ID',
      time: '时间',
      actionType: '行为类型',
      targetElement: '目标元素',
    },
    // 错误监控
    errors: {
      timeRange: '时间范围',
      level: '级别',
      pageUrl: '页面 URL',
      time: '时间',
      message: '错误信息',
      count: '次数',
      levelError: 'Error',
      levelWarning: 'Warning',
    },
  },
  permission: {
    noPermission: '无权限访问',
    noRole: '无角色权限',
  },
} as const
