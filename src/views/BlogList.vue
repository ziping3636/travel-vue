<template>
	<div>
		<el-table :data="tableData" style="width: 100%">
			<el-table-column prop="title" label="博客" width="180">
			</el-table-column>
			<el-table-column prop="created" label="创建时间">
			</el-table-column>
			<el-table-column prop="created" label="创建时间">
			</el-table-column>
		</el-table>
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="searchBlog.current"
		 :page-sizes="sizes" :page-size="searchBlog.size" layout="total, sizes, prev, pager, next, jumper" :total="total"
		 background>
		</el-pagination>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				sizes: [3, 5, 10],
				total: 0,
				tableData: [],
				searchBlog: {
					current: 1,
					size: 5,
					title: null,
				}
			}
		},
		created() {
			this.initData();
		},
		methods: {
			initData() {
				this.axios.get("http://localhost:91/blog/list", {
					params: this.searchBlog
				}).then((res) => {
					this.tableData = res.data.data.records;
					this.total = res.data.total;
				})
			},
			handleCurrentChange(val) {
				this.searchBlog.current = val;
				this.initData();
			},
			handleSizeChange(val) {
				this.searchBlog.size = val;
				this.initData();
			},
		}
	}
</script>

<style>
</style>
