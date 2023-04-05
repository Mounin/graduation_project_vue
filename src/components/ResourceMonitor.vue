<!-- 资源监控页面 -->
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="资源监控" name="resource">
      <el-table :data="tracesData" style="width: 100%">
        <el-table-column type="expand">
          <template #default="props">
            <el-table :data="props.row.spansData" style="left: 20px">
              <el-table-column type="expand">
                <template #default="propss">
                  <div m="4" style="margin-left: 20px">
                    <p m="t-0 b-2">开始时间: {{ propss.row.start_time }}</p>
                    <p m="t-0 b-2">结束时间: {{ propss.row.end_time }}</p>
                    <p m="t-0 b-2">持续时长: {{ propss.row.duration }}</p>
                    <h3>监控指标</h3>
                    <el-table :data="propss.row.resourceData">
                      <el-table-column prop="CPU_usage" label="CPU利用率" />
                      <el-table-column prop="memory_bandwidth_usage" label="内存利用率" />
                      <el-table-column prop="memory_usage" label="内存使用量" />
                      <el-table-column prop="disk_write" label="磁盘写入带宽" />
                      <el-table-column prop="disk_read" label="磁盘读取带宽" />
                      <el-table-column prop="net_write" label="网络写入带宽" />
                      <el-table-column prop="net_read" label="网络读取带宽" />
                    </el-table>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="SpanID" prop="span_id" />
              <el-table-column label="span名称" prop="ms_name" />
            </el-table>
          </template>
        </el-table-column>
        <el-table-column label="请求名称" prop="root_ms_name" />
        <el-table-column label="TraceID" prop="trace_id" />
        <el-table-column label="开始时间" prop="start_time" />
        <el-table-column label="持续时间" prop="duration" />
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="热点微服务" name="hot_ms">
      <el-table
          :data="hotData"
          :default-sort="{ prop: 'date', order: 'descending' }"
          style="width: 100%"
      >
        <el-table-column prop="ms_name" label="微服务名" />
        <el-table-column prop="num" label="调用次数" sortable />
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="查询" name="search" >
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";
import type {TabsPaneContext} from "element-plus";
import jaeger from "../api/jaeger_api"
import {ElLoading} from "element-plus";

onMounted(() => {
  getResource()
})

const activeName = ref('resource')
// 热点微服务
const hotData = ref([])

const handleClick = (tab: TabsPaneContext) => {
  if (tab.index === '1') {
    jaeger.get_hot_ms().then(res => {
      console.log(res)
      hotData.value = res.hot_data
    })
  } else if (tab.index === '2') {
    const loading = ElLoading.service({
      lock: true,
      text: '正在查询中，请耐心等候！',
      background: 'rgba(0, 0, 0, 0.7)',
    })
    jaeger.get_monitor().then(res => {
      console.log(res)
      // tracesData.value = res.monitor
      loading.close
      activeName.value = 'resource'
    }).catch(e => {
      console.error(e)
      activeName.value = 'resource'
    })
  }
}

const tracesData = ref([])
const getResource = () => {
  jaeger.get_resource().then(res => {
    // console.log(res)
    console.log("tracesData", JSON.parse(res.tracesData))
    tracesData.value = JSON.parse(res.tracesData)
  }).catch(e => {
    console.error(e)
  })
}
</script>

<style scoped>

</style>