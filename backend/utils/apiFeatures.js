class ApiFeatures{
    constructor(query,queryStr){
        this.query=query;
        this.queryStr=queryStr;
    }

    search() {
    if (this.queryStr.keyword) {
        // escape regex special characters
        const keyword = this.queryStr.keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

        this.query = this.query.find({
            name: {
                $regex: keyword,
                $options: "i", // case-insensitive
            },
        });
    }

    return this;
}


    filter(){
        const queryCopy= {...this.queryStr}

        //removing some fields 
        const removeFields=["keyword","page","limit"];

        removeFields.forEach(key=>delete queryCopy[key])

        //remving for price
        let queryStr= JSON.stringify(queryCopy)
        queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g,key=>`$${key}`)
        

         console.log("queryStr is",queryStr);

        this.query=this.query.find(JSON.parse(queryStr))
         console.log(queryStr);

        return this;
    }

    pagination(resultPage){
        const currPage=Number(this.queryStr.page)||1;

        const skip=resultPage*(currPage-1)

        this.query=this.query.limit(resultPage).skip(skip)
        return this;

    }
}

module.exports=ApiFeatures