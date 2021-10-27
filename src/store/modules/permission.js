/**
 * Created by admin on 2019-10-18.
 */
import {GET_USER_INFO,GET_Data_Pnl,Get_ORG} from "@/api/index.js";
import {shop_id} from "@/api/config.js";


export const  getRepairInfo =  function (params,EnterType) {
    let postData={ repair_no:params}
    if(EnterType!=3){
        postData.shop_id=Number(shop_id);
       }
    return   REPAIR_ORDER_INFO_GET(postData)
}
export  const  loadCData =  function () {
    return   GET_USER_INFO()
}
export const  dataPnlGet =  function (params) {
    let postData={ dateType:'M' }
    if(!!params){
        postData.date=params
    }
    return   GET_Data_Pnl(postData)
}
export const  loadOrg =  function () {
    return   Get_ORG()
}
export const  statusGet =  function (params) {
    let postData={ repair_id:params }
    return   ORDER_STATUS_GET(postData)
}
