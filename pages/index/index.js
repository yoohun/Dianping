//index.js
//获取应用实例
const app = getApp()
var amapFile = require('../../libs/amap-wx.js');

Page({
  data: {
    locateCity: '',
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    markers: [],
    userLat: null,
    userLng: null
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  clickCity: function () {
    wx.navigateTo({
      url: '../city/city'
    })
  },
  onShow: function () {
    this.setData({
      locateCity: app.globalData.selectedCity
    })
  },

  onShareAppMessage: function () {
    console.log('分享')
    return {
      title: '测试小程序',//分享内容
      path: '/pages/index/index',//分享地址
    }
  },


  //微信小程序获取定位地址
  // loadCity: function (latitude, longitude) {
  //   var that = this;
  //   var myAmapFun = new amapFile.AMapWX({ key: '0f086062880f925ad37914ac0f6e2057' });
  //   console.log(3333)
  //   myAmapFun.getRegeo({
  //     location: '' + longitude + ',' + latitude + '',//location的格式为'经度,纬度'
  //     success: function (data) {
  //       var city = data[0].regeocodeData.addressComponent['city']
  //       city = city.substring(0, city.length - 1)
  //       that.setData({
  //         locateCity: city || '定位失败'
  //       })
  //     },
  //     fail: function (info) {
  //       console.log(info)
  //     }
  //   });
  // },
  // loadInfo: function () {
  //   //高德地图获取定位地址
  //   var that = this;
  //   var latitude = null
  //   var longitude = null
  //   var myAmapFun = new amapFile.AMapWX({ key: '0f086062880f925ad37914ac0f6e2057' });
  //   var place = ''
  //   myAmapFun.getRegeo({
  //     success: function (data) {
  //       //成功回调
  //       var city = data[0].regeocodeData.addressComponent['city']
  //       longitude = data[0].longitude
  //       latitude = data[0].latitude
  //       city = city.substring(0, city.length - 1)
  //       that.setData({
  //         locateCity: city || '定位失败',
  //         userLat: data[0].longitude,
  //         userLng: data[0].latitude
  //       })
  //       console.log(data)
  //       app.globalData.selectedCity = city || '定位失败'
  //     },
  //     fail: function (info) {
  //       //失败回调
  //       console.log(info)
  //       if (info.errcode == '0') {
  //         that.setData({
  //           locate: '深圳'
  //         })
  //       }
  //     }
  //   })
  //   myAmapFun.getPoiAround({
  //     success: function (data) {
  //       //成功回调
  //       that.setData({
  //         markers: data.markers
  //       })
  //       console.log(that.data.markers)
  //       that.getDistance(that.data.userLat, that.data.userLng, that.data.markers[0].latitude,that.data.markers[0].longitude)
  //     },
  //     fail: function (info) {
  //       //失败回调
  //       console.log(info)
  //     }
  //   })
  // },
  // Rad: function (d) { //根据经纬度判断距离
  //   return d * Math.PI / 180.0;
  // },
  // getDistance: function (lat1, lng1, lat2, lng2) {
  //   // lat1用户的纬度
  //   // lng1用户的经度
  //   // lat2商家的纬度
  //   // lng2商家的经度
  //   console.log(lat1)
  //   console.log(lng1)
  //   console.log(lat2)
  //   console.log(lng2)
  //   var radLat1 = this.Rad(lat1);
  //   var radLat2 = this.Rad(lat2);
  //   var a = radLat1 - radLat2;
  //   var b = this.Rad(lng1) - this.Rad(lng2);
  //   var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
  //   s = s * 6378.137;
  //   s = Math.round(s * 10000) / 10000;
  //   s = s.toFixed(2) + '公里' //保留两位小数
  //   console.log('经纬度计算的距离:' + s)
  //   return s
  // },
  loadCity: function (longitude, latitude) {
    var that = this;
    wx.request({
      url: 'https://restapi.amap.com/v3/geocode/regeo',
      data: {
        key: '0f086062880f925ad37914ac0f6e2057',
        location: longitude + "," + latitude,
        extensions: "all",
        s: "rsx",
        sdkversion: "sdkversion",
        logversion: "logversion"

      },
      success: function (res) {
        that.setData({
          city: res.data.regeocode.addressComponent.city
        })
        console.log(res.data);
      },
      fail: function (res) {
        console.log('获取地理位置失败')
      }
    })
  },
  onLoad: function () {

    var that = this;
    // 微信小程序 获取地址定位
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        var latitude = res.latitude//维度
        var longitude = res.longitude//经度
        console.log(res)
        that.loadCity(longitude, latitude)
      }
    })

    // this.loadInfo(); //高德地图获取定位地址
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
