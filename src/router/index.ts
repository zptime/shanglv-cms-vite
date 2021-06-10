import { createRouter, createWebHistory } from "vue-router";
import type { App } from "vue";

const routerHistory = createWebHistory();
// createWebHashHistory (hash路由 Hash模式 #)
// createWebHistory (history路由 HTML5 模式 推荐，需要服务器配置支持)
// createMemoryHistory 带缓存 history 路由

// 路由懒加载
const Layout = () => import("@/layout/index.vue");

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: "/",
      component: Layout,
      children: [
        {
          path: "/home",
          name: "home",
          component: ()=>import('views/home/index.vue'),
        },
				{
          path: '/demo',
          name:'demo',
          component: ()=>import('views/demo/index.vue'),
        },
        {
          path: '/icon',
          name:'icon',
          component: ()=>import('views/icon/index.vue'),
        }
      ],
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { top: 0 };
  },
});

// 删除/重置路由
export function resetRoute(): void {
  // getRoutes()：获取一个包含所有路由记录的数组
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name) {
      // hasRoute()：检查路由是否存在
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}

export function setupRouter(app: App<Element>) {
  app.use(router);
}

export default router;
