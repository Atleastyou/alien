/*!
 * Pagination.js
 * @author ydr.me
 * @create 2014-10-09 18:36
 */


define(function (require, exports, module) {
    /**
     * @module util/Pagination
     */
    'use strict';

    var data = require('./../util/data.js');
    var klass = require('./../util/class.js');
    var defaults = {
        count: 1,
        page: 1,
        size: 3
    };
    var Pagination = klass.create({
        STATIC: {
            defaults: defaults
        },
        constructor: function (options) {
            this._options = data.extend(!0, {}, defaults, options);
        },
        init: function () {
            var the = this;
            var options = the._options;
            var list = [];
            var i;
            var j;
            var offset;
            var remainLeft = 0;
            var remainRight = 0;

            options.count = Math.abs(data.parseInt(options.count, 1));
            options.page = Math.abs(data.parseInt(options.page, 1));
            options.page = options.page > options.count ? options.count : options.page;
            options.size = Math.abs(data.parseInt(options.size, 3));
            options.size += options.size % 2 ? 0 : 1;
            offset = Math.floor(options.size / 2);

            // 小于可视范围
            if (options.count <= options.size) {
                for (i = 1; i <= options.count; i++) {
                    list.push({
                        page: i,
                        active: i === options.page
                    });
                }
            }
            // 大于可视范围
            else {
                if (options.page > 1) {
                    list.push({
                        type: 'prev',
                        page: options.page - 1
                    });
                }

                // 先判断剩余在哪边
                i = options.page - offset;
                j = options.page + offset;


                // 剩左边
                if (i < 1) {
                    remainLeft = -i + 1;
                    i = 1;
                }
                // 剩右边
                else if (j > options.count) {
                    remainRight = j - options.count;
                    i -= remainRight;
                    if (i < 1) {
                        i = 1;
                    }
                }

                // 首页
                if (i !== 1) {
                    list.push({
                        page: 1
                    });
                }

                if(i > 2){
                    list.push({
                        type: 'ellipsis'
                    });
                }

                // 当前之前
                for (; i < options.page; i++) {
                    list.push({
                        page: i
                    });
                }

                // 当前
                list.push({
                    page: options.page,
                    active: !0
                });

                // 当前之后
                i = options.page + 1;
                j = i + offset + remainLeft;

                if (j > options.count) {
                    j = options.count;
                }

                for (; i < j; i++) {
                    list.push({
                        page: i
                    });
                }

                if(i < options.count){
                    list.push({
                        type: 'ellipsis'
                    });
                }

                // 尾页
                if (i <= options.count) {
                    list.push({
                        page: options.count
                    });
                }

                if (options.page < options.count) {
                    list.push({
                        type: 'next',
                        page: options.page + 1
                    });
                }
            }

            return list;
        }
    });

    module.exports = Pagination;
});