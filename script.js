// Copyright (c) 2010 The A-s Brothers. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
var siteUrl = "http://codesavvy.github.com/KuyilCopy?link="
var key = 'AIzaSyDT_4bGAB2X_okHf9WskEmHSlnkJqTFeMk'
var url = 'https://www.googleapis.com/urlshortener/v1/url';
var logDisp = function (msg) {
    var bkg = chrome.extension.getBackgroundPage();
    bkg.console.log(msg);
};

var copyToClipboard = function (text) {
    var tmp_area = document.createElement('textarea');
    var input = document.body.appendChild(tmp_area)
    //var input = document.getElementById('url');
    if (input == undefined)
        return;
    input.value = text;
    input.select();
    document.execCommand('copy', false, null);
};

logDisp('thudangi');
var clickHandler = function (info, tab) {
    var imageSrc = info.srcUrl
    var image_url = siteUrl + encodeURIComponent(imageSrc)
    logDisp('kuthhi');
    logDisp(info.srcUrl);
    logDisp(tab)
    shortenUrl(image_url, function (resp) {
        logDisp(resp.message);
        copyToClipboard(resp.message);
    });
};

var shortenUrl = function (longUrl, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', url + '?key=' + key, true);
    xmlhttp.setRequestHeader('Content-Type', 'application/json');
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status != 0) {
            var response = JSON.parse(xmlhttp.responseText);
            if (response.id == undefined) {
                callback({status:'error', message:response.error.message});
            }
            else {
                callback({status:'success', message:response.id});
            }
        }
    }
    xmlhttp.send(JSON.stringify({'longUrl':longUrl}));
}

var id = chrome.contextMenus.create({"title":'KuyilCopy', "contexts":['image'], "onclick":clickHandler});
logDisp(id);