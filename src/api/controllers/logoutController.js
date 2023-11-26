

const goHome = async (req, res) => {
    res.status(200).json({sucess: true, message: "logout sccessfully"});
};

export default goHome;
  