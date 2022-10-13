<template>
  <div class='container'>
    <!-- 新增学科的弹窗 -->
    <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose">
    <el-form :model="formDate" ref="subjectDialogForm" label-width="80px">
      <el-form-item label="活动名称"
      prop="subjectName"
      :rules="[{required:true,message:'请输入学科名',trigger:'blur'}]">
        <el-input v-model="formDate.subjectName"></el-input>
      </el-form-item>
      <el-form-item label="是否显示" prop="isFrontDisplay">
        <template>
          <el-switch v-model="formDate.isFrontDisplay"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0">
           </el-switch>
        </template>
      </el-form-item>
      <el-form-item>
         <el-button @click="handleClose">取 消</el-button>
         <el-button type="primary" v-loading="loading" @click="submit">确 定</el-button>
      </el-form-item>
    </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { add, update } from '@/api/hmmm/subjects.js'
export default {
  name: 'subjectAdd',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      formDate: {
        subjectName: '',
        isFrontDisplay: '1'
      },
      loading: false
    }
  },
  computed: {
    title () {
      return this.formDate.id ? '修改学科' : '新增学科'
    }
  },
  methods: {
    handleClose () {
      this.$emit('update:dialogVisible', false)
      this.$refs.form.resetFields()
      this.formDate = {
        subjectName: '',
        isFrontDisplay: false
      }
    },
    async submit () {
      try {
        this.$refs.subjectDialogForm.validate()// 表单校验通过
        this.loading = true
        // 发送请求
        this.formDate.id ? await update(this.formDate) : await add(this.formDate)
        this.$message.success(this.formDate.id ? '修改成功' : '添加成功')
        // 刷新父组件页面
        this.$parent.getSubjectDetails()
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
