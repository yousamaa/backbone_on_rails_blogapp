// Backbone View for one blog

App.Views.BlogView = Backbone.View.extend({
  model: new App.Models.Blog(),
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
