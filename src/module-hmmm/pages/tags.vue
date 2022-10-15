<template>
<!-- 标签管理 -->
  <div class='container'>
     <el-card>
      <div slot="header" class="clearfix" v-if="isShowHeader">
       <span style="font-size: 14px;line-height: 1;">
        <span>学科管理</span>
       <i style="color: #c0c4cc;" class="el-icon-arrow-right"></i>
       </span>
        <span style="font-size: 14px;line-height: 1;">
        <span>学科名称</span>
       <i style="color: #c0c4cc;" class="el-icon-arrow-right"></i>
       </span>
        <span style="font-size: 14px;line-height: 1;">
        <span>标签管理</span>
       </span>
       </div>
       <el-row>
        <el-col :span="18">
          <el-form :inline="true" :model="fromData"  class="demo-form-inline">
             <el-form-item label="标签名称" prop="tagName">
          <el-input v-model="fromData.tagName"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="state">
          <el-select v-model="fromData.state" placeholder="请选择">
           <el-option label="启用" :value="0"></el-option>
           <el-option label="禁用" :value="1"></el-option>
          </el-select>
          </el-form-item>
            <el-form-item>
            <el-button plain @click="clearFormData">清除</el-button>
            </el-form-item>
            <el-form-item>
            <el-button type="primary" @click="getTags">搜索</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6" style="text-align:right">
          <el-button type="text" icon="el-icon-back" @click="$router.go(-1)" v-if="isShow">返回学科</el-button>
          <el-button type="success" icon="el-icon-edit" @click="addTags">新增标签</el-button>
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
    :data="tagsList"
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
      prop="tagName"
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
        <el-button type="text" @click="editTags(row)" :disabled="row.state === 0">修改</el-button>
        <el-button type="text" @click="delTags(row)" :disabled="row.state === 0">删除</el-button>
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
    <directorys-add ref="addTags" :dialog-visible.sync="dialogVisible" @refreshList="getTags"></directorys-add>
  </div>
</template>

<script>
import { list, remove, changeState } from '@/api/hmmm/tags.js'
import PageTool from '../components/pageTool.vue'
import DirectorysAdd from '../components/tags-add.vue'
import { status } from '@/api/hmmm/constants.js'

export default {
  name: 'directorys',
  components: { PageTool, DirectorysAdd },
  data () {
    return {
      fromData: {
        tagName: null, // 目录名称
        state: null // 状态
      },
      page: '1', // 当前页
      pagesize: '10', // 页面大小
      pages: 1, // 总页数
      counts: 0, // 总记录数
      tagsList: [], // 目录列表
      dialogVisible: false,
      statusList: status,
      isShowHeader: false,
      isShow: false
    }
  },
  created () {
    this.getTags()
  },
  methods: {
    // 获取标签列表
    async getTags () {
      try {
        const { data } = await list({
          page: this.page,
          pagesize: this.pagesize,
          // subiectId: this.subjectID,
          tagName: this.fromData.tagName,
          state: this.fromData.state
        })
        this.tagsList = data.items
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
        this.getTags()
      } catch (error) {
        console.log(error)
      }
    },
    // 新增目录
    addTags () {
      this.dialogVisible = true
    },
    // 修改目录
    editTags (row) {
      this.$refs.addTags.formData = { ...row }
      // 打开弹窗
      this.dialogVisible = true
    },
    // 删除目录
    async delTags (row) {
      try {
        await this.$confirm('此操作将永久删除该标签, 是否继续?', '提示', {
          type: 'warning'
        })
        // 调用接口
        await remove(row)
        this.$message.success('删除成功')
        // 刷新列表
        this.getTags()
      } catch (error) {
        console.log(error)
      }
    },
    // 进入下一页
    changePage (num) {
      this.page = num
      this.getTags()
    },
    // 每页显示信息条数
    changePageSize (size) {
      this.pagesize = size
      this.getTags()
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
