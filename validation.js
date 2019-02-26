"use strict";

const joi = require('joi');

const creds = joi.object({
  // the configuration to be managed
  email: joi.string().required(),
  password: joi.string().required(),
}).unknown();

const meteorClientSchema = joi.object({
  // the configuration to be managed
  config: joi.string().default('app'),
  server: joi.string().default('localhost'),
  port: joi.string().default('3000'),
  creds: creds.required()
}).unknown();


module.exports = async function (obj) {
  // validate the config object
  const validation = joi.validate(obj, meteorClientSchema);
  if (validation.error) {
    const errors = [];
    validation.error.details.forEach( detail => {
      errors.push(detail.message);
    });
    // process failed
    throw new Error(`client validation error: ${errors.join(", ")}`);
  }

  return validation.value;
};
