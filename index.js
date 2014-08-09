(function (win) {
  win.nanoajax = function (url, postBody, callback) {
    if (!callback) callback = postBody, postBody = null

    var req = getRequest()
    if (!req) return callback(new Error('no request'))

    req.onreadystatechange = function () {
      if (req.readyState == 4)
        callback(req.status, req.responseText)
    }

    if (postBody) {
      req.open("POST", url, true)
      req.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
      req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    } else {
      req.open("GET", url, true)
    }

    req.send(postBody)
  }

  function getRequest() {
    if (win.XMLHttpRequest)
      return new win.XMLHttpRequest;
    else
      try { return new ActiveXObject("MSXML2.XMLHTTP.3.0"); } catch(e) {}
  }
})(window)