<template>
  <div class='container'>
    <!-- 添加目录对话框 -->
    <el-dialog
    title="新增目录"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose">
    <el-form :model="formData" ref="subjectDialogForm" label-width="80px">
      <el-form-item label="所属学科" prop="subjectName">
         <el-select v-model="formData.state" placeholder="请选择" label-width="80px">
            <el-option label="启用" :value="1"></el-option>
            <el-option label="禁用" :value="0"></el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="目录名称" prop="directoryName"
        :rules="[{required:true,message:'请输入目录名称',trigger:'blur'}]">
        <el-input v-model="formData.subjectName" placeholder="请输入目录名称"></el-input>
      </el-form-item>
      <el-form-item style="text-align:right">
         <el-button @click="handleClose">取 消</el-button>
         <el-button type="primary" v-loading="loading" @click="submit">确 定</el-button>
      </el-form-item>
    </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      formData: {
        subjectName: '',
        directoryName: ''
      },
      loading: false
    }
  },
  methods: {
    handleClose () {
      this.$emit('update:dialogVisible', false)
    },
    submit () {
      console.log(11)
    }
  }
}
</script>

<style scoped lang='less'></style>
