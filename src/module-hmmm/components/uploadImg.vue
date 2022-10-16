<template>
  <div class="uploadContainer">
    <!-- <el-upload
      class="avatar-uploader"
      style="margin-left: 4px"
      action="#"
      list-type="picture-card"
      :file-list="fileList"
      :on-change="onChange"
      :before-upload="beforeUpload"
      :http-request="httpRequest"
      :limit="1"
    >
      <img style="width: 100%" :src="previewImgUrl" alt="" />
      <span>上传图片</span>
      <i class="el-icon-circle-close"></i>
    </el-upload> -->

    <el-upload
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      style="margin-left: 4px"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :on-change="onChange"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <span v-else>上传文件</span>
      <i class="el-icon-circle-close" @click="clear"></i>
    </el-upload>
  </div>
</template>

<script>

export default {
  name: 'uploadImg',

  data () {
    return {
      imageUrl: ''
    }
  },
  methods: {
    onChange (file) {
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.$emit('imgUrl', this.imageUrl)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    clear () {
      console.log(1)
    }
  }

  // data () {
  //   return {
  //     fileList: [],
  //     previewImgUrl: ''
  //   }
  // },
  // methods: {
  //   onChange (file, fileList) {
  //     // this.previewImgUrl = file.url
  //     this.fileList = fileList
  //   },
  //   httpRequest () {
  //     console.log('覆盖默认上传行为')
  //   },
  //   // 上传之前触发
  //   beforeUpload (file) {
  //     const allowTypes = ['image/jpeg', 'image/gif']
  //     const ishas = allowTypes.includes(file.type)
  //     if (!ishas) {
  //       this.$message.error('只能上传' + allowTypes.join(',') + '格式')
  //       return false
  //     }

  //     // 限制上传的大小
  //     const maxSize = 1 * 1024 * 1024
  //     if (file.size > maxSize) {
  //       this.$message.error('只能上传不超过1mb大小的图片')
  //       return false
  //     }
  //   }
  // }
}
</script>

<style scoped lang="less">
// 上传功能样式

.uploadContainer {
  display: inline-block;
}

:deep(.avatar-uploader) {
  display: inline-block;
  vertical-align: middle;
  line-height: 1;
  width: 100px;
  height: 60px;

  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    width: 100px;
    height: 60px;
    line-height: 60px;
    .avatar {
      width: 100%;
      height: 100%;
    }
  }

  .el-upload-list__item {
    width: 100%;
    height: 100%;
  }

  .el-icon-circle-close {
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

// .avatar-uploader .el-upload:hover {
//   border-color: #409eff;
// }
// .uploadContainer {
//   display: inline-block;
// }
// :deep(.avatar-uploader) {
//   vertical-align: middle;
//   line-height: 1;
//   display: inline-block;
//   overflow: hidden;
//   width: 100px;
//   height: 60px;

//   .el-upload {
//     border: 1px dashed #d9d9d9;
//     border-radius: 6px;
//     cursor: pointer;
//     position: relative;
//     width: 100px;
//     height: 60px;
//     line-height: 60px;
//   }

//   i {
//     position: absolute;
//     right: 0;
//     top: 0;
//     -webkit-transform: translate(50%, -50%);
//     transform: translate(50%, -50%);
//     background: #fff;
//     font-size: 18px;
//     color: #999;
//   }
// }
</style>
