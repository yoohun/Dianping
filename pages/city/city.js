var app = getApp();
var amapFile = require('../../libs/amap-wx.js');
// var markersData = {
//   latitude: '',//纬度
//   longitude: '',//经度
//   key: "0f086062880f925ad37914ac0f6e2057"//申请的高德地图key
// };
Page({
  data: {
    locate:'',
    locateCity: '',
    scroll_height: 0,
    toView:'',
    cityListId: '#',
    showPy: '',
    hotcities: ['北京', '成都', '重庆', '广州', '杭州', '深圳','南京', '苏州', '上海', '天津', '武汉', '西安'],
    alpha: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    citylist: [{ "letter": "A", "data": [{ "id": "v7", "cityName": "安徽" }] }, { "letter": "B", "data": [{ "id": "v10", "cityName": "巴中" }, { "id": "v4", "cityName": "包头" }, { "id": "v1", "cityName": "北京" }] }, { "letter": "C", "data": [{ "id": "v15", "cityName": "成都" }] }, { "letter": "D", "data": [{ "id": "v21", "cityName": "稻城" }] }, { "letter": "G", "data": [{ "id": "v17", "cityName": "广州" }, { "id": "v29", "cityName": "桂林" }] }, { "letter": "H", "data": [{ "id": "v9", "cityName": "海南" }, { "id": "v3", "cityName": "呼和浩特" }] }, { "letter": "L", "data": [{ "id": "v24", "cityName": "洛阳" }, { "id": "v20", "cityName": "拉萨" }, { "id": "v14", "cityName": "丽江" }] }, { "letter": "M", "data": [{ "id": "v13", "cityName": "眉山" }] }, { "letter": "N", "data": [{ "id": "v27", "cityName": "南京" }] }, { "letter": "S", "data": [{ "id": "v18", "cityName": "三亚" }, { "id": "v2", "cityName": "上海" }] }, { "letter": "T", "data": [{ "id": "v5", "cityName": "天津" }] }, { "letter": "W", "data": [{ "id": "v12", "cityName": "乌鲁木齐" }, { "id": "v25", "cityName": "武汉" }] }, { "letter": "X", "data": [{ "id": "v23", "cityName": "西安" }, { "id": "v28", "cityName": "香港" }, { "id": "v19", "cityName": "厦门" }] }, { "letter": "Z", "data": [{ "id": "v8", "cityName": "张家口" }] }]},
  letterTap(e) {
    const Item = e.currentTarget.dataset.item;
    this.setData({
      toView: Item
    })
  },
  chosecity(e) {
    app.globalData.selectedCity = e.target.dataset.item
    this.setData({
      locateCity: app.globalData.selectedCity || ''
    })
  },
  loadInfo: function () {
    var that = this;
    var myAmapFun = new amapFile.AMapWX({ key: '0f086062880f925ad37914ac0f6e2057' });
    var place=''
    myAmapFun.getRegeo({
      success: function (data) {
        //成功回调
        console.log(data[0].name)
        place = data[0].name
        console.log(place)
        that.setData({
          locate: place
        })
        // console.log(this.locate)
      },
      fail: function (info) {
        //失败回调
        console.log(info)
        if(info.errcode=='0') {
          that.setData({
            locate: '深圳'
          })
        }
      }
    })
    
    

  }, 
  loadCity: function (latitude, longitude) {
    var that = this;
    var myAmapFun = new amapFile.AMapWX({ key: markersData.key });
    console.log(3333)
    myAmapFun.getRegeo({
      location: '' + longitude + ',' + latitude + '',//location的格式为'经度,纬度'
      success: function (data) {
        console.log(data);
      },
      fail: function (info) { 
        console.log(info)
      }
    });},
  onLoad: function () {
    console.log(212312)
    this.loadInfo();
    let windowHeight = wx.getSystemInfoSync().windowHeight // 屏幕的高度
    let windowWidth = wx.getSystemInfoSync().windowWidth // 屏幕的宽度
    this.setData({
      scroll_height: windowHeight * 750 / windowWidth  - 30,
      locateCity: app.globalData.selectedCity
    })
  }
})
