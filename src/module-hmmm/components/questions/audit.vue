<template>
  <el-dialog title="题目审核" :visible="isShowAudit" width="400px" @close="close">
    <el-form :model="audit">
      <el-form-item>
        <el-radio-group v-model="audit.chkState">
          <el-radio :label="1">通过</el-radio>
          <el-radio :label="0">拒绝</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="audit.chkRemarks">
        </el-input>
      </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="close">取消</el-button>
    <el-button type="primary" @click="choiceCheck">确认</el-button>
  </span>
</el-dialog>
</template>

<script>
export default {
  props: {
    isShowAudit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      audit: {
        chkState: 1,
        chkRemarks: ''
      }
    }
  },
  methods: {
    close () {
      this.$emit('closeAudit')
    },
    choiceCheck () {
      this.$emit('choiceCheck', this.audit)
    }
  }
}
</script>

<style>

</style>
