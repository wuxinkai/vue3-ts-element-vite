<script lang="ts" setup>
import { PropType, computed, ref } from 'vue'
import { TableOptions } from './type'
let props = defineProps({
    options: {
        type: Array as PropType<TableOptions[]>,
        required: true
    },
    data: {
        type: Array as PropType<any[]>,
        required: true
    },
    //-------------- 加载文案 ----------------------------
    elementLoadingText: {
        type: String,
    },
    // 加载图标名
    elementLoadingSpinner: {
        type: String,
    },
    // 加载背景颜色
    elementLoadingBackground: {
        type: String,
    },
    // 加载图标是svg
    elementLoadingSvg: {
        type: String
    },
    // 加载svg的配置
    elementLoadingSvgViewBox: {
        type: String,
    },
    //--------------- 可编辑单元显示的图标 --------------------
    editIcon: {
        type: String,
        default: "edit"
    },
    // 是否可编辑行
    isEditRow: {
        type: Boolean,
        defalut: false,
    },
    // 编辑行按钮的标识
    editRowIndex: {
        type: String,
        defalut: ''
    },
    // ----------------- 分页-------------------
})

//不是操作列的
let tableOptions = computed(() => props.options.filter(item => !item.action))

//过滤出操作列
let actionOptions = computed(() => props.options.find(item => item.action))
console.log(1111, actionOptions);


//表格加载
let isLoading = computed(() => !props.data || !props.data.length)

//发送给父组件
let emits = defineEmits(['check', 'close', 'update:editRowIndex', 'sizeChange', 'currentChange'])

// 当前点击的单元格
let currentEdit = ref<string>('')
//编辑
let clickEdit = (scope: any) => {
    //编辑的只能有一个，唯一标识 
    currentEdit.value = scope.$index + scope.column.id
    console.log(scope);
}

//通过父页面的插槽调用，取消或者编辑
let clickEditCell = (scope: any) => {
    console.log('通过父页面的插槽调用，取消或者编辑',scope);
    //   currentEdit.value = ''
    //   emits('check', scope)
}

//编辑后的确认状态
let check = (scope: any) => {
    currentEdit.value = ''
    emits('check', scope)
}

//编辑后的关闭状态
let close = (scope: any) => {
    currentEdit.value = ''
    emits('close', scope)
}

</script>
<template>
    <el-table :data="data" v-bind="$attrs" v-loading="isLoading" :element-loading-text="elementLoadingText"
        :element-loading-spinner="elementLoadingSpinner" :element-loading-background="elementLoadingBackground"
        :element-loading-svg="elementLoadingSvg" :element-loading-svg-view-box="elementLoadingSvgViewBox">
        <template v-for="(item, index) in tableOptions" :key="index">
            <el-table-column :label="item.label" :prop="item.prop" :align="item.align" :width="item.width">
                <!-- 显示状态 -->
                <template #default="scope">
                    <template v-if="(scope.$index + scope.column.id) === currentEdit">
                        <div style="display:flex">
                            <el-input v-model="scope.row[item.prop!]"></el-input>
                            <div @click.stop="clickEditCell(scope)">
                                <!-- $slots.editCel可获取插槽上的内容 -->
                                <slot name="editCell" :scope="scope" v-if="$slots.editCell"></slot>
                                <div  class="icons" v-else>
                                    <el-icon-check @click="check(scope)" class="check"></el-icon-check>
                                    <el-icon-close @click="close(scope)" class="close"></el-icon-close>
                                </div>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <slot v-if="item.slot" :name="item.slot" :scope="scope"></slot>
                        <span v-else>{{scope.row[item.prop!]}}</span>
                        <component class="edit" @click.stop="clickEdit(scope)" v-if="item.editable"
                            :is="`el-icon-${editIcon}`"></component>
                    </template>
                </template>
            </el-table-column>
        </template>
        <el-table-column :label="actionOptions!.label" :prop="actionOptions!.prop" :align="actionOptions!.align"
            :width="actionOptions!.width">
            <template #default="scope">
                <slot name="action" :scope="scope"></slot>
            </template>
        </el-table-column>
    </el-table>
</template>
<style lang="scss" scoped>
.edit {
    width: 1rem;
    height: 1rem;
    position: relative;
    top: 4px;
    left: 10px;
    cursor: pointer;
}

.icons {
    display: flex;

    .check {
        color: green;
        width: 2.2em;
        height: 2.2em;
        margin-left: 8px;
        position: relative;
        cursor: pointer;

        svg {
            width: 2.2rem;
            height: 2.2rem;
        }
    }

    .close {
        color: red;
        margin-left: 8px;
        position: relative;
        cursor: pointer;

        svg {
            width: 2em;
            height: 2em;
        }
    }
}

.pagination {
    display: flex;
    justify-content: center;
    margin-top: 18px;
}
</style>