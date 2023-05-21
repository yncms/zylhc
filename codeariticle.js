
let host = ''
function fileupload() {
    var filename;
    var photo = document.getElementById("uploadfile").value;
    if ("" == photo) {
        alert("请选择上传图片");
        return false;
    } else if (!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(photo)) {
        alert("图片类型必须是.gif,jpeg,jpg,png中的一种");
        return false;
    } else {
        var form = new FormData(document.getElementById("addAriticleForm"));
        $("#submitButton").hide();

        $.ajax({
            type: "POST",
            url: "../api/uploadfile.do",
            data: form,// 序列化表单值
            processData: false,
            contentType: false,
            async: false,
            error: function (request) {
                alert("上传文件失败 ");
                window.location.reload();
            },
            success: function (data) {

                filename = data.data;
            }
        });

    }
    return filename;

}


function uploadPic(file) {

    var filepath = file.value;
    var name = filepath.substring(filepath.lastIndexOf("/"));
    if (confirm("您确定要上传" + name + "这张图片吗")) {
        if (!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(filepath)) {
            alert("图片类型必须是.gif,jpeg,jpg,png中的一种");
            return false;
        }
        $("#loaddingpic").attr("src", "images/load.gif");
        $("#loaddingpic").css("display", "block-inline");
        var uploadpath = fileupload();
        $("#loaddingpic").attr("src", "images/ok.jpg");
        $("#picinfo").html(name);
        $("#pic").val(uploadpath);
    }
}






function addCodeAriticle(editor) {

    if ($("#title").val() == null || $("#title").val() == '') {
        alert("请输入标题");
        return;
    }

    $.ajax({
        url: "../api/addCodeAriticle.do",
        type: "POST",
        data: {
            title: $("#title").val(),
            pic: $("#pic").val(),
            content: editor.html()
        },
        success: function (data) {
            alert(data.msg);
            location.href = "ariticlelist.html";
        }
    });
}
let send = true;//定义是否发送请求标记


function loadLastAriticle(page) {
    if(send){
        $.ajax({
            url: host + `api/queryCodeAriticle.do?index=${page}`,
            type: "POST",
            data: {
            },
            success: function (data) {
                send = data.result;
                if (data.data.length > 0) {
                    var list = data.data;
                    var sumitem = "";
                    for (var i = 0; i < list.length; i++) {
                        var item = "      <li style='flex:0 0 50%'>\n" +
                            "        <h6 style='text-align:center'>" + data.data[i].title + "</h6><a href=\"temafenxi.html?id=" + data.data[i].id + "\">" +
                            "<img src=\"" + host + data.data[i].pic + "\" alt=\"" + data.data[i].title + "\"></a>\n" +
                            "      </li>\n";
                        sumitem += item;
                    }
                    if (page == 1) {
                        $("#articleUl").empty();
                    }
                    $("#articleUl").append(sumitem);

                }
            }
        });
    }

}

function loadAriticle(page) {
    $.ajax({
        url: host + "api/queryCodeAriticle.do?index=" + page,
        type: "POST",
        data: {
        },
        success: function (data) {
            var list = data.data;

            send = data.result;

            var sumitem = "";
            for (var i = 0; i < list.length; i++) {

                var content = data.data[i].content;
                content = content.length < 30 ? content : content.substring(0, 30) + "<br>......";

                var item = "<dl class=\"clearfix\"> \n" +
                    "       <dt>\n" +
                    "        <a href=\"newsdetails.html?id=" + data.data[i].id + "\">" +
                    "<img src=\"" + host + data.data[i].pic + "\" alt=\"" + data.data[i].title + "\"></a>\n" +
                    "       </dt> \n" +
                    "       <dd> \n" +
                    "        <div class=\"title\">\n" +
                    "         <a href=\"news.html?id=" + data.data[i].id + "\">" + data.data[i].title + "</a>\n" +
                    "        </div> \n" +
                    "        <div class=\"des\">\n" +
                    content + "        </div> \n" +
                    "        <a href=\"newsdetails.html?id=" + data.data[i].id + "\" class=\"more\">MORE<i>&nbsp;</i></a> \n" +
                    "       </dd> \n" +
                    "      </dl> ";
                sumitem += item;
            }

            $("#articleDiv").append(sumitem);
        }
    });
}


function loadAriticleByOne() {
    var id = location.href;
    if (id.indexOf("=") > 0) {
        id = id.substring(id.lastIndexOf("=") + 1);
        $.ajax({
            url: "../api/loadCodeAriticleByid.do",
            type: "POST",
            data: {
                id: id
            },
            success: function (data) {
                if (data.result) {
                    $("#aid").val(data.data.id);
                    $("#pic").val(data.data.pic);
                    $("#title").val(data.data.title);
                    window.editor.html(data.data.content);

                } else {
                    location.href = "ariticlelist.html";
                }

            }
        });
    } else {
        alert("错误！");
        location.href = "index.html";
    }
}


function editCodeAriticle(editor) {

    if (confirm("您确定要修改这条记录吗？")) {
        $.ajax({
            url: "../api/editCodeAriticle.do",
            type: "POST",
            data: {
                id: $("#aid").val(),
                title: $("#title").val(),
                pic: $("#pic").val(),
                content: editor.html()
            },
            success: function (data) {
                alert(data.msg);
                location.href = "ariticlelist.html";
            }
        });
    }

}


function deleteCodeAriticle(id) {

    if (confirm("您确定要删除这条记录吗？")) {
        $.ajax({
            url: "../api/deleteCodeAriticle.do",
            type: "post",
            data: { id: id },
            success: function (data) {
                alert(data.msg);
                loadCodeAriticle();
            }
        });
    }



}

