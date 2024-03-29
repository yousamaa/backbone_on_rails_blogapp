# frozen_string_literal: true

class CreateBlogs < ActiveRecord::Migration[5.2]
  def change
    create_table :blogs do |t|
      t.string :author
      t.string :title
      t.string :content

      t.timestamps
    end
  end
end
