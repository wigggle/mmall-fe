'use strict';
var Hogan = require('hogan');
var conf = {
    serverHost: ''
};

var _mm = {
    request : function(param) {
        var _this = this;
        $.ajax({
            type: param.method || 'get',
            url: param.url || '',
            dataType: param.type || 'json',
            data: param.data || '',
            success: function (res) {
                //����ɹ�
                if (0 === res.status) {
                    typeof param.success === 'function' && param.success(res.data, res.msg)
                }
                //û�е�¼״̬����Ҫǿ�Ƶ�¼
                else if (10 === res.status) {
                    _this.doLogin();
                }
                //�������ݴ���
                else if(1 === res.status){
                    typeof param.error === 'function' && param.success(res.msg)
                }
            },
            //����ʧ�� 404 503
            error: function (err) {
                typeof param.error === 'function' && param.success(err.statusText)
            }
        });
    },
    //��ȡ��������ַ
    getServerUrl : function(path){
        return conf.serverHost + path;
    },
    //��ȡurl����
    getUrlParam: function(name){
        //happymmall.com/product/list?keyword=xxx&&page=1 ��������ʽ����
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
    //��Ⱦhtmlģ��
    renderHtml : function(htmlTemplate,data){
        //�Ѵ����ģ�������ƴ������
        var template = Hogan.compile(htmlTemplate),//����
               result = template.render(data);
        return result;
    },
    //�ɹ���ʾ
    successTips : function(msg){
        alert(msg || '�����ɹ�');
    },
    //������ʾ
    errorTips : function(msg){
        alert(msg || '���ﲻ����~');
    },
    //�ֶε���֤��֧�ַǿ��жϡ��ֻ�������
    validate : function(value, type){
        var value = $.trim(value);//ȥ�ո����ַ���
        //�ǿ���֤
        if('require' === type){ //�����������ֵ��
            return !!value; //��valueǿת��bool
        }
        //�ֻ�����֤
        if('phone' === type){
            return /^1\d{10}$/.test(value);
        }
        //�����ʽ��֤
        if('email' === type){
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }

    },
    //ͳһ��¼����
    doLogin: function(){
            window.location.href = './login.html?redirect='+ encodeURIComponent(window.location.href);
    },
    //������ҳ
    goHome : function () {
        window.location.href = './index.string';
    }
};
module.exports = _mm;