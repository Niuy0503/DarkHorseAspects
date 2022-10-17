<template>
<!-- 学科管理 -->
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
            <el-button type="primary" @click="getSubjectDetails">搜索</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6" style="text-align:right">
          <el-button type="success" icon="el-icon-edit" @click="addSubjects">新增学科</el-button>
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
      width="140"
      :formatter="formatterFn">
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
      label="操作"
      width="240">
      <template slot-scope="{row}">
        <el-button type="text" @click="goDirectorys(row)">学科分类</el-button>
        <el-button type="text" @click="goTags(row)">学科标签</el-button>
        <el-button type="text" @click="editSubject(row)">修改</el-button>
        <el-button type="text" @click="delSubject(row)">删除</el-button>
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
    <subjects-add ref="addSubject" :dialogVisible.sync="dialogVisible" @refreshList="getSubjectDetails"></subjects-add>
  </div>
</template>

<script>
import { list, remove } from '@/api/hmmm/subjects.js'
import PageTool from '../components/pageTool.vue'
import SubjectsAdd from '../components/subjects-add.vue'
export default {
  name: 'subjects',
  components: { PageTool, SubjectsAdd },
  data () {
    return {
      keywords: '', // 搜索框内容
      page: 1, // 当前页
      pagesize: 10, // 页面大小
      pages: 1, // 总页数
      counts: 0, // 总记录数
      list: [], // 学科列表
      FrontDisplay: [
        {
          id: 0,
          value: '否'
        },
        {
          id: 1,
          value: '是'
        }
      ],
      dialogVisible: false
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
          pagesize: this.pagesize,
          subjectName: this.keywords
        })
        this.page = data.page
        this.pagesize = data.pagesize
        this.pages = data.pages
        this.counts = data.counts
        this.list = data.items
      } catch (error) {
        console.log(error)
      }
    },
    formatterFn (row, column, cellValue) {
      const res = this.FrontDisplay.find(ele => ele.id === cellValue)
      return res ? res.value : ''
    },
    // 新增学科
    addSubjects () {
      this.dialogVisible = true
    },
    // 修改学科
    editSubject (row) {
      this.$refs.addSubject.formDate = { ...row }
      // 打开弹窗
      this.dialogVisible = true
    },
    // 删除学科
    async delSubject (row) {
      try {
        await this.$confirm('你确定永久删除该学科信息吗？', '提示', {
          type: 'warning'
        })
        // 调用删除接口
        await remove(row)
        this.$message.success('删除成功')
        // 刷新页面
        this.getSubjectDetails()
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
    },
    // 跳转到目录页面
    goDirectorys (row) {
      this.$router.push({
        path: '/subjects/directorys',
        query: { id: row.id, name: row.subjectName }
      })
    },
    // 跳转到标签页面
    goTags (row) {
      this.$router.push({
        path: '/subjects/tags',
        query: { id: row.id, name: row.subjectName }
      })
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
