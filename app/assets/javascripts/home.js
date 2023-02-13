$(document).ready(function () {
  $(".add-blog").on("click", function () {
    var blog = new Blog({
      author: $(".author-input").val(),
      title: $(".title-input").val(),
      content: $(".content-input").val(),
    });
    $(".author-input").val("");
    $(".title-input").val("");
    $(".content-input").val("");
    blogs.add(blog);
    blog.save(null, {
      success: function (response) {
        console.log("Successfully SAVED blog with id: " + response.toJSON().id);
      },
      error: function () {
        console.log("Failed to save blog!");
      },
    });
  });

  Backbone.Model.prototype.idAttribute = "id";

  // Backbone Model

  var Blog = Backbone.Model.extend({
    defaults: {
      author: "",
      title: "",
      content: "",
    },
  });

  // Backbone Collection

  var Blogs = Backbone.Collection.extend({
    url: "http://localhost:3000/blogs",
  });

  // instantiate a Collection

  var blogs = new Blogs();

  // Backbone View for one blog

  var BlogView = Backbone.View.extend({
    model: new Blog(),
    tagName: "tr",
    initialize: function () {
      this.template = _.template($(".blogs-list-template").html());
    },
    events: {
      "click .edit-blog": "edit",
      "click .update-blog": "update",
      "click .cancel": "cancel",
      "click .delete-blog": "delete",
    },
    edit: function () {
      $(".edit-blog").hide();
      $(".delete-blog").hide();
      this.$(".update-blog").show();
      this.$(".cancel").show();

      var author = this.$(".author").html();
      var title = this.$(".title").html();
      var content = this.$(".content").html();

      this.$(".author").html(
        '<input type="text" class="form-control author-update" value="' +
          author +
          '">'
      );
      this.$(".title").html(
        '<input type="text" class="form-control title-update" value="' +
          title +
          '">'
      );
      this.$(".content").html(
        '<input type="text" class="form-control content-update" value="' +
          content +
          '">'
      );
    },
    update: function () {
      this.model.set("author", $(".author-update").val());
      this.model.set("title", $(".title-update").val());
      this.model.set("content", $(".content-update").val());

      this.model.save(null, {
        success: function (response) {
          console.log(
            "Successfully UPDATED blog with id: " + response.toJSON().id
          );
        },
        error: function (err) {
          console.log("Failed to update blog!");
        },
      });
    },
    cancel: function () {
      blogsView.render();
    },
    delete: function () {
      this.model.destroy({
        success: function (response) {
          console.log(
            "Successfully DELETED blog with id: " + response.toJSON().id
          );
        },
        error: function (err) {
          console.log("Failed to delete blog!");
        },
      });
    },
    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },
  });

  // Backbone View for all blogs

  var BlogsView = Backbone.View.extend({
    model: blogs,
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
        self.$el.append(new BlogView({ model: blog }).render().$el);
      });
      return this;
    },
  });

  var blogsView = new BlogsView();
});
