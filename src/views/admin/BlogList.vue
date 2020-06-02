<template>
	<div>
		<el-table :data="tableData" style="width: 100%">
			<el-table-column prop="id" label="ID" width="80"></el-table-column>
			<el-table-column prop="title" label="标题" width="100"></el-table-column>
			<el-table-column prop="pic" label="图片" width="160">
				<template slot-scope="scope">
					<el-image style="width: 100px; height: 100px" :src="scope.row.img" :fit="fit"></el-image>
				</template>
			</el-table-column>
			<el-table-column prop="created" label="创建时间" width="100"></el-table-column>
			<el-table-column prop="praiseNum" label="获赞数量 (被顶数量）" width="80"></el-table-column>
			<el-table-column prop="readNum" label="阅读数量" width="80"></el-table-column>
			<el-table-column prop="collectionNum" label="收藏数量" width="80"></el-table-column>
			<el-table-column prop="shareNum" label="分享数量" width="80"></el-table-column>
			<el-table-column>
				<template slot-scope="scope">
					<el-button icon="el-icon-info" size="small" @click="getInfo(scope.row.id)" type="primary" plain>详情</el-button>
					<el-button icon="el-icon-close" size="small" type="danger" @click="deleteBlog(scope.row.id)" plain>删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="searchBlog.current"
		 :page-sizes="sizes" :page-size="searchBlog.size" layout="total, sizes, prev, pager, next, jumper" :total="total"
		 background>
		</el-pagination>
		
		
		
		
		
		
		
		
		<el-dialog
		  title="博客详情"
		  :visible.sync="dialogVisible"
		  width="30%">
		  标题:<b>{{blogInfo.title}}</b><br>
		  内容:<span>{{blogInfo.content}}</span><br>
		  发布时间:<span>{{blogInfo.created}}</span><br>
		  <span>——————————————————————————</span><br>
		  <span v-for=" comment  in blogInfo.blogCommentList"></span><br>
		  <span slot="footer" class="dialog-footer">
		  </span>
		</el-dialog>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				sizes: [3, 5, 10],
				total: 0,
				fit: 'fill',
				tableData: [],
				dialogVisible:false,
				searchBlog: {
					current: 1,
					size: 5,
					title: null,
				},
				blogInfo:{}
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
			getInfo(id) {
				this.axios.get("http://localhost:91/blog/getBlogById", {
					params: {
						id: id
					}
				}).then((res) => {
					if (res) {
						this.blogInfo = res.data;
						this.dialogVisible=true;
					}
				})
			},
			deleteBlog(id) {
				this.axios.get("http://localhost:91/blog/del", {
					params: {
						ids: id
					}
				}).then((res) => {
					if (res) {
						this.$message({
							type: "success",
							message: "删除成功"
						})
						this.initData();
					} else {
						this.$message({
							type: "error",
							message: "删除失败"
						})
					}
				})
			}
		}
	}
</script>

<style>
</style>
