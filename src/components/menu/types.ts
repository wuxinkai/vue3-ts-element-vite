export interface MenuItem {
    //导航图标
    icon?: string
    //处理之后的图标
    i?: string
    //导航名称
    name: string
    //导航标识
    index: string
    //导航子菜单
    children?: MenuItem[]
}