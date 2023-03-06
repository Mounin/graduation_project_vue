<!-- 连续监控页面 -->
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="指标查询" name="data">
      <div class="header-search">
        <el-form :model="form" label-width="120px" style="display: inline-flex">
          <el-form-item label="服务名称">
            <el-input v-model="form.name" />
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
          <el-table-column prop="CPU_usage" label="CPU系统态利用率" />
          <el-table-column prop="CPU_user" label="CPU用户态利用率" />
          <el-table-column prop="memory_bandwidth_usage" label="内存带宽占用率" />
          <el-table-column prop="memory_usage" label="内存使用量" />
          <el-table-column prop="disk_write" label="磁盘写入带宽占用率" />
          <el-table-column prop="disk_read" label="磁盘读取带宽占用率" />
          <el-table-column prop="net_write" label="网络写入带宽占用率" />
          <el-table-column prop="net_read" label="网络读取带宽占用率" />
          <el-table-column prop="start_time" label="开始时间" />
          <el-table-column prop="end_time" label="结束时间" />
          <el-table-column prop="duration" label="持续时间" />
        </el-table>
      </div>
    </el-tab-pane>
    <el-tab-pane label="Graph展示" name="graph">
      Graph展示
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import {onMounted, ref, reactive, computed} from 'vue'
import type { TabsPaneContext } from 'element-plus'
import prom from '@/api/prometheus_api'

// tabs标签
const activeName = ref('data')
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

// 监控到的指标数据
const dataList = ref([])
const monitorData: any[] = reactive([])
onMounted(() => {
  // getAllData()
})
// 获取所有数据
// function getAllData() {
//   prom.showAllContinueMonitor().then(res => {
//     for (const item of res.list) {
//       monitorData.push(item.fields)
//     }
//     dataList.value = JSON.parse(JSON.stringify(monitorData))
//   })
// }

// 搜索输入框
const form = reactive({
  name: '',
  start_end: ref<[Date, Date]>([
    new Date(2023, 1, 1, 0, 0),
    new Date(2023, 1, 1, 0, 0),
  ])
})
const onSubmit = () => {
  prom.showAllContinueMonitor(form).then(res => {
    console.log(res)
  })
}
</script>

<style>
.header-search {
  display: inline-flex;
  padding: 10px;
  width: 95%;
  justify-content: space-between;
}

</style>