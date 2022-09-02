import { toLine } from "@/utils";
import { defineComponent, PropType, useAttrs } from "vue";
import { MenuItem } from "./types";
import * as Icons from '@element-plus/icons-vue'
export default defineComponent({
    props: {
        //
        data: {
            type: Array as PropType<MenuItem[]>,
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
        }
    },
    
    setup(props, ctx) {
        //封装一个无限极的菜单
        //函数返回一段jsx代码
        let renderMenu = (data: MenuItem[]) => {
            return data.map((item: MenuItem) => {
                //每个菜单的一个图标

                item.i = (Icons as any)[item.icon!]
                //处理插槽
                let slots = {
                    title: () => {
                        return (
                            <>
                                <> {item.i ? <item.i /> : ''}</>
                                <span>{item.name}</span>
                            </>)
                    }
                }
                //递归渲染子菜单
                if (item.children && item.children.length > 0) {
                    return (
                        <el-sub-menu index={item.index} v-slots={slots}>
                            {renderMenu(item.children)}
                        </el-sub-menu>
                    )
                }
                //没有子菜单显示状态
                return (<el-menu-item index={item.index}>
                    <> {item.i ? <item.i /> : ''}</>
                    <span>{item.name}</span>
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