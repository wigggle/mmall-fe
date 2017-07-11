/**
 * Created by mshuang on 2017/7/11.
 */
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
    data : {
        username : '',
        question : '',
        answer : '',
        token : ''
    },
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        this.loadStepUsername();
    },
    bindEvent: function () {
        var _this = this;
        //输入用户名后下一步按钮的点击
        $('#submit-username').click(function () {
            var username = $.trim($('#username').val());
            //用户名存在
            if(username){
                _user.getQuestion(username,function(res){
                    _this.data.username = username;
                    _this.data.question = res;
                    _this.loadStepQuestion();
                },function(errMsg){
                    formError.show(errMsg);
                });
            }
            //用户名不存在
            else{
                formError.show('请输入用户名');
            }
        });

        //输入密码提示问题后的答案的按钮点击
        $('#submit-question').click(function () {
            var answer = $.trim($('#answer').val());
            //用户名存在
            if(answer){
                //检查密码提示问题答案
                _user.checkAnswer({
                    username : _this.data.username,
                    question : _this.data.question,
                    answer : answer
                },function (res){
                    _this.data.answer = answer;
                    _this.data.token = res;
                    _this.loadStepPassword();
                },function(errMsg){
                    formError.show(errMsg);
                });
            }
            //如果答案不存在
            else{
                formError.show('请输入密码提示问题的答案');
            }
        });

        //输入新密码后的按钮点击
        $('#submit-password').click(function () {
            var password = $.trim($('#password').val());
            //判断密码不为空
            if(password && password.length>=6){
                //检查密码提示问题答案
                _user.resetPassword({
                    username : _this.data.username,
                    passwordNew : password,
                    forgetToken : _this.data.token
                },function (res){
                    window.location.href = './result.html?type=pass-reset';
                },function(errMsg){
                    formError.show(errMsg);
                });
            }
            //如果密码为空
            else{
                formError.show('请输入不少于新密码');
            }
        });

    },
    //加载输入用户名的一步
    loadStepUsername : function () {
        $('.step-username').show();
    },

    //加载输入提示问题的一步
    loadStepQuestion : function () {
        //清楚错误提示
        formError.hide();
        //容器的切换
        $('.step-username').hide().siblings('.step-question').show()
            .find('.question').text(this.data.question);
    },
    //加载输入新密码的一步
    loadStepPassword : function () {
        //清楚错误提示
        formError.hide();
        //容器的切换
        $('.step-question').hide().siblings('.step-password').show();
    }
};

$(function(){
    page.init();
});