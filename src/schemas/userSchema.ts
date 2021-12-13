import joi from 'joi';

const userSchema: joi.ObjectSchema = joi.object({
  name: joi.string().min(3).required(),
  class: joi.string().max(3).required(),
});

export { userSchema };
