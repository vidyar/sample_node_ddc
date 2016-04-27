module.exports = add;

function add(a, b) {
  var parsedA = parseInt(a);
  var parsedB = parseInt(b);

  var errors = [];
  if (!parsedA)
    errors.push('Error Parsing "a" value');
  if (!parsedB)
    errors.push('Error Parsing "b" value');

  if (errors.length > 0)
    return {
      error : errors
    };
  else
    return {
      a : parsedA,
      b : parsedB,
      answer : parsedA + parsedB
    };
}
