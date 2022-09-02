import { defineComponent, PropType, useAttrs } from "vue";
import * as Icons from '@element-plus/icons-vue'
export default defineComponent({
    props: {
        //
        data: {
            type: Array as PropType<any[]>,
            require: true
        },
        // 默认选中菜单
        defaultActive: {
            type: String,
            default: "",
        },
        // 是否是路由模式
        router: {
            type: Boolean,
            default: false,
        },
        //设置键名  菜单表头签名
        name: {
            type: String,
            default: 'name',
        },
        //设置键名  路由签名
        index: {
            type: String,
            default: 'index',
        },
        //设置键名  图标签名
        icon: {
            type: String,
            default: 'icon',
        },
        //设置键名 子数组的签名
        children: {
            type: String,
            default: 'children',
        },
    },

    setup(props, ctx) {
        //封装一个无限极的菜单
        //函数返回一段jsx代码
        let renderMenu = (data: any[]) => {
            return data.map((item: any) => {
                //每个菜单的一个图标

                item.i = (Icons as any)[item[props.icon!]]
                //处理插槽
                let slots = {
                    title: () => {
                        return (
                            <>
                                <> {item.i ? <item.i /> : ''}</>
                                <span>{item[props.name]}</span>
                            </>)
                    }
                }
                //递归渲染子菜单
                if (item[props.children!] && item[props.children!].length > 0) {
                    return (
                        <el-sub-menu index={item[props.index]} v-slots={slots}>
                            {renderMenu(item[props.children!])}
                        </el-sub-menu>
                    )
                }
                //没有子菜单显示状态
                return (<el-menu-item index={item[props.index]}>
                    <> {item.i ? <item.i /> : ''}</>
                    <span>{item[props.name]}</span>
                </el-menu-item>)
            })
        }


        //在组件上注入其他属性
        let attrs = useAttrs()
        return () => {
            return (<el-menu class="menu-icon-svg" default-active={props.defaultActive} router={props.router} {...attrs} >
                {renderMenu(props.data!)}
            </el-menu>);
        }
    }
})