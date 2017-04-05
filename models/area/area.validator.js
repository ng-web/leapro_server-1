var validator = require('validator');

exports.checkRequest = function validate(req, res, next) {
  let errors = []
  let values = req.body;  
  if(req.params.hasOwnProperty("id")){
    if(req.param.id < 0 || validator.isAlpha(req.params.id)){
        errors.push('id must be a number: '+req.params.id);
    }
  }
  if(!validator.isLength(values.name, {min:0,max:30})){
      errors.push('area name is out of range: expecting 0 to 30 characters');
  }
  if(!validator.isLength(values.description, {min:0,max:300})){
      errors.push('description is out of range: expecting 0 to 300 characters');
  }
  if(!validator.isNumeric(values.length)){
      errors.push('value must be number');
  }
  if(!validator.isNumeric(values.width)){
      errors.push('value must be number');
  }
  if(!validator.isNumeric(values.depth)){
      errors.push('value must be number');
  }
  if(!validator.isNumeric(values.area)){
      errors.push('value must be number');
  }
  if(!validator.isNumeric(values.volume)){
      errors.push('value must be number');
  }
  if(errors.length > 0){
      res.json({code : 400, status:'error', message: 'invalid request', data: errors })
      return;
  }

  next();

}
