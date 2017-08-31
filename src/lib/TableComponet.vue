<template>
	<div class="datalist">
		<div class="data-body" id="dataList">
			<div class="list-thead">
				<div :class="{'sort-by': item.sort&&!item.checkbox}" v-for="item in column" :data-name="item.field">
						<span class="icheck" v-if="item.checkbox" style="margin-left:-2px;">
							<input class="checkbox-input-all" type="checkbox" value="all" @click="checkedAll('all')">
						</span>
					<span v-if="!item.checkbox">
							{{ item.title }}
						</span>
				</div>
			</div>
			<div class="list-row" v-for="v in data">
				<div v-for="item in column">
					<div v-if="item.checkbox" class="width-icon check-box show  unonline">
							<span class="icheck">
								<input class="checkbox-input" type="checkbox" :value="v[item.field]" @click="checkedAll('no')">
							</span>
					</div>
					<span v-if="!item.checkbox">
						{{ formatter(v, item) }}
					</span>
				</div>
			</div>
		</div>
		<div class="page-flex" v-if="page.pageTotal">
			<ul class="pagination">
				<label>总共 {{page.total}} 条，当前第 {{page.page}} 页</label>
			</ul>
			<ul class="pagination">
				<li class="page-item first" :class="{disabled:page.page==1}" @click="pagination(1);"><a href="#" class="page-link">首页</a></li>
				<li class="page-item prev" :class="{disabled:page.page==1}" @click="pagination(page.page-1);"><a href="#" class="page-link">上一页</a></li>
				<li class="page-item" v-for="(v,index) in page.pageTotal" :class="{active:page.page==(index + 1)}" @click="pagination(index + 1);"><a href="#" class="page-link">{{ index + 1 }}</a></li>
				<li class="page-item next" :class="{disabled:page.page==page.pageTotal}" @click="pagination(page.page+1);"><a href="#" class="page-link">下一页</a></li>
				<li class="page-item last" :class="{disabled:page.page==page.pageTotal}" @click="pagination(page.pageTotal);"><a href="#" class="page-link">末页</a></li>
			</ul>
		</div>
	</div>
</template>
<style>
	.datalist { padding:0 15px; font-size: 12px; box-sizing:border-box; width:auto;}
	.data-body  { width: auto;  display:table; background:#fff;  table-layout: fixed; min-width: 100%;}
	.data-body .list-row,.list-thead { display:table-row;  position:relative; width: 100%;height:34px;}
	.data-body .list-thead div:hover {box-shadow:inset 0 0 2px rgba(0,0,0,0.1);}
	/*.data-body div.sort-by { background-image:url(../images/sort_both.png); background-repeat:no-repeat; background-position:right center; }
	.data-body div.sort-by.asc { background-image:url(../images/sort_both_asc.png); background-repeat:no-repeat; background-position:right center; }
	.data-body div.sort-by.desc { background-image:url(../images/sort_both_desc.png); background-repeat:no-repeat; background-position:right center; }*/
	.list-row>div,.list-thead div { display:table-cell;  padding:0.5em; white-space: nowrap;}
	.list-row>div:first-child,.list-thead>div:first-child {padding-left: 1em;}
	.data-body .list-thead { font-size: 14px;color:#333; background:rgba(29, 26, 26, 0.03);}
	.data-body .list-row:nth-child(2n){ background:rgba(29, 26, 26, 0.05);}
	.data-body .list-row:hover {background:rgba(29, 26, 26, 0.05);}
	.list-row .ebtn { visibility:hidden;}
	.list-row:hover .ebtn { visibility:visible;}
	/**page**/
	.page-flex{display: flex;justify-content: flex-end;flex-direction: inherit;}
	.pagination {display: inline-block;padding-left: 0;margin: 20px 0;border-radius: 4px;}
	.pagination > li {display: inline;}
	.pagination > label {position: relative;float: left;padding: 6px 12px;line-height: 1.42857143;}
	.pagination > li > a,.pagination > li > span {position: relative;float: left;padding: 6px 12px;line-height: 1.42857143;text-decoration: none;color: #337ab7;background-color: #fff;border: 1px solid #ddd;margin-left: -1px;}
	.pagination > li:first-child > a,.pagination > li:first-child > span {margin-left: 0;border-bottom-left-radius: 4px;border-top-left-radius: 4px;}
	.pagination > li:last-child > a,.pagination > li:last-child > span {border-bottom-right-radius: 4px;border-top-right-radius: 4px;}
	.pagination > li > a:hover,.pagination > li > span:hover,.pagination > li > a:focus,.pagination > li > span:focus {z-index: 2;color: #23527c;background-color: #eeeeee;border-color: #ddd;}
	.pagination > .active > a,.pagination > .active > span,.pagination > .active > a:hover,.pagination > .active > span:hover,.pagination > .active > a:focus,.pagination > .active > span:focus {z-index: 3;color: #fff;background-color: #337ab7;border-color: #337ab7;cursor: default;}
	.pagination > .disabled > span,.pagination > .disabled > span:hover,.pagination > .disabled > span:focus,.pagination > .disabled > a,.pagination > .disabled > a:hover,.pagination > .disabled > a:focus {color: #777777;background-color: #fff; border-color: #ddd;cursor: not-allowed;}
</style>
<script>
  export default{
    data(){
	  return{
	    column:[],
	    data:[],
	    page:{}
	  }
	}
  }
</script>