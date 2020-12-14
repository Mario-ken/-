// miniprogram/pages/seller/seller.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    input:"",
    record:"",
    type:"",
    tempImagePath: ' ',
    ImagePaths: ' ',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  inputType: function(e) {

    this.setData({
      type: e.detail.value,
    })
  },
    



imageSub: function() {
  var that = this;
  wx.chooseImage({
    success: function(res) {
      that.setData({
        tempImagePath: res.tempFilePaths[0]
      });
      var path = that.data.type;
      that.setData({
        ImagePaths: "cloud://test-4gmrocyj32ece376.7465-test-4gmrocyj32ece376-1303520838/allDogsData/" + path + ".png",
      })
      console.log("tempFileUploadSuccess");
    },
  })
},
cas: function(e) {
  var that = this;
  wx.cloud.uploadFile({
    filePath: this.data.tempImagePath,
    cloudPath: 'allDogsData/' + this.data.type+ '.png',
    success: res => {
      console.log("imageUploadtoSqlSuccess");
    },
    fail: console.error
  })
  const db = wx.cloud.database();
  db.collection("cxq").add({
    data: {
      type: this.data.type,
      imageID: this.data.ImagePaths,
    },
    success: function() {
      wx.showToast({
        title: '上传成功',
      })
    }
  })
},




})