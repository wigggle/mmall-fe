/**
 * Created by mshuang on 2017/7/14.
 */
'use strict';
require('./index.css');
var _mm = require('util/mm.js');
var templatePagination = require('./index.string');

var Pagination = function(){
    var _this = this;
    //给一些默认属性
    this.defaultOption = {
        container : null,
        pageNum : 1,
        pageRange : 3,
        //选中页面
        onSelectPage : null
    };
    //事件的处理
    $(document).on('click','.pg-item',function(){
        var $this = $(this);
        //对于active 和 disabled按钮点击不作处理
        if($this.hasClass('active')||$this.hasClass('disabled')){
            return;
        }
        typeof  _this.option.onSelectPage === 'function'?
            _this.option.onSelectPage($this.data('value')):null;
    });
};

//渲染分页组件 原型继承的方法
Pagination.prototype.render = function(userOption){
    //合并选项defaultOption 和userOption 前面加一个{} 表示对一个空对象进行添加 不会影响后两个的内容
    this.option = $.extend({},this.defaultOption,userOption);
    //判断容器是否为合法的jquery对象
    if(!(this.option.container instanceof jQuery)){
        return;
    }
    //判断是否只有1页 如果只有1页 就不用渲染了
    if(!this.option.pages <= 1){
        return;
    }
    //渲染分页内容
    this.option.container.html(this.getPaginationHtml());
};
//获取分页的html |上一页| 1 2 3 4 =5= 6 7 8 |下一页| 5/9
Pagination.prototype.getPaginationHtml = function(){
    //分页计算
    var html = '',
        option = this.option,
        pageArray = [],
        //通过显示的range范围计算显示的开始页码数和结束页码数
        start = option.pageNum - option.pageRange > 0 ?
            (option.pageNum - option.pageRange) : 1,
        end = option.pageNum + option.pageRange < option.pages ?
            option.pageNum + option.pageRange : option.pages;
    //上一页按钮的数据
    pageArray.push({
        name : '上一页',
        //返回的页码值
        value : this.option.prePage,
        //上一页按钮是不是可用 布尔型
        disabled : !this.option.hasPreviousPage
    });
    //数字按钮的处理
    for(var i=start; i<=end ; i++){
        pageArray.push({
            name : i,
            value : i,
            //相等就认为是当前显示页
            active : (i === option.pageNum),
        })
    }
    //下一页按钮的数据
    pageArray.push({
        name: '下一页',
        value: this.option.nextPage,
        disabled: !this.option.hasNextPage
    });

    html = _mm.renderHtml(templatePagination,{
        pageArray : pageArray,
        pageNum : option.pageNum,
        pages : option.pages
    });
    return html;
};

module.exports = Pagination;