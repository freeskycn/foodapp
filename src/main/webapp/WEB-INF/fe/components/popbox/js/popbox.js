/**
 * 改写默认的alert confirm
 */
require('../style/popbox.less');
var tpl = require('../tpl/popbox.ejs');
var touch = require('../../../bower_components/touch/touch.js');
require('../../../bower_components/velocity/velocity.js');

window.alert = function (msg) {
    var alertbox = $('.spa-popbox.alert');
    if (alertbox.length == 0) {
        // 页面不存在弹出框的时候，往页面添加
        $(document.body).append(tpl({poptype: 'alert', msg: msg}));
        alertbox = $('.spa-popbox.alert');

        touch.on(alertbox.find('.submit'), 'tap', function (ev) {
            ev.stopPropagation();
            close(alertbox,function() {alertbox.hide()});
        });
        touch.on(alertbox, 'tap', function (ev) {
            close(alertbox,function() {$(this).hide()});
        });
    } else {
        alertbox.find('.msg').text(msg);
    }
    //open(alertbox);
    alertbox.show();
};



window.confirm = function (msg, callback) {
    var confirmbox = $('.spa-popbox.confirm');

    if (confirmbox.length == 0) {
        $(document.body).append(tpl({poptype: 'confirm', msg: msg}));
        confirmbox = $('.spa-popbox.confirm');

        touch.on(confirmbox.find('.submit'), 'tap', function (ev) {
            ev.stopPropagation();
            close(confirmbox,function() {confirmbox.hide(),callback(true)});
        });

        touch.on(confirmbox.find('.cancel'), 'tap', function (ev) {
            ev.stopPropagation();
            close(confirmbox,function() {confirmbox.hide(),callback(false)});
        });
        touch.on(confirmbox, 'tap', function (ev) {
            close(confirmbox,function() {confirmbox.hide(),callback(false)});
        });
    } else {
        confirmbox.find('.msg').text(msg);
    }
    //confirmbox.show();


};

function open(container, callback) {
    container.velocity({opacity:0.5,display:'block'},300,callback);
}

function close(container,callback) {
    container.velocity({opacity:0,display:'none'},300,callback);
}
