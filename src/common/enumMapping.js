//维修订单状态枚举类映射
export const REPAIR_ORDER_STATUS={
  checking:'检查中',
  waiting_fittings:'等待配件',
  repairing:'维修中',
  repair_done:'维修完成',
  fetched:'已付款取表',
  cancel_repair:'取消维修',
  fetched_without_repair:'已取表',
  SAP_push:'推送SAP',
  SAP_done:'SAP成功'
}
//维修订单类型枚举类映射
export const REPAIR_GUARANTEE_TYPE={
  pay_repair : '付费维修',
  brand_after : '品牌保修',
  harmony_after : '亨吉利保修'
}
//内部转修订单类型枚举类映射
export const CONSIGNED_REPAIR_STATE={
    waiting : '待接收',
    accepted : '已接收',
    done : '完成'
}

export default {
    typeList: [     //维修状态
        {value: undefined,text: "全部状态",color: "rgba(24,144,255,.1)",Acolor:"rgb(24,144,255)",activeClass: "active_A"},
        {value: "checking",text: "检查中",color: "rgba(229, 115, 115,.1)",Acolor:"rgb(229, 115, 115)",activeClass: "active_B"},
        {value: "waiting_fittings",text: "等待配件",color: "rgba(255, 23, 68,.1)",Acolor:"rgb(255, 23, 68)",activeClass: "active_C"},
        {value: "repairing",text: "维修中",color: "rgba(255, 23, 68,.1)",Acolor:"rgb(255, 23, 68)",activeClass: "active_C"},
        {value: "cancel_repair",text: "取消维修",color: "rgba(153,157,156,.1)", Acolor:"rgb(153,157,156)",activeClass: "active_H"},
        {value: "repair_done", text: "维修完成",color: "rgba(173, 20, 87,.1)",Acolor:"rgb(173, 20, 87)", activeClass: "active_D"},
        {value: "fetched_without_repair",text: "顾客取表",color: "rgba(170, 0, 255,.1)", Acolor:"rgb(170, 0, 255)",activeClass: "active_E"},
        {value: "SAP_push",text: "推送SAP",color: "rgba(66, 165, 245,.1)",Acolor:"rgb(66, 165, 245)",activeClass: "active_F"},
        {value: "SAP_done",text: "SAP成功",color: "rgba(76, 175, 80,.1)",Acolor:"rgb(76, 175, 80)",activeClass: "active_G"},
        {value: "fetched",text: "已付款取表",color: "rgba(170, 0, 255,.1)", Acolor:"rgb(170, 0, 255)",activeClass: "active_E"}],
    costTypeList: [     //维修类型
        {value: "pay_repair", text: "付费维修"},
        {value: "brand_after", text: "品牌保修"},
        {value: "harmony_after", text: "亨吉利保修"}],
}

export const formatMoney = (number, decimals = 0, decPoint = '.', thousandsSep = ',') => {
    number = (number + '').replace(/[^0-9+-Ee.]/g, '')
    let n = !isFinite(+number) ? 0 : +number
    let prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
    let sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep
    let dec = (typeof decPoint === 'undefined') ? '.' : decPoint
    let s = ''
    let toFixedFix = function (n, prec) {
        let k = Math.pow(10, prec)
        return '' + Math.ceil(n * k) / k
    }
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
    let re = /(-?\d+)(\d{3})/
    while (re.test(s[0])) {
        s[0] = s[0].replace(re, '$1' + sep + '$2')
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || ''
        s[1] += new Array(prec - s[1].length + 1).join('0')
    }
    return s.join(dec)
}