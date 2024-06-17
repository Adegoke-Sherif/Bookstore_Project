import Joi from "joi";

const addAuthorSchema = Joi.object({
  firstname: Joi.string().required().max(255).trim(),
  lastname: Joi.string().required().max(255).trim(),
  dob: Joi.date().greater("1-1-1900").less("1-1-2024").required(),
  country: Joi.string().optional(),
  books: Joi.array().items(Joi.string()).optional(),
  timestamp: Joi.date().default(() => new Date())
});

const updateAuthorSchema = Joi.object({
  firstname: Joi.string().max(255).trim(),
  lastname: Joi.string().max(255).trim(),
  dob: Joi.date().greater('1900-01-01').less('2024-01-01').optional(),
  country: Joi.string().optional(),
  books: Joi.array().items(Joi.string()).optional(),
});

const addAuthorValidationMW = async (req, res, next) => {
  const authorPayload = req.body;
  try {
    await addAuthorSchema.validateAsync(authorPayload);
    next();
  } catch (error) {
    res.status(40).json({
      message: error.details[0].message,
      status: 400
    });
  }
};



const updateAuthorValidationMW = async (req, res, next) => {
  const authorPayload = req.body;
  try {
    await updateAuthorSchema.validateAsync(authorPayload);
    next();
  } catch (error) {
    res.status(40).json({
      message: error.details[0].message,
      status: 400
    });
  }
};

export { addAuthorValidationMW, updateAuthorValidationMW };
