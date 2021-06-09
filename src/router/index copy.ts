import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import type { App } from "vue";

// 1. 定义路由组件.
// 也可以从其他文件导入
const Home = { template: "<div>Home</div>" };
const About = { template: "<div>About</div>" };
const User = {
  template: `
		<div>
			<h2>User {{ $route.params.id }}</h2>
			<router-view></router-view>
		</div>`,
  // created() {
  //   this.$watch(
  //     () => this.$route.params,
  //     (toParams, previousParams) => {
  //       // 对路由变化做出响应...
  //     }
  //   )
  // },
  // async beforeRouteUpdate(to, from) {
  //   // 对路由变化做出响应...
  //   this.userData = await fetchUser(to.params.id)
  // },
};
const UserProfile = { template: "<div>UserProfile</div>" };
const UserPosts = { template: "<div>UserPosts</div>" };
const Articles = {
  props: ["id"],
  template: "<div>Articles {{ id }}</div>",
};

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
  // (1)带参数的动态路由匹配：相同的组件实例将被重复使用；组件的生命周期钩子不会被调用
  {
    path: "/users/:id",
    component: User,
    // (2)嵌套路由
    children: [
      {
        // 当 /user/:id/profile 匹配成功
        // UserProfile 将被渲染到 User 的 <router-view> 内部
        path: "profile",
        component: UserProfile,
      },
      {
        // 当 /user/:id/posts 匹配成功
        // UserPosts 将被渲染到 User 的 <router-view> 内部
        path: "posts",
        component: UserPosts,
      },
    ],
  },
  // (3)将 props 传递给路由组件
  {
    path: "/articles/:id",
    component: Articles,
    props: true,
		// 只有经过身份验证的用户才能创建帖子
    meta: { requiresAuth: true },
  },
];

// 不同的历史模式
const routerHistory = createWebHistory();
// createWebHashHistory (hash路由 Hash模式 #)
// createWebHistory (history路由 HTML5 模式 推荐，需要服务器配置支持)
// createMemoryHistory 带缓存 history 路由

// 路由懒加载
const Layout = () => import("@/layout/index.vue");

// 3. 创建路由实例并传递 `routes` 配置
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
	// 滚动行为
	scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
		// 始终滚动到顶部
    return { top: 0 }
  }

  // history: routerHistory,

  // routes: [
  // 	{
  // 		path: '/',
  // 		component: Layout,
  // 		children: [
  //       {
  //         path: '/home',
  // 				name:'home',
  //         component: ()=>import('views/home/index.vue'),
  //       }
  //     ]
  // 	}
  // ]
});

// 全局前置守卫
router.beforeEach(async (to, from) => {
  // （1）返回 false 以取消导航
  // return false
  // （2）canUserAccess() 返回 `true` 或 `false`
  // return await canUserAccess(to)
	// （3）路由授权处理
	// 而不是去检查每条路由记录
  // to.matched.some(record => record.meta.requiresAuth)
  // if (to.meta.requiresAuth && !auth.isLoggedIn()) {
  //   // 此路由需要授权，请检查是否已登录
  //   // 如果没有，则重定向到登录页面
  //   return {
  //     path: '/login',
  //     // 保存我们所在的位置，以便以后再来
  //     query: { redirect: to.fullPath },
  //   }
  // }
});

// 动态路由
// // 添加路由
// router.addRoute({ path: '/about', name: 'about', component: About })
// // 删除路由
// router.removeRoute('about')

// 删除/重置路由
export function resetRoute(): void {
	// router.getRoutes()：获取一个包含所有路由记录的数组
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name) {
			// router.hasRoute()：检查路由是否存在
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}

export function setupRouter(app: App<Element>) {
  // 5. 创建并挂载根实例
  // 确保 _use_ 路由实例使 整个应用支持路由。
  app.use(router);
}

export default router;
