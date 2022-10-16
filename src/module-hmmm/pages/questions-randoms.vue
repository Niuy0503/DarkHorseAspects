<template>
  <div class='container question-container'>
    <el-card>
      <!-- 搜索表单区域 -->
      <el-form :model="formData" inline>
        <el-row >
          <el-col :span="6">
            <!-- 关键词 -->
            <el-form-item label="关键字" prop="keyword" size="small" label-width="80px">
              <el-input v-model="formData.keyword" size="small" placeholder="根据编号搜索"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="12" class="caozuo">
            <el-form-item style="width:100%">
              <div style="text-align:right">
                <el-button type="default" size="small">清除</el-button>
              <el-button type="primary" size="small" @click="getRandomsList">搜索</el-button>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- 表格区域 -->
      <RandomsTable @getDeil="getDeil" :tableData="tableData" :counts="counts" @handleList="getRandomsList"></RandomsTable>
      <!-- 分页组件 -->
      <el-pagination
        style="margin-top:20px;text-align: right;"
        background
        layout="prev, pager, next, sizes, jumper"
        :page-sizes="[20, 30, 50, 100]"
        :current-page.sync="page.page"
        :page-size.sync="page.pagesize"
        @size-change="getRandomsList"
        @current-change="getRandomsList"
        :total="counts">
      </el-pagination>
    </el-card>
    <!-- 弹出层 -->
    <el-dialog title="题目详情" :visible="isShowDeil" @close="isShowDeil=false">
      <QuestionsPreview :handeldata="handeldata" v-if="isShowDeil"></QuestionsPreview>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="isShowDeil = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { randoms, detail } from '@/api/hmmm/questions'
import { formatData } from '@/utils/formatData'
import RandomsTable from '../components/questions/randomsTable.vue'
import QuestionsPreview from '../components/questions-preview.vue'
export default {
  data () {
    return {
      formData: {
        keyword: ''
      },
      page: {
        page: 1,
        pagesize: 20
      },
      searchFormData: {},
      counts: 0,
      tableColumnList: [
        { label: '编号', width: 220, prop: 'id' },
        { label: '题型', width: 80, prop: 'questionType' },
        { label: '题目编号', width: 220, prop: 'questionIDs' },
        { label: '录入时间', width: 180, prop: 'addTime' },
        { label: '答题时间(s)', width: 135, prop: 'totalSeconds' },
        { label: '正确率(%)', width: 133, prop: 'accuracyRate' },
        { label: '录入人', width: 120, prop: 'userName' }
      ],
      tableData: [],
      handeldata: [],
      loading: false,
      isShowDeil: false
    }
  },
  created () {
    this.getRandomsList()
  },
  methods: {
    async getRandomsList () {
      const { data } = await randoms({ ...this.page, ...this.formData })
      console.log(data)
      this.counts = data.counts
      this.tableData = formatData(data.items)
    },
    async getDeil (id) {
      console.log(id)
      const { data } = await detail({ id: id })
      this.isShowDeil = true
      this.handeldata = data
    }
  },
  components: { RandomsTable, QuestionsPreview }
}
</script>

<style scoped lang='less'>
.caozuo{
  :deep(.el-form-item__content){
    width: 100% !important;
}
}

</style>
