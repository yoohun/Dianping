//logs.js
const util = require('../../utils/util.js')
var app=getApp()

Page({
  data: {
    logs: [],
    city:'',
    username: ''
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
    this.setData({
      city: app.globalData.selectedCity,
      username: app.globalData.userInfo.nickName || app.globalData.replaceName
    })
  }
})
