
/* eslint-disable */

export function getHeaders () {
  return {
  }
}

export const getUrlParameter = function () {
  let obj = {}
  let reg = /([^?=&]+)=([^?=&#]+)/g
  console.log( window.location.href)
  window.location.href.replace(reg, function () {
    obj[arguments[1]] = arguments[2]
  })
  return obj
}

export const removeAry=function(_arr, _obj) {
  var length = _arr.length;
  for (var i = 0; i < length; i++) {
    if (_arr[i].href == _obj) {
      if (i == 0) {
        _arr.shift(); //删除并返回数组的第一个元素
        return _arr;
      }
      else if (i == length - 1) {
        _arr.pop();  //删除并返回数组的最后一个元素
        return _arr;
      }
      else {
        _arr.splice(i, 1); //删除下标为i的元素
        return _arr;
      }
    }
  }
}



export function format(date){
  //获得date的年保存在y
  var y=date.getFullYear();
  //获得date的月+1,保存在M
  var M=date.getMonth();
  //如果M<10就改为0+M
  M=(++M)<10?"0"+M:M;
  //获得date的日,保存在d
  var d=date.getDate();
  d=(d)<10?"0"+d:d;
  //如果d<10就改为0+d
  var arr=["日","一","二","三","四","五","六"];
  //定义输入week: 日,一,二,...,六
  var D=arr[date.getDay()];
  //0  1  2      6
  //获得date的星期D
  //获取week中D位置的字保存回D中
  //获得date的小时h
  var h=date.getHours();
  var am="";
  if (h<12)
  { am="上午";
    if (h<10)
    {h="0"+h;}}
  else
  {am="下午"
    h-=12;}
  var m=date.getMinutes();
  m=m<10?"0"+m:m

  //定义变量am，赋值为:
  //如果h<12,就赋值为上午,否则赋值为下午
  //如果h>12，就改为h-12
  //如果h<10,就改为0+h
  //获得date中的分钟m
  //如果m<10,就改为0+m

  //return `${y}年${M}月${d}日 星期${D} ${am} ${h}:${m}`;
  return `${y}年${M}月${d}日 星期${D} ${am} ${h}:${m}`;
}

export function DateFormat (date, fmt) {
  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

export const uuid = function () {
  let s = []
  let hexDigits = '0123456789abcdef'
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-'

  let uuid = s.join('')
  return uuid
}

// 编码
export function setEncodeURI (data, obj) {
  let _replace = ['product_name', 'name', 'uom_name']
  if (obj) {
    _replace = obj
  }
  _replace.map((key) => {
    if (data[key]) {
      data[key] = encodeURIComponent(data[key])
    }
  })
  return data
}
export function setProductList (data, obj) {
  let _replace = {
    prod_brand: 'brand_code',
    sku: 'product_code',
    name: 'product_name',
    year: 'year_id',
    season: 'season_id',
    sex: 'sex_id',
    wave: 'wave_id',
    series: 'series_id',
    bigclass: 'bigclass_id',
    subclass: 'subclass_id',
    settle_class: 'settle_class_id',
    sale_price: 'sale_price',
    quantity: 'num',
    image_url: 'productImg',
    id: 'product_id',
    brand: 'brand_id',
    style_attribute: 'style_attribute_id'
  }
  if (obj) {
    _replace = obj
  }
  let orgdData = JSON.parse(JSON.stringify(data))
  for (let key in _replace) {
    var reg = new RegExp(_replace[key], 'g')
    data = JSON.parse(JSON.stringify(data).replace(reg, key))
  }
  data = {...orgdData, ...data}
  return data
}