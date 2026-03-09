<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { ROUTE_NAME } from '@/router/constants'

defineOptions({ name: ROUTE_NAME.ADMIN_BEHAVIORS })

const { t } = useI18n()

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
        <el-form-item :label="t('admin.behaviors.timeRange')">
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
        <el-form-item :label="t('admin.behaviors.pageUrl')">
          <el-input v-model="form.pageUrl" :placeholder="t('common.pleaseInput')" clearable style="width: 200px" />
        </el-form-item>
        <el-form-item :label="t('admin.behaviors.userId')">
          <el-input v-model="form.userId" :placeholder="t('common.pleaseInput')" clearable style="width: 140px" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading">{{ t('common.search') }}</el-button>
          <el-button>{{ t('common.reset') }}</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="tableData" v-loading="loading" stripe border>
      <el-table-column prop="id" label="ID" width="70" />
      <el-table-column prop="time" :label="t('admin.behaviors.time')" width="180" />
      <el-table-column prop="pageUrl" :label="t('admin.behaviors.pageUrl')" min-width="120" />
      <el-table-column prop="action" :label="t('admin.behaviors.actionType')" width="100" />
      <el-table-column prop="target" :label="t('admin.behaviors.targetElement')" min-width="140" />
      <el-table-column prop="userId" :label="t('admin.behaviors.userId')" width="100" />
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
