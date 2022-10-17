<template>
  <div class='container question-container'>
    <el-card>
      <!-- 头部按钮区域 -->
      <BtnWrapper></BtnWrapper>
      <!-- 搜素表单区域 -->
      <Search @handleTableData="handleTableData"></Search>
      <!-- 表格区域 -->
      <QuestionsTable :tableColumnList="tableColumnList" :counts="counts" :tableData="tableData" :loading="loading">
      <template #OperationColumn="row">
        <el-button type="primary" icon="el-icon-view" circle plain size="small" @click="checkQuestion(row)"></el-button>
        <el-button type="success" icon="el-icon-edit" circle plain size="small" @click="$router.push({ path: '/questions/new', query: { id: row.row.id } })"></el-button>
        <el-button type="danger" icon="el-icon-delete" circle plain size="small" @click="removeQuestion(row)"></el-button>
        <el-button type="warning" icon="el-icon-check" circle plain size="small" @click="choiceAdd(row)"></el-button>
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
        @size-change="getQuestionsList"
        @current-change="getQuestionsList"
        :total="counts">
      </el-pagination>
    </el-card>
    <!-- 弹出层 -->
    <el-dialog title="题目预览" :visible="isShowQuestion" width="900px" @close="isShowQuestion=false">
      <QuestionsPreview :handeldata="handelData" v-if="isShowQuestion"></QuestionsPreview>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="isShowQuestion = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import BtnWrapper from '../components/questions/btn-wrapper.vue'
import Search from '../components/questions/search.vue'
import QuestionsTable from '../components/questions/questions-table.vue'
import { list as getQuestionsList, remove as removeQuestion, choiceAdd } from '@/api/hmmm/questions'
import { formatData } from '@/utils/formatData'
import QuestionsPreview from '../components/questions-preview.vue'
export default {
  components: { BtnWrapper, Search, QuestionsTable, QuestionsPreview },
  name: 'questions',
  data () {
    return {
      page: {
        page: 1,
        pagesize: 5
      },
      searchFormData: {},
      counts: 0,
      tableColumnList: [
        { label: '试题编号', width: 120, prop: 'number' },
        { label: '学科', width: 80, prop: 'subject' },
        { label: '目录', width: 80, prop: 'catalog' },
        { label: '题型', width: 80, prop: 'questionType' },
        { label: '题干', prop: 'question' },
        { label: '录入时间', width: 180, prop: 'addDate' },
        { label: '难度', width: 80, prop: 'difficulty' },
        { label: '录入人', width: 80, prop: 'creator' }
      ],
      tableData: [],
      handelData: {},
      isShowQuestion: false,
      loading: false
    }
  },
  created () {
    this.getQuestionsList()
  },
  methods: {
    async getQuestionsList () {
      try {
        this.loading = true
        const { data } = await getQuestionsList({ ...this.page, ...this.searchFormData })
        this.counts = data.counts
        this.tableData = formatData(data.items)
        console.log(this.tableData)
        if (this.counts > 0 && this.tableData.length === 0) {
          this.page.page--
          this.getQuestionsList()
        }
      } catch (error) {
        console.log(error)
        this.$message.error('获取失败，请重新获取')
      } finally {
        this.loading = false
      }
    },
    handleTableData (data) {
      this.searchFormData = data
      this.getQuestionsList()
    },
    checkQuestion (row) {
      console.log(row)
      this.handelData = row.row
      this.isShowQuestion = true
    },
    // 删除基础题库
    async removeQuestion ({ row }) {
      try {
        await removeQuestion({ id: row.id })
        this.$message.success('删除成功')
        this.getQuestionsList()
      } catch (error) {
        console.log(error)
      }
    },
    // 加入精选题库
    async choiceAdd ({ row }) {
      try {
        await choiceAdd({ id: row.id, choiceState: 1 })
        this.$message.success('加入精选成功')
        this.getQuestionsList()
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
<style lang="less">
  .question-container{
    padding: 0 10px;
    margin: 10px 0;
  }
</style>
<style scoped lang='less'>
</style>
