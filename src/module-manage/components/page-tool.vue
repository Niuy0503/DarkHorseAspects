<template>
  <div class="pages">
    <el-pagination
      background
      @size-change="onPageSizeChange"
      @current-change="onPageChange"
      :current-page="Number(paginationPage)"
      :total="Number(total)"
      :page-size="Number(paginationPagesize)"
      :page-sizes="[2, 4, 6, 8, 10]"
      layout="sizes, prev, pager, next, jumper"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: 'PageTool',
  props: ['total', 'paginationPage', 'paginationPagesize'],
  data () {
    return {
    }
  },
  methods: {
    // 进入某一页
    onPageChange: function (pageNum) {
      this.$emit('pageChange', pageNum)
    },
    // 每页显示信息条数
    onPageSizeChange: function (pageSize) {
      this.$emit('pageSizeChange', pageSize)
    }
  }
}
</script>
<style>
.blue {
  color: #409eff;
}
.pages {
  margin-top: 20px;
text-align: right;
}
</style>
