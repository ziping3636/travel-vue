<template>
	<div>
		<el-container>
			<el-header>欢迎 {{adminName}} 进入管理页面</el-header>
			<el-container>
				<el-aside width="201px">
					<el-col :span="12">
						<el-menu default-active="4" class="el-menu-vertical-demo" background-color="#BDBDBD" text-color="#fff"
						 active-text-color="#ffd04b">
							<router-link :to="{path:'scenicList'}">
								<el-menu-item index="1">
									<i class="el-icon-location"></i>
									<font style="color:white">景区管理</font>
									<!-- <span slot="title">景区管理</span> -->
								</el-menu-item>
							</router-link>
							<router-link :to="{path:'userList'}">
								<el-menu-item index="2">
									<i class="el-icon-menu"></i>
									<font style="color:white">用户管理</font>
									<!-- <span slot="title">用户管理</span> -->
								</el-menu-item>
							</router-link>
							<router-link :to="{path:'blogList'}">
								<el-menu-item index="3">
									<i class="el-icon-document"></i>
									<font style="color:white">博客管理</font>
									<!-- <span slot="title">博客管理</span> -->
								</el-menu-item>
							</router-link>
							<el-menu-item index="4">
								<i class="el-icon-setting"></i>
								<span slot="title">设置</span>
							</el-menu-item>
						</el-menu>
					</el-col>
				</el-aside>
				<el-main>
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				adminId: this.$route.query.adminId,
				adminName: this.$route.query.adminName,
				isCollapse: true,
			};
		},
		created() {
			this.initData();
		},
		methods: {
			initData() {
			},
		}
	}
</script>

<style>
	.el-header,
	.el-footer {
		background-color: #B3C0D1;
		color: #333;
		text-align: center;
		line-height: 60px;
	}

	.el-aside {
		background-color: #D3DCE6;
		color: #333;
		text-align: center;
		line-height: 210px;
	}

	.el-main {
		background-color: #E9EEF3;
		color: #333;
		text-align: center;
		/* line-height: 60px; */
	}

	body>.el-container {
		margin-bottom: 40px;
	}

	.el-container:nth-child(5) .el-aside,
	.el-container:nth-child(6) .el-aside {
		line-height: 260px;
	}

	.el-container:nth-child(7) .el-aside {
		line-height: 320px;
	}

	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 200px;
		min-height: 400px;
	}
</style>
