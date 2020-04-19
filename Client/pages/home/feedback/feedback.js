var app = getApp()
Page({

  data: {
      btn_disabled: true,
      btn_loading: false
  },

  inputInput : function(e) {
      let btn = true;
      if (e.detail.value != '') {
          btn = false;
      }
      this.setData({
          btn_disabled: btn
      });
  },

  formSubmit : function(e) {
      this.setData({
          btn_loading: true
      });
      var openid = wx.getStorageSync('openid');
      wx.request({
          url: 'http://localhost:8080/saveAdvance',
          data: {
            openid: openid,
            advance: e.detail.value.content
          },
          method: 'POST',
          success: (res) => {
              if (res.statusCode == 200) {
                  wx.showModal({
                      title: '嘟嘟嘟',
                      content: '已提交，谢谢啦！',
                      showCancel: false,
                      success: function (res) {
                          wx.navigateBack();
                      }
                  });
              } else {
                  wx.showModal({
                      title: '啊喔',
                      content: '要么是你网络问题, 要么是服务器挂了~',
                      showCancel: false
                  });
              }
          },
          fail: () => {
              wx.showModal({
                  title: '啊喔',
                  content: '要么是你网络问题, 要么是服务器挂了~',
                  showCancel: false
              });
          },
          complete: () => {
              this.setData({
                  btn_loading: false
              });
          }
      });
  }
})