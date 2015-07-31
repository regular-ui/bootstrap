<input r-model={value} focus={!value}/>
Regular.directive('focus', function(val){
  var get = this.$expression(value);
})
