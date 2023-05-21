host = ''


function loadLotteryLastYear() {

    var year;

    $.ajax({
        url: host + "api/queryLotteryResultLastYear.do",
        type: "post",
        success: function (data) {
            year = data.data;
        },
        async: false

    });

    return year;

}


var isyear = 0;

function loadLotteryData() {
    if (isyear == 0) {
        isyear = $("#yearcheck").val();
    } else {
        if (isyear != $("#yearcheck").val()) {
            isfalg = true;
        }
    }
    $.ajax({
        url: host + "api/queryBeforeLotteryResultDetails.do",
        type: "post",
        data: { year: $("#yearcheck").val() },
        success: function (data) {
            var lotterys = data.data.splice(0, 5);

            var sumitem = "";
            for (var i = 0; i < lotterys.length; i++) {
                var tmds = lotterys[i].b7code % 2 == 0 ? "双" : "单";
                var tmdx = lotterys[i].b7code < 25 ? "小" : "大";
                var zh = lotterys[i].b1code + lotterys[i].b2code + lotterys[i].b3code + lotterys[i].b4code + lotterys[i].b5code + lotterys[i].b6code + lotterys[i].b7code;
                var zhds = zh % 2 == 0 ? "双" : "单";
                var zhdx = Math.floor(zh / 7) < 25 ? "小" : "大";
                lotterys[i] = replacecode(lotterys[i]);
                var item = "<tr>" +
                    "<td>第<strong style=\"color:#ea5c38\">" + lotterys[i].codeid + "</strong>期 <br>" + lotterys[i].timer + " </td>" +
                    "<td class=\"pl_17\"> <div style='justify-content: space-around;display: flex;'>" +
                    "  <dl data-text=\"" + lotterys[i].b1shengxiao + "\" class=\"data\"><span class=\"" + lotterys[i].b1color + "\">" + lotterys[i].b1code + "</span><br/>" +
                    "  <b>" + lotterys[i].b1shengxiao + "</b>" +
                    "  <b style=\"color:#ea5c38\">" + lotterys[i].b1jmsht + "</b>" +
                    "  </dl>" +
                    "<dl data-text=\"" + lotterys[i].b2shengxiao + "\" class=\"data\"><span class=\"" + lotterys[i].b2color + "\">" + lotterys[i].b2code + "</span><br/><b>" + lotterys[i].b2shengxiao + "</b>" +
                    " <b style=\"color:#ea5c38\">" + lotterys[i].b2jmsht + "</b>" +
                    " </dl>" +
                    "   <dl data-text=\"" + lotterys[i].b3shengxiao + "\" class=\"data\"><span class=\"" + lotterys[i].b3color + "\">" + lotterys[i].b3code + "</span><br/><b>" + lotterys[i].b3shengxiao + "</b>" +
                    "    <b style=\"color:#ea5c38\">" + lotterys[i].b3jmsht + "</b></dl>" +
                    "  <dl data-text=\"" + lotterys[i].b4shengxiao + "\" class=\"data\"><span class=\"" + lotterys[i].b4color + "\">" + lotterys[i].b4code + "</span><br/><b>" + lotterys[i].b4shengxiao + "</b>" +
                    "   <b style=\"color:#ea5c38\">" + lotterys[i].b4jmsht + "</b></dl>" +
                    "  <dl data-text=\"" + lotterys[i].b5shengxiao + "\" class=\"data\"><span class=\"" + lotterys[i].b5color + "\">" + lotterys[i].b5code + "</span><br/><b>" + lotterys[i].b5shengxiao + "</b>" +
                    "   <b style=\"color:#ea5c38\">" + lotterys[i].b5jmsht + "</b></dl>" +
                    "  <dl data-text=\"" + lotterys[i].b6shengxiao + "\" class=\"data\"><span class=\"" + lotterys[i].b6color + "\">" + lotterys[i].b6code + "</span><br/><b>" + lotterys[i].b6shengxiao + "</b>" +
                    "   <b style=\"color:#ea5c38\">" + lotterys[i].b6jmsht + "</b></dl></div></td>" +
                    "<td class=\"numbre\"><dl data-text=\"" + lotterys[i].b7shengxiao + "\" class=\"data\"><span class=\"" + lotterys[i].b7color + "\">" + lotterys[i].b7code + "</span><b>" + lotterys[i].b7shengxiao + "</b>" +
                    "<b style=\"color:#ea5c38\">" + lotterys[i].b7jmsht + "</b></dl></td>" +
                    // "<td><p><strong>" + tmds + "</strong></p></td>" +
                    // "<td><p><strong style=\" color:#F00\">" + tmdx + "</strong></p></td>" +
                    // "<td> <strong>" + zhds + "</strong>" +
                    // "  (" + zh + ") </td>" +
                    // "<td><p><strong>" + zhdx + "</strong></p></td>" +
                    "</tr>";


                sumitem += item;


            }


            $("#listcontent").empty();
            $("#listcontent").html(sumitem);
        }

    });


}






function loadLotteryData2() {
    if (isyear == 0) {
        isyear = $("#yearcheck").val();
    } else {
        if (isyear != $("#yearcheck").val()) {
            isfalg = true;
        }
    }
    $.ajax({
        url: host + "api/queryBeforeLotteryResultDetails.do",
        type: "post",
        data: { year: $("#yearcheck").val() },
        success: function (data) {
            var lotterys = data.data;

            var sumitem = "";
            for (var i = 0; i < lotterys.length; i++) {
                var tmds = lotterys[i].b7code % 2 == 0 ? "双" : "单";
                var tmdx = lotterys[i].b7code < 25 ? "小" : "大";
                var zh = lotterys[i].b1code + lotterys[i].b2code + lotterys[i].b3code + lotterys[i].b4code + lotterys[i].b5code + lotterys[i].b6code + lotterys[i].b7code;
                var zhds = zh % 2 == 0 ? "双" : "单";
                var zhdx = Math.floor(zh / 7) < 25 ? "小" : "大";
                lotterys[i] = replacecode(lotterys[i]);
                var item = "<tr>" +
                    "<td>第<strong style=\"color:#ea5c38\">" + lotterys[i].codeid + "</strong>期 <br>" + lotterys[i].timer + " </td>" +
                    "<td class=\"pl_17\"> <div style='justify-content: space-around;display: flex;'>" +
                    "  <dl data-text=\"" + lotterys[i].b1shengxiao + "\" class=\"data\"><span class=\"" + lotterys[i].b1color + "\">" + lotterys[i].b1code + "</span><br/>" +
                    "  <b>" + lotterys[i].b1shengxiao + "</b>" +
                    "  <b style=\"color:#ea5c38\">" + lotterys[i].b1jmsht + "</b>" +
                    "  </dl>" +
                    "<dl data-text=\"" + lotterys[i].b2shengxiao + "\" class=\"data\"><span class=\"" + lotterys[i].b2color + "\">" + lotterys[i].b2code + "</span><br/><b>" + lotterys[i].b2shengxiao + "</b>" +
                    " <b style=\"color:#ea5c38\">" + lotterys[i].b2jmsht + "</b>" +
                    " </dl>" +
                    "   <dl data-text=\"" + lotterys[i].b3shengxiao + "\" class=\"data\"><span class=\"" + lotterys[i].b3color + "\">" + lotterys[i].b3code + "</span><br/><b>" + lotterys[i].b3shengxiao + "</b>" +
                    "    <b style=\"color:#ea5c38\">" + lotterys[i].b3jmsht + "</b></dl>" +
                    "  <dl data-text=\"" + lotterys[i].b4shengxiao + "\" class=\"data\"><span class=\"" + lotterys[i].b4color + "\">" + lotterys[i].b4code + "</span><br/><b>" + lotterys[i].b4shengxiao + "</b>" +
                    "   <b style=\"color:#ea5c38\">" + lotterys[i].b4jmsht + "</b></dl>" +
                    "  <dl data-text=\"" + lotterys[i].b5shengxiao + "\" class=\"data\"><span class=\"" + lotterys[i].b5color + "\">" + lotterys[i].b5code + "</span><br/><b>" + lotterys[i].b5shengxiao + "</b>" +
                    "   <b style=\"color:#ea5c38\">" + lotterys[i].b5jmsht + "</b></dl>" +
                    "  <dl data-text=\"" + lotterys[i].b6shengxiao + "\" class=\"data\"><span class=\"" + lotterys[i].b6color + "\">" + lotterys[i].b6code + "</span><br/><b>" + lotterys[i].b6shengxiao + "</b>" +
                    "   <b style=\"color:#ea5c38\">" + lotterys[i].b6jmsht + "</b></dl></div></td>" +
                    "<td class=\"numbre\"><dl data-text=\"" + lotterys[i].b7shengxiao + "\" class=\"data\"><span class=\"" + lotterys[i].b7color + "\">" + lotterys[i].b7code + "</span><b>" + lotterys[i].b7shengxiao + "</b>" +
                    "<b style=\"color:#ea5c38\">" + lotterys[i].b7jmsht + "</b></dl></td>" +
                    "<td><p><strong>" + tmds + "</strong></p></td>" +
                    "<td><p><strong style=\" color:#F00\">" + tmdx + "</strong></p></td>" +
                    "<td> <strong>" + zhds + "</strong>" +
                    "  (" + zh + ") </td>" +
                    "<td><p><strong>" + zhdx + "</strong></p></td>" +
                    "</tr>";


                sumitem += item;


            }


            $("#listcontent").empty();
            $("#listcontent").html(sumitem);
        }

    });


}


function initItem(color, code, shengxiao, jmsht) {
    if (color == "red") {
        color = "#FF4d00";
    } else if (color == "green") {
        color = "#006400";
    } else if (color == "blue") {
        color = "#00a8f5";
    }
    var item =
        "                    <div style=\"margin:3px;display: inline-block;width: 44px;height: 44px;background-color: " + color + ";color: #FFFFFF\">\n" +
        "                        <span style=\"display: inline-block;width: 40px;height: 20px;\">" + code + "</span>\n" +
        "                        <span style=\"display: inline-block;width: 20px;height: 20px;\">" + shengxiao + " </span>\n" +
        "                        <span style=\"display: inline-block;width: 20px;height: 20px;float: left\">" + jmsht + "</span>\n" +
        "                    </div>\n";
    return item;
}








