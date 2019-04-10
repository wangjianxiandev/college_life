/*
备注
city: 城市（在程序载入时获取一次）
count: 返回结果数量
baiduAK: 百度地图AK
apiList: api列表
hotKeyword: 搜索页热门关键词关键词
hotTag: 搜索页热门类型
*/
// 静态资源地址
var staticUrl = 'https://static.sesine.com/wechat-weapp-movie'
// api地址
var apiUrl = 'https://sesine.com/mina/api'
module.exports = {
  city: '',
  count: 20,
  baiduAK: 'Y1R5guY8Y2GNRdDpLz7SUeM3QgADAXec',
  apiList: {
    popular: apiUrl + '/movie/in_theaters',
    coming: apiUrl + '/movie/coming_soon',
    top: apiUrl + '/movie/top250',
    search: {
      byKeyword: apiUrl + '/movie/search?q=',
      byTag: apiUrl + '/movie/search?tag='
    },
    filmDetail: apiUrl + '/movie/subject/',
    personDetail: apiUrl + '/movie/celebrity/',
    baiduMap: 'https://api.map.baidu.com/geocoder/v2/'
  },
  hotKeyword: ['霸王别姬','肖申克的救赎','罗马假日','这个杀手不太冷','泰坦尼克号',
              '成龙','梁朝伟','莱昂纳多','奥黛丽赫本'
              ],
  hotTag: ['动作', '喜剧', '爱情', '科幻', '中国', '美国', '日本'],
}
