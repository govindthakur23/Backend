const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

export default asyncHandler;

/*
const asyncHandler =(fn)=>{
    async()=>{
        try{
           await fn(req,res,next)
        } catch(err) {
             res.status(err.code).json({
                success:false,
                message: err.message
             })
        }
    }
}
*/
