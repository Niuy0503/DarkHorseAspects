<template>
  <div>
    <el-alert
    :title="`数据一共${counts}条`"
    type="info"
    :closable="false"
    show-icon>
  </el-alert>
  <!-- 表格主体 -->
  <el-table
      :data="tableData"
      :height="height"
      style="width: 100%">
      <el-table-column
      v-for="(item,index) in tableColumnList" :key="index"
        :prop="item.prop"
        :label="item.label"
        :width="item.width">
        <template slot-scope="scope">
          <div v-html="scope.row[item.prop]"></div>
        </template>
      </el-table-column>
      <!-- 操作列 -->
      <el-table-column v-if="isShowOperation" :label="OperationArea" :width="OperationAreaWidth">
        <template slot-scope="scope">
          <slot name="OperationColumn" :row="scope.row" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    counts: {
      type: [String, Number],
      required: true
    },
    // 表格数据: 接口请求
    tableData: {
      type: Array,
      required: true
    },
    // 需要配置的表头中间列数据 :[ { label: '工单编号', prop: 'taskCode' } ]
    tableColumnList: {
      type: Array,
      required: true
    },
    // 是否显示序号列
    isShowIndex: {
      type: Boolean,
      default: true
    },
    // 修改操作列名
    OperationArea: {
      type: String,
      default: '操作'
    },
    // 加载
    loading: {
      type: Boolean,
      default: false
    },
    height: {
      type: String,
      default: null
    },
    OperationAreaWidth: {
      type: String,
      default: '100'
    },
    isShowOperation: {
      type: Boolean,
      default: true
    },
    columnIndex: {
      type: [String, Number],
      default: null
    },
    // ----------------------分页组件配置项------------------------
    totalCount: {
      type: [String, Number],
      default: 0
    },
    pageIndex: {
      type: [String, Number],
      default: 0
    },
    totalPage: {
      type: [String, Number],
      default: 0
    },
    pageSize: {
      type: [String, Number],
      default: 0
    }
  }
}
</script>

<style>

</style>
