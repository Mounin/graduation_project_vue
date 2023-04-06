<!-- 单点监控页面 -->
<template>
  <div class="single-body">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="指标查询" name="data">
        <div class="header-search">
          <el-input style="width: 90%" v-model="input" placeholder="请输入查询的微服务名称" clearable />
          <el-button type="primary" @click="headerMonitor">监控</el-button>
        </div>
        <div class="show-data">
          <el-table :data="filteredDataList" height="500" style="width: 100%">
            <el-table-column prop="ms_name" label="微服务名" />
            <el-table-column prop="CPU_usage" label="CPU利用率" />
            <el-table-column prop="memory_bandwidth_usage" label="内存利用率" />
            <el-table-column prop="memory_usage" label="内存使用量" />
            <el-table-column prop="disk_write" label="磁盘写入带宽" />
            <el-table-column prop="disk_read" label="磁盘读取带宽" />
            <el-table-column prop="net_write" label="网络写入带宽" />
            <el-table-column prop="net_read" label="网络读取带宽" />
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
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
  getAllData()
})
// 获取所有数据
function getAllData() {
  prom.showAllSingleMonitor().then(res => {
    console.log(res)
    for (const item of res) {
      monitorData.push(item)
    }
    dataList.value = JSON.parse(JSON.stringify(monitorData))
  })
}

// 搜索输入框
const input = ref("")
const filteredDataList = computed(() => {
  if (!input.value) return dataList.value
  return dataList.value.filter((item: any) => item.ms_name.includes(input.value))
})

//  点击开始监控
function headerMonitor() {
  prom.singleMonitor().then(res => {
    console.log(res.res)
    getAllData()
  })
}
</script>
<style lang="less">
.single-body {
  .el-tabs {
    .el-tab-pane {
    }
    .header-search {
      display: flex;
      width: 100%;
      justify-content: space-around;
      background-color: white;
    }

    .show-data {
      margin-top: 10px;
    }
  }
}


</style>