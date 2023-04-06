<!-- 连续监控页面 -->
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="指标查询" name="data">
      <div class="header-search">
        <el-form :model="form" label-width="120px" style="display: inline-flex">
          <el-form-item label="服务名称">
            <el-input v-model="form.name" style="width: 200px" />
          </el-form-item>
          <el-form-item label="开始时间">
            <el-date-picker
                v-model="form.start_end"
                type="datetimerange"
                range-separator="To"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="show-data">
        <el-table :data="dataList" height="500" style="width: 100%">
          <el-table-column prop="ms_name" label="微服务名" />
          <el-table-column prop="CPU_usage" label="CPU利用率" />
          <el-table-column prop="memory_bandwidth_usage" label="内存利用率" />
          <el-table-column prop="memory_usage" label="内存使用量" />
          <el-table-column prop="disk_write" label="磁盘写入带宽" />
          <el-table-column prop="disk_read" label="磁盘读取带宽" />
          <el-table-column prop="net_write" label="网络写入带宽" />
          <el-table-column prop="net_read" label="网络读取带宽" />
          <el-table-column prop="start_time" label="监控时间" />
        </el-table>
      </div>
    </el-tab-pane>
    <el-tab-pane label="Graph展示" name="graph">
      <PromContinueChart />
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import {ref, reactive, onMounted} from 'vue'
import type { TabsPaneContext } from 'element-plus'
import prom from '@/api/prometheus_api'
import {ElMessage} from "element-plus"
import * as echarts from 'echarts'
import PromContinueChart from './PromContinueChart.vue'

// tabs标签
const activeName = ref('data')

// 监控到的指标数据
let dataList = ref([])
const monitorData: any[] = reactive([])

// 搜索输入框
const form = reactive({
  name: '',
  start_end: ref<[Date, Date]>([
    new Date(),
    new Date(),
  ])
})
const onSubmit = () => {
  prom.showAllContinueMonitor(form).then(res => {
    console.log(res)
    dataList = ref([])
    for (const item of res.list) {
      monitorData.push(item.fields)
    }
    dataList.value = JSON.parse(JSON.stringify(monitorData))
    ElMessage({
      message: '请求成功！',
      type: 'success',
    })
  }).catch(e => {
    console.error("出错啦", e)
    ElMessage.error('请求失败，请稍后重试。')
  })
}

// graph图表展示
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

</script>

<style>
.header-search {
  display: flex;
  padding: 10px;
  width: 100%;
  justify-content: space-between;
  background-color: white;
  margin-bottom: 10px;
}
</style>