var app = getApp()
Page({

  data: {
      version: 'v0.1.0',
      bg_display: false,
      i: 0
  },

  onLoad : function() {
    this.setData({
        version: app.VERSION 
    });
  },

  onPullDownRefresh : function() {
    let i = this.data.i;
    console.log(i)
    this.setData({
        i: ++i
    });
    if (i == 3) {
        this.setData({
            bg_display: true
        });
    }
    setTimeout(function() {
        wx.stopPullDownRefresh();
    }, 1000)
  }
})