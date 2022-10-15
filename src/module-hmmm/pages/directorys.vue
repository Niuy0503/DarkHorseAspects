<template>
<!-- 目录管理 -->
  <div class='container'>
     <el-card>
       <el-row>
        <el-col :span="18">
          <el-form :inline="true" :model="fromData"  class="demo-form-inline">
             <el-form-item label="目录名称" prop="directoryName">
          <el-input v-model="fromData.directoryName"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="state">
          <el-select v-model="fromData.state" placeholder="请选择">
           <el-option label="启用" :value="1"></el-option>
           <el-option label="禁用" :value="0"></el-option>
          </el-select>
          </el-form-item>
            <el-form-item>
            <el-button plain @click="clearFormData">清除</el-button>
            </el-form-item>
            <el-form-item>
            <el-button type="primary" @click="getDirectoyrs">搜索</el-button>
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
      width="180"
      :formatter="formatterFn">
    </el-table-column>
    <el-table-column
      label="操作"
      width="150">
      <template slot-scope="{row}">
        <el-button type="text" @click="changeState(row)">{{row.state === 1?'启用':'禁用'}}</el-button>
        <el-button type="text" @click="editDirectorys(row)" :disabled="row.state === 0">修改</el-button>
        <el-button type="text" @click="delDirectorys(row)" :disabled="row.state === 0">删除</el-button>
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
    <directorys-add ref="addDirectorys" :dialog-visible.sync="dialogVisible" @refreshList="getDirectoyrs"></directorys-add>
  </div>
</template>

<script>
import { list, remove, changeState } from '@/api/hmmm/directorys.js'
import PageTool from '../components/pageTool.vue'
import DirectorysAdd from '../components/directorys-add.vue'
import { status } from '@/api/hmmm/constants.js'

export default {
  name: 'directorys',
  components: { PageTool, DirectorysAdd },
  data () {
    return {
      fromData: {
        directoryName: null, // 目录名称
        state: null // 状态
      },
      page: 1, // 当前页
      pagesize: 10, // 页面大小
      pages: 1, // 总页数
      counts: 0, // 总记录数
      directorysList: [], // 目录列表
      dialogVisible: false,
      statusList: status
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
          pagesize: this.pagesize,
          // subiectId: this.subjectID,
          directoryName: this.fromData.directoryName,
          state: this.fromData.state
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
    // 清空搜索框
    clearFormData () {
      this.fromData = {
        directoryName: null,
        state: null
      }
    },
    // 格式化状态
    formatterFn (row, column, cellValue) {
      const res = this.statusList.find(ele => ele.value !== cellValue)
      return res ? '已' + res.label : ''
    },
    // 点击改变状态
    async changeState (row) {
      // row.state = !this.status
      try {
        this.status = row.state === 1 ? 0 : 1
        await changeState({
          id: row.id,
          state: this.status
        })
        // 刷新列表
        this.getDirectoyrs()
      } catch (error) {
        console.log(error)
      }
    },
    // 新增目录
    addDirectorys () {
      this.dialogVisible = true
    },
    // 修改目录
    editDirectorys (row) {
      this.$refs.addDirectorys.formData = { ...row }
      // 打开弹窗
      this.dialogVisible = true
    },
    // 删除目录
    async delDirectorys (row) {
      try {
        await this.$confirm('此操作将永久删除该目录, 是否继续?', '提示', {
          type: 'warning'
        })
        // 调用接口
        await remove(row)
        this.$message.success('删除成功')
        // 刷新列表
        this.getDirectoyrs()
      } catch (error) {
        console.log(error)
      }
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
