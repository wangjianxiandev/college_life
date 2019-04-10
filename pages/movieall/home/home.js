
var douban = require('../../../comm/script/fetch')
var config = require('../../../comm/script/config')
var message = require('../../../component/message/message')
var app=getApp();
Page({
  data: {
    films: [],
    hasMore: true,
    showLoading: true,
    login: true,
    start: 0,
    index:0,
    searchType: 'keyword',
    hotKeyword: config.hotKeyword,
    hotTag: config.hotTag,
  },
  mshowing:function(){
    this.setData({
      index:0
    })
    wx.setNavigationBarTitle({'title':"正在上映"})
    this.onPullDownRefresh();
  },
  mrecommend: function () {
    this.setData({
      index:1
    })
    wx.setNavigationBarTitle({ 'title':"值得一看"})
    this.onPullDownRefresh();
  },
  msearch: function () {
    this.setData({
      index: 2
    })
    wx.setNavigationBarTitle({ 'title':"影片搜索"})
  },

  onLoad: function () {
    var that = this
    wx.showNavigationBarLoading()
    app.getCity(function () {
      wx.hideNavigationBarLoading()
      douban.fetchFilms.call(that, config.apiList.popular, that.data.start)
    })
  },
  onPullDownRefresh: function () {
    var that = this
    that.setData({
      films: [],
      hasMore: true,
      showLoading: true,
      start: 0
    })
    if(this.data.index==0){
      douban.fetchFilms.call(that, config.apiList.popular, that.data.start)
      // that.setData({
      //   films1: [],
      //   hasMore1: true,
      //   showLoading1: true,
      //   start1: 0
      // })
    }else{
      // that.setData({
      //   films2: [],
      //   hasMore2: true,
      //   showLoading2: true,
      //   start2: 0
      // })
      douban.fetchFilms.call(that, config.apiList.top, that.data.start)
    }
  },
  onReachBottom: function () {
    var that = this
    if (!that.data.showLoading) {
      if(this.data.index==0){
        douban.fetchFilms.call(that, config.apiList.popular, that.data.start)
      }else{
        douban.fetchFilms.call(that, config.apiList.top, that.data.start)
      }
    }
  },
  viewFilmDetail: function (e) {
    var data = e.currentTarget.dataset;
    wx.navigateTo({
      url: "../filmDetail/filmDetail?id=" + data.id
    })
  },
  search: function (e) {
    var that = this
    var keyword = e.detail.value.keyword
    if (keyword == '') {
      message.show.call(that, {
        content: '请输入内容',
        icon: 'null',
        duration: 1500
      })
      return false
    } else {
      var searchUrl = that.data.searchType == 'keyword' ? config.apiList.search.byKeyword : config.apiList.search.byTag
      wx.navigateTo({
        url: '../searchResult/searchResult?url=' + encodeURIComponent(searchUrl) + '&keyword=' + keyword
      })
    }
  },
  searchByKeyword: function (e) {
    var that = this
    var keyword = e.currentTarget.dataset.keyword
    wx.navigateTo({
      url: '../searchResult/searchResult?url=' + encodeURIComponent(config.apiList.search.byKeyword) + '&keyword=' + keyword
    })
  },
  searchByTag: function (e) {
    var that = this
    var keyword = e.currentTarget.dataset.keyword
    wx.navigateTo({
      url: '../searchResult/searchResult?url=' + encodeURIComponent(config.apiList.search.byTag) + '&keyword=' + keyword
    })
  },
  changeSearchType: function () {
    var types = ['默认', '类型'];
    var searchType = ['keyword', 'tag']
    var that = this
    wx.showActionSheet({
      itemList: types,
      success: function (res) {
        console.log(res)
        if (!res.cancel) {
          that.setData({
            searchType: searchType[res.tapIndex]
          })
        }
      }
    })
  },

})
