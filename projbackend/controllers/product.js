const Product =require("../models/product");
const formidable=require("formidable");
const _=require("lodash")
const fs=require("fs");

exports.getProductById=(req,res,next,id)=>{
    Product.findById(id)
        .populate("category")
        .exec((err,product)=>{
        if(err){
            return res.status(400).json({
                errros:"No Product"
            })
        }
        req.product=product;
        next();
    })
    
}
exports.createProduct=(req,res)=>{
    let form=new formidable.IncomingForm();
    form.keepExtensions=true;
    form.parse(req,(err,fields,file)=>{
        if(err){
            return res.status(400).json({
                errors:"Problem with img"
            })
        }
        //destructing fileds:
        const { name, description, price,category,stock}=fields;
        if(!name||!description||!price||!category||!stock){
            return res.status(400).json({
                errors:"please inlcude all fileds"
            })
        }
        let product=new Product(fields);
        if(file.photo){
            if(file.photo.size>300000){
                return res.status(400).json({
                    errors:"file is to big"
                })
            }
            product.photo.data=fs.readFileSync(file.photo.path);
            product.photo.contentType=file.photo.type;
        }
        //console.log(product)
        product.save((err,product)=>{
            if(err){
                return res.status(400).json({
                    errors:"savinng photo failed"
                })
            }
            res.json(product)
        })
    })
}
exports.getProduct=(req,res)=>{
    //console.log(req.product)
    req.product.photo=undefined
    return res.json(req.product)
}
exports.photo=(req,res,next)=>{
    if(req.product.photo.data){
        res.set("Content-Type",req.product.photo.contentType);
        return res.send(req.product.photo.data)
    }
    next();
}
exports.deleteProduct=(req,res)=>{
    const product=req.product;
    product.remove((err,delproduct)=>{
        if(err){
            return res.status(400).json({
                errors:"Something went wrong"
            })
        }
        res.json({
            message:"Product Deleted Succefully"
        })
    })
}
exports.updateProduct=(req,res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                errors: "Problem with img"
            })
        }
        let product = req.product;
        product=_.extend(product,fields)
        if (file.photo) {
            if (file.photo.size > 300000) {
                return res.status(400).json({
                    errors: "file is to big"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }
        //console.log(product)
        product.save((err, product) => {
            if (err) {
                return res.status(400).json({
                    errors: "updation failed"
                })
            }
            res.json(product)
        })
    })
}
exports.getAllProduct=(req,res)=>{
    let limit = req.query.limit ? parseInt(req.query.limit) : 8;
    let sortBy = req.query.limit ? req.query.limit : "_id";
    Product.find()
    .select("-photo")
    .populate("category")
    .limit(limit)
    .sort([[sortBy,"asc"]])
    .exec((err,products)=>{
        if(err){
            return res.status(404).json({
                errors:"No Product Found"
            })
        }
        res.json(products);
    })
}

exports.updateStock=(req,res,next)=>{
    let myOperations=req.body.order.products.map(prod=>{
        return {
            updateOne:{
                filter:{_id:prod._id},
                update:{$inc:{stock:-prod.count,sold:+prod.count}}
            }
        }
    })
    Product.bulkWrite(myOperations,{},(err,products)=>{
        if(err){
            return res.status(400).json({
                errors:"Bult Operation Fialed"
            })
        }
        next();
    })
}

exports.getAllUniqueCategories=(req,res)=>{
    Product.distinct("categories",{},(err,categories)=>{
        if(err){
            return res.status(400).json({
                errors:"No category found"
            })
        }
        res.json(categories)
    })
}