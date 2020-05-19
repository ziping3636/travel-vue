<template>
	<div class="card">
		<div>
			<el-form ref="rules" :model="loginModel" :rules="rules" label-width="80px" class="login-box">
				<h3 class="login-title">XXX旅游账号登录</h3>

				<el-form-item label="账号" prop="username">
					<el-input type="text" placeholder="请输入账号" v-model="loginModel.username" />
				</el-form-item>

				<el-form-item label="密码" prop="password">
					<el-input type="password" placeholder="请输入密码" v-model="loginModel.password" />
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="onSubmit('loginForm')">登录</el-button>
				</el-form-item>


			</el-form>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Login",
		data() {
			return {
				loginModel: {
					username: '',
					password: ''
				},

				// 表单验证，需要在 el-form-item 元素中增加 prop 属性
				rules: {
					username: [{
						required: true,
						message: '账号不可为空',
						trigger: 'blur'
					}, ],
					password: [{
						required: true,
						message: '密码不可为空',
						trigger: 'blur'
					}]
				},
			}
		},
		methods: {
			onSubmit(formName) {
				this.axios.get("http://localhost:92/user/login", {
					params: {
						username: this.loginModel.username,
						password: this.loginModel.password
					}
				}).then((res) => {
					if (res.data.code == 1001) {
						if (res.data.data.isMark == 0) {
							this.$router.push({
								path: "/admin"
							});
						} else if (res.data.data.isMark == 1) {
							this.$router.push({
								path: "/user"
							});
						} else {
							this.$message.error("数据异常，请联系管理员");
						}
					} else {
						this.$message.error("登陆失败");
					}
				})


			},
		}
	}
</script>


<style>
	/*.homeBox {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0px;
		background-color: #ffffff;
	}*/
	.login-box {
		border: 1px solid #DCDFE6;
		width: 350px;
		margin: 180px auto;
		padding: 35px 35px 15px 35px;
		border-radius: 5px;
		-webkit-border-radius: 5px;
		-moz-border-radius: 5px;
		box-shadow: 0 0 25px #909399;
		/*position: fixed;*/
		/*width: 100%;
			height: 100%;*/
		top: 0px;
		background-color: #ffffff;
	}

	.login-title {
		text-align: center;
		margin: 0 auto 40px auto;
		color: #303133;
	}
</style>
