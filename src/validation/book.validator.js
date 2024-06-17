import Joi from "joi";

 const addBookSchema = Joi.object ({
 title: Joi.string().required().min(5).max(255).trim(),
 shortDescription: Joi.string().min(5).max(500).optional().trim(),
 isbn: Joi.string().min(10).max(13).optional(),
  year: Joi.number().integer().required().max(2024),
 price: Joi.number(). min(0).required(),
 timestamp: Joi.date().default(() => Date.now())
});

const updateBookSchema = Joi.object ({
  title: Joi.string().min(5).max(255).trim(),
  shortDescription: Joi.string().min(5).max(500).optional().trim(),
  isbn: Joi.string().min(10).max(13).optional(),
   year: Joi.number().integer().optional().max(2024),
  price: Joi.number(). min(0).optional(),
  timestamp: Joi.date().default(() => Date.now())
 });


const addBookValidationMW = async (req, res, next) => {
  const bookPayload = req.body;
  try {
    await addBookSchema.validateAsync(bookPayload);
    next();
  } catch (error) {
    res.status(40).json({
      message: error.details[0].message,
      status: 400
    });
  }
};



const updateBookValidationMW = async (req, res, next) => {
  const bookPayload = req.body;
  try {
    await updateBookSchema.validateAsync(bookPayload);
    next();
  } catch (error) {
    res.status(40).json({
      message: error.details[0].message,
      status: 400
    });
  }
};

export { addBookValidationMW, updateBookValidationMW };
