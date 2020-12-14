
//index.js
const app = getApp()
Page({

  //data属性为和页面绑定的数据
  
  data: {
  
  text: "保存",    //提交按钮上显示的文字
  
  name:"0",    
  number:"0",//input输入框的值，用于更新记录成功后清空输入框的值
  
  record:"",
  nowPage:"firstPage",
  nowIndex:0,
  tabBar:[
    {
      "iconClass":"iconfont icon-shouye",
      "text":"我的",
      "tapFunction":"toFirst",
      "active":"active"
    },
    {
      "iconClass":"iconfont icon-wode",
      "text":"逛逛",
      "tapFunction": "toSecond",
      "active": ""
    }
  ]
  
  },
  uploadFile(){
    var that = this;
    wx.chooseImage({
      success: function(res) {
        that.setData({
          tempImagePath: res.tempFilePaths[0]
        });
        var path = that.data.name;
        that.setData({
          ImagePaths: "cloud://yunduan-xpleq.7975-yunduan-xpleq-1300300473/allDogsData/" + path + ".png",
        })
        console.log("tempFileUploadSuccess");
      },
    })
  },
  //read函数，点击读取按钮触发此函数
  
  read(){
  
  //检查基础库版本
  
  if (!wx.cloud) {
  
  console.error('请使用 2.2.3 或以上的基础库以使用云能力')
  
  } else {
  
  wx.cloud.init({
  
  traceUser: true,
  
  })
  
  }
  
  //保存this变量
  
  var _this = this;
  
  //调用云函数
  
  wx.cloud.callFunction({
  
  // 云函数名称
  
  name: 'query',
  
  // 传给云函数的参数
  
  data: {
  
  tag: 1
  
  },
  
  //success函数为调用成功后的回调函数
  
  success: function (res) {
  
  console.log(res.result)
  
  _this.setData({
    record: res.result.data[0].content      //设置record值，显示在页面上。setData函数会触发页面的重新渲染

})

},

//fail函数为调用失败后的回调函数

fail: console.error

})

},
imageSub: function() {
  var that = this;
  wx.chooseImage({
    success: function(res) {
      that.setData({
        tempImagePath: res.tempFilePaths[0]
      });
      var path = that.data.name;
      that.setData({
        ImagePaths: "oud://test-4gmrocyj32ece376.7465-test-4gmrocyj32ece376-1303520838/allDogsData/" + path + ".png",
      })
      console.log("tempFileUploadSuccess");
    },
  })
},
cas: function(e) {
  var that = this;
  wx.cloud.uploadFile({
    filePath: this.data.tempImagePath,
    cloudPath: 'allDogsData/' + this.data.name + '.png',
    success: res => {
      console.log("imageUploadtoSqlSuccess");
    },
    fail: console.error
  })
  const db = wx.cloud.database();
  db.collection("111").add({
    data: {
      name:this.data.name,
      number:this.data.number,
      imageID: this.data.ImagePaths,
    },
    success: function() {
      wx.showToast({
        title: '上传成功',
      })
    }
  })
},


inputname: function(e) {

  this.setData({
    name: e.detail.value,
  })
},
inputnumber: function(e) {

  this.setData({
    number: e.detail.value,
  })
},




})