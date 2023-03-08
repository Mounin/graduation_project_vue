<template>
  <div id="myCharts" ref="Echarts"></div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts'
import {onMounted} from "vue";
import prom from '../api/prometheus_api'


onMounted(() => {
  type EChartsOption = echarts.EChartsOption;

  const chartDom = document.getElementById('myCharts')!
  const myChart = echarts.init(chartDom)
  let option: EChartsOption

  prom.showGraphContinueMonitor().then(res => {
    console.log(res)
  //  TUDO:调用数据库中的
  })

  const dataAll = [
    [
      [120, 132, 101, 134, 90, 230, 210],
      [220, 182, 191, 234, 290, 330, 310],
      [150, 232, 201, 154, 190, 330, 410],
      [320, 332, 301, 334, 390, 330, 320],
      [820, 932, 901, 934, 1290, 1330, 1320]
    ],
    [
      [120, 132, 101, 134, 90, 230, 210],
      [220, 182, 191, 234, 290, 330, 310],
      [150, 232, 201, 154, 190, 330, 410],
      [320, 332, 301, 334, 390, 330, 320],
      [820, 932, 901, 934, 1290, 1330, 1320]
    ],
    [
      [120, 132, 101, 134, 90, 230, 210],
      [220, 182, 191, 234, 290, 330, 310],
      [150, 232, 201, 154, 190, 330, 410],
      [320, 332, 301, 334, 390, 330, 320],
      [820, 932, 901, 934, 1290, 1330, 1320]
    ],
    [
      [120, 132, 101, 134, 90, 230, 210],
      [220, 182, 191, 234, 290, 330, 310],
      [150, 232, 201, 154, 190, 330, 410],
      [320, 332, 301, 334, 390, 330, 320],
      [820, 932, 901, 934, 1290, 1330, 1320]
    ]
  ]

  let series: any = []
  const nameList = ['test1', 'test2', 'test3', 'test4', 'test5']
  const stackList = ['CPU_usage', 'CPU_user', 'memory_bandwidth_usage', 'memory_usage']
  for (let i = 0; i < dataAll.length; i++) {
    dataAll[i].map(function (item, index) {
      series.push({
        name: nameList[index],
        type: 'line',
        stack: stackList[i],
        xAxisIndex: i,
        yAxisIndex: i,
        data: item,
      })
    })
  }

  option = {
    title: {
      left: 'center',
      text: 'Stacked Line'
    },
    tooltip: {
      trigger: 'axis'
    },
    // legend: {
    //   // orient: 'vertical',
    //   bottom: 0,
    //   data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
    // },
    grid: [
      { left: '7%', top: '7%', width: '38%', height: '38%', containLabel: true },
      { right: '7%', top: '7%', width: '38%', height: '38%', containLabel: true },
      { left: '7%', bottom: '7%', width: '38%', height: '38%', containLabel: true },
      { right: '7%', bottom: '7%', width: '38%', height: '38%', containLabel: true }
    ],
    // 工具栏（下载等）
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: [
        {gridIndex: 0, type: 'category', boundaryGap: false, data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']},
        {gridIndex: 1, type: 'category', boundaryGap: false, data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']},
        {gridIndex: 2, type: 'category', boundaryGap: false, data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']},
        {gridIndex: 3, type: 'category', boundaryGap: false, data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']},
    ],
    yAxis: [
        {gridIndex: 0, type: 'value', boundaryGap: false },
        {gridIndex: 1, type: 'value', boundaryGap: false },
        {gridIndex: 2, type: 'value', boundaryGap: false },
        {gridIndex: 3, type: 'value', boundaryGap: false },
    ],
    series: series
  };
  option && myChart.setOption(option)
})
</script>

<style scoped>
#myCharts {
  width: 800px;
  height: 800px;
}

</style>