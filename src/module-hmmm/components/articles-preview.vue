<template>
  <div class="container">
    <el-dialog
      title="预览文章"
      :visible="dialogPreviewVisible"
      width="42%"
      @close="closePop"
    >
      <div class="Preview">
        <div class="title">
          <h2>{{ currentPreview.title }}</h2>
          <div>
            <span>{{ createTime }}</span>
            <span>{{ currentPreview.username }}</span>
            <span class="el-icon-view"></span>
            <span>{{ currentPreview.visits }}</span>
          </div>
        </div>
        <div class="content" v-html="currentPreview.articleBody"></div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  props: {
    dialogPreviewVisible: {
      type: Boolean,
      default: false
    },
    currentPreview: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    closePop () {
      this.$emit('update:dialogPreviewVisible', false)
    },
    formatterDate (row) {
      const date = row.split('.')[0]
      const time = date.replace('T', ' ')
      return time
    },
    formatterState (row) {
      return row.state === 0 ? '已禁用' : '已启用'
    }
  },
  computed: {
    createTime () {
      return dayjs(this.currentPreview.createTime).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>

<style scoped lang='less'>
.title {
  border-bottom: 1px dashed #ccc;
  padding-bottom: 10px;
  h2 {
    padding: 0;
    margin: 0;
  }
  div {
  }
  span {
    margin-left: 10px;
    margin-top: 10px;
  }
}

.content {
  background: #f5f5f5;
  padding: 10px;
}
</style>
