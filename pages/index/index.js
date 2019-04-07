//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls: [
      {
        link: '/pages/index/index',
        url: '/images/swiper/1.png',
      }, {
        link: '/pages/logs/logs',
        url: '/images/swiper/2.png',
      }, {
        link: '/pages/index/index',
        url: '/images/swiper/3.png',
      }
    ],
    indicatorDots: true,  //小点
    autoplay: true,  //是否自动轮播
    interval: 3000,  //间隔时间
    duration: 3000,  //滑动时间
    routers: [
      {
        name: '美食',
        url: '',
        icon: '/images/nine/hanbao.png'
      },
      
      {
        name: '店铺',
        url: '',
        icon:'/images/nine/dianpu.png'
      },
      {
        name: '咖啡厅',
        url: '',
        icon: '/images/nine/kafei.png'
      },
      {
        name: '礼品店',
        url: '',
        icon: '/images/nine/shengriliwu.png'
      },
      {
        name: '饮料',
        url: '',
        icon: '/images/nine/shipinyinliao.png'
      },
      {
        name: '购物',
        url: '',
        icon: '/images/nine/tianmaopaidui.png'
      },
      {
        name: '阅读',
        url: '',
        icon: '/images/nine/tushu.png'
      },
      {
        name: '医疗',
        url: '',
        icon: '/images/nine/yaopin.png'
      },
      {
        name: '足迹',
        url: '',
        icon: '/images/nine/zuji.png'
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
