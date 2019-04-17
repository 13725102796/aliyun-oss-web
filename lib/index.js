// img compress 图片压缩
const lrz = require('lrz/dist/lrz.bundle.js')
// console.log(123123)
const uploadImage = require('./uploadImage')
/**
 * @class ossImg
 */

class ossImg {
  constructor(config){
    this.config = config
  }
  /**
   * 
   * 
   * @param {any} file 上传文件
   * @param {any} callback 成功回调 参数 url 为图片地址
   * @memberof ossImg
   */
  upload(file,callback){
    console.log(this.config)
    // if(this.check(file)){
      this.lrzImage(file,(picObj)=>{
        this.uploadImg(picObj.file, callback)
      })
    // }
  }


  check(file){
    const max = this.config.max || 10
    const isLt2M = file.size / 1024 / 1024 < max;
    if (!isLt2M) {
      alert(`上传图片大小不能超过 ${max}MB!`);
      return false
    }
    return true
  }
  lrzImage(file,callback){
    const that = this
    const lrzConfig = that.config.lrz || {}
    console.log('上传中...')
    lrz( file, {
      quality: that.config.quality || 0.8    //自定义使用压缩方式
    }).then((rst) => {
      console.log(rst)
      // console.log('压缩成功！')
      if(!rst.file.name) rst.file.name = rst.origin.name
      // 校验大小
      if(that.check(rst.file)){
        callback({
          content: rst.base64,
          file: rst.file,
        })
      }
    }).catch((error)=> {
        //失败时执行
       console.log('图片压缩失败，请换张试试！')
    })
  }
  // 分步上传 1.check大小，压缩
  /**
   * 
   * 
   * @param {any} file  上传图片
   * @param {any} callback 成功回调
   * @memberof ossImg
   */
  async uploadImg(file,callback){
    const url = await uploadImage(file,this.config)
    console.log('上传成功, 上传地址为：' + url)
    callback(url)
  }

}

module.exports = ossImg