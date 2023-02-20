$(document).ready () ->
  # Backbone Model

  class Blog extends Backbone.Model
    defaults:
      author: ""
      title: ""
      content: ""

  # Backbone Collection

  class Blogs extends Backbone.Collection
    url: "http://localhost:3000/blogs"

  # instantiate a Collection

  blogs = new Blogs()

  # Backbone View for one blog

  class BlogView extends Backbone.View
    model: new Blog()
    tagName: "tr"
    initialize: () ->
      this.template = _.template($(".blogs-list-template").html())

    events:
      "click .edit-blog": "edit"
      "click .update-blog": "update"
      "click .cancel": "cancel"
      "click .delete-blog": "delete"

    edit: () ->
      $(".edit-blog").hide()
      $(".delete-blog").hide()
      this.$(".update-blog").show()
      this.$(".cancel").show()

      author = this.$(".author").html()
      title = this.$(".title").html()
      content = this.$(".content").html()

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

    update: () ->
      this.model.set("author", $(".author-update").val())
      this.model.set("title", $(".title-update").val())
      this.model.set("content", $(".content-update").val())

      this.model.save(null, {
        success: (response) ->
          console.log(
            "Successfully UPDATED blog with id: " + response.toJSON().id
          )

        error: (err) ->
          console.log("Failed to update blog!")
      })

    cancel: () ->
      blogsView.render()

    delete: () ->
      this.model.destroy({
        success: (response) ->
          console.log(
            "Successfully DELETED blog with id: " + response.toJSON().id
          );

        error: (err) ->
          console.log("Failed to delete blog!");

      });

    render: () ->
      this.$el.html(this.template(this.model.toJSON()));
      return this;

  # Backbone View for all blogs

  class BlogsView extends Backbone.View
    model: blogs
    el: $(".blogs-list")
    initialize: () ->
      self = this;
      this.model.on("add", this.render, this)
      this.model.on(
        "change",
        () ->
          setTimeout(() ->
            self.render()
          , 30)

        this
      )
      this.model.on("remove", this.render, this)

      this.model.fetch({
        success: (response) ->
          _.each(response.toJSON(), (item) ->
            console.log("Successfully GOT blog with id: " + item.id)
          )
        
        error: () ->
          console.log("Failed to get blogs!");
      })

    render: () ->
      self = this
      this.$el.html("")
      _.each(this.model.toArray(), (blog) ->
        self.$el.append(new BlogView({ model: blog }).render().$el)
      )
      this

  blogsView = new BlogsView()

  $(".add-blog").on("click", () ->
    blog = new Blog({
      author: $(".author-input").val(),
      title: $(".title-input").val(),
      content: $(".content-input").val(),
    })
    $(".author-input").val("")
    $(".title-input").val("")
    $(".content-input").val("")
    blogs.add(blog)
    blog.save(null, {
      success: (response) ->
        console.log("Successfully SAVED blog with id: " + response.toJSON().id);

      error: () ->
        console.log("Failed to save blog!");

    })
  )
