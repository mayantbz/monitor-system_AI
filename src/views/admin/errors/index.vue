<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { ROUTE_NAME } from '@/router/constants'

defineOptions({ name: ROUTE_NAME.ADMIN_ERRORS })

const { t } = useI18n()

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
        <el-form-item :label="t('admin.errors.timeRange')">
          <el-date-picker
            v-model="form.dateRange"
            type="daterange"
            range-separator="-"
            :start-placeholder="t('common.start')"
            :end-placeholder="t('common.end')"
            value-format="YYYY-MM-DD"
            clearable
          />
        </el-form-item>
        <el-form-item :label="t('admin.errors.level')">
          <el-select v-model="form.level" :placeholder="t('common.all')" clearable style="width: 100px">
            <el-option :label="t('admin.errors.levelError')" value="error" />
            <el-option :label="t('admin.errors.levelWarning')" value="warning" />
          </el-select>
        </el-form-item>
        <el-form-item :label="t('admin.errors.pageUrl')">
          <el-input v-model="form.pageUrl" :placeholder="t('common.pleaseInput')" clearable style="width: 200px" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading">{{ t('common.search') }}</el-button>
          <el-button>{{ t('common.reset') }}</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="tableData" v-loading="loading" stripe border>
      <el-table-column prop="id" label="ID" width="70" />
      <el-table-column prop="time" :label="t('admin.errors.time')" width="180" />
      <el-table-column prop="level" :label="t('admin.errors.level')" width="90">
        <template #default="{ row }">
          <el-tag :type="row.level === 'error' ? 'danger' : 'warning'" size="small">
            {{ row.level === 'error' ? t('admin.errors.levelError') : t('admin.errors.levelWarning') }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="message" :label="t('admin.errors.message')" min-width="280" show-overflow-tooltip />
      <el-table-column prop="pageUrl" :label="t('admin.errors.pageUrl')" min-width="120" />
      <el-table-column prop="count" :label="t('admin.errors.count')" width="80" />
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
