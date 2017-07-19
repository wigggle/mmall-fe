/**
 * Created by mshuang on 2017/7/2.
 */
require('./index.css');
require('page/common/nav-simple/index.js');
var _user = require('service/user-service.js');
var _mm = require('util/mm.js');

//表单里的错误提示
var formError = {
    show : function(errMsg){
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide : function(){
        $('.error-item').hide().find('.err-msg').text('');
    }
}

//建立一个对象处理page逻辑部分
var page = {
    init: function () {
        this.bindEvent();
    },
    bindEvent: function () {
        var _this = this;
        //登录按钮的点击
        $('#submit').click(function () {
            _this.submit();
        });
        //如果按回车键，也可以提交
        $('.user-content').keyup(function (e) {
            if (e.keyCode === 13) {
                _this.submit();
            }
        });
    },
    //提交表单
    submit: function () {
        //定义变量拿出用户名和密码
        var formData = {
                username: $.trim($('#username').val()),
                password: $.trim($('#password').val())
            },
            //validateResult是表单验证结果（成功或者失败）
            validateResult = this.formValidate(formData);
        //验证成功
        if (validateResult.status) {
            _user.login(formData, function (res) {
                window.location.href = _mm.getUrlParam('redirect') || './index.html';
            }, function (errMsg) {
                formError.show(errMsg);
            });
        }
        //验证失败
        else {
            //错误提示
            formError.show(validateResult.msg);
        }
    },
    //表单字段的验证（传入数据）
    formValidate: function (formData) {
        var result = {
            status: false,
            msg: ''
        };
        //用户名和密码不为空就可以
        if (!_mm.validate(formData.username, 'require')) {
            result.msg = '用户名不能为空';
            return result;
        }
        if (!_mm.validate(formData.password, 'require')) {
            result.msg = '密码不能为空';
            return result;
        }
        //通过验证 返回正确的提示
        result.status = true;
        result.msg = '验证通过';
        return result;
    }
}

$(function(){
    page.init();
});