
Page({

  /**
   * 页面的初始数据
   */
  data: {
    studentList: [],
    length1: "",
    lessonid: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      lessonid: options.lessonid,      
    })
    console.log('slist');
    console.log(options.lessonid);
    console.log(that.data.lessonid);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) {
    var that = this;
    var lessonid = that.data.lessonid;
    console.log(lessonid);
    wx.request({
      url: 'http://localhost:8080/xdq/user/studentsList',
      data: {
        lessonid: lessonid,
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          studentList: res.data,
          length1: res.data.length
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
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
    var that = this;
    wx.showNavigationBarLoading(); //在标题栏中显示加载动画
    wx.request({
      url: 'http://localhost:8080/xdq/user/studentsList',
      data: {
        lessonid: that.data.lessonid,
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        if (res.data == false) { } else {
          that.setData({
            studentsList: res.data,
            length1: res.data.length
          })
          wx.setStorageSync('studentsList', res.data); //将获取信息写入本地缓存
        }
      },
      fail: function (res) { },
      complete: function (res) {
        wx.hideNavigationBarLoading(); //完成停止加载
        wx.stopPullDownRefresh(); //停止下拉刷新
      },
    })
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