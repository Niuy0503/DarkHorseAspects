<template>
<!-- 标签管理 -->
  <div class='container'>
     <el-card>
       <el-row>
        <el-col :span="18">
          <el-form :inline="true"  class="demo-form-inline">
            <el-form-item label="学科名称">
            <el-input type="text"
              placeholder="请输入内容"
              v-model="keywords">
              </el-input>
            </el-form-item>
            <el-form-item>
            <el-button plain @click="keywords = ''">清除</el-button>
            </el-form-item>
            <el-form-item>
            <el-button type="primary" >搜索</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6" style="text-align:right">
          <el-button type="success" icon="el-icon-edit" >新增学科</el-button>
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
    :data="list"
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
      prop="subjectName"
      label="标签名称"
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
      prop="twoLevelDirectory"
      label="状态"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="操作"
      width="150">
      <template>
        <el-button type="text">禁用</el-button>
        <el-button type="text" >修改</el-button>
        <el-button type="text">删除</el-button>
        </template>
    </el-table-column>
    </el-table>
    <!-- <PageTool :total="counts"
    :paginationPage="page"
    :paginationPagesize="pagesize"
    @pageChange="changePage"
    @pageSizeChange="changePageSize">
    </PageTool> -->
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      keywords: ''

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
}
</style>
