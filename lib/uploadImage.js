
// import config from '@/config'
const axios = require('axios')

/**
 * 必须注入handleError
 *
 * @param {*} tempFilePath  img url
 * @param {*} config  uploadConfig
 */
async function uplaodImg (tempFilePath,config) {
  console.log(tempFilePath)
  const fileLib = config.fileLib || ''
  const form = new FormData()
  const fileName = +new Date() + String(tempFilePath.name)
  form.append('name', fileName)
  form.append('key', `${fileLib + fileName}`)
  form.append('policy',config.imgPolicy)
  form.append('OSSAccessKeyId', config.OSSAccessKeyId)
  form.append('success_action_status', 200)
  form.append('signature', config.imgSignature)
  form.append('file',tempFilePath)
  const data = await axios.post(config.uploadImageUrl, form)
  
  // console.log(data)
  if (data.status == 400) {
    alert("上传的图片大小不符合规范！");
  } else if (data.status == 200) {
    return config.getImg + '/' + fileLib + fileName       
  }
}


module.exports = uplaodImg
