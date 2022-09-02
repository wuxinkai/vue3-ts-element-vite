<script lang="ts" setup>



</script>
<template>
    <div class="flex">
        <pro-trent text="这个一个数组"></pro-trent>
        <pro-trent text="销售" type="down"></pro-trent>
    </div>
    <div class="flex">
        <pro-trent text="这个一个数组" upIcon="CaretTop"></pro-trent>
        <pro-trent text="销售" type="down"></pro-trent>
    </div>
    <div class="flex">
        <pro-trent upTextColor="red" upIcon="SuccessFilled"> 以插槽的形式传入内容</pro-trent>
        <pro-trent downTextColor="#1342ef" type="down"> 以插槽的形式传入内容</pro-trent>
    </div>
    <br />
    <br />
    <br />
    <h1>提示插件</h1>
    <div>
        <pro-notification value="10">11111111</pro-notification>
        <br />
        <br />
        <br />
        <pro-notification value="40" :max="30">222222222</pro-notification>
        <br />
        <br />
        <br />
        <pro-notification value="10" :isDot="true">33333333333</pro-notification>
        <br />
        <br />
  
    </div>
</template>
<style lang="scss" scoped>
.flex {
    display: flex;

    .trend {
        margin-right: 30px;
        margin-top: 30px;
    }
}
</style>