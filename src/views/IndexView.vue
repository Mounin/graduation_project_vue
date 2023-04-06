<template>
  <div class="index-body">
    <el-container class="layout-container-demo">
      <el-header style="text-align: right; font-size: 12px">
        <div class="logo">
          <img src="../assets/icons/logo.png" alt="logo" height="50" width="50">
        </div>
        <div class="title">
          <p>微服务监控系统</p>
        </div>
        <div class="toolbar">
          <el-dropdown>
            <el-icon style="margin-right: 8px; margin-top: 1px;" color="white"
            ><setting
            /></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <!--     用户名 -->
          <!--            <span>user</span>-->
        </div>
      </el-header>

      <!-- 设置 --->
      <el-container>
        <el-aside width="200px">
          <el-scrollbar>
            <el-menu :default-openeds="['1', '2']" class="aside-menu">
              <!-- Prometheus选项 --->
              <el-sub-menu index="1" class="prometheus-group">
                <template #title>
                  <el-icon><Monitor /></el-icon>
                  <p>Prometheus</p>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="1-1"
                                :class="{ hoverSingle: hoverIndex === '1-1', selectSingle: selectIndex === '1-1' }"
                                @mouseover="hoverSingle"
                                @mouseout="outHoverSingle"
                                @click="singlePointMonitor">单点监控</el-menu-item>
                  <el-menu-item index="1-2"
                                :class="{ hoverContinue: hoverIndex === '1-2', selectContinue: selectIndex === '1-2' }"
                                @mouseover="hoverContinue"
                                @mouseout="outHoverContinue"
                                @click="continuousMonitor">连续监控</el-menu-item>
                </el-menu-item-group>
              </el-sub-menu>
              <!-- Jaeger选项 --->
              <el-sub-menu index="2" class="jaeger-group">
                <template #title>
                  <el-icon><Position /></el-icon>
                  <p>Jaeger</p>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="2-1"
                                :class="{ hoverDrawPath: hoverIndex === '2-1', selectDrawPath: selectIndex === '2-1' }"
                                @mouseover="hoverDrawPath"
                                @mouseout="outHoverDrawPath"
                                @click="drawPath">调用路径</el-menu-item>
                  <el-menu-item index="2-2"
                                :class="{ hoverMonitor: hoverIndex === '2-2', selectMonitor: selectIndex === '2-2' }"
                                @mouseover="hoverMonitor"
                                @mouseout="outHoverMonitor"
                                @click="resourceMonitor">资源监控</el-menu-item>
                </el-menu-item-group>
              </el-sub-menu>
            </el-menu>
          </el-scrollbar>
        </el-aside>

        <el-main>
          <el-scrollbar>
            <!-- 显示内容 -->
            <!-- 单点监控 -->
            <div class="singlePoint" v-if="showContent === 'singlePointMonitor'">
              <SinglePointMonitor />
            </div>
            <!-- 连续监控 -->
            <div class="continuity" v-else-if="showContent === 'continuousMonitor'">
              <ContinuousMonitor />
            </div>
            <!-- 调用路径 -->
            <div class="singlePoint" v-else-if="showContent === 'drawPath'">
              <DrawPath />
            </div>
            <!-- 资源监控 -->
            <div class="continuity" v-else-if="showContent === 'resourceMonitor'">
              <ResourceMonitor />
            </div>
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Menu as IconMenu, Message, Setting, Monitor, Position } from '@element-plus/icons-vue'
import SinglePointMonitor from '../components/SinglePointMonitor.vue'
import ContinuousMonitor from '../components/ContinuousMonitor.vue'
import DrawPath from '../components/DrawPath.vue'
import ResourceMonitor from '../components/ResourceMonitor.vue'
import router from "@/router";

const hoverIndex = ref('')
const selectIndex = ref('')

// 侧边栏选项卡
let showContent = ref("singlePointMonitor")

const hoverSingle = () => {
  hoverIndex.value = '1-1'
}
const outHoverSingle = () => {
  hoverIndex.value = ''
}
const singlePointMonitor = () => {
  showContent.value = "singlePointMonitor";
  selectIndex.value = '1-1';
}

const hoverContinue = () => {
  hoverIndex.value = '1-2'
}
const outHoverContinue = () => {
  hoverIndex.value = ''
}
const continuousMonitor = () => {
  showContent.value = "continuousMonitor";
  selectIndex.value = '1-2';
}

const hoverDrawPath = () => {
  hoverIndex.value = '2-1'
}
const outHoverDrawPath = () => {
  hoverIndex.value = ''
}
const drawPath = () => {
  showContent.value = "drawPath";
  selectIndex.value = '2-1';
}

const hoverMonitor = () => {
  hoverIndex.value = '2-2'
}
const outHoverMonitor = () => {
  hoverIndex.value = ''
}
const resourceMonitor = () => {
  showContent.value = "resourceMonitor";
  selectIndex.value = '2-2';
}

const logout = () => {
  router.push('/login')
}
</script>

<style scoped lang="less">
.layout-container-demo {

  .el-header {
    position: relative;
    display: inline-flex;
    background-color: #3c444d;
    border-radius: 10px 10px 0 0;
    justify-content: space-between;

    .title {
      color: #f8f8f8;
      font-size: large;
    }

    .toolbar {
      margin: auto 0;
    }
  }

  .el-aside {
    background-color: #3c444d;
  }
}

.aside-menu {
  background-color: #3c444d;

  .hoverPrometheus {
    background-color: #ebf5ff;
    color: #409eff;
  }

  .hoverJaeger {
    background-color: #ebf5ff;
    color: #409eff;
  }

  .prometheus-group {
    .el-sub-menu__title {
      background-color: #282828;
    }

    .el-icon {
      color: #c8c9cc;
      font-weight: bold;
    }

    p {
      color: #c8c9cc;
    }

    .el-menu-item-group {
      background-color: #3c444d;

      .el-menu-item {
        color: white;
      }
      .hoverSingle {
        background-color: #ebf5ff;
        color: #409eff;
      }

      .selectSingle {
        background-color: #ebf5ff;
        color: #409eff;
      }

      .hoverContinue {
        background-color: #ebf5ff;
        color: #409eff;
      }

      .selectContinue {
        background-color: #ebf5ff;
        color: #409eff;
      }
    }
  }

  .jaeger-group {

    .el-icon {
      color: #c8c9cc;
      font-weight: bold;
    }

    p {
      color: #c8c9cc;
    }

    .el-menu-item-group {
      background-color: #3c444d;

      .el-menu-item {
        color: white;
      }

      .hoverDrawPath {
        background-color: #ebf5ff;
        color: #409eff;
      }

      .selectDrawPath  {
        background-color: #ebf5ff;
        color: #409eff;
      }

      .hoverMonitor {
        background-color: #ebf5ff;
        color: #409eff;
      }

      .selectMonitor {
        background-color: #ebf5ff;
        color: #409eff;
      }
    }
  }
}

.el-main {
  background-color: #f5f6fa;
}
</style>
