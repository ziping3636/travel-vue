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
					<el-button icon="el-icon-info" size="small" @click="getInfo(scope.row)" type="primary" plain>详情</el-button>
					<el-button icon="el-icon-close" size="small" type="danger" @click="updateStatus(scope.row,0)" plain v-if="scope.row.status==1">封号禁用</el-button>
					<el-button icon="el-icon-check" size="small" type="success" @click="updateStatus(scope.row,1)" plain v-if="scope.row.status==0">解封</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="searchUser.current"
		 :page-sizes="sizes" :page-size="searchUser.size" layout="total, sizes, prev, pager, next, jumper" :total="total"
		 background>
		</el-pagination>



		<el-dialog title="用户信息" :visible.sync="userInfo" width="30%">
			<span>
				<el-avatar :src="user.portrait"></el-avatar><br><br>
				姓名：{{user.name}}<br><br>
				用户名：{{user.username}}<br><br>
				手机号：{{user.phone}}<br><br>
			</span>
			<!-- <span slot="footer" class="dialog-footer">
				
			</span> -->
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tableData: [],
				sizes: [3, 5],
				total: 0,
				user: '',
				userInfo: false,
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
			getInfo(row) {
				this.axios.get("http://localhost:92/user/findById", {
					params: {
						id: row.id
					}
				}).then((res) => {
					this.user = res.data.data;
					this.userInfo = true;
				})
			},
			updateStatus(row, status) {
				this.axios.get("http://localhost:92/user/updateUserById", {
					params: {
						id: row.id,
						status: status
					}
				}).then((res) => {
					if (res.data.code == 1001) {
						alert("修改成功")
						this.initData();
					}
				})
			},
		}
	}
</script>

<style>
</style>
