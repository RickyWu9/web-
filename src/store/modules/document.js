import {Message} from 'element-ui'
import {
    searchDocAPI, updateDocAPI, insert
} from "../../api/home";
const getDefaultState = () => {
    return {
        docSearchList:[],
        docNameSearchList:[],
        docSearchCount:0,
        docNameSearchCount:0,
    }
};

const document={
    state: getDefaultState(),
    mutations: {
        setDocSearchList: function (state, data) {
            state.docSearchList=[]
            state.docSearchList = data;
        },
        setDocNameSearchList: function (state, data) {
            state.docNameSearchList=[];
            state.docNameSearchList = data;
        },
        setDocSearchCount: function(state,data){
            state.docSearchCount=data;
        },
        setDocNameSearchCount: function(state,data){
            state.docNameSearchCount=data;
        }
    },
    actions: {
        searchDoc:async({commit},data)=>{
            const res=await searchDocAPI(data);
            if(res){
                console.log(res);
                if(res.length==0){
                    Message.warning("搜索结果为空！");
                    commit('setDocSearchList',res.content);
                    commit('setDocSearchCount',res.count);
                    return ;
                }
                commit('setDocSearchList',res.content);
                commit('setDocSearchCount',res.count);
                Message.success("搜索成功！");
            }else{
                Message.error("连接超时！");
            }
        },
        searchDocName:async({commit},data)=>{
            const res=await searchDocAPI(data);
            if(res){
                console.log(res);
                if(res.length==0){
                    Message.warning("搜索结果为空！");
                    commit('setDocNameSearchList',res.content);
                    commit('setDocNameSearchCount',res.count);
                    return false;
                }
                commit('setDocNameSearchList',res.content);
                commit('setDocNameSearchCount',res.count);
                return res;
            }else{
                Message.error("连接超时！");
                return false;
            }
        },
        updateDoc:async({commit,state},data)=>{
            commit('setDocSearchList',state.docSearchList);
            const res=await updateDocAPI(data);
            if(res){
                console.log(res);
                Message.success("修改成功！");
                return true;
            }else{
                Message.error("连接超时！");
                return false;
            }
        },
        insertDocFile: async ({commit,state},data)=>{
            commit('setDocSearchList',state.docSearchList);
            const res=await insert(data);
            if(res){
                Message.success("导入成功！");
                return true;
            }else{
                Message.success("导入失败！");
                return false;
            }
        }
    }
}

export default document