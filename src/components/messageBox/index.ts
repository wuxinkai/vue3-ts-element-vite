// 全局组件注册
import { h, render } from 'vue'
import messageBox from "./messageBox.vue";
import { ElMessage } from "element-plus"

// 定义类型
interface Props {
    text?: string
    title?: string
}
export  function MessageBox({ text, title }: Props) {
    // 创建页面自动执行
    const div = document.createElement('div')
    //插入class
    div.setAttribute('class', 'pro-message-box-container')
    //差点到页面里面
    document.body.appendChild(div)
    return new Promise((resolve, reject) => {
        //确认按钮
        const confirmCallback = () => {
            document.body.removeChild(div)  
            resolve(undefined)
            ElMessage.success("删除成功！")
       
        }
        //删除按钮
        const cancelCallback = () => {
            document.body.removeChild(div)
            reject(undefined)
            ElMessage.warning("取消成功")
        }
        const vNode = h(messageBox, {
            text,
            title,
            confirmCallback,
            cancelCallback
        })
        render(vNode, div)
    })
}
