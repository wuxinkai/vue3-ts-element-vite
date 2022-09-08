<script lang="ts" setup>
import { list, actions } from './data'


const clickItem = (val: any) => {
    console.log(val);
    debugger
}
const clickAction = (val: any) => {
    console.log(val);
    debugger
}
</script>
<template>
    <pro-notification value="50" icon="ChatRound">
        <template #default>
            <pro-list @clickItem="clickItem" @clickAction="clickAction" :list="list" :actions="actions"></pro-list>
        </template>
    </pro-notification>
    <div>
        <pro-list @clickItem="clickItem" @clickAction="clickAction" :list="list" :actions="actions"></pro-list>
    </div>
</template>
<style lang="scss" scoped>

</style>