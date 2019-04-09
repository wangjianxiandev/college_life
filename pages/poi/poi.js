var app = getApp();
var amap = require('../../utils/amap-wx.js');

Page({
  data: {
    aroundList: [
      {
        name: '餐饮',
        id: '050000'
      },
      {
        name: '购物',
        id: '060000'
      },
      {
        name: '医疗',
        id: '090000'
      },
      {
        name: '住宿',
        id: '100000'
      },
    ],
    status: null,
    latitude: null,
    longitude: null,
    isShow: false,
    markers: [],
    points: [],
    location: '',
    name: '',
    address: ''
  },
  onLoad: function () {
    // 页面加载获取当前定位位置为地图的中心坐标
    var _this = this;
    wx.getLocation({
      success(data) {
        if (data) {
          _this.setData({
            latitude: data.latitude,
            longitude: data.longitude,
            markers: [{
              id: 0,
              latitude: data.latitude,
              longitude: data.longitude,
              iconPath: '../../images/map/marker.png',
              width: 30,
              height: 40
            }]
          });
        }
      }
    });
  },
  getType(e) {//获取选择的附近关键词，同时更新状态
    this.setData({ status: e.currentTarget.dataset.type })
    this.getAround(e.currentTarget.dataset.keywords, e.currentTarget.dataset.type);
  },
  getAround(keywords, types) {//通过关键词获取附近的点，只取前十个，同时保证十个点在地图中显示
    var _this = this;
    var myAmap = new amap.AMapWX({ key: '07f55ffb53ed08c3fff087ec0691cd34' });
    myAmap.getPoiAround({
      iconPath: '../../images/map/marker.png',
      iconPathSelected: '../../images/map/marker_checked.png',
      // querykeywords: keywords,
      querytypes: types,
      location: _this.data.location,
      success(data) {
        if (data.markers) {
          var markers = [], points = [];
          for (var value of data.markers) {
            if (value.id > 15) break;
            if (value.id == 0) {
              _this.setData({
                name: value.name,
                address: value.address,
                isShow: true
              })
            }
            markers.push({
              id: value.id,
              latitude: value.latitude,
              longitude: value.longitude,
              title: value.name,
              iconPath: value.iconPath,
              width: 30,
              height: 40,
              anchor: { x: .5, y: 1 },
            });
            points.push({
              latitude: value.latitude,
              longitude: value.longitude
            })
          }
          _this.setData({
            markers: markers,
            points: points
          })
        }
      },
      fail: function (info) {
        wx.showToast({ title: info })
      }
    })
  }
});