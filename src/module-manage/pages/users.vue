<template>
  <div class="container">
    <el-card>
      <!-- 行内表单 -->
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-input
            ref="ipt"
            placeholder="根据用户名搜索"
            v-model="page.username"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="empty" plain>清空</el-button>
          <el-button type="primary" @click="search" plain>搜索</el-button>
        </el-form-item>
        <el-form-item class="adds">
          <el-button type="success" icon="el-icon-edit" @click="adduser">新增用户</el-button>
        </el-form-item>
      </el-form>
      <!-- 提示行 -->
      <el-alert :title="title" type="info" show-icon :closable="false">
      </el-alert>
      <!-- 表格 -->
      <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
        <el-table-column type="index" label="序号" align="center" width="365">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="160">
        </el-table-column>
        <el-table-column prop="phone" label="联系电话" width="345">
        </el-table-column>
        <el-table-column prop="username" label="用户名" width="245">
        </el-table-column>
        <el-table-column
          prop="permission_group_id"
          label="权限组名称"
          width="275"
          :formatter="formatterFn"
        >
        </el-table-column>
        <el-table-column prop="role" label="角色" width="150">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{ row }">
              <el-button type="primary" plain icon="el-icon-edit" circle @click="modify(row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <pagetool
        :total="total"
        :paginationPage="page.page"
        :paginationPagesize="page.pagesize"
        @pageChange="pageChange"
        @pageSizeChange="pageSizeChange"
      />
    </el-card>
    <usersAdd
    ref="addusers"
    :pageTitle="pageTitle"
    :ruleInline="ruleInline"
    :PermissionGroupsList="PermissionGroupsList"
    @handleCloseModal="handleCloseModal"
    @newDataes="getUsersList"
    />
  </div>
</template>

<script>
import { list as getUsersListAPI } from '@/api/base/users'
import { simple as simpleListAPI } from '@/api/base/permissions'
import pagetool from '../components/page-tool.vue'
import usersAdd from '../components/user-add.vue'
export default {

  data () {
    return {
      tableData: {
        email: '',
        phone: '',
        username: '',
        permission_group_id: '',
        role: ''
      },
      page: {
        page: 1,
        pagesize: 10,
        username: ''
      },
      loading: false,
      total: null,
      pageTitle: '用户',
      permissionData: [
        {
          id: 2,
          title: '超级管理员组'
        },
        {
          id: 3,
          title: '编辑组'
        }
      ],
      PermissionGroupsList: [],
      ruleInline: {
        username: [
          { required: true, message: '请输入用户名！', trigger: 'blur' },
          { min: 2, max: 12, message: '长度在 2 到 12 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址！', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码！', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  components: {
    pagetool,
    usersAdd
  },
  computed: {
    title () {
      return `共${this.total}条记录`
    }
  },
  async created () {
    this.getUsersList()
    const { data } = await simpleListAPI()
    this.PermissionGroupsList = data
  },
  methods: {
    async getUsersList () {
      this.loading = true
      try {
        const { data: { list, counts } } = await getUsersListAPI(this.page)
        this.tableData = list
        this.total = counts
      } catch (err) {
        console.log(err)
      } finally {
        this.loading = false
      }
    },
    search () {
      this.getUsersList()
    },
    empty () {
      this.$refs.ipt.value = ''
      this.getUsersList()
    },
    pageChange (num) {
      this.page.page = num
      this.getUsersList(num)
    },
    pageSizeChange (size) {
      this.page.pagesize = size
      this.getUsersList(size)
    },
    async adduser () {
      try {
        this.$refs.addusers.dialogFormV()
        const { data } = await simpleListAPI()
        this.PermissionGroupsList = data
        console.log(data)
        console.log(this.PermissionGroupsList)
      } catch (error) {
        console.log(error)
      }
    },
    modify (row) {
      this.$refs.addusers.dialogFormV()
      delete (row.permission_group_title)
      delete (row.is_deleted)
      delete (row.create_time)
      delete (row.last_update_time)
      this.$refs.addusers.formBase = { ...row }
    },
    handleCloseModal () {
      this.$refs.addusers.dialogFormH()
    },
    formatterFn (row, column, cellValue) {
      const result = this.permissionData.find(item => item.id === cellValue)
      return result.title
    }
  }
}
</script>

<style scoped lang='less'>
.container {
  display: block;
  padding: 20px;
  .adds {
    float: right;
  }

  .el-alert--info {
    margin-bottom: 20px;
  }
  .el-pagination {
    float: right;
    margin-top: 20px;
    margin-bottom: 20px;
    text-align: right;
    color: #303133;
    font-weight: 700;
  }
}
</style>
