export const generateMiddleWare = (schema) => {
  return(req, res, next) => {

    if(schema) {
      const result = schema.validate(req.body, (err, value) => {});
      if(result.error) {
        return res.status(400).json({ message: "Validation error", errors: result.error})
      }
    }
    next();
  };
};