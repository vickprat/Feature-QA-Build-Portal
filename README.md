## Flock Build Dashboard

Send a `POST` request to `http://ios-echo.internal.directi.com:7777/api/addBuild` with following params:

`branchName` : String representing branch name on git

`buildURL` : Link to the build

`platform` : iOS / Android / Desktop


Sample call:

```
curl -X POST \
  http://ios-echo.internal.directi.com:7777/api/addBuild \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/x-www-form-urlencoded' \
  -d branchName="guests-master" \
  -d buildURL="http://ios-echo.internal.directi.com:8080/job/Flock.alpha/20/artifact/Build/echo/artifacts/ota.html" \
  -d platform="iOS"
```


###Return Values

200 `{ "message": "Build added successfully"}`

403 `{ "message": "Feature not found"}`
