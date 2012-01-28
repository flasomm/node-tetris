// Game schema
exports.init = function(db) {

  var Schema = db.Schema,
      ObjectId = Schema.ObjectId;

  var Player = new Schema({
    username        : {type : String, default : '', required : true},
    email    	      : {type : String, default : '', required : true},
    firstname       : {type : String, default : ''},
    lastname        : {type : String, default : ''},
    birthdate	      : {type : Date },
    created_at      : {type : Date, default : Date.now},
    updated_at      : {type : Date, default : Date.now}
  });


  // register models into db
  db.model('Player', Player);
  var Player = exports.Player = db.model('Player');
  
};

