<p align="center">
    <!-- <img alt="logo" src="" width="120" style="margin-bottom: 10px;"> -->
</p>
<h3 align="center" style="margin: 30px 0 35px;">阿里云oss web直传解决方案</h3>

---


## 安装

#### NPM

```shell
npm i aliyun-oss-web -S
```

#### YARN

```shell
yarn add aliyun-oss-web
```


## 快速上手
> 方法中具体的参数 uploadImageUrl, AccessKeySecret, OSSAccessKeyId, getImg 这4个参数都可以通过阿里云后台拿到
> imgSignature 和 imgPolicy 需要通过 阿里云web直传的案例进行获取

#### 方式一. 直接传输

```js
import ossImg from 'aliyun-oss-web'

const oss = new ossImg({
  // aliyun oss config
  uploadImageUrl: 'Bucket 域名', 
  AccessKeySecret: 'Access Key Secret',
  OSSAccessKeyId: 'AccessKey ID',
  imgPolicy: '上传的秘钥',
  imgSignature: '上传的签名',
  getImg: '图片访问的域名', 
  // default (文件大小最大上限/M,默认10M)
  max: 10,
  fileLib: 'oss 对应文件目录', // 比如: "front/" 对应就会传到oss front文件夹下
  // lrz config 
  quality: 1, // 图片质量 0-1 从低到高, 默认0.8 具体参数参考lrz
})

oss.upload(file,(url)=>{
  console.log('上传成功：' + url)
})

```

> 如果要保证oss空间不被误传，或者其他原因导致该上传资源无法被利用，请使用方式二

#### 方式二. 分步上传

>该new ossImg 实例 提供了两个方法 lrzImage() upload()


```js
import ossImg from 'aliyun-oss-web'

const oss = new ossImg({
  // aliyun oss config
  uploadImageUrl: 'Bucket 域名', 
  AccessKeySecret: 'Access Key Secret',
  OSSAccessKeyId: 'AccessKey ID',
  imgPolicy: '上传的秘钥',
  imgSignature: '上传的签名',
  getImg: '图片访问的域名', 
  // default (文件大小最大上限/M,默认10M)
  max: 10,
  fileLib: 'oss 对应文件目录', // 比如: "front/" 对应就会传到oss front文件夹下
  // lrz config 
  quality: 1, // 图片质量 0-1 从低到高, 默认0.8 具体参数参考lrz
})
// 这是压缩图片后且校验图片大小是否符合的方法
let pic = []
oss.lrzImage(file,(picObj)=>{
  // picObj 是一个对象 {content: 'base64的图片，可直接用于显示'，file: '压缩后的图片文件'}
  console.log(picObj)
  pic.push(picObj);
})
// 通过 upload 把压缩的文件上传上去
pic.map(item=>{
  if(item.file){
    oss.upload(item.file,(url)=>{
      console.log(url)
      this.picUrl.push(url);
    })
  }  
})

```





## 贡献代码

使用过程中发现任何问题都可以提 [Issue](https://github.com/13725102796/aliyun-oss/issues) 



## 链接

* [Vue OSS Demo: 示例工程](https://github.com/13725102796/css3-demo/blob/master/src/page/plugin/ossImg.vue)




## 开源协议

本项目基于 [MIT](https://zh.wikipedia.org/wiki/MIT%E8%A8%B1%E5%8F%AF%E8%AD%89) 协议，请自由地享受和参与开源。
