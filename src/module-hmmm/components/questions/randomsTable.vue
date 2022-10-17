<template>
  <div>
    <el-alert
      :title="`数据一共${counts}条`"
      type="info"
      :closable="false"
      style="margin-bottom: 15px;"
      show-icon>
    </el-alert>
    <!-- 表格主体 -->
    <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      fixed
      prop="id"
      label="编号"
      width="220">
    </el-table-column>
    <el-table-column
      prop="questionType"
      label="题型"
      width="80">
    </el-table-column>
    <el-table-column
      prop="questionIDs"
      label="题目编号"
      width="220">
      <template slot-scope="scope">
        <div v-for="(item,index) in scope.row.questionIDs" :key="index"><a href="#" style="color:#0099ff" @click="$emit('getDeil',scope.row.questionIDs[index].id)">{{item.number}}</a></div>
      </template>
    </el-table-column>
    <el-table-column
      prop="addTime"
      label="录入时间"
      width="180">
    </el-table-column>
    <el-table-column
      prop="totalSeconds"
      label="答题时间(s)"
      width="135">
    </el-table-column>
    <el-table-column
      prop="accuracyRate"
      label="正确率(%)">
    </el-table-column>
    <el-table-column
      prop="userName"
      label="录入人"
      width="120">
    </el-table-column>
    <el-table-column
      label="操作"
      width="80">
      <template slot-scope="scope">
        <el-button @click="deleteRandom(scope.row)" type="danger" icon="el-icon-delete" circle plain></el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import { removeRandoms } from '@/api/hmmm/questions'
export default {
  props: {
    tableData: {
      type: Array,
      default: () => ([])
    },
    counts: {
      type: Number,
      default: 0
    }
  },
  methods: {
    async deleteRandom (row) {
      this.$confirm('此操作将永久删除该题组, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await removeRandoms({ id: row.id })
        this.$emit('handleList')
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
      })
    }
  }
}
</script>

<style>

</style>
