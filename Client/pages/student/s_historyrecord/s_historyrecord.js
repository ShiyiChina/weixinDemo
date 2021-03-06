// pages/student/s_historyrecord/s_historyrecord.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    record: [],
    index: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options)
    wx.request({
      url: 'http://localhost:8080/xdq/user/showUserRecord',
      data: {
        lessonid: options.lessonid,
        openid:options.openid
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        //console.log(res.data)
        if (res.statusCode != 200) {
          wx.showToast({
            title: '暂无考勤纪录',
            icon: 'none'
          })
        } else {
          console.log(res);
          that.setData({
            record: res.data
          })

        }
      },
      fail: function (res) { },
      complete: function (res) { },
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