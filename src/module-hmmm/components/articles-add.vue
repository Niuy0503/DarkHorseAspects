<template>
  <div class="container">
    <el-dialog
      :title="title"
      :visible="dialogAddVisible"
      width="42%"
      @close="closePop"
      destroy-on-close
    >
      <el-form
        ref="arictleForm"
        :rules="rules"
        :model="artcilesInfo"
        label-width="80px"
        v-loading="loading"
      >
        <el-form-item label="文章标题" prop="title">
          <el-input
            placeholder="请输入文章标签"
            v-model="artcilesInfo.title"
          ></el-input>
        </el-form-item>
        <el-form-item label="文章内容" prop="articleBody">
          <RichText :height="200" v-model="artcilesInfo.articleBody"></RichText>
        </el-form-item>
        <el-form-item label="视频地址" prop="videoURL">
          <el-input
            placeholder="请输入视频地址"
            v-model="artcilesInfo.videoURL"
          ></el-input>
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="closePop">取消</el-button>
        <el-button type="primary" @click="onSubmit">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { update, add } from '@/api/hmmm/articles'
import RichText from '../../components/RichText/index.vue'
export default {
  name: 'articles-add',
  props: {
    dialogAddVisible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      artcilesInfo: {
        articleBody: null,
        id: null,
        title: null,
        videoURL: null
      },
      rules: {
        title: [{ required: true, message: '请输入文章标题', trigger: 'blur' }],
        articleBody: [{ required: true, message: '请输入文章内容', trigger: 'blur' }]
      },
      loading: false
    }
  },
  methods: {
    closePop () {
      // 表单效果重置
      this.$refs.arictleForm.resetFields()
      this.$emit('update:dialogAddVisible', false)
      this.artcilesInfo = {
        articleBody: null,
        id: null,
        title: null,
        videoURL: null
      }
    },
    async onSubmit () {
      try {
        await this.$refs.arictleForm.validate()
        // 接口
        this.loading = true
        this.artcilesInfo.id ? await update(this.artcilesInfo) : await add(this.artcilesInfo)
        this.$emit('getArticlesList')
        this.$message.success(this.artcilesInfo.id ? '修改成功' : '新增成功')
        this.closePop()
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    }
  },
  computed: {
    title () {
      return this.artcilesInfo.id ? '修改文章' : '新增文章'
    }
  },
  components: { RichText }
}

</script>

<style scoped lang='less'></style>
