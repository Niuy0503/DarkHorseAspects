<template>
  <div class='container question-container'>
    <el-card>
      <!-- 头部按钮区域 -->
      <BtnWrapper></BtnWrapper>
      <!-- 搜素表单区域 -->
      <Search @handleTableData="handleTableData"></Search>
      <!-- tab栏切换 -->
      <el-tabs v-model="activeName" type="card" @tab-click="getChoiceList">
        <el-tab-pane label="全部" name="first"></el-tab-pane>
        <el-tab-pane label="待审核" name="second"></el-tab-pane>
        <el-tab-pane label="已审核" name="third"></el-tab-pane>
        <el-tab-pane label="已拒绝" name="fourth"></el-tab-pane>
      </el-tabs>
      <!-- 表格部分-->
      <QuestionsTable :tableColumnList="tableColumnList" :counts="counts" :tableData="tableData" :loading="loading" :fixed="'right'" :OperationAreaHeaderAlign="'center'" :OperationAreaWidth="'200'">
        <template #OperationColumn="{row}" >
          <el-button type="text" size="small" @click="checkQuestion(row)">预览</el-button>
          <el-button type="text" size="small" :disabled="row.chkState==='通过'||row.chkState==='拒绝'" @click="showAudit(row)">审核</el-button>
          <el-button type="text" size="small" :disabled="row.publishState==='已发布'" @click="$router.push({ path: '/questions/new', query: { id: row.id } })">修改</el-button>
          <el-button type="text" size="small" @click="changePublishState(row)">{{row.publishState==='已发布'?'下架':'上架'}}</el-button>
          <el-button type="text" size="small" :disabled="row.publishState==='已发布'" @click="del(row)">删除</el-button>
        </template>
      </QuestionsTable>
      <!-- 分页组件 -->
      <el-pagination
        style="margin-top:20px;text-align: right;"
        background
        layout="prev, pager, next, sizes, jumper"
        :page-sizes="[5, 10, 20, 50]"
        :current-page.sync="page.page"
        :page-size.sync="page.pagesize"
        @size-change="getChoiceList"
        @current-change="getChoiceList"
        :total="counts">
      </el-pagination>
    </el-card>
    <!-- 试题预览 -->
    <el-dialog title="题目预览" :visible="isShowQuestion" width="900px" @close="isShowQuestion=false">
      <QuestionsPreview :handeldata="handelData" v-if="isShowQuestion"></QuestionsPreview>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="isShowQuestion = false">关闭</el-button>
      </div>
    </el-dialog>
    <!-- 试题审核 -->
    <Audit :isShowAudit="isShowAudit" @closeAudit="closeAudit" @choiceCheck="audit"></Audit>
  </div>
</template>

<script>
import BtnWrapper from '../components/questions/btn-wrapper.vue'
import Search from '../components/questions/search.vue'
import QuestionsTable from '../components/questions/questions-table.vue'
import Audit from '../components/questions/audit.vue'
import { choice as getChoiceList, choiceCheck, choicePublish, remove } from '@/api/hmmm/questions'
import { formatData } from '@/utils/formatData'
import QuestionsPreview from '../components/questions-preview.vue'
export default {
  components: { BtnWrapper, Search, QuestionsTable, QuestionsPreview, Audit },
  name: 'questionsChoice',
  data () {
    return {
      isShowQuestion: false,
      isShowAudit: false,
      activeName: 'first',
      page: {
        page: 1,
        pagesize: 5
      },
      searchFormData: {},
      counts: 0,
      tableColumnList: [
        { label: '试题编号', width: 120, prop: 'number' },
        { label: '学科', width: 120, prop: 'subject' },
        { label: '目录', width: 120, prop: 'catalog' },
        { label: '题型', width: 120, prop: 'questionType' },
        { label: '题干', width: 280, prop: 'question' },
        { label: '录入时间', width: 180, prop: 'addDate' },
        { label: '难度', width: 80, prop: 'difficulty' },
        { label: '录入人', width: 120, prop: 'creator' },
        { label: '审核状态', width: 120, prop: 'chkState' },
        { label: '审核意见', width: 150, prop: 'chkRemarks' },
        { label: '审核人', width: 120, prop: 'chkUser' },
        { label: '发布状态', width: 150, prop: 'publishState' }
      ],
      tableData: [],
      handelData: {},
      loading: false,
      auditId: ''
    }
  },
  created () {
    this.getChoiceList()
  },
  methods: {
    handleTableData (data) {
      this.searchFormData = data
      this.getChoiceList()
    },
    async getChoiceList () {
      const { data } = await getChoiceList({ ...this.page, ...this.searchFormData, chkState: this.chkState })
      console.log(data)
      this.counts = data.counts
      this.tableData = formatData(data.items)
      if (this.counts > 0 && this.tableData.length === 0) {
        this.page.page--
        this.getChoiceList()
      }
    },
    checkQuestion (row) {
      console.log(row)
      this.handelData = row
      this.isShowQuestion = true
    },
    // 审核
    async audit (data) {
      try {
        this.isShowAudit = false
        await choiceCheck({ id: this.auditId, ...data })
        this.getChoiceList()
      } catch (error) {
        console.log(error)
      }
    },
    // 关闭审核提示框
    closeAudit () {
      this.isShowAudit = false
    },
    showAudit (row) {
      this.auditId = row.id
      this.isShowAudit = true
    },
    // 弹出上下架提示框
    changePublishState (row) {
      const state = row.publishState
      this.$confirm(`你确认${state === '待发布' ? '上架' : '下架'}这道题目吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await choicePublish({ id: row.id, publishState: state === '待发布' ? 1 : 0 })
        this.getChoiceList()
        this.$message({
          type: 'success',
          message: '上架成功!'
        })
      }).catch(() => {
      })
    },
    // 删除题目
    async del (row) {
      this.$confirm('此操作将永久删除该题目', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await remove({ id: row.id })
        this.getChoiceList()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
      })
    }
  },
  computed: {
    chkState () {
      return this.activeName === 'first' ? null : this.activeName === 'second' ? 0 : this.activeName === 'third' ? 1 : 2
    }
  }
}
</script>

<style scoped lang='less'></style>
