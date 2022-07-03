const errorHandlerMiddleware = async (err, req, res, next) => {
  //console.log(err)
 // const {status=500,msg='Something went wrong, please try again'}=err
  return res.status(500).json({msg:'Something went wrong, please try again' })
}

module.exports = errorHandlerMiddleware
