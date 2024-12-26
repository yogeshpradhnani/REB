const User = require('../models/crmUserModel.js');

exports.registerForm = async (req, res) => {
  try {
    const { name, email, contact, description } = req.body;

    if (!name || !email || !contact ) {
      return res.status(400).json({ message: 'All fields are required', success: false });
    }
    // name validation 
    const nameRegex = /[a-z]/gi;
    if (!name.match(nameRegex)) {
      return res.status(400).json({ message: 'Name contains only letters', success: false });
    }
    
    const emailRegex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/;
    if (!email.match(emailRegex)) {
      return res.status(400).json({ message: 'Invalid email format', success: false });
    }

    if(contact){
        const contactRegex = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;
        if (!contact.match(contactRegex)) {
            return res.status(400).json({ message: 'Invalid contact number format', success: false });
          }
    }
   



    // Check if email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email is already Available', success: false });
    }

    // Create new user
    const newUser = new User({ name, email, contact, description });
    const registered = await newUser.save();

    if (!registered) {
      return res.status(500).json({ message: 'Failed to register user', success: false });
    }

    res.status(201).json({ message: 'User registered successfully', success: true });
  } catch (error) {
   
    res.status(500).json({ message: "Something went wrong", success: false });
  }
};

exports.getAllUser= async (req, res,next)=>{
  try {
    const users = await User.find({});
  
    if (!users) {
      return res.status(404).json({ message: 'No users found', success: false });
    }
    // if users is present then apply pagination 
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {};
    results.totalUsers = users.length;
    results.users = users.slice(startIndex, endIndex);
    results.currentPage = page;
    results.nextPage = page + 1 > Math.ceil(users.length / limit)? undefined : page + 1;
    results.prevPage = page - 1 < 1? undefined : page - 1;
    res.status(200).json({success: true ,message :"Data fetched successfully", data:results});


    
  } catch (error) {
    
  }
}
