// pages/queqinList/queqinList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    queqinList: [],
    length1: "",
    lessonid: '',
    keyid: 0

  },
  change_1: function(e){
    var that = this;
    var openid = e.currentTarget.dataset.openid;
    var keyid = e.currentTarget.dataset.keyid;
    var name = e.currentTarget.dataset.name;
    console.log(openid);
    console.log(keyid); 
    console.log(name);
    wx.showModal({
      title: '姓名：' + '\n' + name ,
      content: '确定此学生已请假？' ,
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          wx.request({
            url: 'http://localhost:8080/xdq/user/updateUserQj',
            data: {
              openid: openid,
              keyid: keyid,
            },
            method: 'POST',
            header: {
              'Content-Type': 'application/json'
            },
            success: function (res) {
              console.log(res);
              wx.showToast({
                title: '修改成功',
                icon: 'success'
              })
              that.onLoad(res.data);

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
  },
  change_2: function (e) {
    var that = this;
    var openid = e.currentTarget.dataset.openid;
    var keyid = e.currentTarget.dataset.keyid;
    var name = e.currentTarget.dataset.name;
    console.log(openid);
    console.log(keyid);
    console.log(name);
    wx.showModal({
      title: '姓名：' + '\n' + name,
      content: '确定此学生在教室？',
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          wx.request({
            url: 'http://localhost:8080/xdq/user/updateUserQd',
            data: {
              openid: openid,
              keyid: keyid,
            },
            method: 'POST',
            header: {
              'Content-Type': 'application/json'
            },
            success: function (res) {
              console.log(res);
              wx.showToast({
                title: '修改成功',
                icon: 'success'
              })
              that.onLoad(res.data);
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
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var that = this;
    var sList = wx.getStorageSync('sList') || [];
    console.log(sList)
    //var lessonid = e.lessonid;
    var keyid = e.keyid;
    //console.log(keyid)
    if (keyid != 0){
      wx.request({
        url: 'http://localhost:8080/xdq/user/queqinList',
        data: {
          keyid: keyid,
        },
        method: 'POST',
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          //console.log(res.data)
            that.setData({
              queqinList: res.data,
              length1: res.data.length
            })
            /**保存缺勤名单 */
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
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
    wx.removeStorageSync("sList")
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