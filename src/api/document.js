import request from '../utils/request'
const api = {
    Pre: '/case'
};

export function searchDocAPI(data){
    return request({
        url:api.Pre+'/search',
        method:'post',
        data
    })
}

export function getTypeCount(){
    return request({
        url:'/case/analysis/type',
        method: 'get',
    })
}
export function getPublishCount(){
    return request({
        url:'/case/analysis/state',
        method: 'get',
    })
}
export function getCategoryCount(){
    return request({
        url:'/case/analysis/category',
        method: 'get',
    })
}


export function updateDocAPI(data){
    return request({
        url:api.Pre+'/update',
        method:'post',
        data
    })
}

export function getCount(){
    return request({
        url:'/case/count',
        method: 'get',
    })
}

export function getList(data) {
    return request({
        url:'/case/list',
        method: 'post',
        params: {
            pageNo:data.pageNo,
            category:data.category
        }
    })
}

export function insert(data) {
    return request({
        url:'/case/insert',
        method: 'post',
        data
    })
}

export function update(params){
    return request({
        url:'/case/update',
        method: 'post',
        params
    })
}

export function del(data) {
    return request({
        url:'/case/delete',
        method: 'post',
        data
    })
}

export function publish(data){
    return request(({
        url: '/case/publish',
        method: 'post',
        data
    }))
}
