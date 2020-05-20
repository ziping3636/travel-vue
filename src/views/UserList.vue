<template>
	<div>
		<el-row>
			<el-col>
				<el-form ref="searchUser" :model="searchUser" label-width="80px" inline>
					<el-form-item label="姓名">
						<el-input v-model="searchUser.name"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="initData">搜索</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
		<el-table :data="tableData" style="width: 100%">
			<el-table-column prop="name" label="姓名" width="100">
			</el-table-column>
			<el-table-column prop="username" label="用户名" width="100">
			</el-table-column>
			<el-table-column prop="sex" label="性别" width="100">
			</el-table-column>
			<el-table-column label="头像" width="150">
				<template slot-scope="scope">
					<el-avatar :src="scope.row.portrait"></el-avatar>
				</template>
			</el-table-column>
			<el-table-column prop="phone" label="手机号" width="120">
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button icon="el-icon-info" size="small" type="primary" plain>详情</el-button>
					<el-button icon="el-icon-info" size="small" type="danger" plain>详情</el-button>
					<el-button icon="el-icon-info" size="small" type="success" plain>详情</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="searchUser.current"
		 :page-sizes="sizes" :page-size="searchUser.size" layout="total, sizes, prev, pager, next, jumper" :total="total"
		 background>
		</el-pagination>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tableData: [],
				sizes: [3, 5],
				total: 0,
				searchUser: {
					current: 1,
					size: 5,
					name: null
				}
			};
		},
		created() {
			this.initData();
		},
		methods: {
			initData() {
				this.axios.get("http://localhost:92/user/list", {
					params: this.searchUser
				}).then((res) => {
					this.tableData = res.data.records;
					this.total = res.data.total;
				})
			},
			handleCurrentChange(val) {
				this.searchUser.current = val;
				this.initData();
			},
			handleSizeChange(val) {
				this.searchUser.size = val;
				this.initData();
			},
		}
	}
</script>

<style>
</style>
