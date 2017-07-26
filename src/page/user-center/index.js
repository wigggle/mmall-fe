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
var templateIndex = require('./index.string')

//建立一个对象处理page逻辑部分
var page = {
    init: function () {
        this.onLoad();
    },
    onLoad: function(){
        //初始化左侧菜单
        navSide.init({
            name:'user'
        })

        this.loadUserInfo();
    },
    //加载用户信息
    loadUserInfo : function () {
        _user.getUserInfo(function(res){
            var userHtml = _mm.renderHtml(templateIndex,res);
            $('.panel-body').html(userHtml);
        },function(errMsg){
            _mm.errorTips(errMsg);
        });
    }
}
$(function(){
    page.init();
});