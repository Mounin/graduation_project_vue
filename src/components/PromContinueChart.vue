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
    const titles: any[] = [
        'CPU系统态利用率',
        'CPU用户态利用率',
        '内存带宽占用率',
        '内存使用量',
        '磁盘写入带宽占用率',
        '磁盘读取带宽占用率',
        '网络写入带宽占用率',
        '网络读取带宽占用率',
    ]
    const dataAll: any[][] = []
    const nameList: any[] = []
    const xAxisData: any = []

    res.list.map(function (item: any) {
      // titles.push(item.metric_name)
      const metricData: any[] = []
      item.ms_list.map(function (ms: any) {
        metricData.push(ms.data_list)
        nameList.push(ms.metric_name)
      })
      dataAll.push(metricData)
      xAxisData.push(item.time_list)
    })


    const series: any = []
    for (let i = 0; i < dataAll.length; i++) {
      dataAll[i].map(function (item, index) {
        series.push({
          name: nameList[index],
          type: 'line',
          xAxisIndex: i,
          yAxisIndex: i,
          data: item,
        })
      })
    }

    option = {
      title: [
        {
          text:titles[0],
          left:'25%',
          top:'1%',
          textAlign:'center'
        },
        {
          text:titles[1],
          left:'73%',
          top:'1%',
          textAlign:'center'
        },
        {
          text:titles[2],
          left:'25%',
          top:'25%',
          textAlign:'center'
        },
        {
          text:titles[3],
          left:'73%',
          top:'25%',
          textAlign:'center'
        },
        {
          text:titles[4],
          left:'25%',
          top:'50%',
          textAlign:'center'
        },
        {
          text:titles[5],
          left:'73%',
          top:'50%',
          textAlign:'center'
        },
        {
          text:titles[6],
          left:'25%',
          top:'75%',
          textAlign:'center'
        },
        {
          text:titles[7],
          left:'73%',
          top:'75%',
          textAlign:'center'
        }
      ],
      tooltip: {
        trigger: 'axis'
      },
      grid: [
        { left: '7%', top: '7%', width: '38%', height: '15%', containLabel: true },
        { left: '7%', top: '30%', width: '38%', height: '15%', containLabel: true },
        { right: '7%', top: '7%', width: '38%', height: '15%', containLabel: true },
        { right: '7%', top: '30%', width: '38%', height: '15%', containLabel: true },
        { left: '7%', bottom: '7%', width: '38%', height: '15%', containLabel: true },
        { left: '7%', bottom: '30%', width: '38%', height: '15%', containLabel: true },
        { right: '7%', bottom: '7%', width: '38%', height: '15%', containLabel: true },
        { right: '7%', bottom: '30%', width: '38%', height: '15%', containLabel: true }
      ],
      // 工具栏（下载等）
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: [
        {gridIndex: 0, type: 'category', boundaryGap: false, data: xAxisData[0] },
        {gridIndex: 1, type: 'category', boundaryGap: false, data: xAxisData[0] },
        {gridIndex: 2, type: 'category', boundaryGap: false, data: xAxisData[0] },
        {gridIndex: 3, type: 'category', boundaryGap: false, data: xAxisData[0] },
        {gridIndex: 4, type: 'category', boundaryGap: false, data: xAxisData[0] },
        {gridIndex: 5, type: 'category', boundaryGap: false, data: xAxisData[0] },
        {gridIndex: 6, type: 'category', boundaryGap: false, data: xAxisData[0] },
        {gridIndex: 7, type: 'category', boundaryGap: false, data: xAxisData[0] },
      ],
      yAxis: [
        {gridIndex: 0, type: 'value', boundaryGap: false },
        {gridIndex: 1, type: 'value', boundaryGap: false },
        {gridIndex: 2, type: 'value', boundaryGap: false },
        {gridIndex: 3, type: 'value', boundaryGap: false },
        {gridIndex: 4, type: 'value', boundaryGap: false },
        {gridIndex: 5, type: 'value', boundaryGap: false },
        {gridIndex: 6, type: 'value', boundaryGap: false },
        {gridIndex: 7, type: 'value', boundaryGap: false },
      ],
      series: series
    };
    option && myChart.setOption(option)
  })
})
</script>

<style scoped>
#myCharts {
  width: 1300px;
  height: 1500px;
}

</style>