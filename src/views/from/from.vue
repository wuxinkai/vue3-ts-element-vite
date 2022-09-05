<script lang="ts" setup>
import { ref } from 'vue'
import { FormOptions, FormInstance } from '../../components/from/types/type'
import { ElMessage, ElMessageBox } from 'element-plus'
let options: FormOptions[] = [
    {
        type: 'input',
        value: '',
        label: '用户名',
        placeholder: '请输入用户名',
        prop: 'username',//做验证的名字， 字段的名字
        attrs: {
            clearable: true, //增加清空数据属性
        },
        rules: [
            {
                required: true,
                message: '用户名不能为空',
                trigger: 'blur'
            },
            {
                min: 2,
                max: 6,
                message: '用户名在2-6位置之间',
                trigger: 'blur'
            }
        ]
    },
    {
        type: 'input',
        value: '',
        label: '密码',
        placeholder: '请输入密码',
        prop: 'password',
        rules: [
            {
                required: true,
                message: '密码不能为空',
                trigger: 'blur'
            },
            {
                min: 6,
                max: 10,
                message: '密码长度6-10位置之间',
                trigger: 'blur'
            }
        ],
        attrs: {
            showPassword: true,
            clearable: true
        }
    },
    {
        type: 'input',
        value: '',
        label: '文本框',
        placeholder: '请输入文本框',
        prop: 'textarea',
        attrs: {
            rows: "4",
            type: "textarea",
            maxlength: 10,
            showWordLimit: true,
            // readonly: true,
            // disabled: true,
            resize: 'none'
        },
        rules: [
            {
                required: true,
                message: '文本框不能为空',
                trigger: 'blur'
            }
        ]
    },
    {//有子元素的菜单
        type: 'select',
        value: '',
        placeholder: '请选择职位',
        prop: 'role',
        label: '职位',
        attrs: {
            style: {
                width: '100%',
            },
        },
        rules: [
            {
                required: true,
                message: '职位不能为空',
                trigger: 'blur'
            }
        ],
        children: [
            {
                type: 'option',
                label: '经理',
                value: '1'
            },
            {
                type: 'option',
                label: '主管',
                value: '2'
            },
            {
                type: 'option',
                label: '销售',
                value: '3'
            }
        ]
    },
    {//多选框组
        type: 'checkbox-group',
        value: [],
        prop: 'like',
        label: '爱好',
        rules: [
            {
                required: true,
                message: '爱好不能为空',
                trigger: 'blur'
            }
        ],
        children: [
            {
                type: 'checkbox',
                label: '足球',
                value: '1'
            },
            {
                type: 'checkbox',
                label: '篮球',
                value: '2'
            },
            {
                type: 'checkbox',
                label: '排球',
                value: '3'
            }
        ]
    },
    { //单选框
        type: 'radio-group',
        value: '',
        prop: 'gender',
        label: '性别',
        rules: [
            {
                required: true,
                message: '性别不能为空',
                trigger: 'blur'
            }
        ],
        children: [
            {
                type: 'radio',
                label: '男',
                value: '1'
            },
            {
                type: 'radio',
                label: '女',
                value: '2'
            },
            {
                type: 'radio',
                label: '保密',
                value: '3'
            }
        ]
    },
    {//上传
        type: 'upload',
        label: '上传',
        prop: 'pic',
        uploadAttrs: {
            action: 'https://jsonplaceholder.typicode.com/posts/',
            multiple: true,
            limit: 3
        },
        // rules: [
        //     {
        //         required: true,
        //         message: '哈哈哈',
        //         trigger: 'blur'
        //     }
        // ]
    },
    { //富文本编辑器
        type: 'editor',
        value: '',
        prop: 'desc',
        placeholder: '请输入内容hh',
        label: '描述',
        rules: [
            {
                required: true,
                message: '描述不能为空',
            }
        ]
    }
]


// 上传相关的所有事件
let handleRemove = (file: any, fileList: any) => {
    console.log('handleRemove')
    console.log(file, fileList)
}
let handlePreview = (file: any) => {
    console.log('handlePreview')
    console.log(file)
}
let beforeRemove = (val: any) => {
    console.log('beforeRemove')
    return ElMessageBox.confirm(`删除提示 ${val.file.name} ?`)
}
let handleExceed = (val: any) => {
    console.log('handleExceed', val)
    ElMessage.warning(`上传提示 ${val.files.length} files this time, add up to ${val.files.length + val.fileList.length} totally`
    )
}
let handleSuccess = (val: any) => {
    console.log('success')
    console.log(val)
}
let handleChange = (val: any) => {
    console.log('change')
    console.log(val)
}
let handleBeforeUpload = (val: any) => {
    console.log('handleBeforeUpload')
    console.log(val)
}
//-------------------------------------------
interface Scope {
    form: FormInstance,
    model: any,
}
//提交
let submitForm = (scope: Scope) => {
    scope.form.validate((valid) => {
        if (valid) {
            console.log(scope.model);
            ElMessage.success('提交成功')
            // resetForm()
        } else {
            ElMessage.error('表单填写错误')
        }
    });
}
let fromDom = ref()

//重置
let resetForm = (scope: Scope) => {
    console.log('重置', scope.form);

    //vue3的分发事件，调用子页面的resetFields事件
    fromDom.value.resetFields()
}

</script>
<template>
    <pro-from ref="fromDom" :options='options' @on-change="handleChange" @before-upload="handleBeforeUpload"
        @on-preview="handlePreview" @on-remove="handleRemove" @before-remove="beforeRemove" @on-success="handleSuccess"
        @on-exceed="handleExceed">
        <template #uploadArea>
            <el-button type="primary" size="small">点击上传</el-button>
        </template>
        <template #uploadTip>
            <div style="color:#ccc;font-size:12px;">
                上传提示信息
            </div>
        </template>
        <template #action="scope">
            <el-button type="primary" @click="submitForm(scope)">提 交</el-button>
            <el-button @click='resetForm(scope)'>重 置</el-button>
        </template>
    </pro-from>
</template>
<style lang="less" scoped>
</style>