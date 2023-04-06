<template>
  <el-container class="layout-container-demo" style="height: 800px">
    <el-aside width="200px">
      <el-scrollbar>
        <el-menu :default-openeds="['1', '2']">
          <!-- Prometheus选项 --->
          <el-sub-menu index="1">
            <template #title>
              <el-icon><message /></el-icon>Prometheus
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1" @click="singlePointMonitor">单点监控</el-menu-item>
              <el-menu-item index="1-2" @click="continuousMonitor">连续监控</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <!-- Jaeger选项 --->
          <el-sub-menu index="2">
            <template #title>
              <el-icon><icon-menu /></el-icon>Jaeger
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1" @click="drawPath">调用路径</el-menu-item>
              <el-menu-item index="2-2" @click="resourceMonitor">资源监控</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>
    <!-- 设置 --->
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <div class="headerContent">
          <!-- 标题内容 -->
          <h1 v-if="showContent === 'singlePointMonitor'">单点监控</h1>
          <h1 v-else-if="showContent === 'continuousMonitor'">连续监控</h1>
          <h1 v-else-if="showContent === 'drawPath'">调用路径</h1>
          <h1 v-else-if="showContent === 'resourceMonitor'">资源监控</h1>
        </div>
        <div class="toolbar">
          <el-dropdown>
            <el-icon style="margin-right: 8px; margin-top: 1px"
            ><setting
            /></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <!-- 用户名 -->
<!--          <span>user</span>-->
        </div>
      </el-header>

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
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'
import SinglePointMonitor from '../components/SinglePointMonitor.vue'
import ContinuousMonitor from '../components/ContinuousMonitor.vue'
import DrawPath from '../components/DrawPath.vue'
import ResourceMonitor from '../components/ResourceMonitor.vue'
import router from "@/router";

// 侧边栏选项卡
let showContent = ref("singlePointMonitor")
function singlePointMonitor() {
  showContent.value = "singlePointMonitor";
}
function continuousMonitor() {
  showContent.value = "continuousMonitor";
}
function drawPath() {
  showContent.value = "drawPath";
}
function resourceMonitor() {
  showContent.value = "resourceMonitor";
}

const logout = () => {
  router.push('/login')
}
</script>

<style scoped>
.layout-container-demo .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
  display: inline-flex;
}
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}

.headerContent {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
