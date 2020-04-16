// pages/lesson/lesson.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lesson: [],
    hiddenmodalput: true,
    hiddendelete: true,
    lessonId: "",
    slesson: "",
    keyid:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    var that = this;
    var openid = wx.getStorageSync('openid'); //用户id
    var time = require('../../../utils/util.js');
    wx.request({
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      url: 'http://localhost:8080/xdq/lesson/loadMyCreatLesson',
      data: {
        openid: openid,
      },
      success: function(res) {
        //console.log(res.data);
        for (var i = 0; i < res.data.length; i++) {
          // console.log(res.data[i].setTime);
          res.data[i].setTime = time.formatTime(res.data[i].setTime / 1000, 'Y-M-D h:m:s');

        }
        that.setData({
          lesson: res.data
        })
      },
      fail: function(res) {
        wx.showToast({
          title: '获取信息失败',
          icon: 'none'
        })
      },
      complete: function(res) {
        wx.showLoading({
          title: '加载中',
        })
        setTimeout(function() {
          wx.hideLoading()
        }, 400)
        if (res.data == '') {
          wx.showToast({
            title: '您还没有创建课程哟！',
            icon: 'none'
          })
        }
      }
    })
  },
  handleTouchStart: function (e) {
    this.startTime = e.timeStamp;
    console.log("startTime = " + e.timeStamp);
  },
  handleTouchEnd: function (e) {
    this.endTime = e.timeStamp;
    console.log("endTime = " + e.timeStamp);
  },
  chooselesson: function(e) {
    if (this.endTime - this.startTime < 350){
      console.log("点击");
      this.setData({
        lessonId: e.currentTarget.dataset.id,
        slesson: e.currentTarget.dataset.lesson
      })
      this.setData({
        hiddenmodalput: false
      })
    }    
  },
  //取消按钮
  cancel: function() {
    this.setData({
      hiddenmodalput: true,
    });
  },
  /** 查看历史考勤*/
  confirm: function() {
    wx.navigateTo({
      url: '../historyrecord/historyrecord?lessonid=' + this.data.lessonId + ''
    })
  },
  goKaoqin: function(e) {
    var that = this;
    console.log(that.data.lessonId);
    wx.request({
      url: 'http://localhost:8080/xdq/user/checkKaoqin',
      data: {
        lessonid: that.data.lessonId
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        console.log(res.data);
        console.log(res.data.state);
        console.log(res.data == null);
        if (res.data == null || res.data=="") {
          wx.navigateTo({
            url: '../kaoqin/kaoqin?lessonid=' + that.data.lessonId + '&slesson=' + that.data.slesson + ''
          })
        } else {
          if (res.data.state === 'false') {
            wx.navigateTo({
              url: '../kaoqin/kaoqin?lessonid=' + that.data.lessonId + '&slesson=' + that.data.slesson + ''
            })
          } else {
            that.setData({
              keyid: res.data.keyid,
            })
            wx.navigateTo({
              url: '../kaoqinList/kaoqinList?lessonid=' + that.data.lessonId + '&keyid=' + that.data.keyid + ''
            })
          }
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  goStudentList: function (e) {
    var that = this;
    console.log(that.data.lessonId);
    wx.navigateTo({
      url: '../studentsList/studentsList?lessonid=' + that.data.lessonId + ''
    })        
  },
  
  deletelesson: function(e){
    var that = this;
    if (this.endTime - this.startTime < 350) {
      console.log("长按");
      var slesson = e.currentTarget.dataset.lesson;
      console.log(slesson);
      wx.showModal({
        title: '是否删除课程' + slesson + '?' ,
        content: '删除后无法恢复' + '\n' + '请谨慎操作' ,
        success: function (res) {
          console.log(res);
          if (res.confirm) {
            var lessonId = e.currentTarget.dataset.id;
            console.log(lessonId);
            wx.request({
              url: 'http://localhost:8080/xdq/lesson/deletelesson',
              data: {
                lessonid: lessonId,
              },
              method: 'POST',
              header: {
                'Content-Type': 'application/json'
              },
              success: function (res) {
                console.log(res);
                wx.showToast({
                  title: '删除成功',
                  icon: 'success'
                })
                that.onLoad();
              },
              fail: function (res) { },
              complete: function (res) { },
            })
          }
          else {
            //console.log('用户点击取消')
          }          
        }        
      })
    }   
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
    this.setData({
      hiddenmodalput: true,
    });
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