<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ROUTE_NAME } from '@/router/constants'

defineOptions({ name: ROUTE_NAME.ADMIN_ERRORS })

const form = reactive({
  dateRange: '',
  level: '',
  pageUrl: '',
})
const loading = ref(false)
const tableData = ref([
  { id: 1, time: '2025-03-07 10:23:01', level: 'error', message: 'TypeError: Cannot read property "id" of undefined', pageUrl: '/dashboard', count: 3 },
  { id: 2, time: '2025-03-07 10:20:12', level: 'error', message: 'Uncaught (in promise) NetworkError', pageUrl: '/login', count: 1 },
  { id: 3, time: '2025-03-07 09:55:33', level: 'warning', message: 'Resource load failed: 404', pageUrl: '/dashboard', count: 5 },
])
</script>

<template>
  <div class="page-errors">
    <div class="filter-bar">
      <el-form :model="form" inline>
        <el-form-item label="时间范围">
          <el-date-picker
            v-model="form.dateRange"
            type="daterange"
            range-separator="-"
            start-placeholder="开始"
            end-placeholder="结束"
            value-format="YYYY-MM-DD"
            clearable
          />
        </el-form-item>
        <el-form-item label="级别">
          <el-select v-model="form.level" placeholder="全部" clearable style="width: 100px">
            <el-option label="Error" value="error" />
            <el-option label="Warning" value="warning" />
          </el-select>
        </el-form-item>
        <el-form-item label="页面 URL">
          <el-input v-model="form.pageUrl" placeholder="请输入" clearable style="width: 200px" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading">查询</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="tableData" v-loading="loading" stripe border>
      <el-table-column prop="id" label="ID" width="70" />
      <el-table-column prop="time" label="时间" width="180" />
      <el-table-column prop="level" label="级别" width="90">
        <template #default="{ row }">
          <el-tag :type="row.level === 'error' ? 'danger' : 'warning'" size="small">{{ row.level }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="message" label="错误信息" min-width="280" show-overflow-tooltip />
      <el-table-column prop="pageUrl" label="页面 URL" min-width="120" />
      <el-table-column prop="count" label="次数" width="80" />
    </el-table>
  </div>
</template>

<style scoped>
.page-errors {
  padding: 16px 0;
}
.filter-bar {
  margin-bottom: 16px;
}
</style>
