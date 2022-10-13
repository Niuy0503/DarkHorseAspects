<template>
  <div class='container' v-loading="loading">
    <el-row>
      <el-col :span="6">【题型】：{{handeldata.questionType}}题</el-col>
      <el-col :span="6">【编号】：{{handeldata.id}}</el-col>
      <el-col :span="6">【难度】：{{handeldata.difficulty}}</el-col>
      <el-col :span="6">【标签】：{{handeldata.tags}}</el-col>
      <el-col :span="6">【学科】：{{handeldata.subject}}</el-col>
      <el-col :span="6">【目录】：{{handeldata.catalog}}</el-col>
      <el-col :span="6">【方向】：{{handeldata.direction}}</el-col>
    </el-row>
    <hr>
    <span>【题干】：</span>
    <div v-html="handeldata.question" style="color:blue"></div>
    <div>
      <div style="padding:0 0 5px">{{handeldata.questionType}}题 选项：（以下选中的选项为正确答案）</div>
      <div v-if="data.questionType==='1'" ><div v-for="item in data.options" :key="item.id" style="padding:10px 0"><el-radio  v-bind:value="value" :label="item.id">{{item.title}}</el-radio></div></div>
      <div v-else >
          <el-checkbox-group v-model="checkBoxValue">
            <div v-for="item in data.options" :key="item.id">
            <el-checkbox :label="item.id" style="padding:10px 0" :checked="item.isRight===1" >{{item.title}}</el-checkbox>
            </div>
          </el-checkbox-group>
      </div>
    </div>
    <hr>
    <span>【参考答案】: <el-button type="danger" size="small" @click="isShowVideo=true">视频答案预览</el-button></span>
    <div v-if="isShowVideo">
      <video controls="controls" :src="handeldata.videoURL" style="width:400px;height:300px"></video>
    </div>
    <hr>
    <span>【答案解析】:<span v-html="data.answer" style="display:inline-block"></span></span>
    <hr>
    <span>【题目备注】:{{data.remarks}}</span>
  </div>
</template>

<script>
import { detail as getQuestionsDetail } from '@/api/hmmm/questions'
export default {
  name: 'questions-preview',
  data () {
    return {
      data: {},
      radio: 1,
      isShowVideo: false,
      loading: false
    }
  },
  props: {
    handeldata: {
      type: Object,
      default: () => ({})
    }
  },
  created () {
    console.log('接受数据', this.handeldata)
    this.getQuestionsDetail()
    console.log(this.data)
  },
  methods: {
    async getQuestionsDetail () {
      try {
        this.loading = true
        const { data } = await getQuestionsDetail({ id: this.handeldata.id })
        console.log(data)
        this.data = data
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    }
  },
  computed: {
    value () {
      console.log(this.data.options)
      if (!this.data.options) {
        return ''
      }
      return this.data.options.find(res => {
        return res.isRight === 1
      }).id
    },
    checkBoxValue: {
      get () {
        if (!this.data.options) {
          return []
        }
        return this.data.options.reduce((acc, res) => {
          if (res.isRight === 1) {
            acc.push(res.id)
          }
          return acc
        }, [])
      },
      // console.log(this.data.options)
      set () {}
    }
  }
}
</script>

<style scoped lang='less'>
.el-col{
  padding: 10px 0;
}
</style>
