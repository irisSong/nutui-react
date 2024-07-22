const docs = {
	name: "指南",
	packages: [
		{
			name: "intro-react",
			cName: "介绍",
			eName: "Introduction",
			show: true
		},
		{
			name: "start-react",
			cName: "快速上手",
			eName: "Quickstart",
			show: true
		},
		{
			name: "theme-react",
			cName: "主题定制",
			eName: "Customize Theme",
			show: true
		},
		{
			name: "migrate-from-v1",
			cName: "从 v1 升级到 v2",
			eName: "Migrate-from-v1",
			show: true
		},
		{
			name: "international-react",
			cName: "国际化",
			eName: "Internationalization",
			show: true
		},
		{
			name: "contributing-react",
			cName: "贡献指南",
			eName: "Contributing",
			show: true
		},
		{
			name: "resource",
			cName: "资源",
			eName: "Resources",
			show: false
		},
		{
			name: "https://github.com/jdf2e/nutui-react/releases",
			cName: "更新日志",
			eName: "Changelog",
			show: true,
			isLink: true
		}
	]
};
const nav = [
	{
		name: "基础组件",
		enName: "base",
		packages: [
			{
				version: "3.0.0",
				name: "Button",
				type: "component",
				cName: "按钮",
				desc: "按钮",
				sort: 1,
				show: true,
				taro: true,
				author: ""
			},
			{
				version: "3.0.0",
				name: "Cell",
				type: "component",
				cName: "单元格",
				desc: "列表项，可组成列表",
				sort: 2,
				show: true,
				taro: true,
				author: "songsong"
			},
			{
				version: "3.0.0",
				name: "CellGroup",
				type: "component",
				cName: "单元格",
				desc: "列表项，可组成列表",
				sort: 2,
				show: false,
				taro: true,
				exportEmpty: true,
				author: "songsong"
			},
			{
				version: "3.0.0",
				name: "ConfigProvider",
				type: "component",
				cName: "全局配置",
				desc: "可以配置多语言等全局属性",
				sort: 16,
				show: true,
				exportEmpty: true,
				taro: true,
				author: "hanyuxinting"
			},
			{
				version: "2.0.0",
				name: "Icon",
				type: "component",
				cName: "图标",
				desc: "基于 IconFont 字体的图标集",
				sort: 1,
				show: true,
				taro: true,
				exclude: true,
				author: "oasis-cloud"
			},
			{
				version: "3.0.0",
				name: "Image",
				type: "component",
				tarodoc: true,
				cName: "图片",
				desc: "增强版的 img 标签，提供多种图片填充模式，支持图片加载中提示、加载失败提示。",
				sort: 8,
				show: true,
				taro: true,
				author: "vickyYE"
			},
			{
				version: "3.0.0",
				name: "Overlay",
				type: "component",
				cName: "遮罩层",
				desc: "创建一个遮罩层，通常用于阻止用户进行其他操作",
				sort: 5,
				show: true,
				taro: true,
				author: "junjun"
			}
		]
	},
	{
		name: "布局组件",
		enName: "layout",
		packages: [
			{
				version: "3.0.0",
				name: "Col",
				type: "component",
				cName: "列",
				desc: "布局组件中的列",
				sort: 3,
				show: false,
				exportEmpty: true,
				author: "yushuang24"
			},
			{
				version: "3.0.0",
				name: "Divider",
				type: "component",
				cName: "分割线",
				desc: "用于将内容分隔为多个区域",
				sort: 7,
				show: true,
				taro: true,
				author: "vickyYE"
			},
			{
				version: "3.0.0",
				name: "Grid",
				type: "component",
				cName: "宫格",
				desc: "宫格",
				sort: 5,
				show: true,
				taro: true,
				author: "yangxiaolu"
			},
			{
				version: "3.0.0",
				name: "GridItem",
				type: "component",
				cName: "宫格子组件",
				desc: "宫格子组件",
				sort: 6,
				show: false,
				taro: true,
				exportEmpty: true,
				author: "yangxiaolu"
			},
			{
				version: "3.0.0",
				name: "Layout",
				type: "component",
				cName: "布局",
				desc: "协助进行页面级整体布局。",
				sort: 1,
				show: true,
				taro: true,
				author: "yushuang24"
			},
			{
				version: "3.0.0",
				name: "Row",
				type: "component",
				cName: "行",
				desc: "布局组件中的行",
				sort: 2,
				show: false,
				exportEmpty: true,
				author: "yushuang24"
			},
			{
				version: "3.0.0",
				name: "Space",
				type: "component",
				cName: "间距",
				desc: "元素之间的间距，保持相同的宽度",
				sort: 8,
				show: true,
				taro: true,
				author: "ivan"
			},
			{
				version: "2.0.0",
				name: "Sticky",
				type: "component",
				cName: "粘性布局",
				desc: "效果同 css 中的 position: sticky",
				sort: 7,
				show: true,
				taro: true,
				author: "hx"
			},
			{
				version: "2.0.0",
				name: "SafeArea",
				type: "component",
				cName: "安全区",
				desc: "在全面屏下提供自适应的边距调整。",
				sort: 9,
				show: true,
				taro: true,
				author: "oasis"
			}
		]
	},
	{
		name: "导航组件",
		enName: "nav",
		packages: [
			{
				version: "2.0.0",
				name: "BackTop",
				type: "component",
				cName: "返回顶部",
				desc: "提供较长的页面快捷返回顶部功能。",
				sort: 2,
				tarodoc: true,
				show: true,
				taro: true,
				author: "vickyYe"
			},
			{
				version: "2.0.0",
				name: "Elevator",
				type: "component",
				cName: "电梯楼层",
				desc: "用于列表快速定位以及索引的显示",
				sort: 4,
				show: true,
				taro: true,
				author: "songsong"
			},
			{
				version: "2.0.0",
				name: "FixedNav",
				type: "component",
				cName: "悬浮导航",
				desc: "悬浮收齐体验交互，用于快捷导航",
				sort: 5,
				show: true,
				taro: true,
				author: "Ymm0008"
			},
			{
				version: "3.0.0",
				name: "HoverButton",
				type: "component",
				cName: "悬浮按钮",
				desc: "悬浮多按钮，用于快捷功能",
				sort: 5,
				show: true,
				taro: true,
				author: "Ymm0008"
			},
			{
				version: "3.0.0",
				name: "HoverButtonItem",
				type: "component",
				cName: "悬浮按钮子组件",
				exportEmpty: true,
				desc: "悬浮按钮",
				sort: 5,
				show: false,
				taro: true,
				author: "Ymm0008"
			},
			{
				version: "2.0.0",
				name: "NavBar",
				type: "component",
				cName: "头部导航",
				desc: "提供导航功能。",
				sort: 1,
				show: true,
				taro: true,
				author: "dsj"
			},
			{
				version: "2.0.0",
				name: "SideNavBar",
				type: "component",
				cName: "侧边栏导航",
				desc: "用于内容选择和切换",
				sort: 9,
				show: true,
				taro: true,
				author: "hx"
			},
			{
				version: "2.0.0",
				name: "SideNavBarItem",
				type: "component",
				cName: "侧边栏导航子组件",
				exportEmpty: true,
				desc: "用于侧边栏导航子组件",
				sort: 11,
				show: false,
				author: "hx"
			},
			{
				version: "2.0.0",
				name: "SubSideNavBar",
				type: "component",
				cName: "侧边栏导航子组件",
				desc: "用于侧边栏导航的子组件",
				exportEmpty: true,
				sort: 10,
				show: false,
				author: "hx"
			},
			{
				version: "2.0.0",
				name: "Tabbar",
				type: "component",
				cName: "标签栏",
				desc: "底部导航常用场景",
				sort: 2,
				show: true,
				taro: true,
				author: "dsj"
			},
			{
				version: "2.0.0",
				name: "TabbarItem",
				sort: 2,
				cName: "标签栏子组件",
				type: "component",
				show: false,
				taro: true,
				exportEmpty: true,
				desc: "标签栏子组件",
				author: "dsj"
			},
			{
				version: "2.0.0",
				name: "TabPane",
				sort: 2,
				cName: "选项卡切换子组件",
				type: "component",
				show: false,
				exportEmpty: true,
				desc: "选项卡切换子组件",
				author: "张晶发"
			},
			{
				version: "2.0.0",
				name: "Tabs",
				type: "component",
				cName: "选项卡切换",
				desc: "常用于平级区域大块内容的的收纳和展现，支持内嵌标签形式和渲染循环数据形式",
				sort: 12,
				show: true,
				taro: true,
				author: "oasis"
			}
		]
	},
	{
		name: "数据录入",
		enName: "dentry",
		packages: [
			{
				version: "2.0.0",
				name: "Address",
				type: "component",
				cName: "地址",
				desc: "地址组件",
				sort: 3,
				show: true,
				taro: true,
				author: "yangxiaolu"
			},
			{
				version: "2.0.0",
				name: "Calendar",
				type: "component",
				cName: "日历",
				desc: "日历，可平铺/弹窗展示",
				sort: 10,
				show: true,
				taro: true,
				author: "szg2008"
			},
			{
				version: "2.0.0",
				name: "CalendarItem",
				type: "component",
				cName: "日历",
				desc: "日历，可平铺/弹窗展示",
				sort: 10,
				show: false,
				exportEmpty: true,
				author: "szg2008"
			},
			{
				version: "2.0.0",
				name: "CalendarCard",
				type: "component",
				cName: "日历卡片",
				desc: "日历卡片，支持多种选择类型",
				sort: 10,
				show: true,
				taro: true,
				author: "eiinu"
			},
			{
				version: "2.0.0",
				name: "Cascader",
				type: "component",
				cName: "级联选择器",
				desc: "级联选择，用于多层级数据的选择，典型场景为省市区选择。",
				sort: 1,
				show: true,
				taro: true,
				author: "ailululu"
			},
			{
				version: "2.0.0",
				name: "Checkbox",
				type: "component",
				cName: "复选按钮",
				desc: "多选按钮用于选择。",
				sort: 4,
				show: true,
				taro: true,
				author: "oasis"
			},
			{
				version: "2.0.0",
				name: "CheckboxGroup",
				type: "component",
				cName: "多选按钮组",
				desc: "多选按钮组",
				sort: 11,
				show: false,
				exportEmpty: true,
				author: "oasis"
			},
			{
				version: "2.0.0",
				name: "DatePicker",
				type: "component",
				cName: "日期选择器",
				desc: "时间选择器，支持日期、年月、时分等维度，通常与弹出层组件配合使用。",
				sort: 15,
				show: true,
				taro: true,
				author: "dsj"
			},
			{
				version: "2.0.0",
				name: "Form",
				type: "component",
				cName: "表单",
				desc: "用于数据录入、校验，支持输入框、单选框、复选框等类型。",
				sort: 19,
				show: true,
				taro: true,
				author: "hanyuxinting"
			},
			{
				version: "2.0.0",
				name: "FormItem",
				type: "component",
				cName: "表单项",
				desc: "用于数据录入、校验，支持输入框、单选框、复选框等类型。",
				sort: 19,
				show: false,
				taro: true,
				exportEmpty: true,
				author: "hanyuxinting"
			},
			{
				version: "3.0.0",
				name: "Input",
				type: "component",
				cName: "输入框",
				desc: "单行输入框",
				sort: 1,
				show: true,
				taro: true,
				author: "VickyYe"
			},
			{
				version: "3.0.0",
				name: "InputNumber",
				type: "component",
				cName: "数字输入框",
				desc: "通过点击按钮控制数字增减。",
				sort: 3,
				show: true,
				taro: true,
				author: "swag~jun"
			}
		]
	},
	{
		name: "数据录入",
		enName: "dataentry",
		packages: [
			{
				version: "2.0.0",
				name: "Menu",
				type: "component",
				cName: "菜单",
				desc: "向下弹出的菜单列表",
				sort: 13,
				show: true,
				taro: true,
				author: "oasis-cloud"
			},
			{
				version: "2.0.0",
				name: "MenuItem",
				type: "component",
				cName: "菜单子项",
				desc: "菜单子项",
				sort: 14,
				exportEmpty: true,
				show: false,
				taro: true,
				author: "oasis-cloud"
			},
			{
				version: "2.0.0",
				name: "NumberKeyboard",
				type: "component",
				cName: "数字键盘",
				desc: "",
				sort: 16,
				show: true,
				taro: true,
				author: "Drjingfubo"
			},
			{
				version: "2.0.0",
				name: "Picker",
				type: "component",
				cName: "选择器",
				desc: "提供多个选项集合供用户选择其中一项。",
				sort: 10,
				show: true,
				taro: true,
				author: "dsj"
			},
			{
				version: "2.0.0",
				name: "Radio",
				type: "component",
				cName: "单选按钮",
				desc: "用于在一组备选项中进行单选",
				sort: 6,
				show: true,
				taro: true,
				author: "oasis"
			},
			{
				version: "2.0.0",
				name: "RadioGroup",
				type: "component",
				cName: "单选按钮组",
				desc: "单选按钮组",
				sort: 10,
				exportEmpty: true,
				show: false,
				author: "oasis"
			},
			{
				version: "3.0.0",
				name: "Range",
				type: "component",
				cName: "区间选择器",
				desc: "滑动输入条，用于在给定的范围内选择一个值。",
				sort: 3,
				show: true,
				taro: true,
				author: "vickyYe"
			},
			{
				version: "2.0.0",
				name: "Rate",
				type: "component",
				cName: "评分",
				desc: "用于快速的评级操作，或对评价进行展示。",
				sort: 1,
				show: true,
				taro: true,
				author: "dsj"
			},
			{
				version: "2.0.0",
				name: "SearchBar",
				type: "component",
				cName: "搜索栏",
				desc: "用于搜索场景的输入框组件",
				sort: 16,
				show: true,
				taro: true,
				author: "Ymm0008"
			},
			{
				version: "2.0.0",
				name: "ShortPassword",
				type: "component",
				cName: "短密码",
				desc: "短密码输入框",
				sort: 10,
				show: true,
				taro: true,
				author: "Drjingfubo"
			},
			{
				version: "2.0.0",
				name: "Signature",
				type: "component",
				cName: "签名",
				desc: "基于Canvas的签名组件",
				sort: 1,
				show: true,
				taro: true,
				author: "songsong"
			},
			{
				version: "3.0.0",
				name: "Switch",
				type: "component",
				cName: "开关",
				desc: "用来打开或关闭选项。",
				sort: 11,
				show: true,
				taro: true,
				author: "dsj"
			},
			{
				version: "3.0.0",
				name: "TextArea",
				type: "component",
				cName: "文本域",
				desc: "文本框内输入或编辑文字，支持限制输入数量。",
				sort: 2,
				show: true,
				taro: true,
				author: "VickyYe"
			},
			{
				version: "2.0.0",
				name: "Uploader",
				type: "component",
				tarodoc: true,
				cName: "上传",
				desc: "用于将本地的图片或文件上传至服务器。",
				sort: 1,
				show: true,
				taro: true,
				author: "swag~jun"
			}
		]
	},
	{
		name: "操作反馈",
		enName: "feedback",
		packages: [
			{
				version: "2.0.0",
				name: "ActionSheet",
				type: "component",
				cName: "动作面板",
				desc: "从底部弹出的动作菜单面板。",
				sort: 11,
				show: true,
				taro: true,
				author: "dsj"
			},
			{
				version: "2.0.0",
				name: "Badge",
				type: "component",
				cName: "徽标",
				desc: "在图标或文字右上角的红色圆点、数字或者文字，表示有新内容或者待处理的信息。",
				sort: 4,
				show: true,
				taro: true,
				author: "lzz"
			},
			{
				version: "2.0.0",
				name: "Dialog",
				type: "component",
				cName: "对话框",
				desc: "模态对话框",
				sort: 12,
				show: true,
				taro: true,
				author: "yangjinjun3"
			},
			{
				version: "2.0.0",
				name: "Drag",
				type: "component",
				cName: "拖拽",
				desc: "实现可拖拽的任意元素",
				sort: 1,
				show: true,
				taro: true,
				author: "songsong"
			},
			{
				version: "3.0.0",
				name: "Empty",
				type: "component",
				cName: "空状态",
				desc: "空状态时的占位提示",
				sort: 16,
				show: true,
				taro: true,
				author: "liukun"
			},
			{
				version: "3.0.0",
				name: "ResultPage",
				type: "component",
				cName: "结果反馈",
				desc: "以页面的形式向用户反馈操作结果",
				sort: 15,
				show: true,
				taro: true,
				author: "songsong"
			},
			{
				version: "2.0.0",
				name: "InfiniteLoading",
				type: "component",
				tarodoc: true,
				cName: "滚动加载",
				desc: "列表滚动到底部自动加载更多数据。",
				sort: 5,
				show: true,
				taro: true,
				author: "swag~jun"
			},
			{
				version: "2.0.0",
				name: "Loading",
				type: "component",
				cName: "加载中",
				desc: "加载图标，用于显示正在加载中的状态",
				sort: 15,
				show: true,
				taro: true,
				author: "mike8625"
			},
			{
				version: "2.0.0",
				name: "NoticeBar",
				type: "component",
				cName: "公告栏",
				desc: "用于循环播放展示一组消息通知。",
				sort: 11,
				show: true,
				taro: true,
				author: "vickyYe"
			},
			{
				version: "3.0.0",
				name: "Notify",
				type: "component",
				tarodoc: true,
				cName: "消息通知",
				desc: "在页面顶部展示消息提示",
				sort: 11,
				show: true,
				taro: true,
				author: "vickyYE"
			},
			{
				version: "2.0.0",
				name: "Popover",
				type: "component",
				cName: "气泡弹出框",
				desc: "气泡弹出框",
				sort: 19,
				show: true,
				taro: true,
				author: "lzz"
			},
			{
				version: "2.0.0",
				name: "Popup",
				sort: 9,
				cName: "弹出层",
				type: "component",
				show: true,
				taro: true,
				desc: "弹出层容器，用于展示弹窗、信息提示等内容，支持多个弹出层叠加展示",
				author: "szg2008"
			},
			{
				version: "2.0.0",
				name: "PullToRefresh",
				type: "component",
				cName: "下拉刷新",
				desc: "",
				sort: 10,
				show: true,
				taro: true,
				author: "oasis"
			},
			{
				version: "3.0.0",
				name: "Skeleton",
				type: "component",
				cName: "骨架屏",
				desc: "在页面上待加载区域填充灰色的占位图，本质上是界面加载过程中的过渡效果。",
				sort: 15,
				show: true,
				taro: true,
				author: "swag~jun"
			},
			{
				version: "3.0.0",
				name: "Swipe",
				type: "component",
				cName: "滑动手势",
				desc: "可以左右滑动来展示操作按钮的组件",
				sort: 9,
				show: true,
				taro: true,
				author: "Ymm0008"
			},
			{
				version: "2.0.0",
				name: "Toast",
				type: "component",
				tarodoc: true,
				cName: "吐司",
				desc: "轻提示",
				sort: 1,
				show: true,
				taro: true,
				author: "VickyYe"
			}
		]
	},
	{
		name: "展示组件",
		enName: "exhibition",
		packages: [
			{
				version: "2.0.0",
				name: "Animate",
				type: "component",
				cName: "动画/动效",
				desc: "给子元素添加动画效果",
				sort: 27,
				show: true,
				taro: true,
				author: "swag~jun"
			},
			{
				version: "2.0.0",
				name: "AnimatingNumbers",
				type: "component",
				cName: "数字动画",
				desc: "带特效的数字",
				sort: 7,
				show: true,
				taro: true,
				author: "songsong"
			},
			{
				version: "2.0.0",
				name: "Audio",
				type: "component",
				cName: "音频播放器",
				desc: "原生audio实现的音频播放器",
				sort: 21,
				show: true,
				taro: false,
				author: "libin"
			},
			{
				version: "3.0.0",
				name: "Avatar",
				type: "component",
				cName: "头像",
				desc: "用来代表用户或事物，支持图片、图标或字符展示。",
				sort: 2,
				show: true,
				taro: true,
				author: "junjun"
			},
			{
				version: "3.0.0",
				name: "AvatarGroup",
				type: "component",
				cName: "头像组合子组件",
				desc: "头像组合子组件",
				sort: 18,
				show: false,
				exportEmpty: true,
				author: "swag~jun"
			},
			{
				version: "2.0.0",
				name: "CircleProgress",
				type: "component",
				cName: "环形进度条",
				desc: "展示操作或任务的当前进度。",
				sort: 7,
				show: true,
				taro: true,
				author: "swag~jun"
			},
			{
				version: "2.0.0",
				name: "Collapse",
				type: "component",
				cName: "折叠面板",
				desc: "折叠面板，可进行内容折叠展开操作，可以多面板配合使用。",
				sort: 2,
				show: true,
				taro: true,
				author: "zhenyulei"
			},
			{
				version: "2.0.0",
				name: "CollapseItem",
				type: "component",
				cName: "折叠面板子组件",
				desc: "折叠面板的子组件",
				sort: 13,
				show: false,
				exportEmpty: true,
				author: "zhenyulei"
			},
			{
				version: "3.0.0",
				name: "CountDown",
				type: "component",
				cName: "倒计时",
				desc: "用于实时展示倒计时数值，支持毫秒精度。",
				sort: 17,
				show: true,
				taro: true,
				author: "songsong"
			},
			{
				version: "2.0.0",
				name: "Ellipsis",
				type: "component",
				cName: "文本省略",
				desc: "展示空间不足时，隐去部分内容并用“…”替代。",
				sort: 27,
				show: true,
				taro: true,
				author: "vickyYE"
			},
			{
				version: "2.0.0",
				name: "ImagePreview",
				type: "component",
				cName: "图片预览",
				desc: "图片预览",
				sort: 23,
				show: true,
				taro: true,
				author: "yangjinjun3"
			},
			{
				version: "3.0.0",
				name: "Indicator",
				type: "component",
				cName: "指示器",
				desc: "显示一个任务或流程的进度，常用于开通流程。",
				sort: 16,
				show: true,
				taro: true,
				author: "liukun"
			},
			{
				version: "3.0.0",
				name: "Pagination",
				type: "component",
				cName: "分页",
				desc: "当数据量较多时，采用分页的形式分隔长列表。",
				sort: 6,
				show: true,
				taro: true,
				author: "lkjh3214"
			},
			{
				version: "3.0.0",
				name: "Price",
				type: "component",
				cName: "价格",
				desc: "用来对商品价格数值的小数点前后部分应用不同样式，还支持人民币符号、千位分隔符、设置小数点位数等功能。",
				sort: 4,
				show: true,
				taro: true,
				author: "songsong"
			},
			{
				version: "2.0.0",
				name: "Progress",
				type: "component",
				cName: "进度条",
				desc: "用来展示进度",
				sort: 20,
				show: true,
				taro: true,
				author: "ailululu"
			},
			{
				version: "2.0.0",
				name: "Step",
				sort: 17,
				cName: "步骤条子组件",
				type: "component",
				show: false,
				exportEmpty: true,
				desc: "步骤条子组件",
				author: "swag~jun"
			},
			{
				version: "2.0.0",
				name: "Steps",
				type: "component",
				cName: "步骤条",
				desc: "拆分展示某项流程的步骤，引导用户按流程完成任务或向用户展示当前状态。",
				sort: 7,
				show: true,
				taro: true,
				author: "swag~jun"
			},
			{
				version: "3.0.0",
				name: "Swiper",
				type: "component",
				cName: "轮播",
				desc: "轮播组件",
				sort: 14,
				show: true,
				taro: true,
				author: "liukun"
			},
			{
				version: "3.0.0",
				name: "SwiperItem",
				type: "component",
				cName: "轮播子组件",
				desc: "轮播子组件",
				sort: 14,
				show: false,
				exportEmpty: true,
				author: "liukun"
			},
			{
				version: "2.0.0",
				name: "Table",
				type: "component",
				cName: "表格",
				desc: "表格",
				sort: 21,
				show: true,
				taro: true,
				author: "yangjinjun3"
			},
			{
				version: "3.0.0",
				name: "Tag",
				type: "component",
				cName: "标签",
				desc: "用于标记和分类。",
				sort: 4,
				show: true,
				taro: true,
				author: "lzz"
			},
			{
				version: "2.0.0",
				name: "Tour",
				type: "component",
				cName: "引导",
				desc: "用于引导用户了解产品功能的气泡组件。自 4.0 版本开始提供该组件。",
				sort: 24,
				show: true,
				taro: true,
				author: "swag~jun"
			},
			{
				version: "2.0.0",
				name: "Video",
				type: "component",
				cName: "视频播放器",
				tarodoc: true,
				desc: "原生video实现的视频播放器",
				sort: 20,
				show: true,
				taro: true,
				author: "swag~jun"
			},
			{
				version: "2.0.0",
				name: "VirtualList",
				type: "component",
				cName: "虚拟列表",
				desc: "长列表渲染",
				sort: 20,
				tarodoc: true,
				show: true,
				taro: true,
				author: "hx"
			}
		]
	},
	{
		name: "特色组件",
		enName: "business",
		packages: [
			{
				version: "2.0.0",
				name: "Barrage",
				type: "component",
				cName: "弹幕",
				desc: "用于话语和词组的轮播展示，适用于视频中或其他类似需求中。",
				sort: 2,
				show: true,
				taro: true,
				author: "swag~jun"
			},
			{
				version: "2.0.0",
				name: "Card",
				type: "component",
				cName: "商品卡片",
				desc: "商品卡片，用于展示商品的图片、价格等信息",
				sort: 6,
				show: true,
				taro: true,
				author: "songsong"
			},
			{
				version: "2.0.0",
				name: "TimeDetail",
				type: "component",
				cName: "配送时间",
				desc: "配送时间上门时间选择",
				sort: 8,
				show: false,
				exportEmpty: true,
				author: "zhaoqian16"
			},
			{
				version: "2.0.0",
				name: "TimeSelect",
				type: "component",
				cName: "配送时间",
				desc: "用于配送时间选择",
				sort: 20,
				show: true,
				taro: true,
				author: "zhaoqian16"
			},
			{
				version: "2.0.0",
				name: "TrendArrow",
				type: "component",
				cName: "趋势箭头",
				desc: "带有箭头指示的百分比数字,用以展示指标趋势",
				sort: 25,
				show: true,
				taro: true,
				author: "songsong"
			},
			{
				version: "2.0.0",
				name: "WaterMark",
				type: "component",
				cName: "水印",
				desc: "页面上添加特定的文字或图案，可用于防止信息盗用。",
				sort: 25,
				show: true,
				taro: true,
				author: "swag~jun"
			},
			{
				version: "2.0.0",
				name: "AvatarCropper",
				type: "component",
				cName: "头像裁剪",
				desc: "仿微信头像裁剪功能",
				sort: 26,
				show: true,
				taro: true,
				author: "Marvin"
			}
		]
	}
];
const config = {
	docs: docs,
	nav: nav
};

export { config as c };
