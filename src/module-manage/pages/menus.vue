<template>
  <div class="app-container">
    <el-card shadow="never">
      <el-button class="filter-item fr" size="small" style="margin-left: 10px;" type="success" icon="el-icon-edit"  @click="addMenus">添加菜单</el-button>
      <!-- 树形表格 -->
      <TreeTable
        :data="dataList"
        :columns="columns"
        :tree-structure="true"
        :defaultExpandAll="true"
        :listLoading="listLoading"
        @handleUpdate="handleUpdate"
        @removeUser='removeUser'
      >
      </TreeTable>
    </el-card>
    <!-- 弹出层 -->
    <MenuAdd
      ref="menuRef"
      :text="text"
      :PointDataList="dataList"
      @newDataes="getList"
    />
  </div>
</template>

<script>
import TreeTable from '@/components/TreeTable/index.vue'
import MenuAdd from '../components/menu-add.vue'
import { list, remove } from '@/api/base/menus'
export default {
  name: 'Menus',
  components: { TreeTable, MenuAdd },
  data () {
    return {
      listLoading: false,
      textTitle: false,
      dataList: [],
      columns: [
        { text: '标题', prop: 'title', value: 'title', width: 220 },
        { text: '权限点代码', prop: 'code', value: 'code' }
      ]
    }
  },
  created () {
    this.getList()
  },
  methods: {
    async getList () {
      try {
        this.listLoading = true
        const { data } = await list()
        this.dataList = data
      } finally {
        this.listLoading = false
      }
    },
    // 新增菜单
    addMenus () {
      this.textTitle = true
      this.$refs.menuRef.dialogFormV()
      this.$refs.menuRef.handleResetForm() // 进入前重置表单清空
    },
    // 编辑菜单
    handleUpdate (row) {
      this.textTitle = false
      this.$refs.menuRef.dialogFormV()
      const f = row.childs || row.points ? 'menu' : 'points'
      this.$refs.menuRef.changeType(f)
      this.$refs.menuRef.hanldeEditForm(row.id) // ref是弹出框的ref，拿到他身上的这个方法hanldeEditForm
    },
    async removeUser (id) {
      try {
        await this.$confirm('确认删除该用户吗', '提示', {
          type: 'warning'
        })
        await remove(id)
        this.getList()
        this.$message.success('删除菜单成功')
      } catch (error) {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      }
    }
  },
  computed: {
    text () {
      return this.textTitle ? '创建菜单' : '编辑菜单'
    }
  }
}
</script>

<style scoped lang='less'>

</style>
