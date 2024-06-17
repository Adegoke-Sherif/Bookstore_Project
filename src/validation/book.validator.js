import Joi from "joi";

 const bookSchema = Joi.object ({
 title: Joi.string().required().min(5).max(255).trim(),
 shortDescription: Joi.string().min(5).max(500).optional().trim(),
 isbn: Joi.string().min(10).max(13).required(),
  year: Joi.number().integer().required().max(2024),
 price: Joi.number(). min(0).required(),
 timestamp: Joi.date().default(() => Date.now())
});

const BookValidationMW = async (req, res, next) => {
  const bookPayload = req.body;
  try {
    await bookSchema.validateAsync(bookPayload);
    next();
  } catch (error) {
    res.status(40).json({
      message: error.details[0].message,
      status: 400
    });
  }
};

export default BookValidationMW;
