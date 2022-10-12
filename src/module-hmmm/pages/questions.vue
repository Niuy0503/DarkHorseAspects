<template>
  <div class='container question-container'>
    <el-card>
      <!-- 头部按钮区域 -->
      <BtnWrapper></BtnWrapper>
      <!-- 搜素表单区域 -->
      <Search></Search>
      <!-- 表格区域 -->
      <QuestionsTable :tableColumnList="tableColumnList" :counts="counts" :tableData="tableData"></QuestionsTable>
    </el-card>
  </div>
</template>

<script>
import BtnWrapper from '../components/questions/btn-wrapper.vue'
import Search from '../components/questions/search.vue'
import QuestionsTable from '../components/questions/questions-table.vue'
import { list as getQuestionsList } from '@/api/hmmm/questions'
export default {
  components: { BtnWrapper, Search, QuestionsTable },
  data () {
    return {
      page: {
        page: 1,
        pagesize: 10
      },
      counts: '',
      tableColumnList: [
        { label: '试题编号', width: 120, prop: 'number' },
        { label: '学科', width: 80, prop: 'subject' },
        { label: '目录', width: 80, prop: 'catalog' },
        { label: '题型', width: 80, prop: 'questionType' },
        { label: '题干', width: 280, prop: 'question' },
        { label: '录入时间', width: 180, prop: 'addDate' },
        { label: '难度', width: 80, prop: 'difficulty' },
        { label: '录入人', width: 80, prop: 'creator' }
      ],
      tableData: []
    }
  },
  created () {
    this.getQuestionsList()
  },
  methods: {
    async getQuestionsList () {
      const { data } = await getQuestionsList(this.page)
      this.counts = data.counts
      console.log(data)
      this.tableData = data.items
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
<style scoped lang='less'></style>
