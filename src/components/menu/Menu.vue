<script lang="ts" setup>
import { PropType } from 'vue';
import { toLine } from '../../utils'
let props = defineProps({
    //数据
    data: {
        type: Array as PropType<any[]>,
        required: true,
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

})
console.log(props.data);
</script>
<template>
    <!-- v-bind="$attrs" 继承父页面上所有的属性 -->
    <el-menu :default-active="defaultActive" :router="router" v-bind="$attrs" class="el-menu-vertical-demo">
        <template v-for="(item, i) in data" :key="i">
            <!-- 没有下级菜单 -->
            <el-menu-item v-if="!item[children] || !item[children].length" :index="item[index]">
                <!-- 自定义图标 -->
                <el-icon v-if="item[icon]">
                    <component :is="`el-icon-${toLine(item[icon])}`"></component>
                </el-icon>
                <!-- 显示文字 -->
                <span>{{ item[name] }}</span>
            </el-menu-item>
            <!-- ======================有下级菜单=============== -->
            <el-sub-menu v-if="item[children] && item[children].length" :index="item[index]">
                <!-- 名字，可能带图标也可能不带图标， -->
                <template #title>
                    <el-icon v-if="item[icon]">
                        <component :is="`el-icon-${toLine(item[icon])}`"></component>
                    </el-icon>
                    <span>{{ item[name] }}</span>
                </template>
                <!-- 循环子菜单 -->
                <el-menu-item v-for="(item1, index1) in item[children]" :key="index1" :index="item1[index]">
                    <!-- 子菜单图标 -->
                    <el-icon v-if="item1[icon]">
                        <component :is="`el-icon-${toLine(item1[icon])}`"></component>
                    </el-icon>
                    <!-- 子菜单文字 -->
                    <span>{{ item1[name] }}</span>
                </el-menu-item>
            </el-sub-menu>
        </template>
    </el-menu>
</template>
<style lang="less" scoped>
</style>


