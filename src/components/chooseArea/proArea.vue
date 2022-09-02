<script lang="ts" setup>
/**
 * 三级联动
 * 
 * **/ 


import { ref, watch } from 'vue'
import allAreas from './json/pca-code.json'

//定义接口
export interface AreaItem {
    name: string,
    code: string,
    children?: AreaItem[]
}

//定义接口
export interface Data {
    name: string,
    code: string,
}


// 下拉框选择省的值
let province = ref<string>('')
// 下拉框选择市的值
let city = ref<string>('')
// 下拉框选择区的值
let area = ref<string>('')
// 所有省市区的值
let areas = ref(allAreas)



//根据省的值 获取市的列表
let selectCity = ref<AreaItem[]>([])
watch(() => province.value, val => {
    if (val) {
        let cities = areas.value.find(item => item.code === province.value)?.children!
        selectCity.value = cities
    }
    city.value = ''
    area.value = ''
})
//根据市的值 获取取的列表
let selectArea = ref<AreaItem[]>([])
watch(() => city.value, val => {
    if (val) {
        //如果返回值是undefined  我们可以加最后面 感叹号
        let area = selectCity.value.find((item: any) => item.code === city.value)?.children!
        selectArea.value = area
    }
    area.value = ''
})

//

let emits = defineEmits(['change'])

watch(() => area.value, val => {
    if (val) {
        let provinceData: Data = {
            name: province.value,
            code: province.value && allAreas.find(item => item.code === province.value)!.name
        }
        let cityData: Data = {
            name: city.value,
            code: city.value && selectCity.value.find(item => item.code === city.value)!.name
        }
        let areaData: Data = {
            name: val,
            code: val && selectArea.value.find(item => item.code === val)!.name
        }

        emits('change', {
            province: provinceData,
            city: cityData,
            area: areaData,
        })
    }

})

</script>
<template>
    <div>
        <el-select placeholder="请选择省" v-model="province">
            <el-option v-for="item in areas" :key="item.code" :value="item.code" :label="item.name"></el-option>
        </el-select>
        <el-select :disabled="!province" style="margin:0 10px" placeholder="请选择市" v-model="city">
            <el-option v-for="item in selectCity" :key="item.code" :value="item.code" :label="item.name"></el-option>
        </el-select>
        <el-select :disabled="!province || !city" placeholder="请选择区" v-model="area">
            <el-option v-for="item in selectArea" :key="item.code" :value="item.code" :label="item.name"></el-option>
        </el-select>
    </div>
</template>
<style lang="scss" scoped>
</style>