(function($) {
  var sync = Backbone.sync;
  Backbone.sync = function(method, model, options) {
    if (options.data == null && model && (method == 'create' || method == 'update' || method === 'patch')) {
      options.contentType = 'application/json';
      var data = {}

      if(model.paramRoot) {
        data[model.paramRoot] = model.toJSON();
      } else {
        data = model.toJSON();
      }

      options.data = JSON.stringify(data);
      options.beforeSend = function(xhr) {
        if (!options.noCSRF) {
          var token = $('meta[name="csrf-token"]').attr('content');
          if (token) xhr.setRequestHeader('X-CSRF-Token', token);  
        }
      }
    }

    return sync(method, model, options);
  }
  
})(jQuery);