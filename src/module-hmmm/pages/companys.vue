<template>
  <div class="app-container">
    <el-card shadow="never">
      <!-- form表单 -->
      <el-form :model="requestData" ref="formRef" label-width="80px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="标签名称" prop="tags">
              <el-input v-model="requestData.tags" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="城市" prop="province">
              <el-select v-model="requestData.province" placeholder="请选择" style="width: 100%;" @change="getCitys">
                <el-option v-for="item in options.province" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="地区" prop="city">
              <el-select v-model="requestData.city" placeholder="请选择" style="width: 100%;">
                <el-option v-for="item in options.city" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="企业简称" prop="shortName">
              <el-input v-model="requestData.shortName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="状态" prop="state">
              <el-select v-model="requestData.state" placeholder="请选择" style="width: 100%;">
                <el-option v-for="item in status" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="padding-left:40px">
            <el-button type="default" size="small" @click="clear">清除</el-button>
            <el-button type="primary" size="small" @click="search">搜索</el-button>
          </el-col>
          <el-col :span="12" style="text-align:right">
            <el-button type="success" size="small" icon="el-icon-edit" @click="addUser('add')">新增用户</el-button>
          </el-col>
        </el-row>
      </el-form>
      <!-- 提示 -->
      <el-alert :title="title" type="info" show-icon :closable="false"></el-alert>
      <!-- 表格 -->
      <el-table :data="tableData" v-loading="loading" element-loading-text="给我一点时间">
        <el-table-column type="index" label="序号" width="120" align="center">
        </el-table-column>
        <el-table-column prop="number" label="企业编号" width="240" align="center">
        </el-table-column>
        <el-table-column prop="shortName" label="企业简称" width="120" align="center">
        </el-table-column>
        <el-table-column prop="tags" label="标签" width="120" align="center">
        </el-table-column>
        <el-table-column prop="creatorID" label="创建者" width="120" align="center">
        </el-table-column>
        <el-table-column prop="addDate" label="创建日期" width="240" align="center" :formatter="formatDate">
        </el-table-column>
        <el-table-column prop="remarks" label="备注" width="300" align="center">
        </el-table-column>
        <el-table-column prop="state" label="状态" width="140" align="center" :formatter="formatState">
        </el-table-column>
        <el-table-column label="操作" width="240" align="center">
          <template slot-scope="{ row }">
            <el-button type="primary" icon="el-icon-edit" plain circle @click="addUser(row.id)"></el-button>
            <el-tooltip effect="dark" :content="content(row.state)" placement="top">
              <el-button v-if="row.state===1" type="warning" icon="el-icon-close" plain circle @click="handleState(row)"></el-button>
              <el-button v-else type="success" icon="el-icon-check" plain circle @click="handleState(row)"></el-button>
            </el-tooltip>
            <el-button type="danger" icon="el-icon-delete" plain circle @click="delUser(row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <PageTool
        :total="total"
        :paginationPage="requestData.page"
        :paginationPagesize="requestData.pagesize"
        @pageChange="handleCurrentChange"
        @pageSizeChange = "handleSizeChange"
      >
      </PageTool>
    </el-card>
    <!-- 新增编辑用户弹出层 -->
    <CompanysAdd
      ref="companysaddRef"
      :titleInfo="titleInfo"
      :formBase="formData"
      @newDataes="getList"
    />
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { status } from '@/api/hmmm/constants'
import { list, remove, detail, disabled } from '@/api/hmmm/companys'
import { provinces, citys } from '@/api/hmmm/citys.js'
import PageTool from '@/module-manage/components/page-tool.vue'
import CompanysAdd from '@/module-hmmm/components/companys-add.vue'
export default {
  name: 'companys',
  components: { PageTool, CompanysAdd },
  data () {
    return {
      total: null,
      status: status,
      requestData: {
        page: 1,
        pagesize: 10
      },
      options: {
        province: [],
        city: []
      },
      tableData: [],
      loading: false,
      titleInfo: {
        pageTitle: '用户', // 页面标题
        text: '' // 新增、编辑文本
      },
      formData: {
        isFamous: '',
        shortName: '',
        company: '',
        province: '',
        city: '',
        tags: '',
        remarks: ''
      },
      changeState: {
        id: '',
        state: ''
      }
    }
  },

  created () {
    this.getList()
    this.getProvinces()
  },

  methods: {
    getProvinces () {
      this.options.province = provinces()
    },
    getCitys () {
      this.options.city = citys(this.requestData.province)
      this.requestData.city = this.options.city[0]
    },
    async getList () {
      try {
        this.loading = true
        const { data } = await list(this.requestData)
        this.total = data.counts
        this.tableData = data.items
        if (this.total > 0 && this.tableData.length === 0) {
          this.requestData.page--
          this.getList()
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    clear () {
      this.$refs.formRef.resetFields()
    },
    async search () {
      const { data } = await list(this.requestData)
      this.total = data.counts
      this.tableData = data.items
    },
    // 新增用户，编辑用户
    async addUser (id) {
      this.formData = {}
      this.$refs.companysaddRef.dialogFormV()
      if (id === 'add') {
        this.titleInfo.text = '创建'
      } else {
        this.titleInfo.text = '编辑'
        this.formData.id = id
        const { data } = await detail(this.formData)
        this.formData = data
      }
    },
    // 删除用户
    async delUser (id) {
      try {
        await this.$confirm('确认删除该用户吗', '提示', {
          type: 'warning'
        })
        this.formData.id = id
        await remove(this.formData)
        this.getList() // 重新加载数据
        this.$message.success('删除角色成功')
      } catch (error) {
        this.$message.error('删除角色失败')
      }
    },
    // 切换状态
    async handleState (row) {
      try {
        this.changeState.id = row.id
        this.changeState.state = +!row.state
        await this.$confirm('已成功' + this.content(row.state) + ', 是否继续?', '提示', {
          type: 'warning'
        })
        await disabled(this.changeState)
        this.$message.success('已成功' + this.content(row.state))
        this.getList() // 重新加载数据
      } catch (error) {
        this.$message.info('已取消操作!')
      }
    },
    formatState (row, column, cellValue) {
      const obj = this.status.find(item => item.value === cellValue)
      return obj.label
    },
    formatDate (row, column, cellValue) {
      return dayjs(cellValue).format('YYYY-MM-DD HH:mm:ss')
    },
    content (state) {
      if (state === 1) {
        return '禁用'
      } else if (state === 0) {
        return '启用'
      }
    },
    handleCurrentChange (val) {
      this.requestData.page = val
      this.getList()
    },
    handleSizeChange (val) {
      this.requestData.pagesize = val
      this.getList()
    }
  },
  computed: {
    title () {
      return `共${this.total}条记录`
    }
  }
}
</script>

<style scoped lang='less'>
.app-container {
  padding: 20px;
}
</style>
