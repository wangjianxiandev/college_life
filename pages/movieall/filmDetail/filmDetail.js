var douban = require('../../../comm/script/fetch')
var config = require('../../../comm/script/config')
Page({
  data: {
    filmDetail: {},
    showLoading: true,
    showContent: false
  },
  onLoad: function (options) {
    var that = this
    var id = options.id
    douban.fetchFilmDetail.call(that, config.apiList.filmDetail, id, function (data) {})
  },
  onPullDownRefresh: function () {
    var data = {
      id: this.data.filmDetail.id
    }
    this.onLoad(data)
  },
})