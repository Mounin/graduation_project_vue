<!--加载动画-->
<template>
  <div id="main"></div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts'
import {onMounted} from "vue";

onMounted(() => {
  type EChartsOption = echarts.EChartsOption;

  const chartDom = document.getElementById('main')!;
  const myChart = echarts.init(chartDom);
  let option: EChartsOption;

  option = {
    graphic: {
      elements: [
        {
          type: 'group',
          left: 'center',
          top: 'center',
          children: new Array(7).fill(0).map((val, i) => ({
            type: 'rect',
            x: i * 20,
            shape: {
              x: 0,
              y: -40,
              width: 10,
              height: 80
            },
            style: {
              fill: '#5470c6'
            },
            keyframeAnimation: {
              duration: 1000,
              delay: i * 200,
              loop: true,
              keyframes: [
                {
                  percent: 0.5,
                  scaleY: 0.3,
                  easing: 'cubicIn'
                },
                {
                  percent: 1,
                  scaleY: 1,
                  easing: 'cubicOut'
                }
              ]
            }
          }))
        }
      ]
    }
  };

  option && myChart.setOption(option);
})
</script>

<style scoped>
#main {
  width: 800px;
  height: 800px;
}

</style>