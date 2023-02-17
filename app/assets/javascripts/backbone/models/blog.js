// Backbone Model

App.Models.Blog = Backbone.Model.extend({
  defaults: {
    author: "",
    title: "",
    content: "",
  },
});

// Backbone Collection

App.Collections.Blogs = Backbone.Collection.extend({
  url: "http://localhost:3000/blogs",
});
