<template>
  <div class="app-container">
    <el-card shadow="never">
      <!-- form表单 -->
      <el-form label-width="80px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="标签名称">
              <el-input placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="城市">
              <el-input placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="地区">
              <el-input placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="企业简称">
              <el-input></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="状态">
              <el-input placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="padding-left:40px">
            <el-button type="default" size="small">清除</el-button>
            <el-button type="primary" size="small">搜索</el-button>
          </el-col>
          <el-col :span="12" style="text-align:right">
            <el-button type="success" size="small" icon="el-icon-edit">新增用户</el-button>
          </el-col>
        </el-row>
      </el-form>
      <!-- 提示 -->
      <el-alert :title="title" type="info" show-icon></el-alert>
      <!-- 表格 -->
      <el-table></el-table>
      <!-- 分页器 -->
      <el-pagination></el-pagination>
    </el-card>

  </div>
</template>

<script>
export default {
  data () {
    return {
      total: 11
    }
  },

  created () {

  },

  methods: {

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
