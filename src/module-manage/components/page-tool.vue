<template>
  <div class="pages">
    <el-pagination
      background
      @size-change="onPageSizeChange"
      @current-change="onPageChange"
      :current-page="Number(paginationPage)"
      :total="Number(total)"
      :page-size="Number(paginationPagesize)"
<<<<<<< HEAD
      :page-sizes="[2, 4, 6, 8, 10]"
      layout="sizes, prev, pager, next, jumper"
    >
    </el-pagination>
=======
      :page-sizes="[2,3,5, 10]"
      layout="prev, pager, next, sizes,jumper"
      >
      </el-pagination>
>>>>>>> e7f21374dfda5eb15425dc56566d22073f5d7677
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
<<<<<<< HEAD
.blue {
  color: #409eff;
}
.pages {
  margin-top: 20px;
text-align: right;
=======
.blue{color: #409EFF;}
.pages {
  margin-top: 20px;
  text-align: right;
>>>>>>> e7f21374dfda5eb15425dc56566d22073f5d7677
}
</style>
