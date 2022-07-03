const Product = require('../models/product')

const getAllProductStatic = async(req,res)=> {
    const products = await Product.find({ $or:[
        {price: {$gt:200}},
        {price:{$lt:50}}
    ]}).sort('name').select('name price')
    res.status(200).json({products,nbHits:products.length})
}
const getAllProduct= async(req,res,next)=> {
    const {featured,company,name,sort,select,numericFilters} = req.query
    const qObject ={}
    if(featured) {
        featured==='true'&& (qObject.featured = true)
        featured==='false'&& (qObject.featured = false)
    }
    if(company) {
        qObject.company=company
    }
    if(name) {
        qObject.name= new RegExp(name,'i')
    }
    if(numericFilters){
        const operatorMap = {
            ">":'$gt',
            ">=":'$gte',
            "=":'$eq',
            "<":'$lt',
            "<=":'$lte',
        }
        const pattern = /\b(<|<=|=|>|>=)\b/g
        let filters = numericFilters.replace(pattern,(match)=>`-${operatorMap[match]}-`)
        const options =['price','rating']
        filters = filters.split(',').forEach(element => {
            const[field,operator,value] = element.split('-')
            if(options.includes(field)) {
                qObject[field]= {[operator]:Number (value)}
                console.log(element)
            }
        });
    }

    let sortList = sort? sort.split(',').join(' ') : 'name' 
    
    let selectList = select? select.split(',').join(' ') : '' 

    //pagination
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page-1)*limit
    
    let products = await Product.find(qObject).sort(sortList).select(selectList).skip(skip).limit(limit)
      
    res.status(200).json({products,nbHits:products.length}) 
 
}

module.exports = {getAllProductStatic, getAllProduct}