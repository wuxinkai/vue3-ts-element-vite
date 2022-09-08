<script lang="ts" setup>
// PropType类型推论，自动补全类型
import { PropType } from 'vue'
import { ListOpsition, ListItem, ActionOptions } from './types'
let props = defineProps({
    //列表内容
    list: {
        type: Array as PropType<ListOpsition[]>,
        required: true
    },
    //操作内容
    actions: {
        type: Array as PropType<ActionOptions[]>,
        default: () => []
    },
    //是否显示底部按钮
    isActions: {
        type: Boolean,
        default: true
    },
})

let emits = defineEmits(['clickItem', 'clickAction'])

let clickItem = (item: ListItem, index: number) => {
    emits('clickItem', { item, index })
}

let clickAction = (item: ActionOptions, index: number) => {
    emits('clickAction', { item, index })
}
</script>
<template>
    <div class="list-tabs__item">
        <el-tabs class="tabs-box">
            <el-tab-pane v-for="(item, index) in list" :key="index" :label="item.title">
                <el-scrollbar max-height="300px">
                    <div class="container" @click="clickItem(item1, index1)" v-for="(item1, index1) in item.content"
                        :key="index1">
                        <div class="avatar" v-if="item1.avatar">
                            <el-avatar size="small" :src="item1.avatar"></el-avatar>
                        </div>
                        <div class="content">
                            <div v-if="item1.title" class="title">
                                <div>{{ item1.title }}</div>
                                <el-tag v-if="item1.tag" size="small" :type="item1.tagType">{{ item1.tag }}</el-tag>
                            </div>
                            <div class="time" v-if="item1.desc">{{ item1.desc }}</div>
                            <div class="time" v-if="item1.time">{{ item1.time }}</div>
                        </div>
                    </div>
                    <div class="actions" v-if="isActions">
                        <div class="a-item" :class="{ border: i !== actions.length }" v-for="(action, i) in actions"
                            :key="i" @click="clickAction(action, i)">
                            <div class="a-icon" v-if="action.icon">
                                <component :is="`el-icon-${action.icon}`"></component>
                            </div>
                            <div class="a-text">{{ action.text }}</div>
                        </div>
                    </div>
                </el-scrollbar>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<style lang="scss" scoped>
.list-tabs__item {
    .tabs-box {
        ::v-deep .el-tabs__content {
            border: 1px solid #dcdfe6;
        }

    }

    .container {
        display: flex;
        align-items: center;
        padding: 10px 20px;
        cursor: pointer;

        &:hover {
            background: #e6f6ff;
        }

        .avatar {
            flex: 1;
        }

        .content {
            flex: 5;

            .title {
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .time {
                font-size: 12px;
                color: #999;
                margin-top: 4px;
            }
        }
    }

    .actions {
        // height: 50px;
        display: flex;
        align-items: center;
        border-top: 1px solid #eee;

        .a-item {
            height: 50px;
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;

            .a-icon {
                margin-right: 4px;
                position: relative;
                top: 2px;
            }
        }
    }

    .border {
        border-right: 1px solid #eee;
    }
}
</style>