<template>
  <div class='container question-container'>
    <el-card>
      <!-- 头部按钮区域 -->
      <BtnWrapper></BtnWrapper>
      <!-- 搜素表单区域 -->
      <Search @handleTableData="handleTableData"></Search>
      <!-- tab栏切换 -->
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="全部" name="first"></el-tab-pane>
        <el-tab-pane label="待审核" name="second"></el-tab-pane>
        <el-tab-pane label="已审核" name="third"></el-tab-pane>
        <el-tab-pane label="已拒绝" name="fourth"></el-tab-pane>
      </el-tabs>
      <!-- 表格部分-->
      <QuestionsTable :tableColumnList="tableColumnList" :counts="counts" :tableData="tableData" :loading="loading" :fixed="'right'" :OperationAreaHeaderAlign="'center'" :OperationAreaWidth="'200'">
      <template #OperationColumn="{row}" >
        <el-button type="text" size="small">预览</el-button>
        <el-button type="text" size="small" :disabled="row.chkState==='通过'">审核</el-button>
        <el-button type="text" size="small" :disabled="(row.chkState==='拒绝')||row.publishState==='已发布'">修改</el-button>
        <el-button type="text" size="small">{{row.publishState==='已发布'?'下架':'上架'}}</el-button>
        <el-button type="text" size="small" :disabled="(row.chkState==='拒绝')||row.publishState==='已发布'">删除</el-button>
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
  </div>
</template>

<script>
import BtnWrapper from '../components/questions/btn-wrapper.vue'
import Search from '../components/questions/search.vue'
import QuestionsTable from '../components/questions/questions-table.vue'
import { choice as getChoiceList } from '@/api/hmmm/questions'
import { formatData } from '@/utils/formatData'
export default {
  components: { BtnWrapper, Search, QuestionsTable },
  name: 'questionsChoice',
  data () {
    return {
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
      loading: false
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
      const { data } = await getChoiceList({ ...this.page, ...this.searchFormData })
      console.log(data)
      this.counts = data.counts
      this.tableData = formatData(data.items)
      if (this.counts > 0 && this.tableData.length === 0) {
        this.page.page--
        this.getChoiceList()
      }
    }
  }
}
</script>

<style scoped lang='less'></style>
