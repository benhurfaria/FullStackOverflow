import joi from 'joi';

const questionSchema: joi.ObjectSchema = joi.object({
    question: joi.string().required(),
    student: joi.string().required(),
    class: joi.string().required(),
    tags: joi.string(),
});

export{
    questionSchema,
}