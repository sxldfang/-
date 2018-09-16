//app.js
App({
  onLaunch: function () {
    wx.onNetworkStatusChange(function (res) {
      wx.showModal({
        title: res.isConnected ? '网络已通，当前是' + res.networkType+'网络':'当前没有开通网络~',
        showCancel: false,
      });
    })
  },
  onShow:function(){
    
  },
  onHide:function(){
    var r=this.globalData.read;
    if (r.length > 5) r.splice(0,r.length-5);
    wx.setStorageSync('read', r);
  },
  globalData: {
    read:wx.getStorageSync('read')||[]
  }
})