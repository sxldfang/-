// pages/news/index.js
//获取应用实例

var read = getApp().globalData.read;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    first: 'block'
  },
  listNews: function (e) {
    wx.showNavigationBarLoading();
    var id = e.currentTarget.dataset.id;
    console.log(id);
    var news=this.data.news;
    // console.log(this.data.index);
    if (this.data.index != undefined) news[this.data.index].style ='';
    news[e.currentTarget.dataset.index].style='cur';

    this.setData({ news: news, index: e.currentTarget.dataset.index });
    if(id==undefined){
      this.setData({ first: 'none', newsList: this.data.news[e.currentTarget.dataset.index].more });
      return;
    }
    var obj = this;
    wx.request({
      //url: "https://172.16.0.111:8080/hnsy/getNewsList?id=" + id, //仅为示例，并非真实的接口地址
      url: "https://www.sxldfang.cn/hnsy/getNewsList?id=" + id, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var json = res.data;//获取的html文本信息
        for(var i=0;i<json.length;++i){
          var n=json[i];
          if(read.indexOf(n.url)>=0)n.color='gray';
        }
        obj.setData({ first: 'none', newsList: json });
        wx.hideNavigationBarLoading();
        // console.log('333333333')
      
      },
      fail: function () {
        wx.showModal({
          title: '网络异常，请检查网络~',
          showCancel: false
        });
      }
    })
  },
  showNews: function (e) {
    
    var index = e.currentTarget.dataset.index;//获取要看新闻的索引号，从0开始
    var url = e.currentTarget.dataset.url;
    if(read.indexOf(url)<0)read.push(url);
    var obj = this;
    var ns = this.data.newsList;
    ns[index].color = 'gray';//看过的新闻标题颜色改为灰色
    obj.setData({ newsList: ns });
    wx.navigateTo({
      url: "/pages/news/detial?url="+url
    })
  },
  scroolToBottom:function(e){
    // console.log(e);
    wx.createSelectorQuery().select('.nr').boundingClientRect(function (r) {
      console.log(r);
      wx.pageScrollTo({
        scrollTop: r.bottom - r.height+44,
        duration:0
      })
      // rect.id      // 节点的ID
      // rect.dataset // 节点的dataset
      // rect.left    // 节点的左边界坐标
      // rect.right   // 节点的右边界坐标
      // rect.top     // 节点的上边界坐标
      // rect.bottom  // 节点的下边界坐标
      // rect.width   // 节点的宽度
      // rect.height  // 节点的高度

    }).exec()
    
  },
  back: function (e) {
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  

    var obj=this;
    wx.request({
      url: "https://www.sxldfang.cn/hnsy/getMenuBar", //获取菜单
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var json = res.data;//获取的html文本信息
        obj.setData({news: json });
      },
      fail: function () {
        wx.showModal({
          title: '网络异常，请检查网络~',
          showCancel: false
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
    // return {
    //   title: 'xixihaha'
    // }
  }
})