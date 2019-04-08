/* wjxdev实现新建保存删除*/
var util = require('../../utils/util.js');
Page({
  data: {
    time: '',//日期
    textAreaDes: '',//输入的内容
    revise: '',//是不是修改
    id: ''
  },

  btnDownSave() {
    //保存按钮
    let pages = getCurrentPages(); 
    let prevPage = pages[pages.length - 2]; 
    //获取本地缓存
    var oldText = wx.getStorageSync('oldText');
    if (oldText != null && oldText != '') {
      if (this.data.revise == '1') {
        //如果是修改的，循环缓存数组，找到相应id更改
        console.log(oldText)
        for (var i = 0; i < oldText.length; i++) {
          var dic = oldText[i];
          if (dic.id == this.data.id) {
            oldText[i] = { 'des': this.data.textAreaDes,  'time': this.data.time, 'id': dic.id };
            console.log(oldText[i])
            //存入缓存
            wx.setStorageSync('oldText', oldText);
            wx.setStorageSync('isChange', 1);
            wx.navigateBack({
              url: '../notebook/notebook',
    
            });
          }
        }
      } else {
        //记录是内容的id
        var numID = wx.getStorageSync('oldTextID');
        //没有修改点开返回
        if (numID == this.data.id) {
          wx.navigateBack({
            url: '../notebook/notebook',
          });
          return;
        }
        //添加更多缓存
        oldText.push({ 'des': this.data.textAreaDes, 'time': this.data.time, 'id': numID });
        //id自增
        numID++;
        wx.setStorageSync('oldTextID', numID);
        this.setData({
          id: numID
        });
        wx.navigateBack({
          url: '../notebook/notebook',
        });
      }

      wx.navigateBack({
        url: '../notebook/notebook',
      })
    } else {
      //如果没有缓存
      oldText = [{ 'des': this.data.textAreaDes, 'time': this.data.time, 'id': 0 }];
      //保存id
      wx.setStorageSync('oldTextID', 1);
      this.setData({
        id: 1
      })
      wx.navigateBack({
        url: '../notebook/notebook',
      });
    }
    //存入缓存
    wx.setStorageSync('oldText', oldText);
  },



  btnDownDelete() {
    if (this.data.textAreaDes.length == 0) {
      wx.navigateBack({
        url: '../notebook/notebook',
      })
    }
    //获取本地缓存
    var oldText = wx.getStorageSync('oldText');
    if (oldText != null && oldText != '') {
      for (var i = 0; i < oldText.length; i++) {
        var dic = oldText[i];
        if (dic.id == this.data.id) {
          // 删除数组中的选定的那条数据
          oldText.splice(i, 1);
          //重新保存缓存
          wx.setStorageSync('oldText', oldText);
          wx.navigateBack({
            url: '../notebook/notebook',
          })
        }
      }
    } else {
      //如果没有缓存
      wx.navigateBack({
        url: '../notebook/notebook',
      })
    }
  },


  bindTextAreaBlur(e) {
    //当输入的文字改变走这个方法
    //记录输入的文字   
    this.setData({
      textAreaDes: e.detail.value
    })
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    
    this.setData({
      des: options.des,
      revise: options.revise,
      time: time,
      id: options.id
    })
  },
  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      title: '爱生活', // 分享标题
      desc: '新的一天要看开心哦~', // 分享描述
      path: 'path' // 分享路径
    }
  }
})
