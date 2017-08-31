import axios from "axios"
import TableComponet from "./TableComponet.vue";

let Table = {};
Table.install = function (Vue, option) {
    var options = {
        column: '',
        data: '',
        element: 'datagrid',
        sort: 'salePrice',
        orderby: "desc",
        page: 1,
        pageSize: 10
    };

    function _extend(opts, option) {
        if (option && typeof option === "object") {
            for (var key in option) {
                opts[key] = option[key];
            }
        }

        return opts;
    }

    options = _extend(options, option);
    //字段value特殊处理
    Vue.prototype.formatter = function (row, item) {
        if (typeof item.formatter === "function") {
            return item.formatter(row, row[item.field]);
        } else {
            return row[item.field];
        }
    }
    //checkbox全选功能
    Vue.prototype.checkedAll = function (type) {
        let element_all = document.getElementsByClassName("checkbox-input-all");
        let element_input = document.getElementsByClassName("checkbox-input");

        if (type == "all") {
            for (var i = 0; i < element_input.length; i++) {
                element_input[i].checked = element_all[0].checked;
            }
        } else {
            let flag = true;
            for (var i = 0; i < element_input.length; i++) {
                if (!element_input[i].checked) {
                    flag = false;
                    break;
                }
            }
            element_all[0].checked = flag;
        }
    }
    //分页功能
    Vue.prototype.pagination = function (page) {
        let opts = _extend(options, {
            page: page
        });

        Vue.prototype.$table['datagrid'](opts);
    }

    Vue.prototype.pageTotal = function (total) {
        return !isNaN(options.pageSize) && options.pageSize ? Math.ceil(total/options.pageSize) : 0;
    }

    Vue.prototype.$table = function (opts) {
        const TableController = Vue.extend(TableComponet);

        let instance = new TableController().$mount(document.getElementById(options.element));

        instance.column = opts.column;
        instance.data = opts.data;
        instance.page = {
            page: opts.page,
            pageTotal: opts.pageTotal
        }

        return instance;
    };

    Vue.prototype.$table['datagrid'] = function (option) {
        let opts = _extend(options, option);

        if (opts.url) {
            axios.get(opts.url, {
                params: {
                    page: opts.page,
                    pageSize: opts.pageSize
                }
            }).then(response => {
                opts.data = response.data;
                opts.pageTotal = Vue.prototype.pageTotal(opts.data.length);
                Vue.prototype.$table(opts);
            });
        }
    }
};

if (window.Vue) {
    Vue.use(Table);
}

export default Table;