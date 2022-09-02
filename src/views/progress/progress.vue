<script lang="ts" setup>

</script>
<template>
    <pro-progress :isAnimate="true"  :time="60000" :percentage="80"></pro-progress>
    <br>
    <br>
    <br>
    <pro-progress :isAnimate="true" :text-inside="true" :stroke-width="24" :percentage="100"></pro-progress>
    <br>
    <br>
    <br>
    <pro-progress :isAnimate="true" :time="10000" class="progress-box"  type="circle" :percentage="70" status="exception" />
    <br>
    <br>
    <br>
    <br>
    <pro-progress  :isAnimate="true" :time="5000" type="circle" :percentage="75" />
</template>
<style lang="scss" scoped>
</style>