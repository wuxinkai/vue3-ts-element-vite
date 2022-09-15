//type 接口的实现
interface IntTodoList{
    id:number,
    title:string,
    type:boolean,
}

interface IntData {
    list: IntTodoList[]
    addList: IntTodoList
} 

//接口导出需要用到type
export type {
    IntData
}