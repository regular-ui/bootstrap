var Regular = require('regularjs');
module.exports = function(content) {
  var content = Regular.parse(content, {
    stringify : true
  });
  return  "module.exports =" + content;
};