<template>
  <div id="app">
    <img src="./assets/logo.png">
    <!--<router-view/>-->
    <div id="editor">
      欢迎使用
    </div>
    <button @click="getContent" id="btn1">获取html</button>
    <div>
      <input type="file" @change="handleUpload" name="file" multiple="multiple"
             accept="image/jpeg,image/gif,image/png,image/bmp">
      <img :src="imgnew" style="width: 200px" alt="上传的图片">
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      wenben: '',
      file: '',
      files1: '',
      newImg: '',
      imgUrl: '',
      imgnew: ''
    }
  },
  created () {

  },
  mounted () {
    this.wangEditor()
  },
  methods: {
    wangEditor () {
      var E = window.wangEditor
      var editor = new E('#editor')
      editor.customConfig.menus = [ // 设置文本框的选项
        'head', // 标题
        'image', // 插入图片
        'link' // 插入链接
      ]
      editor.customConfig.customUploadImg = (files, insert) => {
        // files 是 input 中选中的文件列表 insert 是获取图片 url 后，插入到编辑器的方法
        let files1 = files[0]
        var reader = new FileReader()
        reader.readAsDataURL(files1) // 读取文件
        reader.onloadend = () => {
          let base64head = reader.result
          this.imgnew = base64head
          insert(this.imgnew) // 上传代码返回结果之后，将图片插入到编辑器中
        }
        this.files1 = files1
      }
      editor.customConfig.uploadImgShowBase64 = true // 使用 base64 保存图片
      editor.customConfig.showLinkImg = false // 隐藏“网络图片”tab
      editor.create()
      if (window.sessionStorage.getItem('wenben')) {
        editor.txt.html(window.sessionStorage.getItem('wenben'))
      }
      this.wenben = editor
    },
    getContent () {
      console.log(this.wenben.txt.html())
      window.sessionStorage.setItem('wenben', this.wenben.txt.html())
    },
    handleUpload (file) {
      console.log('file', file)
      this.newImg = file.target.files
      var reader = new FileReader()
      reader.readAsDataURL(file.target.files[0]) // 读取文件
      reader.onloadend = () => {
        let base64head = reader.result
        this.imgUrl = base64head
      }
      return false
    }
  }
}
</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;

    #editor {
      text-align: left;

      img {
        width: 300px;
      }
    }
  }
</style>
