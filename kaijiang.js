

let kjData = {}
let iTime = 30000 //毫秒 间隔时间
let noticedate = '' //開獎时间
let overTime = ''  //開獎动画完成

function loaddata(year) {
    $("#kaijiangDiv").empty();
    $.ajax({
        url: host + "api/queryLastResult.do",
        type: "post",
        data: { year: year },
        success: function (data) {
            var sumitem = "";
            $.ajax({
                url: host + "api/loadNoticeDate.do",
                type: "post",
                success: function (data) {
                    noticedate = data.data;

                },
                async: false
            });

            kjData = data
            var tdate = data.data[0].timer.indexOf(" ") > 0
                ? data.data[0].timer.substring(0, data.data[0].timer.indexOf(" "))
                : data.data[0].timer;

            let time = tdate + ' ' + data.data[0].timer2
            let obj = countTime(time)
            if (obj.type == 1) {
                $('#countTime').show()
                $('#kaijiangDiv').hide()
                loadData(data, false)
            } else if (obj.type == 2) {
                $('#countTime').show()
                $('#kaijiangDiv').hide()
                loadData(data, true, obj.time)
            } else if (obj.type == 3) {
                $('#countTime').show()
                $('#kaijiangDiv').hide()
                countDown(obj.time)
            }


        }

    });


}



function loadmaxyear() {
    var year;
    $.ajax({
        url: host + "api/queryLotteryResultLastYear.do",
        type: "post",
        data: { year: year },
        success: function (data) {
            year = data.data;
        },
        async: false

    });
    return year;

}

function loadData(data, flag, time) {
    $('#countTime').hide()
    $('#kaijiangDiv').show()
    //间隔时间
    let intervalTime = 0
    let intervalTime2 = 0
    let intervalTime3 = 0
    let intervalTime4 = 0
    let intervalTime5 = 0
    let intervalTime6 = 0
    let intervalTime7 = 0

    if (flag) {
        intervalTime = iTime - time > 0 ? iTime - time : 0
        intervalTime2 = iTime * 2 - time > 0 ? iTime * 2 - time : 0
        intervalTime3 = iTime * 3 - time > 0 ? iTime * 3 - time : 0
        intervalTime4 = iTime * 4 - time > 0 ? iTime * 4 - time : 0
        intervalTime5 = iTime * 5 - time > 0 ? iTime * 5 - time : 0
        intervalTime6 = iTime * 6 - time > 0 ? iTime * 6 - time : 0
        intervalTime7 = iTime * 7 - time > 0 ? iTime * 7 - time : 0
    }
    console.log(data)
    if (data.data.length > 0) {
        data.data = replacecodelist(data.data);
        sumitem = "<div class=\"current\">\n" +
            "            <table width=\"100%\" border=\"0\" bordercolorlight=\"#000000\" bordercolordark=\"#FFFFFF\" bgcolor=\"#EFF7FE\"\n" +
            "              height=\"50\">\n" +
            "              <tbody>\n" +
            "                <tr>\n" +
            "                  <td colspan=\"2\" class=\"topkjgdcsleft\">\n" +
            "                    <div>第" + data.data[0].codeid + "期 開獎結果:</div>\n" +
            "                    <div class=\"topkjgdcsright\">\n" +
            "                      <marquee direction=\"left\" id='font-id'>\n" +
            "                      </marquee>\n" +
            "                    </div>\n" +
            "                  </td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                  <td>\n" +
            "                    <div class=\"kjbegohot\">\n" +
            "                      <table class=\"numbers\">\n" +
            "                        <tbody>\n" +
            "                          <tr id='tr-ball'>\n" +
            "                            <td><span id='scoll_number' class='red ball'> " + 1 + "</span></td>\n" +
            "                            <td></td>\n" +
            "                            <td></td>\n" +
            "                            <td></td>\n" +
            "                            <td></td>\n" +
            "                            <td></td>\n" +
            "                            <td><span class=\"plus\"></span></td>\n" +
            "                            <td></td>\n" +
            "                          </tr>\n" +
            "                          <tr id='tr-sx'>\n" +
            "                            <td></td>\n" +
            "                            <td></td>\n" +
            "                            <td></td>\n" +
            "                            <td></td>\n" +
            "                            <td></td>\n" +
            "                            <td></td>\n" +
            "                            <td></td>\n" +
            "                            <td></td>\n" +
            "                          </tr>\n" +
            "                        </tbody>\n" +
            "                      </table>\n" +
            "                    </div>\n" +
            "                  </td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                  <td colspan=\"2\" height=\"29\">\n" +
            "                    <div align=\"center\">\n" +
            "                      <span style=\" color: #000; font-size: 12px;\"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;下一期" + data.data[0].year + "年 第" +
            "                        <font color=\"#FF0000\">" + (data.data[0].codeid + 1) + "</font>期ZY六合開獎時間:&nbsp;" + noticedate + "</span>\n" +
            "                    </div>\n" +
            "                  </td>\n" +
            "                </tr>\n" +
            "              </tbody>\n" +
            "            </table>\n" +
            "          </div>\n"
    }
    $("#kaijiangDiv").html(sumitem);
    let img = "<img src='images/loading.gif'>"
    img = scroll()
    setTimeout(function () {
        let html = "<font color=" + data.data[0].b1color + " style='font-size:18px;font-weight: bold;'>" + data.data[0].b1code + "</font>"
        $('#font-id').append(html)
        let html2 = "<span class='ball  " + data.data[0].b1color + "'>" + data.data[0].b1code + "</span>"
        $($('#tr-ball').find('td')[0]).html(html2)
        $($('#tr-ball').find('td')[1]).html(img)
        $($('#tr-sx').find('td')[0]).html(data.data[0].b1shengxiao)
    }, intervalTime)
    setTimeout(function () {
        let html = "<font color=" + data.data[0].b2color + " style='font-size:18px;font-weight: bold;'>-" + data.data[0].b2code + "</font>"
        $('#font-id').append(html)
        let html2 = "<span class='ball  " + data.data[0].b2color + "'>" + data.data[0].b2code + "</span>"
        $($('#tr-ball').find('td')[1]).html(html2)
        $($('#tr-ball').find('td')[2]).html(img)
        $($('#tr-sx').find('td')[1]).html(data.data[0].b2shengxiao)
    }, intervalTime2)
    setTimeout(function () {
        let html = "<font color=" + data.data[0].b3color + " style='font-size:18px;font-weight: bold;'>-" + data.data[0].b3code + "</font>"
        $('#font-id').append(html)
        let html2 = "<span class='ball  " + data.data[0].b3color + "'>" + data.data[0].b3code + "</span>"
        $($('#tr-ball').find('td')[2]).html(html2)
        $($('#tr-ball').find('td')[3]).html(img)
        $($('#tr-sx').find('td')[2]).html(data.data[0].b3shengxiao)
    }, intervalTime3)
    setTimeout(function () {
        let html = "<font color=" + data.data[0].b4color + " style='font-size:18px;font-weight: bold;'>-" + data.data[0].b4code + "</font>"
        $('#font-id').append(html)
        let html2 = "<span class='ball  " + data.data[0].b4color + "'>" + data.data[0].b4code + "</span>"
        $($('#tr-ball').find('td')[3]).html(html2)
        $($('#tr-ball').find('td')[4]).html(img)
        $($('#tr-sx').find('td')[3]).html(data.data[0].b4shengxiao)
    }, intervalTime4)
    setTimeout(function () {
        let html = "<font color=" + data.data[0].b5color + " style='font-size:18px;font-weight: bold;'>-" + data.data[0].b5code + "</font>"
        $('#font-id').append(html)
        let html2 = "<span class='ball  " + data.data[0].b5color + "'>" + data.data[0].b5code + "</span>"
        $($('#tr-ball').find('td')[4]).html(html2)
        $($('#tr-ball').find('td')[5]).html(img)
        $($('#tr-sx').find('td')[4]).html(data.data[0].b5shengxiao)
    }, intervalTime5)
    setTimeout(function () {
        let html = "<font color=" + data.data[0].b6color + " style='font-size:18px;font-weight: bold;'>-" + data.data[0].b6code + "</font>"
        $('#font-id').append(html)
        let html2 = "<span class='ball  " + data.data[0].b6color + "'>" + data.data[0].b6code + "</span>"
        $($('#tr-ball').find('td')[5]).html(html2)
        $($('#tr-ball').find('td')[7]).html(img)
        $($('#tr-sx').find('td')[5]).html(data.data[0].b6shengxiao)
    }, intervalTime6)
    setTimeout(function () {
        let html = "<font color=" + data.data[0].b7color + " style='font-size:18px;font-weight: bold;'>-" + data.data[0].b7code + "</font>"
        $('#font-id').append(html)
        let html2 = "<span class='ball  " + data.data[0].b7color + "'>" + data.data[0].b7code + "</span>"
        $($('#tr-ball').find('td')[7]).html(html2)
        $($('#tr-sx').find('td')[7]).html(data.data[0].b7shengxiao)
        clearInterval(overTime)
    }, intervalTime7)
}

// 计算时间差
function countTime(time) {
    let obj = {
        time: 0,
        type: 0 //1：直接显示 2：loading 3：倒计时
    }


    if (new Date(time).getDate() == new Date().getDate()) {
        // 同一天 
        let timeStart = new Date(time).getTime()
        let timeNow = new Date().getTime()
        if (timeNow >= timeStart) {
            //已開獎
            if ((timeNow - timeStart) > iTime * 7) {
                //3分钟后
                obj.type = 1
            } else {
                //3分钟内
                obj.type = 2
                obj.time = timeNow - timeStart
            }
        } else {
            //未開獎 进入倒计时
            obj.time = timeStart - timeNow
            obj.type = 3
        }
    } else {
        // 不然直接显示
        obj.type = 1
    }
    return obj
}

var timer = null;
//倒计时
function countDown(leftTime) {
    $('#countTime').show()
    $('#kaijiangDiv').hide()
    clearTimeout(timer);
    if (leftTime <= 1000) {
        leftTime = 0;
        loadData(kjData, true, 0)
    }
    var hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10); //计算剩余的小时 
    var minutes = parseInt(leftTime / 1000 / 60 % 60, 10);//计算剩余的分钟 
    var seconds = parseInt(leftTime / 1000 % 60, 10);//计算剩余的秒数 
    hours = paddingZero(hours);
    minutes = paddingZero(minutes);
    seconds = paddingZero(seconds);
    document.getElementById("countTime").innerHTML = `開獎倒计时 ${hours}:${minutes}:${seconds}`;
    leftTime = leftTime - 1000
    if (leftTime >= 0) {
        timer = setTimeout(`countDown('${leftTime}')`, 1000);
    }
}
function paddingZero(i) { //将0-9的数字前面加上0，例1变为01 
    return i < 10 ? "0" + i : i;
}
function scroll() {
    let scrollHtml = "<span id='scoll_number' class='red ball'> " + 1 + "</span>"
    let m = 0
    let numList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
    let colorClass = ['blue', 'red', 'green']
    overTime = setInterval(() => {
        console.log('hahahceshiu')
        let m = random(1, 49)
        let i = m % 3
        if (m < 10) {
            m = '0' + m
        }
        $('#scoll_number').html(m)
        $('#scoll_number').removeClass()
        $('#scoll_number').addClass(colorClass[i] + ' ball')
    }, 100)
    return scrollHtml
}
function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;

}



