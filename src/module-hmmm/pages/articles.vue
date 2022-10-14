<template>
  <div class="container">
    <el-card class="box-card">
      <!--@ 头部搜索框区域 -->
      <el-row :gutter="20">
        <el-col :span="18">
          <el-form
            status-icon
            label-width="80px"
            class="demo-ruleForm"
            :inline="true"
          >
            <el-form-item label="关键字" size="small">
              <el-input
                v-model="page.keyword"
                size="small"
                autocomplete="off"
                placeholder="根据文章标题搜索"
              ></el-input>
            </el-form-item>

            <el-form-item label="状态" size="small">
              <el-select placeholder="请选择" size="small" v-model="page.state">
                <el-option
                  :label="item.label"
                  :value="item.value"
                  v-for="item in status"
                  :key="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <!-- 搜索 -->
            <el-form-item size="small">
              <el-button size="small" @click="clearSearch">清除</el-button>
              <el-button type="primary" size="small" @click="onSearch"
                >搜索</el-button
              >
            </el-form-item>
          </el-form>
        </el-col>

        <!-- 新增文章 -->
        <el-col :span="6" style="text-align: right">
          <el-button
            type="success"
            size="small"
            icon="el-icon-edit"
            @click="addArticle"
            >新增技巧</el-button
          >
        </el-col>
      </el-row>

      <!--@ 数据条数 -->
      <el-alert
        :title="`数据一共 ${counts} 条`"
        type="info"
        show-icon
        :closable="false"
      >
      </el-alert>

      <!--@ 表格 -->
      <el-table
        :data="articlesList"
        style="width: 100%"
        v-loading="loading"
        :header-cell-style="{
          backgroundColor: 'rgb(250, 250, 250)',
          'border-color': 'rgb(232, 232, 232)',
          'border-bottom': '2px solid #e8e8e8',
        }"
      >
        <el-table-column type="index" label="序号" width="80">
        </el-table-column>
        <el-table-column prop="title" label="文章标题" width="400">
          <template slot-scope="{ row }">
            {{ row.title }}
            <a
              v-if="row.videoURL"
              href="#"
              class="el-icon-film"
              @click="popVideo(row)"
            ></a>
          </template>
        </el-table-column>
        <el-table-column prop="visits" label="阅读数" width="300">
        </el-table-column>
        <el-table-column prop="username" label="录入人" width="300">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="录入时间"
          width="300"
          :formatter="formatterDate"
        >
        </el-table-column>
        <el-table-column
          prop="state"
          label="状态"
          width="100"
          :formatter="formatterState"
        >
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="{ row }">
            <el-button type="text" @click="popPreview(row)">预览</el-button>
            <el-button
              type="text"
              v-if="!row.state"
              @click="changeState(row, 1)"
              >启用</el-button
            >
            <el-button type="text" v-else @click="changeState(row, 0)"
              >禁用</el-button
            >
            <el-button
              type="text"
              :disabled="!(row.state === 0)"
              @click="editArticle(row)"
              >修改</el-button
            >
            <el-button
              type="text"
              :disabled="!(row.state === 0)"
              @click="delArticle(row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!--@ 分页器 -->
      <div class="block">
        <el-pagination
          v-if="pages > 1"
          background
          :page-sizes="[5, 10, 20, 50]"
          @size-change="getArticlesList"
          @current-change="getArticlesList"
          :current-page.sync="page.page"
          :page-size.sync="page.pagesize"
          layout="prev, pager, next,sizes ,jumper"
          :total.sync="counts"
        >
        </el-pagination>
      </div>

      <!--@ 文章预览弹出层 -->
      <ArticlesPreview
        :dialogPreviewVisible.sync="dialogPreviewVisible"
        :currentPreview="currentPreview"
      ></ArticlesPreview>

      <!--@ 新增或修改弹出层 -->
      <ArticlesAdd
        ref="ArticlesAdd"
        :dialogAddVisible.sync="dialogAddVisible"
        :currentArticle.sync="currentArticle"
        @getArticlesList="getArticlesList"
      ></ArticlesAdd>

      <!--@ video弹窗 -->
      <Video
        :dialogVideoVisible.sync="dialogVideoVisible"
        :videoURL="videoURL"
        ref="Video"
      ></Video>
    </el-card>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { list as getArticlesListAPI, changeState as changeStateAPI, remove as removeAPI } from '@/api/hmmm/articles'
import { status } from '@/api/hmmm/constants'
import ArticlesPreview from '../components/articles-preview.vue'
import ArticlesAdd from '../components/articles-add.vue'
import Video from '../components/video.vue'
export default {
  name: 'articles',
  created () {
    this.getArticlesList()
  },
  data () {
    return {
      page: {
        page: 1,
        pagesize: 10,
        keyword: null,
        state: null
      },
      articlesList: [],
      pages: '',
      counts: null,
      loading: false,
      status,
      dialogPreviewVisible: false,
      dialogAddVisible: false,
      dialogVideoVisible: false,
      currentPreview: {},
      currentArticle: {},
      videoURL: null
    }
  },
  methods: {
    // 获取文章列表
    async getArticlesList () {
      try {
        this.loading = true
        const { data } = await getArticlesListAPI(this.page)
        this.counts = data.counts
        this.pages = data.pages
        this.articlesList = data.items
        console.log(data)
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    // 清空搜索框
    clearSearch () {
      this.page.keyword = null
      this.page.state = null
    },
    // 搜索请求
    onSearch () {
      this.getArticlesList()
    },
    // 改变状态
    async changeState (row, state) {
      try {
        console.log(row)
        await changeStateAPI({ id: row.id, state })
        this.$message.success('操作成功!')
        this.getArticlesList()
      } catch (error) {
        console.log(error)
      }
    },
    // 预览框
    popPreview (row) {
      this.currentPreview = row
      this.dialogPreviewVisible = true
    },
    // 新增文章
    addArticle () {
      this.dialogAddVisible = true
    },
    // 修改文章
    editArticle (row) {
      this.$refs.ArticlesAdd.artcilesInfo = {
        articleBody: row.articleBody,
        id: row.id,
        title: row.title,
        videoURL: row.videoURL
      }
      console.log(this.$refs.ArticlesAdd.artcilesInfo)
      this.dialogAddVisible = true
    },
    // 删除文章
    async delArticle (row) {
      try {
        await this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await removeAPI(row)
        this.$message.success('删除成功')
        this.getArticlesList()
      } catch (error) {
        console.log(error)
      }
    },
    // 弹出 video
    popVideo (row) {
      this.dialogVideoVisible = true
      this.$refs.Video.playerOptions.sources[0].src = row.videoURL
    },
    // 格式化日期
    formatterDate (row) {
      return dayjs(row.createTime).format('YYYY-MM-DD HH:mm:ss')
    },
    // 格式化状态
    formatterState (row) {
      return row.state === 0 ? '已禁用' : '已启用'
    }
  },
  components: { ArticlesPreview, ArticlesAdd, Video }
}
</script>

<style scoped lang='less'>
.container {
  padding: 10px;
  .box-card {
    width: 100%;
  }
}
.el-input {
  width: 200px;
}
.el-alert {
  margin-bottom: 15px;
}

.el-icon-film {
  color: #00f;
  font-size: 18px;
}

.block {
  margin-top: 20px;
  text-align: right;
}
</style>
