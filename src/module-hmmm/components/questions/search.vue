<template>
  <el-form ref="form" label-width="80px" :model="formData">
  <el-row>
    <el-col :span="6">
      <!-- 学科 -->
      <el-form-item label="学科" prop="subjectID">
        <el-select placeholder="请选择" size="small" v-model="formData.subjectID" @change="selectSub">
          <el-option v-for="sub in subjectsList" :key="sub.id" :label="sub.label" :value="sub.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :span="6">
      <!-- 二级目录 -->
      <el-form-item label="二级目录" prop="catalogID">
        <el-select placeholder="请选择" size="small" v-model="formData.catalogID">
          <el-option v-for="cata in directorysList" :key="cata.value" :label="cata.label" :value="cata.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :span="6">
      <!-- 标签 -->
      <el-form-item label="标签" prop="tags">
        <el-select placeholder="请选择" size="small" v-model="formData.tags">
          <el-option v-for="tag in tagsList" :key="tag.value" :label="tag.label" :value="tag.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :span="6">
      <!-- 关键词 -->
      <el-form-item label="关键字" prop="keyword">
        <el-input v-model="formData.keyword" size="small" placeholder="根据题干搜索" ></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="6">
      <!-- 试题类型 -->
      <el-form-item label="试题类型" prop="questionType">
        <el-select v-model="formData.questionType" placeholder="请选择" size="small">
          <el-option v-for="item in questionTypeList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :span="6">
      <!-- 难度 -->
      <el-form-item label="难度" prop="difficulty">
        <el-select placeholder="请选择" size="small" v-model="formData.difficulty">
          <el-option v-for="item in difficultyList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :span="6">
      <!-- 方向 -->
      <el-form-item label="方向" prop="direction">
        <el-select placeholder="请选择" size="small" v-model="formData.direction">
          <el-option v-for="item in directionList" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :span="6">
      <!-- 录入人 -->
      <el-form-item label="录入人" prop="creatorID">
        <el-select placeholder="请选择" size="small" v-model="formData.creatorID">
          <el-option v-for="item in creatorList" :key="item.id" :label="item.username" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :span="6">
      <el-form-item label="题目备注" prop="remarks">
        <el-input v-model="formData.remarks" size="small"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="6">
      <el-form-item label="企业简称" prop="shortName">
        <el-input v-model="formData.shortName" size="small"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="6">
      <!-- 城市 -->
      <el-form-item label="城市" prop="province">
        <el-select placeholder="请选择" size="small" style="width:50%;margin-right: 2%;" v-model="formData.province" @change="formData.city = ''">
          <el-option v-for="item in provincesList" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
        <el-select placeholder="请选择" size="small" style="width:48%" v-model="formData.city">
          <el-option v-for="item in citysList" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :span="6">
      <el-form-item  style="text-align:right">
        <el-button type="default" size="small" @click="clearForm">清除</el-button>
        <el-button type="primary" size="small" @click="getQuestionsList">搜索</el-button>
      </el-form-item>
    </el-col>
  </el-row>
  </el-form>
</template>

<script>
import { simple } from '@/api/hmmm/subjects'
import { simple as getDirectorysList } from '@/api/hmmm/directorys'
import { simple as getTagsList } from '@/api/hmmm/tags'
import { simple as getCreatorList } from '@/api/base/users'
import { questionType, difficulty, direction } from '@/api/hmmm/constants'
import { provinces, citys } from '@/api/hmmm/citys'
export default {
  name: 'search',
  data () {
    return {
      subjectsList: [],
      directorysList: [],
      tagsList: [],
      creatorList: [],
      questionTypeList: questionType,
      difficultyList: difficulty,
      directionList: direction,
      formData: {
        subjectID: null,
        catalogID: null,
        tags: null,
        keyword: null,
        questionType: null,
        difficulty: null,
        direction: null,
        creatorID: null,
        remarks: null,
        shortName: null,
        province: null,
        city: null
      }
    }
  },
  created () {
    this.getSubjectsList()
    this.getCreatorList()
  },
  computed: {
    provincesList () {
      return provinces()
    },
    citysList () {
      return citys(this.formData.province)
    }
  },
  methods: {
    async getSubjectsList () {
      const { data } = await simple()
      this.subjectsList = data
    },
    async selectSub () {
      const { data } = await getDirectorysList({ subjectID: this.formData.subjectID })
      const { data: res } = await getTagsList({ subjectID: this.formData.subjectID })
      this.directorysList = data
      this.tagsList = res
    },
    async getCreatorList () {
      const { data } = await getCreatorList()
      this.creatorList = data
    },
    getQuestionsList () {
      this.$emit('handleTableData', this.formData)
    },
    clearForm () {
      this.$refs.form.resetFields()
      this.formData.city = ''
    }
  }
}
</script>

<style lang="less" scoped>
  .el-col-6{
    height: 50px;
  }
  .el-select{
    width: 100%;
  }
</style>
