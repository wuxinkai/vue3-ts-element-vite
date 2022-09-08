<script lang="ts" setup>
import { PropType, computed, ref, onMounted, watch } from 'vue'
import { TableOptions } from './type'
import cloneDeep from 'lodash/cloneDeep'
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
    //--------------- 可编辑单元 编辑某一行 ------------------- 
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
    // 是否显示分页
    pagination: {
        type: Boolean,
        defalut: false
    },
    // 显示分页的对齐方式
    paginationAlign: {
        type: String as PropType<'left' | 'center' | 'right'>,
        default: 'left'
    },
    // 当前为第几页
    currentPage: {
        type: Number,
        default: 1
    },
    // 一页多少数据
    pageSize: {
        type: Number,
        default: 10
    },
    // 每页的数据选项
    pageSizes: {
        type: Array as PropType<number[]>,
        default: [10, 20, 30, 40]
    },
    // 数据总数
    total: {
        type: Number,
        default: 0
    }
})

//不是操作列的
let tableOptions = computed(() => props.options.filter(item => !item.action))

//过滤出操作列
let actionOptions = computed(() => props.options.find(item => item.action))


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
    console.log('通过父页面的插槽调用，取消或者编辑', scope);
    currentEdit.value = ''
    emits('check', scope)
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


//---------------- 编辑行--------------------------------
//拷贝（cloneDeep）表格数据 我们不能直接去修改数据
let tableData = ref<any[]>(cloneDeep(props.data))

// 拷贝按钮标识
let cloneEditRowIndex = ref<string>(props.editRowIndex as string)

//监听数据变化
watch(() => props.data, val => {
    tableData.value = cloneDeep(val)
    tableData.value.map(item => item.rowEdit = false)
}, { deep: true })

// 监听父组件传递过来的标识
watch(() => props.editRowIndex, val => {
    if (val) cloneEditRowIndex.value = val
})

//初始化加载
onMounted(() => {
    tableData.value.map(item => item.rowEdit = false)
})

//点击行编辑
let rowClick = (row: any, column: any) => {
    // 判断当前点击的是否为操作项的内容

    if (column.label === actionOptions.value!.label) {
        console.log(props.isEditRow, cloneEditRowIndex.value === props.editRowIndex, cloneEditRowIndex.value, props.editRowIndex);
        //判断都空是字符串
        if (cloneEditRowIndex.value.length == 0 && (props.editRowIndex as string).length == 0) return
        if (props.isEditRow && cloneEditRowIndex.value === props.editRowIndex) {
            row.rowEdit = !row.rowEdit;
            // 重置其它数据的isEditRow
            tableData.value.map(item => {
                if (item !== row) item.rowEdit = false
            })
            // 重置按钮标识, 点击删除的时候就不会，也编辑了
            console.log(!row.rowEdit);
            if (!row.rowEdit) emits('update:editRowIndex', '')
        }
    }
}

// ------------------------分页---------------------
// 分页的页数改变
let handleSizeChange = (val: number) => {
    emits('sizeChange', val);
}
let handleCurrentChange = (val: number) => {
    emits('currentChange', val);
}

// 和flex 布局结合的排列方式
let paginationAliginJustify = computed(() => {
  if(props.paginationAlign === 'left') return 'flex-start'
  else if(props.paginationAlign === 'center') return 'center'
  else return 'flex-end'
})

</script>
<template>
    <div>
        <el-table :data="tableData" v-bind="$attrs" v-loading="isLoading" :element-loading-text="elementLoadingText"
            :element-loading-spinner="elementLoadingSpinner" :element-loading-background="elementLoadingBackground"
            :element-loading-svg="elementLoadingSvg" :element-loading-svg-view-box="elementLoadingSvgViewBox"
            @row-click="rowClick">
            <template v-for="(item, index) in tableOptions" :key="index">
                <el-table-column :label="item.label" :prop="item.prop" :align="item.align" :width="item.width">
                    <!-- 没有编辑行的内容 显示状态 -->

                    <template #default="scope">
                        <template v-if="scope.row.rowEdit">
                            <el-input v-model="scope.row[item.prop]"></el-input>
                        </template>
                        <template v-else>
                            <template v-if="(scope.$index + scope.column.id) === currentEdit">
                                <div style="display:flex">
                                    <el-input v-model="scope.row[item.prop]"></el-input>
                                    <div @click.stop="clickEditCell(scope)">
                                        <slot name="editCell" :scope="scope" v-if="$slots.editCell"></slot>
                                        <div class="icons" v-else>
                                            <el-icon-check @click="check(scope)" class="check"></el-icon-check>
                                            <el-icon-close @click="close(scope)" class="close"></el-icon-close>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <template v-else>
                                <slot v-if="item.slot" :name="item.slot" :scope="scope"></slot>
                                <span v-else>{{scope.row[item.prop]}}</span>
                                <component class="edit" @click.stop="clickEdit(scope)" v-if="item.editable"
                                    :is="`el-icon-${editIcon}`"></component>
                            </template>
                        </template>

                    </template>

                </el-table-column>
            </template>
            <el-table-column :label="actionOptions!.label" :prop="actionOptions!.prop" :align="actionOptions!.align"
                :width="actionOptions!.width">
                <template #default="scope">
                    <slot v-if="scope.row.rowEdit" name="editRow"></slot>
                    <slot v-else name="action" :scope="scope"></slot>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination" v-if="pagination"  :style="{ justifyContent: paginationAliginJustify }">
            <el-pagination v-model:currentPage="currentPage" v-model:page-size="pageSize" :page-sizes="pageSizes"
                layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
        </div>
    </div>

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