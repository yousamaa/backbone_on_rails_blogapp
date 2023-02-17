//= require_self
//= require_tree ./models
//= require_tree ./views

var App = {
  Models: {},
  Collections: {},
  Views: {},
  init: function () {
    new App.Views.BlogsView();
  },
};
