const { getJavaTemplates } = require('./templates/java');
const { getGoTemplates } = require('./templates/go');
const { getJSTemplates } = require('./templates/js');

function getTemplates(language) {
  switch (language) {
    case 'java':
      return getJavaTemplates();
    case 'go':
      return getGoTemplates();
    case 'js':
      return getJSTemplates();
    default:
      throw new Error(`Unsupported language: ${language}`);
  }
}

module.exports = { getTemplates }; 