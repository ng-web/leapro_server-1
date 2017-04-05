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
  //check how to to date validation!!!!!!!!
  if(!validator.isLength(values.established_date, {min:0,max:300})){
      errors.push('description is out of range: expecting 0 to 300 characters');
  }
  if(!validator.isNumeric(values.customer_id)){
      errors.push('value must be number');
  }
  if(errors.length > 0){
      res.json({code : 400, status:'error', message: 'invalid request', data: errors })
      return;
  }

  next();

}