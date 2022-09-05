<script lang="ts" setup>
import { PropType, ref, onMounted, watch } from 'vue'
import { FormOptions, FormInstance } from './types/type'
//用里面的一个模块，打包的时候只打包一个模块不会把整个lodash打不进去
import cloneDeep from 'lodash/cloneDeep'
let props = defineProps({
    // 表单的配置项
    options: {
        type: Array as PropType<FormOptions[]>,
        required: true
    },
    // 用户自定义上传方法 ,覆盖默认的上传行为
    httpRequest: {
        type: Function
    }
})


let emits = defineEmits([
    'on-preview', 'on-remove', 'on-success', 'on-error',
    'on-progress', 'on_change', 'before-upload', 'before-remove', 'on-exceed', 'on-change'
])


let model = ref<any>(null)
let rules = ref<any>(null)

//初始化设置 
const initForm = () => {
    if (props.options && props.options.length) {
        let m: any = {}
        let r: any = {}
        props.options.map((item: FormOptions) => {
            m[item.prop!] = item.value
            r[item.prop!] = item.rules
        })
        model.value = cloneDeep(m)
        rules.value = cloneDeep(r)
        console.log(model.value);

    }
}


onMounted(() => {
    initForm()
})

//监听父组件的编辑，有可能中途改变
watch(() => props.options, () => {
    initForm()
}, { deep: true })


// -----------处理上传---------------
// 点击文件列表中已上传的文件时的钩子
let onPreview = (file: File) => {
    emits('on-preview', file)
}
// 文件被移入的钩子
let onRemove = (file: File, fileList: FileList) => {
    emits('on-remove', { file, fileList })
}

// 上传成功的钩子
let onSuccess = (response: any, file: File, fileList: FileList) => {
    // 上传图片成功， 给表单上传项赋值
    let uploadItem = props.options.find(item => item.type === 'upload')!
    model.value[uploadItem.prop!] = { response, file, fileList }

    emits('on-success', { response, file, fileList })
}
//上传失败
let onError = (err: any, file: File, fileList: FileList) => {
    emits('on-error', { err, file, fileList })
}
//上传时的钩子
let onProgress = (event: any, file: File, fileList: FileList) => {
    emits('on-progress', { event, file, fileList })
}
// 文件状态发生改变的钩子，添加文件 上传成功  上传失败都会被调用
let onChange = (file: File, fileList: FileList) => {
    emits('on-change', { file, fileList })
}

// 上传之前调用的钩子，参数为上传的文件，若返回false 或者返回 Promise且被reject，则会终止上传
// 一般我们会在这里利用promise 去服务器给，要上传的内容开辟一个文件夹空间，返回值是要上传的路径信息，
let beforeUpload = (file: File) => {
    emits('before-upload', file)
}
//删除文件之前的钩子，参数是上传的文件和文件列表，若返回false或者Promise且被reject，则会终止上传
let beforeRemove = (file: File, fileList: FileList) => {
    emits('before-remove', { file, fileList })
}
//当超出限制时，执行的钩子函数
let onExceed = (files: File, fileList: FileList) => {
    emits('on-exceed', { files, fileList })
}



let form = ref<FormInstance | null>()
</script>
<template>
    <!-- 
    ref="form" 获取表单上的所有信息
  :validate-on-rule-change='false' 页面加载不去触发
v-bind="$attrs" 继承input自带的属性
:rules="rules" 验证数据
:model="model" 存的是子菜单，所有属性名
 v-if="item.type !== 'upload'" 增加上传组件，上传组件没有children，还有就是不等于upload，
     -->
    <el-form ref="form" v-if="model" :model="model" :rules="rules" :validate-on-rule-change='false' v-bind="$attrs">
        <!-- 动态创建组件 -->
        <template v-for="(item, index) in options" :key="index">
            <el-form-item v-if="!item.children || !item.children!.length" :label="item.label" :prop="item.prop">
                <!-- 没有子菜单的普通组件 -->
                <component v-if="item.type !== 'upload'" v-bind="item.attrs" :is="`el-${item.type}`"
                    v-model="model[item.prop!]" :placeholder="item.placeholder"></component>


                <!-- ---------------------上传开始-------------------------- -->
                <!-- 上传没value所以把类型改成可选属性， 上传的结果是在方法里面 -->
                <el-upload v-if="item.type === 'upload'" v-bind="item.uploadAttrs" :on-preview="onPreview"
                    :on-remove="onRemove" :on-success="onSuccess" :on-error="onError" :on-progress="onProgress"
                    :on-change="onChange" :before-upload="beforeUpload" :before-remove="beforeRemove"
                    :http-request="httpRequest" :on-exceed="onExceed">
                    <!-- 上传组件的载体 点击哪一个引发上传操作 -->
                    <slot name="uploadArea"></slot>
                    <!-- 上传组件提示 -->

                </el-upload>
            </el-form-item>
            <!-- 有子元素的菜单 -->
            <el-form-item v-if="item.children && item.children!.length" :label="item.label" :prop="item.prop">
                <component v-bind="item.attrs" :is="`el-${item.type}`" v-model="model[item.prop!]"
                    :placeholder="item.placeholder">
                    <component v-for="(child, i) in item.children" :key="i" :label="child.label" :value="child.value"
                        :is="`el-${child.type}`">
                    </component>
                </component>
            </el-form-item>
        </template>
        <!-- 按钮操作 -->
        <el-form-item>
            <!-- 通过作用域插槽分发出去 :form='form'  父页面的 #action="scope"就可以获取到值了 -->
            <!--通过作用域将 :form='form' :model='model' 两个分给了父页面的#action="scope" -->
            <slot name="action" :form='form' :model='model'></slot>
        </el-form-item>
    </el-form>
</template>
<style lang="scss" scoped>
</style>