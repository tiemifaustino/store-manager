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

/*
Source:
Regex link: https://regex-generator.olafneumann.org/?sampleText=%5B0%5D.&flags=i&onlyPatterns=false&matchWholeLine=false&selection=0%7CSquare%20brackets,1%7CNumber,3%7CCharacter
*/