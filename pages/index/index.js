//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls: [
      {
        link: '/pages/index/index',
        url: '/images/swiper/1.jpg',
      }, {
        link: '/pages/logs/logs',
        url: '/images/swiper/2.jpg',
      }, {
        link: '/pages/index/index',
        url: '/images/swiper/3.jpg',
      }
    ],
    indicatorDots: true,  //小点
    autoplay: true,  //是否自动轮播
    interval: 3000,  //间隔时间
    duration: 3000,  //滑动时间
    routers: [
      {
        name: '周边',
        url: '/pages/poi/poi',
        icon: '/images/nine/food2.png'
      },
      {
        name: '天气',
        url: '',
        icon:'/images/nine/weather2.png'
      },
      {
        name: '资源',
        url: '',
        icon: '/images/nine/reading2.png'
      },    
      {
        name: '出行',
        url: '/pages/map/map',
        icon: '/images/nine/travel2.png'
      }
    
    ]
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
