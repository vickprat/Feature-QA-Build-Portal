## Flock Build Dashboard

### API to add a build to the dashboard

Send a `POST` request to `http://ios-echo.internal.directi.com:7777/api/addBuild` with following params:

`branchName` : String representing branch name on git

`preProdBuildURL` : Link to the pre-prod build

`prodBuildURL` : Link to the prod build

`platform` : iOS / Android / Desktop

#### Sample call:

```
curl -X POST \
  http://ios-echo.internal.directi.com:7777/api/addBuild \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/x-www-form-urlencoded' \
  -d branchName="guests-master" \
  -d preProdBuildURL="http://ios-echo.internal.directi.com:8080/job/Flock.alpha/20/artifact/Build/echo/artifacts/ota.html" \
  -d prodBuildURL="http://ios-echo.internal.directi.com:8080/job/Flock.alpha/20/artifact/Build/echo/artifacts/ota.html" \
  -d platform="iOS"
```
#### Return Values

200 `{ "message": "Build added successfully!!"}`

403 `{ "message": "Feature not found!!"}`



### API to register a feature to the dashboard

Send a `POST` request to `http://ios-echo.internal.directi.com:7777/api/registerFeature` with following params:

`featureName` : String representing feature name

`branchName` : String representing branch name on git

`platform` : iOS / Android / Desktop

#### Sample call:

```
curl -X POST \
  http://ios-echo.internal.directi.com:7777/api/registerFeature \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/x-www-form-urlencoded' \
  -d featureName="guests master" \
  -d branchName="guests-master" \
  -d platform="iOS"
```
#### Return Values

200 `{ "message": "Feature registered successfully!!"}`

403 `{ "message": "Duplicate feature found!!"}`



### API to remove a feature from the dashboard

Send a `POST` request to `http://ios-echo.internal.directi.com:7777/api/removeFeature/:platform/:branchName` with following params:

`branchName` : String representing branch name on git

`platform` : iOS / Android / Desktop

#### Sample call:

```
curl -X POST \
  http://ios-echo.internal.directi.com:7777/api/removeFeature/platform/branchName \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/x-www-form-urlencoded'
```
#### Return Values

200 `{ "message": "Feature removed successfully!!"}`

403 `{ "message": "Feature not found!!"}`

## Author

* Prateek Khandelwal, prateek.kh@flock.com
