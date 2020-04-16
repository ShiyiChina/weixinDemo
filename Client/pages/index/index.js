Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenmodalput: true,
    hide1: true,
    hide2: true,
    isRegister: true,
    sname: "",
    snum: "",
    slesson: "",
    sclass: "",
  },

  //点击按钮弹出指定的hiddenmodalput弹出框
  modalinput1: function (e) {
    var that = this;
    if (e.detail.userInfo != undefined) {
      if (that.data.isRegister == false) {
        that.setData({
          hiddenmodalput: !that.data.hiddenmodalput,
          hidden1: false,
          hidden2: true,
        })
      } else {
        wx.navigateTo({ url: '../student/student_lesson/student_lesson' })
      }
    }
  },
  modalinput2: function (e) {
    if (e.detail.userInfo != undefined) {
      this.setData({
        hiddenmodalput: !this.data.hiddenmodalput,
        hidden1: true,
        hidden2: false,
      })
    }
  },
  goLesson: function () {
    wx.navigateTo({ url: '../teacher/lesson/lesson' })
  },
  //取消按钮
  cancel: function () {
    this.setData({
      hiddenmodalput: true,
    });
  },
  //确认
  confirm: function (e) {
    var that = this;
    this.setData({
      hiddenmodalput: true,
    })
    if ((that.data.sname && that.data.snum) || (that.data.slesson && that.data.sclass) != '') {
      this.charu()
      this.setData({
        slesson: "",
        sclass: "",
      })
    } else {
      wx.showToast({
        title: '输入为空(+_+)?',
        icon: 'none'
      })
    }
  },

  //获取input的信息
  setname: function (e) {
    this.setData({ sname: e.detail.value })
  },
  setnum: function (e) {
    this.setData({ snum: e.detail.value })
  },
  setlesson: function (e) {
    this.setData({ slesson: e.detail.value })
  },
  setclass: function (e) {
    this.setData({ sclass: e.detail.value })
  },

  charu: function () {
    var that = this;
    var openid = wx.getStorageSync('openid');
    wx.request({
      url: 'http://localhost:8080/xdq/user/sign',
      data: {
        openid: openid,
        sname: that.data.sname,
        snum: that.data.snum,
        slesson: that.data.slesson,
        sclass: that.data.sclass
      },
      method: 'POST',
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        //console.log(res.data)
        if (res.data === "User") {
          wx.showToast({
            title: '添加成功！',
            icon: 'success'
          })
          that.setData({
            isRegister: true,
          })
          // this.onLoad();
          
          wx.navigateTo({ url: '../student/student_lesson/student_lesson' })

        } else if (res.data === "lesson"){
          wx.showToast({
            title: '添加成功！',
            icon: 'none'
          })
          wx.navigateTo({ url: '../teacher/lesson/lesson' })
        } else{
          wx.showToast({
            title: '已注册',
            icon: 'error'
          })
          that.setData({
            isRegister: true,
          })
          this.onLoad();
        }
      },
      fail: function (res) {

      },
      complete: function (res) { },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.login({
      success: function (res) {
        var code = res.code;//发送给服务器的code
        if (code) {
          wx.request({
            url: 'http://localhost:8080/xdq/user/login',
            data: {
              code: code,
            },
            method: 'POST',
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log("login " + res.data);
              wx.setStorageSync('openid', res.data);//将获取信息写入本地缓存  
              wx.request({
                url: 'http://localhost:8080/xdq/user/check_user',
                data: { openid: wx.getStorageSync("openid") },
                method: 'POST',
                header: { 'Content-Type': 'application/json' },
                success: function (res) {
                  // console.log("index.js success " + openid);
                  console.log("index.js success " + res.data);
                  console.log(res.data == null);
                  console.log(res.data === "");
                  if (res.data == null || res.data=="") {
                    that.setData({
                      isRegister: false
                    })
                  }
                },
                fail: function (res) {
                  console.log("index.js fail" + res);
                },
                complete: function (res) { },
              })

            }
          })
        }
        else {
          console.log("获取用户登录态失败！");
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })


    wx.showLoading({
      title: '加载中',
    })

    setTimeout(function () {
      wx.hideLoading()
    }, 1500)
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
    this.setData({
      hiddenmodalput: true
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