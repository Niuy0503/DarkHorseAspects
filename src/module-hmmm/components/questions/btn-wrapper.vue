<template>
  <div class="btn_warpper">
    <span>说明：目前支持学科和关键字条件筛选</span>
    <el-button type="success" icon="el-icon-edit" size="small" @click="addQuestions">新增试题</el-button>
  </div>
</template>

<script>
export default {
  name: 'btn_warpper',
  methods: {
    addQuestions () {
      console.log('跳转试题录入，可能需要参数区分精选和基础')
    }
  }
}
</script>

<style scoped lang="less">
.btn_warpper{
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  span{
    font-size: 12px;
    color:pink
  }
}
</style>
