<script lang="ts" setup>
import { ref } from "vue";
import { EventItem } from "../../components/calendar/types";
import { DateClickArg } from "@fullcalendar/interaction";
import { EventClickArg, EventContentArg } from "@fullcalendar/core";
let events = ref<EventItem[]>([
    {
        title: "购物",
        start: "2022-09-11 10:00:00",
        end: "2022-09-19 12:00:00",
        editable: true, //是否可以拖拽
    },
    {
        title: "学习",
        start: "2022-09-22 08:00:00",
        end: "2022-09-25 16:00:00",
    },
]);
//点击某一天，新增内容 ，如果数据改变需要在父页面进行watch监听，才能改变数据
let dateClick = (info: DateClickArg) => {

    let event = {
        start: `${info.dateStr} 12:00:00`,
        end: `${info.dateStr} 13:00:00`,
        title: "吃饭",
    };
    events.value.push(event);
}

//通过el可以获取到当天做什么事，
let eventClick = (info: EventClickArg) => {
    console.log(info)
}

//自定义样式渲染内容
let eventContent = (arg: EventContentArg) => {
    let el = document.createElement("div");
    let timeTextArr = arg.timeText.split(" - ");
    console.log(3333,timeTextArr);
    let start = timeTextArr[0].replace("上午", "").replace("下午", "").replace("时", "");
    let end = timeTextArr[1].replace("上午", "").replace("下午", "").replace("时", "");
    el.innerHTML = `
        <img src="src/assets/imgs/20210430112301.png" style="width:30px;height:30px;">
        <div>标题: ${arg.event._def.title}</div>
         <div>开始时间: ${start}</div>
         <div>结束时间: ${end}</div>
        `;
    return {
        domNodes: [el],
    };
};
</script>
<template>
    <pro-calendar :events="events" :eventContent="eventContent" @event-click="eventClick" @date-click="dateClick">
    </pro-calendar>
</template>
<style lang="less" scoped>

</style>