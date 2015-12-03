// this.cookies_ = {};

function clearCookiesByDomain(domainName) {
  if (domainName.length > 0) {
    chrome.cookies.getAll({
      domain: domainName
    }, function(cookies) {
      for (var i = 0; i < cookies.length; i++) {
        var url = "http" + (cookies[i].secure ? "s" : "") + "://" + domainName + cookies[i].path;
        chrome.cookies.remove({
          url: url,
          name: cookies[i].name
        });
      }
    });
  }
  else
    console.log('Give me a domainName');
}

jQuery(document).ready(function() {
  if (!chrome.cookies) {
    chrome.cookies = chrome.experimental.cookies;
  }
  chrome.browserAction.onClicked.addListener(function(tab) {
    var url = purl(tab.url);
    var domainName = url.attr('host');
    console.log('url: '+ url);
    console.log('domainName: '+ domainName);
    clearCookiesByDomain(domainName);
  });
});
