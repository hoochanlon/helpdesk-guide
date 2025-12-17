# 确保脚本抛出遇到的错误
set -e

yarn docs:build

cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME
# 脚本参考 http://wmm66.com/index/article/detail/id/62.html

git init
git add .
git commit -m 'deploy'
git remote add origin https://github.com/hoochanlon/helpdesk-guide.git
git checkout -b gh-pages
git push origin gh-pages -f

cd -