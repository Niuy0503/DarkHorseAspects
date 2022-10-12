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
          ref="form"
          label-width="120px"
          :model="testQuestionsList"
          :rules="rules"
        >
          <!-- 学科 -->
          <el-form-item label="学科：">
            <el-select placeholder="请选择">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>

          <!-- 目录 -->
          <el-form-item label="目录：">
            <el-select placeholder="请选择">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>

          <!-- 企业 -->
          <el-form-item label="企业：">
            <el-select placeholder="请选择">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>

          <!-- 城市 -->
          <el-form-item label="城市：">
            <el-select
              v-model="value1"
              multiple
              placeholder="请选择"
              style="width: 198px"
            >
              <el-option></el-option>
            </el-select>
            <el-select
              v-model="value2"
              style="margin-left: 4px; width: 198px"
              placeholder="请选择"
            >
              <el-option></el-option>
            </el-select>
          </el-form-item>

          <!-- 方向 -->
          <el-form-item label="方向：">
            <el-select placeholder="请选择">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>

          <!-- 题型 -->
          <el-form-item label="题型：">
            <el-radio v-model="radio" label="1">单选</el-radio>
            <el-radio v-model="radio" label="2">多选</el-radio>
            <el-radio v-model="radio" label="2">简答</el-radio>
          </el-form-item>

          <!-- 难度 -->
          <el-form-item label="难度：">
            <el-radio v-model="radio" label="1">简单</el-radio>
            <el-radio v-model="radio" label="2">一般</el-radio>
            <el-radio v-model="radio" label="2">困难</el-radio>
          </el-form-item>

          <!-- 题干 -->
          <el-form-item label="题干：">
            <!-- 富文本编辑器组件 -->
            <RichText height="200" />
          </el-form-item>

          <!-- 选项 -->
          <el-form-item label="选项：">
            <div class="option_item">
              <el-radio v-model="radio" label="1" style="margin-right: 0px"
                >A：
              </el-radio>
              <el-input style="width: 240px"></el-input>
              <el-upload class="avatar-uploader" style="margin-left: 4px">
                <span>上传图片</span>
                <i class="el-icon-circle-close"></i>
              </el-upload>
            </div>
            <div class="option_item">
              <el-radio v-model="radio" label="1" style="margin-right: 0px"
                >B：
              </el-radio>
              <el-input style="width: 240px"></el-input>
              <el-upload class="avatar-uploader" style="margin-left: 4px">
                <span>上传图片</span>
                <i class="el-icon-circle-close"></i>
              </el-upload>
            </div>
            <div class="option_item">
              <el-radio v-model="radio" label="1" style="margin-right: 0px"
                >C：
              </el-radio>
              <el-input style="width: 240px"></el-input>
              <el-upload class="avatar-uploader" style="margin-left: 4px">
                <span>上传图片</span>
                <i class="el-icon-circle-close"></i>
              </el-upload>
            </div>
            <div class="option_item">
              <el-radio v-model="radio" label="1" style="margin-right: 0px"
                >D：
              </el-radio>
              <el-input style="width: 240px"></el-input>
              <el-upload class="avatar-uploader" style="margin-left: 4px">
                <span>上传图片</span>
                <i class="el-icon-circle-close"></i>
              </el-upload>
            </div>

            <el-button type="danger" size="small" :disabled="true"
              >+增加选项与答案</el-button
            >
          </el-form-item>

          <!-- 解析视频 -->
          <el-form-item label="解析视频：">
            <el-input style="width: 400px"></el-input>
          </el-form-item>

          <!-- 答案解析 -->
          <el-form-item label="答案解析：">
            <RichText height="200" />
          </el-form-item>

          <!-- 题目备注 -->
          <el-form-item label="题目备注：">
            <el-input
              type="textarea"
              :rows="4"
              style="width: 400px"
              v-model="textarea"
            >
            </el-input>
          </el-form-item>

          <!-- 试题标签 -->
          <el-form-item label="试题标签：">
            <el-select placeholder="请选择试题标签">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>

          <!-- 提交按钮 -->
          <el-form-item>
            <el-button type="primary">确认提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import RichText from '@/components/RichText'
export default {
  components: { RichText },
  data () {
    return {
      testQuestionsList: {
        answer: '<p>312311232</p>',
        catalogID: 4,
        province: '天津市',
        city: '南开区',
        difficulty: '3',
        direction: '企业咨询',
        enterpriseID: 12,
        options: [{
          code: 'A',
          img: '',
          isRight: true,
          title: '12323'
        }],
        question: '<p>DASDAS</p>',
        questionType: '2',
        remarks: '123',
        subjectID: 1,
        tags: '框架',
        videoURL: '12321'
      },
      rules: {}
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

// 上传功能样式
.option_item {
  padding-bottom: 20px;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
::v-deep .avatar-uploader {
  display: inline-block;
  vertical-align: middle;
  line-height: 1;

  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    width: 100px;
    height: 60px;
    line-height: 60px;
  }

  i {
    position: absolute;
    right: 0;
    top: 0;
    -webkit-transform: translate(50%, -50%);
    transform: translate(50%, -50%);
    background: #fff;
    font-size: 18px;
    color: #999;
  }
}
</style>
