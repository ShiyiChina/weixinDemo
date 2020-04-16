// pages/sign/sign.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    signKey: "",
    id: ""
  },

  keyInput: function(e) {
    this.setData({
      signKey: e.detail.value
    })
  },
  // getDistance: function (lat1, lng1, lat2, lng2) {
  //   lat1 = lat1 || 0;
  //   lng1 = lng1 || 0;
  //   lat2 = lat2 || 0;
  //   lng2 = lng2 || 0;
  //   var rad1 = lat1 * Math.PI / 180.0;
  //   var rad2 = lat2 * Math.PI / 180.0;
  //   var a = rad1 - rad2;
  //   var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
  //   var r = 6378137;
  //   return (r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)))).toFixed(0);
  // },
  sign: function() {
    var that = this;
    var openid = wx.getStorageSync('openid'); //用户id
    
    if (this.data.signKey != "") {
      wx.request({
        url: 'http://localhost:8080/xdq/user/checkLessonKey',
        data: {
          lessonid: that.data.id,
        },
        method: 'POST',
        header: {
          'Content-Type': 'application/json'
        },
        success: function(res) {
          console.log(res.data);
          if (res.data.lessonkey != undefined) {
            if (res.data.state != 'false') {
              if (that.data.signKey === res.data.lessonkey) {

                var keyid = res.data.keyid;
                var lat1 = res.data.latitude || 0;
                var lng1 = res.data.longitude || 0;
                var lat2 = wx.getStorageSync("latitude") || 0;
                var lng2 = wx.getStorageSync("longitude") || 0;
                var rad1 = lat1 * Math.PI / 180.0;
                var rad2 = lat2 * Math.PI / 180.0;
                var a = rad1 - rad2;
                var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
                var r = 6378137;
                var dis = (r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)))).toFixed(0);
                if(dis<200){
                  wx.request({
                  url: 'http://localhost:8080/xdq/user/Qiandao',
                  data: {
                    keyid: keyid,
                    openid: openid
                  },
                  method: 'POST',
                  header: {
                    'Content-Type': 'application/json'
                  },
                  success: function(res) {
                    var openid = wx.getStorageSync('openid'); //用户id
                    var lessonid = that.data.id;
                    console.log(openid,lessonid);

                    wx.showToast({
                      title: '签到成功',
                      icon: 'success'
                    })
                    setTimeout(function () {
                      wx.navigateTo({
                        url: '../s_historyrecord/s_historyrecord?openid=' + openid + '&lessonid=' + lessonid + '',
                      })
                    }, 1500)
                  },
                  fail: function(res) {},
                  complete: function(res) {},
                  })
                }else{
                  wx.showToast({
                    title: '距离太远！',
                    icon: 'none'
                  })
                }
              } else {
                wx.showToast({
                  title: '签到口令错误！',
                  icon: 'none'
                })
              }
            } else {
              wx.showToast({
                title: '签到已经结束!',
                icon: 'none'
              })
            }
          } else {
            wx.showToast({
              title: '该课程没有发起签到!',
              icon: 'none'
            })
          }
        },
        fail: function(res) {},
        complete: function(res) {},
      })
      //console.log(this.data.signKey)
    } else {
      wx.showToast({
        title: '签到口令为空 (+_+)?',
        icon: 'none'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //console.log(options)
    this.setData({
      id: options.lessonid
    })
    wx.setNavigationBarTitle({
      title: options.slesson
    })
    wx.setStorageSync('lessonid', options.lessonid);
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
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})