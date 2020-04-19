   // pages/home/person/person.js
let app = getApp();
var userInfo = null;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    user:null,
    name: '',
    xuehao: '',
    name_focus: false,
    xuehao_focus: false,
    btn_disabled: true,
    btn_loading: false,
  },
  //button按钮变色
  inputInput:function (e) {
    if (e.target.id == 'name') {
      this.setData({
        name: e.detail.value
      });
    } else if (e.target.id == 'xuehao') {
      this.setData({
        xuehao: e.detail.value
      });
    }
    let btn = true;
    if (this.data.name.length <= 4 && this.data.xuehao.length <= 12 && this.data.name.length >= 2 && this.data.xuehao.length >= 6) {
      btn = false;
    }
    this.setData({
      //btn_disabled为false时，确定标志点亮
      btn_disabled: btn
    });
  },
  //点击输入栏后底部线条变色
  inputFocus: function (e) {
    if (e.target.id == 'name') {
      this.setData({
        name_focus: true
      });
    } else if (e.target.id == 'xuehao') {
      this.setData({
        xuehao_focus: true
      });
    }
  },
  //点击输入栏后底部线条变色
  inputBlur : function (e) {
    if (e.target.id == 'name') {
      this.setData({
        name_focus: false
      });
    } else if (e.target.id == 'xuehao') {
      this.setData({
        xuehao_focus: false
      });
    }
  },

  getData : function () {
    var that = this;
    this.setData({
      btn_loading: true
    })
    this.charu();
    this.setData({
      name: "",
      xuehao: "",
    })

  },

  charu : function () {
    var that = this;
    var userid = wx.getStorageSync('openid');
    wx.request({
      url: 'http://localhost:8080/xdq/user/updateUser',
      data: {
        openid: userid,
        name: that.data.name,
        xuehao: that.data.xuehao,
      },
      method: 'POST',
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        console.log(res.data)
        wx.showToast({
          title: '修改成功！',
          icon: 'success'
        })
        setTimeout(function (){
          wx.switchTab({
            url: '/pages/home/home'
          })
        },500)        
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
    var openid = wx.getStorageSync('openid');
    wx.request({
      url: 'http://localhost:8080/user/findUserByOpenid',
      data: {
        openid,
      },
      method: 'POST',
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        console.log(res.data);
        that.setData({
          user: res.data
        })
      },
      fail: function (res) {
      },
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

