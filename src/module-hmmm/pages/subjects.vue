<template>
  <div class='container'>
    <el-card>
       <el-row>
        <el-col :span="18">
          <el-form :inline="true"  class="demo-form-inline">
            <el-form-item label="学科名称">
            <el-input placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item>
            <el-button plain>清除</el-button>
            </el-form-item>
            <el-form-item>
            <el-button type="primary">搜索</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6" style="text-align:right">
          <el-button type="success" icon="el-icon-edit">新增学科</el-button>
        </el-col>
      </el-row>
       <el-alert
       title="数据一共16条"
       type="info"
       show-icon
       :closable="false"
       style="margin-bottom: 15px;">
      </el-alert>
       <el-table
    :data="list"
    style="width: 100%">
    <el-table-column
      type="index"
      label="序号"
      width="48">
    </el-table-column>
    <el-table-column
      prop="subjectName"
      label="学科名称"
      width="140">
    </el-table-column>
    <el-table-column
      prop="username"
      label="创建者"
      width="140">
    </el-table-column>
    <el-table-column
      prop="addDate"
      label="创建日期"
      width="150">
      <template slot-scope="{row}">
      {{row.addDate|parseTimeByString}}
      </template>
    </el-table-column>
    <el-table-column
      prop="isFrontDisplay"
      label="前台是否显示"
      width="140">
    </el-table-column>
    <el-table-column
      prop="twoLevelDirectory"
      label="二级目录"
      width="140">
    </el-table-column>
    <el-table-column
      prop="tags"
      label="标签"
      width="140">
    </el-table-column>
    <el-table-column
      prop="totals"
      label="题目数量"
      width="140">
    </el-table-column>
    <el-table-column
      prop="address"
      label="操作"
      width="240">
      <el-button type="text">学科分类</el-button>
      <el-button type="text">学科标签</el-button>
      <el-button type="text">修改</el-button>
      <el-button type="text">删除</el-button>
    </el-table-column>
    </el-table>
    <PageTool :total="counts"
    :paginationPage="page"
    :paginationPagesize="pagesize"
    @pageChange="changePage"
    @pageSizeChange="changePageSize">
    </PageTool>
    </el-card>
  </div>
</template>

<script>
import { list } from '@/api/hmmm/subjects.js'
import PageTool from '../components/pageTool.vue'
export default {
  components: { PageTool },
  data () {
    return {
      page: 1, // 当前页
      pagesize: 10, // 页面大小
      pages: 1, // 总页数
      counts: 0, // 总记录数
      list: [] // 学科列表
    }
  },
  created () {
    this.getSubjectDetails()
  },
  methods: {
    // 获取学科列表
    async getSubjectDetails () {
      try {
        const { data } = await list({
          page: this.page,
          pagesize: this.pagesize
        })
        console.log(data)
        this.page = data.page
        this.pagesize = data.pagesize
        this.pages = data.pages
        this.counts = data.counts
        this.list = data.items
      } catch (error) {
        console.log(error)
      }
    },
    // 进入下一页
    changePage (num) {
      this.page = num
      this.getSubjectDetails()
    },
    // 每页显示信息条数
    changePageSize (size) {
      this.pagesize = size
      this.getSubjectDetails()
    }
  }

}
</script>

<style scoped lang='less'>
.container{
.el-button--medium {
    padding: 9px 15px;
    font-size: 14px;
    border-radius: 4px;
}
.el-table thead {
    color: #909399;
    font-weight: 500;
}
.el-button--text {
    color: #409eff;
    background: 0 0;
    padding-left: 0;
    padding-right: 0;
}
:deep(.el-table__header){
  width: 1298px!important;
}
:deep(.el-table__body){
  width: 1298px !important;
}

:deep(.el-table th.el-table__cell.is-leaf) {
    border-bottom: 2px solid #EBEEF5;
}
:deep(.el-table th) {
    background-color: #fafafa;
}
}
</style>
