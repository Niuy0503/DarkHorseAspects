<template>
  <div class="container">
    <el-card class="box-card">
      <!--? header头部标题区域 -->
      <div slot="header" class="clearfix">
        <span>试题录入</span>
      </div>
      <!--? main区域 -->
      <div class="main">
        <el-form
          ref="testQuestionsForm"
          label-width="120px"
          :model="testQuestionsList"
          :rules="rules"
          v-loading="loading"
        >
          <!-- 学科 -->
          <el-form-item label="学科：" prop="subjectID">
            <el-select
              @change="subjectsChange"
              placeholder="请选择"
              v-model="testQuestionsList.subjectID"
            >
              <el-option
                :label="item.label"
                :value="item.value"
                v-for="item in subjectsSimpleList"
                :key="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <!-- 目录 -->
          <el-form-item label="目录：" prop="catalogID">
            <el-select
              placeholder="请选择"
              v-model="testQuestionsList.catalogID"
            >
              <el-option
                :label="item.label"
                :value="item.value"
                v-for="item in directorySimpleList"
                :key="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <!-- 企业 -->
          <el-form-item label="企业：" prop="enterpriseID">
            <el-select
              placeholder="请选择"
              v-model="testQuestionsList.enterpriseID"
            >
              <el-option
                :label="item.company"
                :value="item.id"
                v-for="item in companysInfoList"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <!-- 城市 -->
          <el-form-item
            label="城市："
            :prop="testQuestionsList.province === '' ? 'province' : 'city'"
          >
            <el-select
              v-model="testQuestionsList.province"
              placeholder="请选择"
              style="width: 198px"
              @change="provinceChange"
            >
              <el-option
                v-for="(item, index) in provincesList"
                :key="index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
            <el-select
              v-model="testQuestionsList.city"
              style="margin-left: 4px; width: 198px"
              placeholder="请选择"
            >
              <el-option
                v-for="(item, index) in citysList"
                :key="index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>

          <!-- 方向 -->
          <el-form-item label="方向：" prop="direction">
            <el-select
              placeholder="请选择"
              v-model="testQuestionsList.direction"
            >
              <el-option
                :label="item"
                :value="item"
                v-for="(item, index) in direction"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>

          <!-- 题型 -->
          <el-form-item label="题型：" prop="questionType">
            <el-radio
              v-model="testQuestionsList.questionType"
              :label="item.value.toString()"
              v-for="item in questionType"
              :key="item.value"
              @change="clearOptions"
              >{{ item.label }}</el-radio
            >
          </el-form-item>

          <!-- 难度 -->
          <el-form-item label="难度：" prop="difficulty">
            <el-radio
              v-model="testQuestionsList.difficulty"
              :label="item.value.toString()"
              v-for="item in difficulty"
              :key="item.value"
              >{{ item.label }}</el-radio
            >
            <!-- <el-radio v-model="radio" label="2">一般</el-radio>
            <el-radio v-model="radio" label="2">困难</el-radio> -->
          </el-form-item>

          <!-- 题干 -->
          <el-form-item label="题干：" prop="question">
            <!-- 富文本编辑器组件 -->
            <RichText :height="200" v-model="testQuestionsList.question" />
          </el-form-item>

          <!-- 选项 -->
          <el-form-item
            label="选项："
            v-if="testQuestionsList.questionType !== '3'"
          >
            <div
              class="option_item"
              v-for="item in testQuestionsList.options"
              :key="item.code"
            >
              <el-radio
                v-if="testQuestionsList.questionType === '1'"
                v-model="radio"
                :label="item.code"
                style="margin-right: 0px"
                >{{ item.code }}：
              </el-radio>
              <el-checkbox
                v-model="item.isRight"
                :label="item.code"
                v-else-if="testQuestionsList.questionType === '2'"
                >{{ item.code }}：</el-checkbox
              >
              <el-input style="width: 240px" v-model="item.title"></el-input>
              <UploadImg @imgUrl="getImgUrl(item, $event)"></UploadImg>
            </div>

            <el-button
              type="danger"
              size="small"
              :disabled="testQuestionsList.questionType !== '2'"
              @click="addOptions"
              >+增加选项与答案</el-button
            >
          </el-form-item>

          <!-- 解析视频 -->
          <el-form-item label="解析视频：">
            <el-input
              style="width: 400px"
              v-model="testQuestionsList.videoURL"
            ></el-input>
          </el-form-item>

          <!-- 答案解析 -->
          <el-form-item label="答案解析：" prop="answer">
            <RichText :height="200" v-model="testQuestionsList.answer" />
          </el-form-item>

          <!-- 题目备注 -->
          <el-form-item label="题目备注：">
            <el-input
              type="textarea"
              :rows="4"
              style="width: 400px"
              v-model="testQuestionsList.remarks"
            >
            </el-input>
          </el-form-item>

          <!-- 试题标签 -->
          <el-form-item label="试题标签：">
            <el-select placeholder="请选择试题标签" multiple v-model="tags">
              <el-option
                :label="item.label"
                :value="item.label"
                v-for="item in tagsSimpleList"
                :key="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <!-- 提交按钮 -->
          <el-form-item>
            <el-button type="primary" @click="onSubmit">确认提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import RichText from '@/components/RichText'
import { simple as subjectsSimpleAPI } from '@/api/hmmm/subjects.js'
import { simple as directorySimpleAPI } from '@/api/hmmm/directorys.js'
import { simple as tagsSimpleAPI } from '@/api/hmmm/tags.js'
import { list as companysAPI } from '@/api/hmmm/companys.js'
import { add as addBasicQuestionAPI } from '@/api/hmmm/questions.js'
import { provinces, citys } from '@/api/hmmm/citys'
import { difficulty, questionType, direction } from '@/api/hmmm/constants.js'
import UploadImg from '../components/uploadImg.vue'
export default {
  name: 'questions-new',
  components: { RichText, UploadImg },
  data () {
    return {
      radio: null,
      checkbox: [],
      testQuestionsList: {
        answer: '',
        catalogID: null,
        province: '',
        city: '',
        difficulty: '1',
        direction: '',
        enterpriseID: null,
        options: [],
        question: '',
        questionType: '1',
        remarks: '',
        subjectID: null,
        tags: null,
        videoURL: ''
      },
      rules: {
        subjectID: [{ required: true, message: '请选择学科', trigger: 'change' }],
        catalogID: [{ required: true, message: '请选择目录', trigger: 'change' }],
        enterpriseID: [{ required: true, message: '请选择企业', trigger: 'change' }],
        province: [{ required: true, message: '请选择地区', trigger: 'change' }],
        city: [{ required: true, message: '请选择地区', trigger: 'change' }],
        direction: [{ required: true, message: '请选择方向', trigger: 'change' }],
        questionType: [{ required: true, message: '请选择题型', trigger: 'change' }],
        difficulty: [{ required: true, message: '请选择难度', trigger: 'change' }],
        question: [{ required: true, message: '请输入题干' }],
        answer: [{ required: true, message: '请输入答案解析' }]

      },
      subjectsSimpleList: [],
      directorySimpleList: [],
      companysInfoList: [],
      tagsSimpleList: [],
      difficulty,
      questionType,
      direction,
      Ascll: 65,
      tags: [],
      loading: false
    }
  },
  created () {
    this.getSubjectsSimpleList()
    this.getCompanysInfoList()
    this.getDefaultOptions()
  },
  methods: {
    // 获取学科简单列表
    async getSubjectsSimpleList () {
      const { data } = await subjectsSimpleAPI()
      this.subjectsSimpleList = data
    },
    // 目录简单列表
    async getDirectorySimpleList () {
      const { data } = await directorySimpleAPI({ subjectID: this.testQuestionsList.subjectID })
      this.directorySimpleList = data
      console.log(data)
    },
    // 公司信息列表
    async getCompanysInfoList () {
      const { data } = await companysAPI({
        pagesize:
          10000
      })
      this.companysInfoList = data.items
      console.log(data)
    },
    // 获取标签
    async getTagsSimpleList () {
      const { data } = await tagsSimpleAPI({ subjectID: this.testQuestionsList.subjectID })
      this.tagsSimpleList = data
    },
    // 选中的学科发送变化时触发
    subjectsChange () {
      this.testQuestionsList.catalogID = null
      this.getDirectorySimpleList()
      this.getTagsSimpleList()
    },
    // 省级市改变时清空地级市value值
    provinceChange () {
      this.testQuestionsList.city = ''
    },
    // 获取默认 Options 数组
    getDefaultOptions () {
      for (let i = 0; i < 4; i++) {
        const code = String.fromCharCode(this.Ascll++)
        this.testQuestionsList.options.push({
          code: `${code}`,
          img: '',
          isRight: false,
          title: ''
        })
      }
    },
    // 添加 Options
    addOptions () {
      const code = String.fromCharCode(this.Ascll++)
      this.testQuestionsList.options.push({
        code: `${code}`,
        img: '',
        isRight: false,
        title: ''
      })
    },
    // 重置 Options
    clearOptions () {
      this.radio = null
      this.testQuestionsList.options.forEach(item => { item.isRight = false })
      // this.testQuestionsList.options = []
      // this.Ascll = 65
      // this.getDefaultOptions()
    },
    // 通过子组件获取 Options 当前项的图片 Url
    getImgUrl (item, imgUrl) {
      item.img = imgUrl
    },
    // 提交表单
    async onSubmit () {
      try {
        // v-loading
        this.loading = true
        // 表单验证
        await this.$refs.testQuestionsForm.validate()
        // 处理标签数据
        this.testQuestionsList.tags = this.tags.join(',')
        console.log(this.testQuestionsList.tags)
        // 处理 options 数据
        if (this.testQuestionsList.questionType === '1') {
          this.testQuestionsList.options.forEach(item => { item.isRight = false })
          this.testQuestionsList.options.find(item => item.code === this.radio).isRight = true
        }
        console.log(this.testQuestionsList.options)
        // 发送请求
        await addBasicQuestionAPI(this.testQuestionsList)
        this.$message.success('添加成功')
      } catch (error) {
        this.$message.error('添加失败')
      } finally {
        this.loading = false
      }
    }
  },
  computed: {
    // 省级市城市
    provincesList () {
      return provinces()
    },
    // 地级市城市
    citysList () {
      return citys(this.testQuestionsList.province)
    }
  }
}
</script>

<style scoped lang='less'>
.container {
  padding: 20px;
}

.el-select {
  width: 400px;
}

.option_item {
  padding-bottom: 20px;
}
</style>
