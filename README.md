# Guidebook Engineering Blog

This repo is a static site for the [Guidebook Engineering Blog](https://engineering.guidebook.com). The site leverages the [Jekyll static site generator](https://jekyllrb.com/).

# Adding Content
Adding content should follow the same development workflow we use for code reviews.

1. Branch off `gh-pages` into your "feature" or "post" branch.
1. Make your changes + commits (add your new blog post).
1. Open a pull request.
1. Wait for peer review.
1. Once your changes have been reviewed and feedback has been addressed, merge the post into `gh-pages`.

# Run The Site Locally

To run the site locally (you should _always_ test your posts locally before pushing them to production), follow the instructions below.

1. Clone the repository.
```
> git clone git@github.com:Guidebook/guidebook-engineering-blog.git
```
1. Install dependencies.
```
> cd guidebook-engineering-blog
> bundle install
> npm install
```
1. Run the site using gulp.
```
> gulp
```
1. The site should be available at `localhost:4000`.