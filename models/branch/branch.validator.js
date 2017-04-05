var validator = require('validator');

exports.checkRequest = function validate(req, res, next) {
  let errors = []
  let values = req.body;  
  if(req.params.hasOwnProperty("id")){
    if(req.param.id < 0 || validator.isAlpha(req.params.id)){
        errors.push('id must be a number: '+req.params.id);
    }
  }
  //validation goes here..


}