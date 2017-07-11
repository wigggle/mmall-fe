/**
 * Created by mshuang on 2017/7/11.
 */

'use strict';
require('page/common/nav/index.js');
require('./index.css');
require('page/common/header/index.js');

var _user = require('service/user-service.js');
var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');

//建立一个对象处理page逻辑部分
var page = {
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function(){
        //初始化左侧菜单
        navSide.init({
            name:'user-center'
        })
        this.loadUserInfo();
    },
    bindEvent : function(){
        var _this = this;
        //点击提交按钮后的动作
        $(document).on('click','.btn-submit',function(){
            var userInfo = {
                    phone    : $.trim($('#phone').val()),
                    email    : $.trim($('#email').val()),
                    question : $.trim($('#question').val()),
                    answer   : $.trim($('#answer').val())
                },
                validateResult = _this.validateForm(userInfo);
            if(validateResult.status){
                //更改用户信息
                _user.updateUserInfo(userInfo, function(res,msg){
                    _mm.successTips(msg);
                    window.location.href = './user-center.html'
                },function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }else{
                _mm.errorTips(validateResult.msg);
            }
        });
    },
    //加载用户信息
    loadUserInfo: function(){
        var userHtml = '';
        _user.getUserInfo(function(res){
            $('.panel-body').html(userHtml);
        },function(errMsg){
            _mm.errorTips(errMsg);
        });
    },
    //验证字段信息
    validateForm : function (formData) {
        var result = {
            status: false,
            msg: ''
        };
        //验证手机号
        if (!_mm.validate(formData.phone,'require')) {
            result.msg = '手机号码格式不正确';
            return result;
        }
        //验证邮箱
        if (!_mm.validate(formData.email,'require')) {
            result.msg = '邮箱格式不正确';
            return result;
        }
        //验证密码提示问题是否为空
        if (!_mm.validate(formData.question,'require')) {
            result.msg = '密码提示问题不能为空';
            return result;
        }
        //验证密码提示问题的答案是否为空
        if (!_mm.validate(formData.answer,'require')) {
            result.msg = '密码提示问题的答案不能为空';
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