// pages/student_lesson/student_lesson.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    student_lesson: [],
    bgcolor1: "gainsboro",
    bgcolor2: "white",
    ismine:false,
    hiddenmodalput:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var userid = wx.getStorageSync('openid');//用户id
    var time = require('../../../utils/util.js');
    // console.log(time.formatTime(1488481383, 'Y-M-D h:m:s'))
    wx.request({
      method: 'POST',
      header: { 'Content-Type': 'application/json' },
      url: 'http://localhost:8080/xdq/lesson/loadAllLesson',
      data: {},
      success: function (res) {
        //console.log(res.data);
        
        for(var i=0; i<res.data.length;i++){
          // console.log(res.data[i].setTime);
          res.data[i].setTime = time.formatTime(res.data[i].setTime/1000, 'Y-M-D h:m:s');
          
        }
        that.setData({
          student_lesson: res.data
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '获取信息失败',
          icon: 'none'
        })
      },
      complete: function (res) {
        wx.showLoading({
          title: '加载中',
        })
        setTimeout(function () {
          wx.hideLoading()
        }, 500)
        if (res.data == '') {
          wx.showToast({
            title: '还没有创建课程哟！',
            icon: 'none'
          })
        }
      }
    })
  },
  all: function () {
    this.onLoad();
    this.setData({
      bgcolor1: "gainsboro",
      bgcolor2: "white",
      ismine:false
    })
  },
  mine: function () {
    this.setData({
      bgcolor1: "white",
      bgcolor2: "gainsboro",
      ismine: true
    })

    var that = this;
    var openid = wx.getStorageSync('openid');//用户id
    var time = require('../../../utils/util.js');
    wx.request({
      method: 'POST',
      header: { 'Content-Type': 'application/json' },
      url: 'http://localhost:8080/xdq/lesson/loadLesson',
      data: {
        openid: openid
      },
      success: function (res) {
        //console.log(res.data);
        if (res.data == null) {
          that.setData({
            student_lesson: ""
          })
        }else{
          for (var i = 0; i < res.data.length; i++) {
            // console.log(res.data[i].setTime);
            res.data[i].setTime = time.formatTime(res.data[i].setTime / 1000, 'Y-M-D h:m:s');

          }
          that.setData({
            student_lesson: res.data
          })
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '获取信息失败',
          icon: 'none'
        })
      },
      complete: function (res) {
        wx.showLoading({
          title: '加载中',
        })
        setTimeout(function () {
          wx.hideLoading()
        }, 500)
      }
    })
  },
  addlesson: function (e) {
    var lessonid = e.currentTarget.dataset.id;
    var slesson = e.currentTarget.dataset.lesson;
    var sclass = e.currentTarget.dataset.class;
    var setTime = e.currentTarget.dataset.stime;
    var setTime = Date.parse(setTime);
    console.log(lessonid);
    console.log(slesson);
    console.log(sclass);
    console.log(setTime);
    var openid = wx.getStorageSync('openid');//用户id
    if(this.data.ismine==false){
      wx.showModal({
        title: slesson,
        content: '是否添加到"我的课程"?',
        success: function (res) {
          console.log(res);
          if (res.confirm) {
            wx.request({
              url: 'http://localhost:8080/xdq/lesson/addLesson',
              data: {
                openid: openid,
                lessonid: lessonid,
                lessonname: slesson,
                // sclass: sclass,
                settime: setTime
              },
              method: 'POST',
              header: { 'Content-Type': 'application/json' },
              success: function (res) {
                if (res.data === "yes") {
                  wx.showToast({
                    title: '已经添加过了',
                    icon: 'none'
                  })
                } else {
                  wx.showToast({
                    title: '添加成功',
                    icon: 'success'
                  })
                }
              },
              fail: function (res) { },
              complete: function (res) { },
            })
          } else {
            //console.log('用户点击取消')
          }

        }
      })
    }else{
      this.setData({
        lessonId: e.currentTarget.dataset.id,
        slesson: e.currentTarget.dataset.lesson
      })
      this.setData({
        hiddenmodalput: false
      })
    }
  },
  cancel: function () {
    this.setData({
      hiddenmodalput: true,
    })
  },
  /** 查看历史考勤*/
  confirm: function (e) {
    var openid = wx.getStorageSync('openid');
    wx.navigateTo({
      url: '../s_historyrecord/s_historyrecord?lessonid=' + this.data.lessonId + '&openid='+openid+''
    })
  },
  goKaoqin: function (e) {
    var that = this;
    console.log(that.data.lessonId);
    console.log('gokaoqin');
    var lessonid = that.data.lessonId;
    var slesson = that.data.slesson;
    console.log(lessonid);
    console.log(slesson);
    wx.navigateTo({
      url: '../sign/sign?lessonid=' + lessonid + '&slesson=' + slesson + ''
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