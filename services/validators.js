const runSchema = (schema) => (data) => {
  const { error, value } = schema.validate(data);
  if (error) {
    error.message = error.details[0].message.replace(/\[[0-9]+\]\./, '');
    error.type = error.details[0].type;
    throw error;
  }
  return value;
};

module.exports = { runSchema };