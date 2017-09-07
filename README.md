# vue2-tables
列表数据显示

# 初始化

git clone https://github.com/wangguiwang929/vue2-tables.git

npm install

# 实例

new Vue({
        el:"#app",
        mounted(){
            this.createDataGrid();
        },
        methods: {
            createDataGrid(){
                let options = {
                    url:"./lib/data.json",
                    column:[
                        {"field":"_id","checkbox":true,"sort":true},
                        {"field":"productName","title":"名称","sort":true},
                        {"field":"salePrice","title":"价格","sort":true,formatter:function(row, value){
                            return "￥" + value;
                        }},
                        {"field":"total","title":"总数量","sort":true},
                        {"field":"busRebate","title":"折扣"},
                        {"field":"userName","title":"创建者"},
                        {"field":"createDate","title":"创建日期"}
                    ],
                    data:[],
                    sort:'salePrice',
                    orderby:"desc",
                    page:1,
                    pageSize:10
                };
                this.$table.datagrid(options);
            }
        }
    });
