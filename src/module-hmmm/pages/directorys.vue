<template>
<!-- 目录管理 -->
  <div class='container'>
     <el-card>
       <el-row>
        <el-col :span="18">
          <el-form :inline="true" :model="fromData" class="demo-form-inline">
             <el-form-item label="目录名称">
          <el-input v-model="fromData.directoryName"></el-input>
          </el-form-item>
          <el-form-item label="状态">
          <el-select v-model="fromData.state" placeholder="请选择">
            <el-option label="启用" :value="1"></el-option>
            <el-option label="禁用" :value="0"></el-option>
          </el-select>
          </el-form-item>
            <el-form-item>
            <el-button plain @click="keywords = ''">清除</el-button>
            </el-form-item>
            <el-form-item>
            <el-button type="primary">搜索</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6" style="text-align:right">
          <el-button type="success" icon="el-icon-edit" @click="addDirectorys">新增目录</el-button>
        </el-col>
      </el-row>
       <el-alert
       :title="`数据一共${counts}条`"
       type="info"
       show-icon
       :closable="false"
       style="margin-bottom: 15px;">
      </el-alert>
       <el-table
    :data="directorysList"
    style="width: 100%">
    <el-table-column
      type="index"
      label="序号"
      width="80">
    </el-table-column>
    <el-table-column
      prop="subjectName"
      label="所属学科"
      width="178">
    </el-table-column>
    <el-table-column
      prop="directoryName"
      label="目录名称"
      width="174">
    </el-table-column>
    <el-table-column
      prop="username"
      label="创建者"
      width="174">
    </el-table-column>
    <el-table-column
      prop="addDate"
      label="创建日期"
      width="180">
      <template slot-scope="{row}">
      {{row.addDate|parseTimeByString}}
      </template>
    </el-table-column>
    <el-table-column
      prop="totals"
      label="面试题数量"
      width="180">
    </el-table-column>
    <el-table-column
      prop="state"
      label="状态"
      width="180">
    </el-table-column>
    <el-table-column
      label="操作"
      width="150">
      <template>
        <el-button type="text">禁用</el-button>
        <el-button type="text">修改</el-button>
        <el-button type="text">删除</el-button>
        </template>
    </el-table-column>
      </el-table>
    <PageTool :total="counts"
    :paginationPage="page"
    :paginationPagesize="pagesize"
    @pageChange="changePage"
    @pageSizeChange="changePageSize">
    </PageTool>
    </el-card>
    <directorys-add :dialog-visible.sync="dialogVisible"></directorys-add>
  </div>
</template>

<script>
import { list } from '@/api/hmmm/directorys.js'
import PageTool from '../components/pageTool.vue'
import DirectorysAdd from '../components/directorys-add.vue'
export default {
  components: { PageTool, DirectorysAdd },
  data () {
    return {
      keywords: '', // 输入框关键词
      fromData: {
        directoryName: '', // 目录名称
        state: ''// 状态
      },
      page: 1, // 当前页
      pagesize: 10, // 页面大小
      pages: 1, // 总页数
      counts: 0, // 总记录数
      directorysList: [], // 目录列表
      dialogVisible: false
    }
  },
  created () {
    this.getDirectoyrs()
  },
  methods: {
    // 获取目录列表
    async getDirectoyrs () {
      try {
        const { data } = await list({
          page: this.page,
          pagesize: this.pagesize
        })
        this.directorysList = data.items
        this.page = data.page
        this.pagesize = data.pagesize
        this.pages = data.pages
        this.counts = data.counts
      } catch (error) {
        console.log(error)
      }
    },
    // 新增目录
    addDirectorys () {
      console.log(11)
      this.dialogVisible = true
    },
    // 进入下一页
    changePage (num) {
      this.page = num
      this.getDirectoyrs()
    },
    // 每页显示信息条数
    changePageSize (size) {
      this.pagesize = size
      this.getDirectoyrs()
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
  width: 100%!important;
}
:deep(.el-table__body){
  width: 100% !important;
}

:deep(.el-table th.el-table__cell.is-leaf) {
    border-bottom: 2px solid #EBEEF5;
}
:deep(.el-table th) {
    background-color: #fafafa;
}
.pages{
  margin-top: 20px;
  text-align: right;
}
:deep(.el-form-item__label){
  width:80px;
}
}
</style>
