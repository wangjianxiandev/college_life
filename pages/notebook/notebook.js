//index.js
//获取应用实例
const app = getApp()
var util = require('../../utils/util.js');
Page({
  data: {
    today: '',//当天日期
    desArr: []//数据源数组
  },
  // 取得时间日期信息

  onLoad: function (options) {
    //-监听页面加载
    //获取缓存内容
    //获取当天日期
    this.setData({
      desArr: wx.getStorageSync('oldText')
    })
    if (this.data.desArr == null && this.data.desArr == '') {
      //如果没有缓存则为空
      this.setData({
        desArr: []
      })
    }
    
  },

  //点击进入添加note的详细界面
  newBtnDown() {
    //跳转页面到 new
    wx.navigateTo({
      url: '../new/new'
    })
  },



  onShow: function () {
    // 生命周期函数--监听页面显示   
    //获取当前缓存
    var arrayA = wx.getStorageSync('oldText');
    var isChange = wx.getStorageSync('isChange');
    var time = util.formatTime(new Date());
    this.setData({
      today: time
    })
    if (arrayA.length != this.data.desArr.length) {
      //如果数量改变从新赋值
      this.setData({
        desArr: arrayA,
      })
    } else if (isChange == 1) {
      wx.setStorageSync('isChange', 0);
      this.setData({
        desArr: arrayA,
      })
    }
  },
  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      title: '爱生活', // 分享标题
      desc: '生活不仅如此', // 分享描述
      path: 'path' // 分享路径
    }
  },
  cancelTap(e) {
    //删除按钮
    console.log(e)
  }
})
