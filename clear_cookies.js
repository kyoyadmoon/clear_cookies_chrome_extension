this.cookies_ = {};

function addCookie(cookie) {
  var key = cookie.name + cookie.domain + cookie.hostOnly + cookie.path + cookie.secure + cookie.httpOnly + cookie.session + cookie.storeId;
  // console.log(key);
  this.cookies_[key] = cookie;
}

function listener(info) {
  var cookie = info.cookie;
  addCookie(cookie);
}

function clearCookiesByDomain(domainName) {
  if (domainName.length > 0) {
    chrome.cookies.getAll({
      domain: domainName
    }, function(cookies) {
      console.log(JSON.stringify(cookies,null,4));
      for (var i = 0; i < cookies.length; i++) {
        var url = "http" + (cookies[i].secure ? "s" : "") + "://" + domainName + cookies[i].path;
        console.log(url);
        chrome.cookies.remove({
          url: url,
          name: cookies[i].name
        });
      }
    });
  }
  else
    alert('Give me a domainName');
}

jQuery(document).ready(function() {
  console.log("From cookie_handler.js:");
  if (!chrome.cookies) {
    chrome.cookies = chrome.experimental.cookies;
  }
  chrome.browserAction.onClicked.addListener(function(tab) {
    var url = purl(tab.url);
    var domainName = url.attr('host');
    console.log(url);
    console.log(domainName);
    clearCookiesByDomain(domainName);
  });
});
