var app = getApp();
Page({
  data: {
    locateCity: '',
    scroll_height: 0,
    toView:'',
    cityListId: '#',
    showPy: '',
    hotcities: ['北京', '成都', '重庆', '广州', '杭州', '深圳','南京', '苏州', '上海', '天津', '武汉', '西安'],
    alpha: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    citylist: [{ "letter": "A", "data": [{ "id": "v7", "cityName": "安徽" }] }, { "letter": "B", "data": [{ "id": "v10", "cityName": "巴中" }, { "id": "v4", "cityName": "包头" }, { "id": "v1", "cityName": "北京" }] }, { "letter": "C", "data": [{ "id": "v15", "cityName": "成都" }] }, { "letter": "D", "data": [{ "id": "v21", "cityName": "稻城" }] }, { "letter": "G", "data": [{ "id": "v17", "cityName": "广州" }, { "id": "v29", "cityName": "桂林" }] }, { "letter": "H", "data": [{ "id": "v9", "cityName": "海南" }, { "id": "v3", "cityName": "呼和浩特" }] }, { "letter": "L", "data": [{ "id": "v24", "cityName": "洛阳" }, { "id": "v20", "cityName": "拉萨" }, { "id": "v14", "cityName": "丽江" }] }, { "letter": "M", "data": [{ "id": "v13", "cityName": "眉山" }] }, { "letter": "N", "data": [{ "id": "v27", "cityName": "南京" }] }, { "letter": "S", "data": [{ "id": "v18", "cityName": "三亚" }, { "id": "v2", "cityName": "上海" }] }, { "letter": "T", "data": [{ "id": "v5", "cityName": "天津" }] }, { "letter": "W", "data": [{ "id": "v12", "cityName": "乌鲁木齐" }, { "id": "v25", "cityName": "武汉" }] }, { "letter": "X", "data": [{ "id": "v23", "cityName": "西安" }, { "id": "v28", "cityName": "香港" }, { "id": "v19", "cityName": "厦门" }] }, { "letter": "Z", "data": [{ "id": "v8", "cityName": "张家口" }] }],
  },
  letterTap(e) {
    const Item = e.currentTarget.dataset.item;
    this.setData({
      toView: Item
    })
  },
  chosecity(e) {
    app.globalData.selectedCity = e.target.dataset.item
    this.setData({
      locateCity: app.globalData.selectedCity
    })
    // console.log(e.target.dataset.item)
    console.log(app.globalData.selectedCity)
  },
  onLoad: function () {
    let windowHeight = wx.getSystemInfoSync().windowHeight // 屏幕的高度
    let windowWidth = wx.getSystemInfoSync().windowWidth // 屏幕的宽度
    this.setData({
      scroll_height: windowHeight * 750 / windowWidth  - 30,
      locateCity: app.globalData.selectedCity
    })
  }
})
