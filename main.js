/**
 * Related posts and documentation
 * https://api.jquery.com/jQuery.ajaxTransport/
 * http://www.henryalgus.com/reading-binary-files-using-jquery-ajax/
 */

$(document).ready(function () {
    // will support only Firefox: 13.0+ Chrome: 20+ Internet Explorer: 10.0+ Safari: 6.0 Opera: 12.10
    $.ajaxTransport("+image", function (options, originalOptions, jqXHR) {
        console.log("ajaxTransport called");
        console.log(options);
        var image;
        return {
            send: function (headers, callback) {
                console.log("ajaxTransport send called");
                image = new Image();
                image.onreadystatechange = image.onload = function () {
                    console.log("ajaxTransport image onload");
                    callback(200, "success", {image: image});
                    console.log("ajaxTransport image onload callback executed");
                };
                image.src = options.url;
                $("#photo_ajaxTransport").html(image);
                console.log("ajaxTransport send completed");

            },
            abort: function () {
                console.log("ajaxTransport abort called");
                image = null;
            }
        };
    });

    var options = {
        url: "./picture.png",
        method: "get",
        dataType: "image",
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