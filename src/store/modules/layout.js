/**
 * Created by admin on 2019-07-24.
 */
import {shop_id,user_id,shop_code,shop_payment_type,qrcode} from "@/api/config.js";
import { loadCData ,dataPnlGet,loadOrg } from './permission.js'
import Vue from 'vue'

const state = {
    searchItem:{
        dateType: '',      //临时保存时间搜索条件
        startDate:'',      //临时保存门店搜索条件
        endDate:'',      //临时保存门店搜索条件
        date:'',      //临时保存门店搜索条件
        storeIds:'' ,     //临时保存门店搜索条件
        active:false   //临时保存条件激活选项
    },
    brandTemp:['801'],  //临时保存品牌选中数组
    userInfo:{},
    homePanel:{},
    autoTag:0,    //0:新创建工单，不带入任何信息 1：带入手表基础信息创建工单 2：带入全部维修信息创建返修单 3:带入会员基础信息 4：只带入搜索的电话号码
    CI:{},        //自动填充创建工单的内容
    orgArr:[],    //组织架构列表
    companyArr:[], //分公司列表
    StoreArr:[], //门店列表
    shop_id:shop_id,
    user_id:user_id,
    qrcode:qrcode,
    shop_code:shop_code,
    shop_payment_type:shop_payment_type,   //store_charge 商场收银 self_charge 商场收银
    common:{     //首次进入存储基础数据
        Entry:false,
        repair_product:[],
        appearance_list:[],   //外观描述
        malfunction_list:[],  //故障描述
        shop_auth_brand:[],  //门店授权维修品牌
        service_list:[],     //服务项目（留表）
        service_list_q:[],     //服务项目（快修）
        movement_type_list:[],//机芯类型
        repairmen_list:[],    //维修人员列表
        reception_list:[],    //接修人员列表
        channel_type_list:[], //渠道来源
        struct_props:[],      //结构化属性
        testBK:[],
        testBD:[],
        testBO:[],
        testBP:[],
        BKTYPE:[],
        smallBar:[],     //表带小节数
        bigBar:[],       //表带大节数
        observation:[],  //质检情况
    },
}

const getters = {
     CI: state => state.CI,
     brandTemp: state => state.brandTemp,
     userInfo: state => state.userInfo,
     homePanel: state => state.homePanel,
     autoTag: state => state.autoTag,
     searchItem:state => state.searchItem,
     common:state => state.common,
     shop_id:state => state.shop_id,
     qrcode:state => state.qrcode,
     user_id:state => state.user_id,
     shop_code:state => state.shop_code,
     shop_payment_type:state => state.shop_payment_type,
}

const actions = {
    async saveBrandTemp({ commit },params) {
        commit('Save_BrandTemp',params)
    },
    async saveSearchItem({ commit },params) {
        commit('Save_SearchItem',params)
    },
    async findStore({ commit },params) {
        commit('Find_storE',params)
    },
    async loadCommonData({ commit }) {
        let res
        try {
            res=await loadCData();
        } catch (e) {
            Vue.prototype.$Toast.loading('网络出错')
            return  new Promise((resolve, reject) => {resolve('stop') })
        }
        commit('Load_commoN',res)
    },
    async loadOrgData({ commit }) {
        let res
        try {
            res=await loadOrg();
        } catch (e) {
            Vue.prototype.$Toast.loading('网络出错')
            return  new Promise((resolve, reject) => {resolve('stop') })
        }
        commit('Load_orG',res)
    },
    async loadDataPnl({ commit }, params) {
        let data=await dataPnlGet(params);
        commit('Load_datapnL',data)
    },

}

const mutations = {
    Save_BrandTemp(state,params){
        state.brandTemp=params;
    },
    Save_SearchItem(state,params){
        state.searchItem=params;
    },
    Find_storE(state,params) {
            let obj=state.orgArr.find(function(obj){
                return obj.companyId==params
            })
            state.StoreArr=obj.stores.map(item=>{
            return {
                value:item.storeId,
                text:item.name,
             }
           })
    },
    Load_datapnL(state,params){
        let res=params;
        if(res.code==200){
            state.homePanel=res.data[0];
        }
    },
    Load_commoN(state,params){
        let res=params;
        if(res.status){
            state.userInfo=res.data;
            if(!!!state.userInfo.gender){state.userInfo.gender=0;}


            if(!!state.userInfo.brandRemark){
                state.brandTemp = state.userInfo.brandRemark.split(',');
            }
            state.brandTemp.push('801')

        }else{
            state.userInfo.name='未登录';
            state.userInfo.companyName=res.message;
        }
            //首次加载完基础数据不再执行
        state.common.Entry=true;
    },
    Load_orG(state,params){
        let res=params;
        if(res.status){
            state.orgArr=res.data;
            //state.companyArr
            state.companyArr=res.data.map(item=>{
                return {
                    value:item.companyId,
                    text:item.name,
                }
            })
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
