var app = getApp()
var userInfo = null;
Page({  
  globalData: {
    appid: 'wx4f9282c983c1bc95',//appid需自己提供，此处的appid我随机编写
    secret: '9e1dfbd26818f1868bb8f9aae11e5daf',//secret需自己提供，此处的secret我随机编写
  },
  data: {
    userInfo: {},
    hasUserInfo: false,
    hiddenteacher: true,
    hiddenstudent: true,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    var that = this;
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    //登录凭证校验。通过 wx.login() 接口获得临时登录凭证 code 后传到开发者服务器调用此接口完成登录流程。
    wx.login({
      success: function (res) {
        if (res.code) {
          console.log("res.code:" + res.code);
          var d = that.globalData;//这里存储了appid、secret、token串  
          var l = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + d.appid + '&secret=' + d.secret + '&js_code=' + res.code + '&grant_type=authorization_code';
          wx.request({
            url: l,
            data: {},
            method: 'GET',
            success: function (res) {
              var obj = {};
              obj.openid = res.data.openid;
              console.log("openid:" + obj.openid);
              console.log("session_key:" + res.data.session_key);
              obj.expires_in = Date.now() + res.data.expires_in;
              wx.setStorageSync('openid', obj.openid);//存储openid 
            }
          });
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  },
  getUserInfo: function (e) {
    var that = this;
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
    }),
    wx.request({
      url: 'http://localhost:8080/user/queryRoleByOpenid',
      data: {
        openid: wx.getStorageSync('openid')
      },
      method: "POST",
      header: { 'Content-Type': 'application/json' },
      success:function(res){
        console.log(res.data)
        if(res.data == "student"){
          that.setData({
            hiddenstudent: false
          })
        }else{
          that.setData({
            hiddenteacher: false,
          }) 
        }
      }
    })
  }

})

