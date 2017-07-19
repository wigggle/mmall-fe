/**
 * Created by mshuang on 2017/7/5.
 */
'use strict';
require('./index.css');

var _mm   = require('util/mm.js');

//通用页面头部
var header = {
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        var keyword = _mm.getUrlParam('keyword');
        if(keyword){
            //keyword存在，则回填输入框
            $('#search-input').val(keyword);
        };
    },
    bindEvent: function(){
        var _this = this;
        //点击搜索按钮之后 执行搜索提交方法
        $('#search-btn').click(function(){
            _this.searchSubmit();
        });
        //键盘回车后也是搜索提交
        $('#search-input').keyup(function(e){
            //13的keycode是回车
            if(e.keyCode === 13){
                _this.searchSubmit();
            }
        })
    },
    //搜索的提交
    searchSubmit : function(){
        var keyword = $.trim($('#search-input').val());
        //如果提交的时候有keyword,正常跳转到list页 如果为空 直接返回首页
        if(keyword){
            window.location.href = './list.html?keyword='+keyword;
        }else{
            _mm.goHome();
        }
    }
};
header.init();
