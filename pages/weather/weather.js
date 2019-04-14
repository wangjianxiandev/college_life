
var bmap = require('../../libs/bmap-wx.js');

//获取应用实例
var app = getApp()
Page({
  data: {
    weatherData: '',
    futureWeather:[],
    today: {},
    future: {},
    weatherurl: '',
    backgroundurl: '',
    backgroundarr: [
      {
        type: '晴',
        url: '/images/weather/sunnyBackground.jpg'
      },
      {
        type: '雨',
        url: '/images/weather/rainBackground.jpg'
      },
      {
        type: '雪',
        url: '/images/weather/snowBackground.jpg'
      },
      {
        type: '云',
        url: '/images/weather/cloudBackground.jpg'
      }
    ],
    weatherarr: [
      {
        type: '晴',
        url: '/images/weather/qing.png'
      },
      {
        type: '多云',
        url: '/images/weather/duoyun.png'
      },
      {
        type: '小雨',
        url: '/images/weather/yu.png'
      },
      {
        type: '多云转晴',
        url: '/images/weather/duoyunzhuanqing.png'
      },
      {
        type: '雷阵雨',
        url: '/images/weather/leizhenyu.png'
      },
      {
        type: '阴',
        url: '/images/weather/yin.png'
      },
      {
        type: '雨夹雪',
        url: '/images/weather/yujiaxue.png'
      },
      {
        type: '中雪',
        url: '/images/weather/xue.png'
      },
      {
        type: '小雪',
        url: '/images/weather/xue.png'
      },
      {
        type: '大雪',
        url: '/images/weather/xue.png'
      },
      {
        type: '中雨',
        url: '/images/weather/yu.png'
      },
      {
        type: '大雨',
        url: '/images/weather/yu.png'
      },
      {
        type: '浮尘',
        url: '/images/weather/fuchen.png'
      },
      {
        type: '扬沙',
        url: '/images/weather/yangsha.png'
      },
      {
        type: '阵雨',
        url: '/images/weather/yu.png'
      },

    ]
  },
  //事件处理函数
  onLoad: function () {
    var that = this;
    var weatherarr = this.data.weatherarr;
    var weatherurl = '';
    var backgroundurl = '';
    var backgroundarr = this.data.backgroundarr;
    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: 'kBqTci8tUGLEZbDD5jTfVPTmTes1HiYX'
    });
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      var weatherData = data.currentWeather[0];
      var futureWeather = data.originalData.results[0].weather_data;  
      for (var i = 0; i < weatherarr.length; i++) {
        if (weatherarr[i].type == weatherData.weatherDesc) {
          weatherurl = weatherarr[i].url;
        }
      }
      var typeStr = weatherData.weatherDesc;//返回天气情况
      for (var j = 0; j < backgroundarr.length; j++) {
        //根据相应的关键字提取出符合当前天气的内容部分
        if (typeStr.indexOf(backgroundarr[j].type) >= 0) {
          console.log("isequal background" + typeStr.indexOf(backgroundarr[j].type));
          backgroundurl = backgroundarr[j].url;
        }
      }  
      that.setData({
        weatherurl: weatherurl,
        backgroundurl: backgroundurl,
        weatherData: weatherData,
        futureWeather:futureWeather,
      });
    }
    // 发起weather请求 
    BMap.weather({
      fail: fail,
      success: success
    });
  },

  loadInfo: function () {
    var page = this;
    wx.getLocation({
      type: 'pcj02',
      success: function (res) {
        var latitude = res.latitude;
        var longidtude = res.longitude;
        console.log(latitude, longidtude);
        page.loadCity(latitude, longidtude);
      },
    })
  },

  loadCity: function (latitude, longitude) {
    var page = this;
    wx.request({
      url: 'https://api.map.baidu.com/geocoder/v2/?ak=kBqTci8tUGLEZbDD5jTfVPTmTes1HiYX&location=' + latitude + ',' + longitude + '&output=json',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var city = res.data.result.addressComponent.city;
        city = city.replace("市", "");
        page.setData({
          city: city
        });
        page.loadWeather(city);
      }
    })
  },
  loadWeather: function (city) {
    var page = this;
    var weatherarr = this.data.weatherarr;
    var weatherurl = '';
    var backgroundurl = '';
    var backgroundarr = this.data.backgroundarr;
    wx.request({
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        var future = res.data.data.forecast;
        var todayInfo = future.shift();
        var today = res.data.data;
        console.log(weatherarr[1].type);
        today.todayInfo = todayInfo;
        for (var i = 0; i < weatherarr.length; i++) {
          if (weatherarr[i].type == today.todayInfo.type) {
            weatherurl = weatherarr[i].url;
          }
        }
        var typeStr = today.todayInfo.type;
        for (var j = 0; j < backgroundarr.length; j++) {
          if (typeStr.indexOf(backgroundarr[j].type) >= 0) {
            console.log("isequal background" + typeStr.indexOf(backgroundarr[j].type));
            backgroundurl = backgroundarr[j].url;
          }
        }
        console.log(weatherurl);
        page.setData({
          today: today,
          future: future,
          weatherurl: weatherurl,
          backgroundurl: backgroundurl,
        });
      }
    })
  },
  onShow: function () {
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  }
})
