# frozen_string_literal: true

class BlogsController < ApplicationController
  before_action :set_blog, only: %i[show update destroy]

  def index
    @blogs = Blog.all
    render json: @blogs
  end

  def show
    render json: @blog
  end

  def create
    @blog = Blog.new(blog_params)
    @blog.save
  end

  def update
    @blog.update(blog_params)
  end

  def destroy
    @blog.destroy
  end

  private

  def set_blog
    @blog = Blog.find(params[:id])
  end

  def blog_params
    params.require(:blog).permit(:id, :author, :title, :content)
  end
end
