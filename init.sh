branch=master
git fetch origin
git checkout $branch
git reset HEAD --hard
git pull origin $branch
echo '[LOG] git pull completed'
chmod 755 *

npm install
mongod &
gulp serve
