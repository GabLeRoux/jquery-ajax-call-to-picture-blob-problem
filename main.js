/**
 * Related posts and documentation
 * https://api.jquery.com/jQuery.ajaxTransport/
 * http://www.henryalgus.com/reading-binary-files-using-jquery-ajax/
 */

$(document).ready(function () {
    console.log("document is ready");

    // will support only Firefox: 13.0+ Chrome: 20+ Internet Explorer: 10.0+ Safari: 6.0 Opera: 12.10
    // use this transport for "binary" data type
    $.ajaxTransport("+binary", function (options, originalOptions, jqXHR) {
        // check for conditions and support for blob / arraybuffer response type
        if (window.FormData && ((options.dataType && (options.dataType === 'binary')) || (options.data && ((window.ArrayBuffer && options.data instanceof ArrayBuffer) || (window.Blob && options.data instanceof Blob))))) {
            return {
                // create new XMLHttpRequest
                send: function (headers, callback) {
                    // setup all variables
                    var xhr = new XMLHttpRequest(),
                        url = options.url,
                        type = options.type,
                        async = options.async || true,
                        // blob or arraybuffer. Default is blob
                        dataType = options.responseType || "blob",
                        data = options.data || null,
                        username = options.username || null,
                        password = options.password || null;

                    xhr.addEventListener('load', function () {
                        var data = {};
                        data[options.dataType] = xhr.response;
                        // make callback and send data
                        callback(xhr.status, xhr.statusText, data, xhr.getAllResponseHeaders());
                    });

                    xhr.open(type, url, async, username, password);

                    // setup custom headers
                    for (var i in headers) {
                        xhr.setRequestHeader(i, headers[i]);
                    }

                    xhr.responseType = dataType;
                    xhr.send(data);
                },
                abort: function () {
                    jqXHR.abort();
                }
            };
        }
    });

    var options = {
        url: "./picture.png",
        method: "get",
        dataType: "binary",
        // processData: false,
        headers: {
            Authorization: 'Bearer example'
        }
    };

    $.ajax(options).then(function (data) {
        console.log("ajax called");
        console.log(data);
        var binaryData = [];
        binaryData.push(data);

        var blob = new Blob(binaryData, {type: "image/jpeg"});
        var urlCreator = window.URL || window.webkitURL;
        var imageUrl = urlCreator.createObjectURL(blob);

        console.log("Found imageUrl: " + imageUrl);
        $("#photo").attr("src", imageUrl);
        console.log("ajax completed");
    });
});