<template>
  <div class='container'>
    <!-- 添加目录对话框 -->
    <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose">
    <el-form :model="formData" ref="directorysDialogForm" label-width="80px">
      <el-form-item label="所属学科" prop="subjectID">
         <el-select
         v-model="formData.subjectID"
         style="width:100%"
         placeholder="请选择"
        >
          <el-option v-for="item in subjectNameList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="目录名称" prop="directoryName"
        :rules="[{required:true,message:'请输入目录名称',trigger:'blur'}]">
        <el-input v-model="formData.directoryName" placeholder="请输入目录名称"></el-input>
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
import { simple } from '@/api/hmmm/subjects.js'
import { add, update } from '@/api/hmmm/directorys.js'
export default {
  name: 'adddirectory',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      formData: {
        subjectID: '', // 学科ID
        directoryName: ''// 目录名称
      },
      subjectNameList: [],
      loading: false
    }
  },
  computed: {
    title () {
      return this.formData.id ? '修改目录' : '新增目录'
    }
  },
  created () {
    this.getSubjectName()
  },
  methods: {
    handleClose () {
      this.$refs.directorysDialogForm.resetFields()
      this.$emit('update:dialogVisible', false)
      this.formData = {
        subjectID: '',
        directoryName: ''
      }
    },
    // 获取学科简单列表
    async getSubjectName () {
      const { data } = await simple()
      this.subjectNameList = data
    },
    async submit () {
      try {
        this.$refs.directorysDialogForm.validate()// 表单校验通过
        this.loading = true
        this.formData.id ? await update(this.formData) : await add(this.formData)
        this.$message.success(this.formData.id ? '修改成功' : '添加成功')
        // 刷新页面
        this.$emit('refreshList')
        // 关闭弹窗
        this.handleClose()
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang='less'></style>
