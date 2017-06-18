jquery.ajax(
  'home/news/detail'
).done(function(data){
  console.log(data.new);
});