<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ROUTE_NAME } from '@/router/constants'

defineOptions({ name: ROUTE_NAME.ADMIN_BEHAVIORS })

const form = reactive({
  dateRange: '',
  pageUrl: '',
  userId: '',
})
const loading = ref(false)
const tableData = ref([
  { id: 1, time: '2025-03-07 10:23:01', pageUrl: '/dashboard', action: 'click', target: 'button.submit', userId: 'user_001' },
  { id: 2, time: '2025-03-07 10:22:58', pageUrl: '/dashboard', action: 'scroll', target: '-', userId: 'user_002' },
  { id: 3, time: '2025-03-07 10:20:15', pageUrl: '/login', action: 'input', target: 'input#username', userId: 'user_001' },
])
</script>

<template>
  <div class="page-behaviors">
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
        <el-form-item label="页面 URL">
          <el-input v-model="form.pageUrl" placeholder="请输入" clearable style="width: 200px" />
        </el-form-item>
        <el-form-item label="用户 ID">
          <el-input v-model="form.userId" placeholder="请输入" clearable style="width: 140px" />
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
      <el-table-column prop="pageUrl" label="页面 URL" min-width="120" />
      <el-table-column prop="action" label="行为类型" width="100" />
      <el-table-column prop="target" label="目标元素" min-width="140" />
      <el-table-column prop="userId" label="用户 ID" width="100" />
    </el-table>
  </div>
</template>

<style scoped>
.page-behaviors {
  padding: 16px 0;
}
.filter-bar {
  margin-bottom: 16px;
}
</style>
