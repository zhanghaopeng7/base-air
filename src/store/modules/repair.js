/**
 * Created by admin on 2019-07-24.
 */
import { getRepairInfo ,statusGet } from './permission.js'
import {REPAIR_ORDER_STATUS} from '../../common/enumMapping.js';
import {removeAry} from '../../api/util.js';
import Vue from 'vue'
import router from "../../router.js";

const state = {
    tabs: [],   //tab显示页签
    GD:{        //全局存储单个工单详细信息
       EnterType:0,  // EnterType：1 创建成功后进入工单详情  2：我的工单进入  3：我的寄修单进入
       statusTitle:'',
       signatureUrl:null,  //留表签字图片
       fetchUrl:null,      //取表签字图片
       checkImgs:[],  //检查拍照图片
       MYID:'' ,     //作为出发每个相关vue页面自动监听刷新GD的依据字段：每个工单的唯一标识
       statusArr:[],  //可选状态列表
    },
}

const getters = {
    tabs: state => state.tabs,
    GD: state => state.GD,
}


const actions = {
    async showtab({ commit },params) {
        commit('Show_taB',params)
    },
    async loadorder({ commit },params) {
        let res=null;
        try{
             res=await getRepairInfo(params,state.GD.EnterType);
        } catch(err) {
            return  new Promise((resolve, reject) => {resolve('stop') })
        }
        if((res==undefined)||(res==null)||(res=='')){
            throw new Error("手动抛出异常!");
        }
        if(res.code==0){
            commit('Load_ordeR',res)
            let arr=await statusGet(state.GD.repair_id);
            commit('Set_statulisT',arr)
        }else {
            let errStr=res.code+'---'+res.message
            Vue.prototype.$toast.error({ time: 12000,message:errStr})
            return  new Promise((resolve, reject) => {resolve('stop') })
        }
    },
    async setEnterType({ commit },params) {
        commit('Set_enteR',params)
    },
    async clearGD({ commit }) {
        commit('Clear_GD')
    },
}

const mutations = {
    Set_enteR(state,params){
        state.GD.EnterType=params;
    },
    Set_statulisT(state,params){
        let res =params;
        if(res.code==0){
            //if(state.GD.is_consign && state.GD.state=='repair_done'){
            //    state.GD.statusArr=[];
            //}else{ state.GD.statusArr=res.data.status_options;}
            //
            state.GD.statusArr=res.data.status_options;

        }
    },
    Clear_GD(state){
        for(let key in state.GD){ state.GD[key]=null}
        state.GD.signatureUrl=null;
        state.GD.fetchUrl=null;
        state.GD.checkImgs=[];
        state.GD.statusTitle='';
        state.GD.MYID='';
        state.GD.ImgPath='quick/checking';
    },
     Load_ordeR(state,params){
        state.GD.signatureUrl=null;
        state.GD.fetchUrl=null;
        state.GD.checkImgs=[];
        state.GD.statusTitle='';
        state.GD.MYID='';
            let res=params;
            if(res.code==0){
                for(let key in res.data){ state.GD[key]=res.data[key]} //给GD赋值
                state.GD.MYID=state.GD.repair_no;
                this.commit('Show_taB',state.GD.business_type);
                if(state.GD.business_type=='leave'){
                    if(state.GD.is_consign==true || state.GD.state=='checking'||state.GD.state=='waiting_fittings'||state.GD.state=='repairing'){
                        state.tabs.splice(3,1);  //隐藏取表签名tab页
                    }
                    if(state.GD.is_consign)     //is_consign :维修店标识，如果为true 则不显示签名页面
                    {
                        removeAry(state.tabs,'/signature')
                    }
                }
                state.GD.statusTitle= REPAIR_ORDER_STATUS[state.GD.state]   //维修状态翻译为中文
                state.GD.itemWGMS='';
                for(let key in state.GD.appearances){
                    state.GD.itemWGMS+=state.GD.appearances[key].appearance_name+' '
                }
                state.GD.BreakItem='';
                for(let key in state.GD.malfunctions){
                    state.GD.BreakItem+=state.GD.malfunctions[key].malfunction_name+' '
                }
                for(let key in state.GD.images){
                    if(state.GD.images[key].scene_type=='signature_for_leave'){  //留表签字图片
                        state.GD.signatureUrl =state.GD.images[key].image_url
                    }
                    if(state.GD.images[key].scene_type=='signature_for_fetch'){  //取表签字图片
                        state.GD.fetchUrl =state.GD.images[key].image_url
                    }
                    if(state.GD.images[key].scene_type=='checking_for_leave'){   //检查拍照
                        state.GD.checkImgs.push(state.GD.images[key])
                    }
                }
               if(state.GD.struct_props.length!=0){
                   let struct_keep=state.GD.struct_props.filter(function(val){if(val.template_code=='watch_repair'){ return val}})      
                   if(struct_keep.length!=0){
                       let struct_props=struct_keep[0].specs
                       try {
                           //解析表带大节数
                           state.GD.b_number_bd=struct_props.filter(function(val){if(val.spec_code=='b_number_bd'){ return val}})[0].values[0].value_name;
                           //解析表带小节数
                           state.GD.s_number_bd=struct_props.filter(function(val){if(val.spec_code=='s_number_bd'){ return val}})[0].values[0].value_name;
                           //解析表壳材质数据
                           state.GD.material_watch_shell=struct_props.filter(function(val){if(val.spec_code=='material_watch_shell'){ return val}})[0].values[0].value_name
                           //解析表带材质数据
                           state.GD.material_watch_strap=struct_props.filter(function(val){if(val.spec_code=='material_watch_strap'){return val}})[0].values[0].value_name
                           //解析表扣材质数据
                           state.GD.material_watch_buckle=struct_props.filter(function(val){if(val.spec_code=='material_watch_buckle'){return val}})[0].values[0].value_name
                           //解析表盘类型数据
                           state.GD.type_watch_dial=struct_props.filter(function(val){if(val.spec_code=='type_watch_dial'){return val}})[0].values[0].value_name
                           //解析表扣类型数据
                           state.GD.type_watch_buckle=struct_props.filter(function(val){if(val.spec_code=='type_watch_buckle'){return val}})[0].values[0].value_name
                       } catch(err) {
                           //处理错误
                           console.log(err)
                       }
                   }
                 }else{
                   state.GD.b_number_bd='无';
                       //解析表带小节数
                   state.GD.s_number_bd='无';
                   state.GD.material_watch_shell='无';
                   //解析表带材质数据
                   state.GD.material_watch_strap='无';
                   //解析表扣材质数据
                   state.GD.material_watch_buckle='无';
                   //解析表盘类型数据
                   state.GD.type_watch_dial='无';
                   //解析表扣类型数据
                   state.GD.type_watch_buckle='无';
               }
                if(JSON.stringify(state.GD.order_info) != "{}" && state.GD.order_info!=null){
                        this.commit('Show_shifT');
                }
            }
    },
    Show_shifT(state){
        if(state.GD.business_type=='leave'){
            state.tabs.splice(-3,0,{
                name: '配件消耗',
                href: '/shift'
            });
        }else{
            state.tabs.splice(-1,0,{
                name: '配件消耗',
                href: '/shift'
            });
        }

    },
    Show_taB(state,params) {
        if(params=='leave'){
            state.tabs=[{
                name: '进度更新',
                href: '/status'
            },{
                name: '签名确认',
                href: '/signature'
            },{
                name: '报价收银',
                href: '/price'
            } ,{
                name: '取表验证',
                href: '/verify'
            },{
                name: '内部寄修',
                href: '/send'
            },{
                name: '质检情况',
                href: '/observe'
            },{
                name: '操作日志',
                href: '/log'
            }]
        }else{
            state.tabs=[{
                name: '进度更新',
                href: '/status'
            },{
                name: '报价收银',
                href: '/price'
            },{
                name: '操作日志',
                href: '/log'
            }]
        }
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}
