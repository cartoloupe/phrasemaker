Meteor.publish('texts', function(){
  return Texts.find({});
});
