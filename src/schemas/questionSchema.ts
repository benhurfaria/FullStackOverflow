import joi from 'joi';

const questionSchema: joi.ObjectSchema = joi.object({
    question: joi.string().required(),
    student: joi.string().required(),
    class: joi.string().required(),
    tags: joi.string(),
});

const answerSchema: joi.ObjectSchema = joi.object({
    answer: joi.string().required(),
});

export{
    questionSchema,
    answerSchema,
}
