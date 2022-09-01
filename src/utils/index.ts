import { ElMessage } from "element-plus"

export const toLine = (value: string) => {
    //驼峰转横杠  改成小写
    return value.replace(/(A-Z)g/, '-$1').toLocaleLowerCase()
}

export const useCopy = (text: string) => {
    //创建input
    let input = document.createElement('input')
    //给value赋值
    input.value = text
    //追加到body
    document.body.appendChild(input)
    //选择输入框操作
    input.select()
    //执行赋值操作
    document.execCommand('Copy')
    //删除input
    document.body.removeChild(input)
    //提示用户
    ElMessage.success("赋值成功")
}