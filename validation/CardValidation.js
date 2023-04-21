const Joi = require('@hapi/joi');

const isEmpty = require('./is-empty');

exports.CardValidation = async (data) => {
	data.title = !isEmpty(data.title) ? data.title : '';
    data.selectProject = !isEmpty(data.selectProject) ? data.selectProject : '';
	data.cardStage = !isEmpty(data.cardStage) ? data.cardStage : '';

	const CardSchema = Joi.object({
		title: Joi.string().trim().required().messages({
			'string.empty': 'title is required',
		}),
		cardStage: Joi.string().trim().required().messages({
			'string.empty': 'Card Stage is required',
			'any.required': 'Card Stage is required',
		}),
		selectProject: Joi.string().trim().required().messages({
			'string.empty': 'select Project is required',
			'any.required': 'select Project is required',
		}),
	});
	return await CardSchema.validateAsync(data, {abortEarly: false});
};