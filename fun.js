function vpost(urls,datas){
    var back;
    $.ajax({
        url : urls,
        type : "POST",
        data : datas,
        async:false,
        dataType: "json",
        success : function(result) {
            back = result;
        },
        error:function(msg){
            var jsonData = "{msg:'-1'}";
            back = JSON.stringify(jsonData);
        }
    })
    return back;
}

function vget(urls){
    var back;
    $.ajax({
        url : urls,
        type : "GET",
        async:false,
        dataType: "json",
        success : function(result) {
            back = result;
        },
        error:function(msg){
            var jsonData = "{msg:'-1'}";
            back = JSON.stringify(jsonData);
        }
    })
    return back;
}

function malert(title,content,re) {
    var dialog = new auiDialog();
    dialog.alert({
        title:title,
        msg:content,
        buttons:['确定']
    },function(ret){
        if (re==1){
            window.location.href = window.location.href;
        }
    })
}

function showtoast(msg,url){
    var toast = new auiToast({
    })
     toast.custom({
        title:msg,
        duration:2000,
        html:'<i class="aui-iconfont aui-icon-info"></i>'
    });
    if (url!=''){
        setTimeout(function(){
            window.location.href = url;
        }, 2500);
    }
}

function mdel(url){
    var dialog = new auiDialog();
    dialog.alert({
        title:"删除内容",
        msg:'确定要删除这条内容吗？',
        buttons:['确定','取消']
    },function(ret){
        if (ret.buttonIndex==1){
            vget(url);
            window.location.href = window.location.href;
        }
    })
}

var countdown = 60;
function sendmsg(obj,username) {
    if (countdown == 0) {
        obj.removeAttribute("disabled");
        obj.innerHTML = "发送验证码";
        countdown = 60;
        return;
    } else {
        if (countdown==60){
            var phone = $("#"+username).val();
            if (phone==""){
                malert("提示：","请输入手机号");
                return;
            }
            var back = vget("?c=api&a=sendmsg&phone="+phone);
            if (back.msg==2){
                malert("提示：","您今天发送过多，请明天再试");
                return;
            }
            if (back.msg==3){
                malert("提示：","手机号未注册，请先注册");
                return;
            }
        }
        obj.setAttribute("disabled", true);
        obj.innerHTML = "" + countdown + "秒后发送";

        countdown--;
    }
    setTimeout(function () {
        sendmsg(obj)
    }, 1000)
}

function upstate(state){
    if (state==0){
        showDefault("hide");
    }else{
        showDefault("loadings");
    }
}

function showDefault(type){
    var toast = new auiToast({
    })
    switch (type) {
        case "hide":
            toast.hide();
            break;
        case "success":
            toast.success({
                title:"提交成功",
                duration:2000
            });
            break;
        case "fail":
            toast.fail({
                title:"提交失败",
                duration:2000
            });
            break;
        case "custom":
            toast.custom({
                title:"提交成功",
                html:'<i class="aui-iconfont aui-icon-laud"></i>',
                duration:2000
            });
            break;
        case "loading":
            toast.loading({
                title:"加载中",
                duration:2000
            },function(ret){
                setTimeout(function(){
                    toast.hide();
                }, 3000)
            });
            break;
        case "loadings":
            toast.loading({
                title:"处理中",
                duration:2000
            },function(ret){
                
            });
            break;
        default:
            // statements_def
            break;
    }
}

function linkage(typeaid,typebid,typeaid_val,typebid_val){
    $("#typeaid").append($("<option>").html("请选择"));  
    $("#typebid").append($("<option>").html("请选择"));  
    for(var i=0;i<typeaid.length;i++){ 
        if (typeaid[i]==typeaid_val){
          $("#typeaid").append($("<option selected></option>").attr("data-id",i+1).val(typeaid[i]).html(typeaid[i]));  
        }else{
          $("#typeaid").append($("<option></option>").attr("data-id",i+1).val(typeaid[i]).html(typeaid[i]));  
        } 
    }
    if (typebid_val){
         $("#typebid").append($("<option selected>").val(typebid_val).html(typebid_val));  
    }
    //为省份下拉列表绑定change事件  
    $("#typeaid").change(function(){

        if ($(this).val()=="请选择"){
          $("#typebid").prop("length",1);
          return false;
        }
        var index=$("#typeaid option:selected").attr("data-id")-1;
        $("#typebid").prop("length",1);
        for(var i=0;i<typebid[index].length;i++){
            $("#typebid").append($("<option>").val(typebid[index][i]).html(typebid[index][i]));    
        }  
    });  
}