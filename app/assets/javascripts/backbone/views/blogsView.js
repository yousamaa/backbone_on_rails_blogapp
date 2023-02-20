// Backbone View for all blogs
$(function () {
  App.Views.BlogsView = Backbone.View.extend({
    model: new App.Collections.Blogs(),
    el: $(".blogs-list"),
    initialize: function () {
      var self = this;
      this.model.on("add", this.render, this);
      this.model.on(
        "change",
        function () {
          setTimeout(function () {
            self.render();
          }, 30);
        },
        this
      );
      this.model.on("remove", this.render, this);

      this.model.fetch({
        success: function (response) {
          _.each(response.toJSON(), function (item) {
            console.log("Successfully GOT blog with id: " + item.id);
          });
        },
        error: function () {
          console.log("Failed to get blogs!");
        },
      });
    },
    render: function () {
      var self = this;
      this.$el.html("");
      _.each(this.model.toArray(), function (blog) {
        self.$el.append(new App.Views.BlogView({ model: blog }).render().$el);
      });
      return this;
    },
  });
});
// App.Views.BlogsView = Backbone.View.extend({
//   model: new App.Collections.Blogs(),
//   el: $(".blogs-list"),
//   initialize: function () {
//     var self = this;
//     this.model.on("add", this.render, this);
//     this.model.on(
//       "change",
//       function () {
//         setTimeout(function () {
//           self.render();
//         }, 30);
//       },
//       this
//     );
//     this.model.on("remove", this.render, this);

//     this.model.fetch({
//       success: function (response) {
//         _.each(response.toJSON(), function (item) {
//           console.log("Successfully GOT blog with id: " + item.id);
//         });
//       },
//       error: function () {
//         console.log("Failed to get blogs!");
//       },
//     });
//   },
//   render: function () {
//     var self = this;
//     this.$el.html("");
//     _.each(this.model.toArray(), function (blog) {
//       self.$el.append(new App.Views.BlogView({ model: blog }).render().$el);
//     });
//     return this;
//   },
// });
