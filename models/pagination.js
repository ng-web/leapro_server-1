
pager = function pagination(req){
    let pageSize= 10, page = 0, skip = 0;
    if(req.hasOwnProperty("query")){
       if(req.hasOwnProperty("pageSize")){
            if(req.query.pageSize){
                pageSize = parseInt(req.query.pageSize);
            } 
       }
       if(req.hasOwnProperty("page")){
            if(req.query.page){
                page = req.query.page - 1;
            } 
       }
    }
    skip = pageSize * page;
    return [skip, pageSize]
}

module.exports = pager;