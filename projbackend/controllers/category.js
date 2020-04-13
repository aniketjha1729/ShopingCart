const Category=require("../models/category");

exports.getCategoryId=(req,res,next,id)=>{
    Category.findById(id).exec((err,category)=>{
        if(err){
            return res.status(400).json({
                errors:"Category not found"
            })  
        }
        req.category=category;
        next();
    })
    
}

exports.createCategory=(req,res)=>{
    const category=new Category(req.body);
    category.save((err,category)=>{
        if (err) {
            return res.status(400).json({
                errors: "Category not found"
            })
        }
        res.json(category);
    })

}

exports.getCategory=(req,res)=>{
    return res.json(req.category);
}

exports.getAllCategory=(req,res)=>{
    Category.find().exec((err,categories)=>{
        if (err) {
            return res.status(400).json({
                errors: "No category found"
            })
        }
        res.json(categories);
    })
}

exports.updateCategory=(req,res)=>{
    const category=req.category;
    category.name=req.body.name;

    category.save((err,updatedCategory)=>{
        if(err){
            return res.status(400).json({
                errors: "No category found"
            })
        }
        res.json(updatedCategory)
    })
        
}

exports.deleteCategory=(req,res)=>{
    const category=req.category;
    category.remove((err,category)=>{
        if (err) {
            return res.status(400).json({
                errors: "Failed to delete category"
            })
        }
        res.json({
            message:"successfully deleted"
        })
    })
}