

const goOut = async (req, res) => {
    res.cookie("jwt","",{ maxAge: 1 });
    res.redirect("/");
    res.status(200).json({sucess: true, message: "logout sccessfully"});
};

export default goOut;
  
