// 接口类型声明

export interface App {
  count: number;
}

// 布局配置
export interface ThemeConfigState {
  globalTitle: string;
  layout:string;
	menuBar:string;
	animation:string;
	isCollapse: boolean;
	isShowLogo: boolean;
  isFixedHeader: boolean;
  isBreadcrumb: boolean;
  isBreadcrumbIcon: boolean;
  tagsViewRoutes: boolean;
}

// 路由配置
export interface RoutesListState {
	routesList: Array<object>;
}

// 导航标签配置
export interface TagsViewRoutesState {
	tagsViewRoutes: Array<object>;
}

// 主接口(顶级类型声明)
export interface RootStateTypes {
  themeConfig: ThemeConfigState;
  app: App;
  routesList:RoutesListState;
  tagsViewRoutes:TagsViewRoutesState;
}
