exports.ResponseWithErrorsArray = class ResponseWithErrorsArray {
  constructor() {
    this.statusCode = 500;
    this.errors = [];
  }

  status(code) {
    this.statusCode = code;
    return this;
  }

  json(data) {
    this.errors = data.errors; 
  }
};

exports.generateObjectId = number => `5db48c945dd6${number}f0609cc7e78`;
