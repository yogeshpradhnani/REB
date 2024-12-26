const solutionSchema = require("../models/solutionModel.js");

exports.getSolutions = async (req , res )=>{
    try {
        // TODO: Implement your logic here to fetch solutions from the database
        const solutions = await solutionSchema.find({});
        res.status(200).json({success: true,message :"Data fetched successfully", data: solutions  });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching solutions', success: false });
    }

}
exports.postSolution = async (req, res, next) => {
    try {
        console.log("Creating a new solution...");
        let {title ,longDescription,shortDescription,shortImage,longImage }= req.body
        let  newSolution = new solutionSchema({
            title,
            longDescription,
            shortDescription,


        });
        console.log(req.files.shortImage[0]);
        
        if (req.files) {
            if (req.files.shortImage && req.files.shortImage.length > 0) {
                shortImage = req.files.shortImage[0].originalname;
            }
            if (req.files.longImage && req.files.longImage.length > 0) {
                longImage = req.files.longImage[0].originalname;
            }
        }

        newSolution.shortImage = shortImage;
        newSolution.longImage = longImage;
        const createdSolution = await newSolution.save();

        if (createdSolution) {
            res.status(201).json({ 
                success: true, 
                message: 'Solution created successfully', 
                data: createdSolution 
            });
        } else {
            res.status(400).json({ 
                success: false, 
                message: 'Failed to create solution' 
            });
        }
    } catch (error) {
        console.error("Error creating solution:", error.message || error);

        next(error); 
    }
};
