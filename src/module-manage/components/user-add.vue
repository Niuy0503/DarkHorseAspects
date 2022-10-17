<template>
  <div class="add-form">
    <el-dialog :title="text + pageTitle" :visible.sync="dialogFormVisible" :before-close="handleClose">
      <el-form
        :rules="ruleInline"
        ref="dataForm"
        :model="formBase"
        label-position="left"
        label-width="120px"
        style="width: 400px; margin-left: 120px"
      >
      <!-- 用户名 -->
        <el-form-item :label="$t('table.username')" prop="username">
          <el-input v-model="formBase.username"></el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item :label="$t('table.email')" prop="email">
          <el-input v-model="formBase.email"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item
          v-if="!formBase.id"
          :label="$t('table.paddword')"
          prop="password"
        >
          <el-input v-model="formBase.password"></el-input>
        </el-form-item>

        <!-- 角色 -->
        <el-form-item :label="$t('table.role')" prop="role">
          <el-input v-model="formBase.role"></el-input>
        </el-form-item>
        <!-- 权限组 -->
        <el-form-item
          :label="$t('table.permissionUser')"
          prop="permission_group_id"
        >
          <el-select class="filter-item" v-model="formBase.permission_group_id">
            <el-option
              v-for="item in PermissionGroupsList"
              :value="item.id"
              :key="item.id"
              :label="item.title"
            ></el-option>
          </el-select>
        </el-form-item>
            <!-- 手机号 -->
        <el-form-item :label="$t('table.phone')" prop="phone">
          <el-input v-model="formBase.phone"></el-input>
        </el-form-item>

        <!-- 头像上传下一个版本再做 -->
        <!-- <el-form-item :label="$t('table.avatar')" prop="avatar">
            <el-upload
              class="upload-demo"
              :action="importFileUrl"
              :on-change="handleChange"
              :file-list="fileList" accept="image/jpeg,image/gif,image/png,image/bmp"
              :before-upload="beforeAvatarUpload">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
        </el-form-item>-->

        <!-- 介绍 -->
        <el-form-item :label="$t('table.introduction')">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="Please input"
            v-model="formBase.introduction"
          ></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="createData">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { update, add, detail } from '@/api/base/users'
export default {
  name: 'usersAdd',
  props: [
    'pageTitle',
    'ruleInline',
    'PermissionGroupsList'
  ],
  data () {
    return {
      dialogFormVisible: false,
      formBase: {
        avatar: '',
        username: '',
        password: '',
        email: '',
        role: '',
        permission_group_id: '',
        phone: '',
        introduction: ''
      }
      // fileList: [],
      // importFileUrl: 'https://jsonplaceholder.typicode.com/posts/',
    }
  },
  computed: {
    text () {
      return this.formBase.id ? '修改' : '创建'
    }
  },
  methods: {
    // // 弹层显示
    dialogFormV () {
      this.dialogFormVisible = true
    },
    // 弹层隐藏
    dialogFormH () {
      this.dialogFormVisible = false
    },
    // 退出
    handleClose () {
      this.$emit('handleCloseModal')
      this.$refs.dataForm.resetFields()
      this.formBase = {}
    },
    // 表单提交
    createData () {
      this.$refs.dataForm.validate(valid => {
        if (valid) {
          this.$emit('handleCloseModal')
          const data = {
            ...this.formBase
          }
          if (this.formBase.id) {
            update(data).then(() => {
              this.$emit('newDataes', this.formBase)
            })
            this.$message.success('修改成功！')
          } else {
            add(this.formBase).then(() => {
              this.$emit('newDataes', this.formBase)
            })
            this.$message.success('新增成功！')
          }
        } else {
          this.$Message.error('*号为必填项!')
        }
      })
    }
    // try {
    //   const data = { ...this.formBase }
    //   // await this.$refs.dataForm.validate()
    //   this.formBase.id ? await update(data) : await add(data)
    //   this.$emit('newDataes', this.formBase)
    //   this.$message.success(this.formBase.id ? '修改成功~' : '创建成功~')
    //   this.handleClose()
    // } catch (error) {
    //   this.$message.error('请求失败！')
    // }
  },
  // 挂载结束
  mounted: function () { },
  // 创建完毕状态
  created () { },
  // 组件更新
  updated: function () { }
}

</script>
<style>
.el-form--label-left .el-form-item__label {
  text-align: right;
}
.el-form-item--medium {
  margin-bottom: 22px;
}
.el-dialog__footer {
  text-align: center;
}
</style>
