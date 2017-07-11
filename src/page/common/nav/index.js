/**
 * Created by mshuang on 2017/7/5.
 */
'use strict';
require('./index.css');
var _mm   = require('util/mm.js');
var _user = require('service/user-service.js');
var _cart = require('service/cart-service.js');

//导航
var nav = {
    init: function(){
        this.bindEvent();
        this.loadUserInfo();
        this.loadCartCount();
        return this;
    },
    bindEvent : function(){
        //绑定点击登录事件
        $('.js-user-login').click(function(){
            _mm.doLogin();
        });
        //绑定点击注册时间
        $('.js-register').click(function(){
            window.location.href = './user-register.html';
        });
        //绑定点击退出时间
        $('js-logout').click(function() {
            _user.logout(function(res){
                window.location.reload();
            }, function (errMsg) {
                _mm.errorTips(errMsg);
            });
        });
    },
    //加载用户信息
    loadUserInfo : function(){
        _user.checkLogin(function(res){
            $('.user.not-login').hide().siblings('.user.login').show()
                .find('.username').text(res.username);
        }, function(errMsg){
            //do nothing
        });
    },
    //加载购物车数量
    loadCartCount: function(){
        _cart.getCartCount(function(res){
            $('.nav .cart-count').text(res || 0);
        }, function(errMsg){
            $('.nav .cart-count').text(0);
        });
    }
};

module.exports = nav.init();