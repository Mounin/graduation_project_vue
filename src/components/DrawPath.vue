<!-- 调用路径页面 -->
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="Trace" name="trace">
      <div class="show-traces-data">
        <el-table :data="tracesList" height="500" style="width: 100%; left: 20px">
          <el-table-column prop="trace_id" label="TraceID" width="180" />
          <el-table-column prop="span_number" label="span数量" width="150" />
          <el-table-column prop="root_ms_name" label="根微服务名称" width="300" />
          <el-table-column prop="duration" label="Trace持续时间" width="200" />
          <el-table-column prop="start_time" label="开始时间" width="200" />
        </el-table>
      </div>
    </el-tab-pane>
    <el-tab-pane label="Span" name="data">
      <div class="show-spans-data">
        <el-table :data="spansList" height="500" style="width: 100%; margin:0 20px">
          <el-table-column prop="span_id" label="SpanID" width="180" />
          <el-table-column prop="trace_id" label="TraceID" width="180" />
          <el-table-column prop="parent_id" label="父点ID" width="180" />
          <el-table-column prop="operation_name" label="操作名称" width="180" />
          <el-table-column prop="ms_name" label="微服务名称" width="300" />
          <el-table-column prop="duration" label="Trace持续时间" width="150" />
          <el-table-column prop="start_time" label="开始时间" width="200" />
        </el-table>
      </div>
    </el-tab-pane>
    <el-tab-pane label="路径图展示" name="graph">
      <div class="draw_graph_by_id">
        <el-input v-model="traceID" style="width: 90%" placeholder="请输入trace id" clearable />
        <el-button type="primary" @click="searchGraph">查询</el-button>
      </div>
      <div class="route_graph">
        <div id="graph"></div>
        <div id="critical_path"></div>
      </div>

    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import jaeger from '../api/jaeger_api'
import {onMounted, ref} from "vue";
import type {TabsPaneContext} from "element-plus";
import * as echarts from "echarts"
import "echarts/theme/macarons";

onMounted(() => {
  get_traces_data()
})

// 根据TraceID绘制有向无环图
const traceID = ref()
const searchGraph = () => {
  jaeger.draw_path(traceID.value).then(res => {
    const graph_data = JSON.parse(res.graph_data)
    const critical_data = JSON.parse(res.critical_data)
    console.log("graph_data", graph_data)
    console.log("critical_data", critical_data)

    draw_path(graph_data, 'graph', "微服务路径DAG图")
    draw_path(critical_data, 'critical_path', "关键路径")

  })
}

const draw_path = (graph: any, dom_id: string, title: string) => {
  type EChartsOption = echarts.EChartsOption

  const chartDom = document.getElementById(dom_id)!
  const myChart = echarts.init(chartDom)
  let option: EChartsOption;
  interface GraphNode {
    symbolSize: number;
    label?: {
      show?: boolean;
    };
  }
  graph.nodes.forEach(function (node: GraphNode) {
    node.label = {
      show: node.symbolSize >= 20
    };
  });
  option = {
    title: {
      text: title,
      // textStyle: {
      //   color: '#fff',
      // },
      // subtext: 'Default layout',
      top: 'top',
      left: 'center'
    },
    tooltip: {
      trigger: "item",
      triggerOn: "mousemove",
    },
    legend: [
      {
        // selectedMode: 'single',
        // textStyle: {
        //   color: '#fff',
        // },
        top: 'bottom',
        data: graph.categories.map(function (a: { name: string }) {
          return a.name;
        })
      }
    ],
    darkMode: 'auto',
    backgroundColor: '#f8f8f8',
    series: [
      {
        type: "graph",
        layout: "force",
        data: graph.nodes,
        links: graph.links,
        categories: graph.categories,
        roam: true,
        edgeSymbol: ['none', 'arrow'],
        edgeSymbolSize: [0, 10],
        // 是否显示node的label
        label: {
          // show: true,
          formatter: '{b}'
        },
        force: {
          repulsion: 100,
          edgeLength: 50,
        },
        lineStyle: {
          color: 'source',
          curveness: 0.3,
          width: 3,
        },
        // 是否显示边label
        // edgeLabel: {
        //   show: true,
        //   formatter: '{b}'
        // }
      },
    ],
  }
  option && myChart.setOption(option)
}

let tracesList = ref([])
let spansList = ref([])
const activeName = ref('trace')
const handleClick = (tab: TabsPaneContext) => {
  if (tab.index === '0') {
    get_traces_data()
  } else if (tab.index === '1') {
    get_spans_data()
  }
}

// 获取traces数据
const get_traces_data = () => {
  jaeger.get_traces().then(res => {
    tracesList.value = res.traces
  }).catch(e => {
    console.error(e)
  })
}

// 获取spans数据
const get_spans_data = () => {
  jaeger.get_spans().then(res => {
    spansList.value = res.spans
  }).catch(e => {
    console.error(e)
  })
}
</script>

<style scoped>
.route_graph {
  left: 20px;
  width: 90%;
  display: inline-flex;
  justify-content: space-between;
}
#graph {
  width: 500px;
  height: 500px;
  margin: 0 20px;
  /*background: pink;*/
}

#critical_path {
  width: 500px;
  height: 500px;
  /*background: cadetblue;*/
}

.draw_graph_by_id {
  display: inline-flex;
  padding: 10px;
  width: 95%;
  justify-content: space-between;
}
</style>