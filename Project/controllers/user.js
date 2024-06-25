const User= require("../models/user")

async function handleGetAllUsers(req,res){
    // {
    // console.log("I am in get route ", req.MyUsername)
    // res.setHeader("X-MyName", "Star")
    // }
    
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
}

async function handleGetUserById(req,res){
    const user= await User.findById(req.params.id)
    if(!user) return res.status(400).json({error: "User not found"})
    return res.json(user)
}

async function handleUpdateUserById(req,res){
    //Edit user with user id
    await User.findByIdAndUpdate(req.params.id, { lastName: "Changed" });
    return res.json({ status: "Success" });
}

async function handleDeleteUserById(req,res){
    // Delete user with user id
    await User.findByIdAndDelete(req.params.id)
    return res.json({status: "Success"})
}

async function handleCreateNewUser(req,res){
    // Add user
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });
  return res.status(201).json({ msg: "success", id: result._id });

//   {
//     For writing in log file
//     USERS.push({...body, id: USERS.length+1});
//     fs.writeFile("./MOCK_DATA.json", JSON.stringify(USERS), (err, data)=>{
//         return res.status(201).json({status: "Success", id: USERS.length})
//     })
//   }
}
module.exports={
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUser,
}