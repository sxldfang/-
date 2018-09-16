var m=0;//页面到最后的滚动距离
var f=false;//是否已经到底
// pages/news/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      show:false,
      showReturn:false
  },
  onPageScroll:function(e){
    if(f){
      this.setData({ showReturn: e.scrollTop>m});
    } else if (e.scrollTop > m){
      m = e.scrollTop;
    }
  },
  back: function (e) {
    wx.navigateBack({delta: 1})//回退一步
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var index = e.target.dataset.index;//获取要看新闻的索引号，从0开始
    var url = options.url;
    console.log(url);
    var obj = this;
    wx.showNavigationBarLoading();
    wx.request({
//      url: "http://172.16.0.111:8080/hnsy/getNewsContent?id=" + url, //仅为示例，并非真实的接口地址
      url: "https://www.sxldfang.cn/hnsy/getNewsContent?id=" + url, //仅为示例，并非真实的接口地址

      header: {
        'content-type': 'application/json' //
      },
      success: function (res) {
        var json = res.data;//获取的html文本信息
        //先清除原来显示的内容，避免原内容过长而直接显示最后的内容,要看前面的内容还需要滚动页面
        // obj.setData({ content: 'block' });
        obj.setData({ show:true,nr: json });
        wx.hideNavigationBarLoading();
      },
      fail: function () {
        console.log("Eror-----------");
        wx.showModal({
          title: '网络异常，请检查网络~',
          showCancel:false,
          success:function(){
            wx.navigateBack({ delta: 1 })//回退一步
          }
        });
      }
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
    m=0;
    f=false;
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
    if(!f){
      if(!f) f=true;
      this.setData({ showReturn:true});
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})