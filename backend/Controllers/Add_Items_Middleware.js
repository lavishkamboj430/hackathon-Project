const ItemModel = require("../Models/Items.models")

const Add_Items = async(req,res)=>
{
    const {title,category,description,images,location,borrowedBy,lendedBy} = req.body   

    await ItemModel.create(
        {
          title:title  ,
          category:category,
          description:description,
          images:images,
          location:location,
          lendedBy:lendedBy
        }
    )

     res.status(200).json(
        {
            Success:true,
            Message:"Item Added Successfully"
        }
    )

    return
    

}
module.exports = Add_Items