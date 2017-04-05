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
      errors.push('service name is out of range: expecting 0 to 30 characters');
  }
  if(!validator.isLength(values.name, {min:0,max:300})){
      errors.push('description is out of range: expecting 0 to 300 characters');
  }
  if(!validator.isNumeric(values.man_hours)){
      errors.push('man hours must be number');

  }else{
     if(values.man_hours < 1 || values.man_hours > 24){
        errors.push('man hours must be between 0 and 25');
     }
  }
  if(!validator.isNumeric(values.unit_charge)){
      errors.push('man charge must be number');

  }else{
     if(values.unit_charge < 0){
        errors.push('unit charge cannot be less than 0');
     }
  }

  if(!(validator.equals(values.discount_type,'F' ) || validator.equals(values.discount_type,'P'))){
      errors.push('invalid discount type : '+values.discount_type);
  }

  if(!(values.tax_type !='F' ||values.tax_type !='P')){
      errors.push('invalid tax type : '+values.tax_type);
  }

  if(!validator.isNumeric(values.tax)){
      errors.push('tax must be number');
  }

  if(!validator.isNumeric(values.discount)){
      errors.push('discount must be number');
  }

  if(!validator.isNumeric(values.category_id)){
      errors.push('invalid category id: '+values.category_id);
  }

  if(errors.length > 0){
      res.json({code : 400, status:'error', message: 'invalid request', data: errors })
      return;
  }

  next();
}
