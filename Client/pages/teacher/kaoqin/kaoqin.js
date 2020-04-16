// pages/kaoqin/kaoqin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenmodalput: true,
    signKey: "",
    lessonid:'',
    location:"",
    keyid:0
  },

  keyInput: function (e) {
    this.setData({
      signKey: e.detail.value
    })
    wx.setStorageSync('signKey', e.detail.value);
  },
  kaoqin: function () {
    var that=this;
    if (that.data.signKey != "") {
      //console.log(this.data.signKey)

      wx.request({
        url: 'http://localhost:8080/xdq/user/insertLessonKey',
        data: {
          lessonid: that.data.lessonid,
          lessonkey: that.data.signKey,
          latitude: wx.getStorageSync("latitude"), 
          longitude:wx.getStorageSync("longitude")
        },
        method: 'POST',
        header: { 'Content-Type': 'application/json' },
        success: function (res) {
          console.log(res.data)
          that.setData({
            hiddenmodalput: !that.data.hiddenmodalput,
            showKey: that.data.signKey,
            keyid:res.data
          })
        },
      })
    } else {
      wx.showToast({
        title: '口令为空，ㄟ( ▔, ▔ )ㄏ',
        icon: 'none'
      })
    }
  },
  //查看考勤名单
  confirm: function (e) {
    wx.redirectTo({
      url: '../kaoqinList/kaoqinList?lessonid=' + this.data.lessonid + '&keyid=' + this.data.keyid+'' })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options)
    wx.setNavigationBarTitle({ title: options.slesson})
    this.setData({
      lessonid: options.lessonid
    }),
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        console.log(res);
        var latitude = res.latitude;
        var longitude = res.longitude;
        wx.setStorageSync("latitude", latitude);
        wx.setStorageSync("longitude", longitude);

        // var dis = that.getDistance(34, 113, latitude, longitude);
      }
    })
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
  
  }
})