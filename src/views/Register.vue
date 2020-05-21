<template>
	<div class="card">
		<div>
			<el-form ref="rules" :model="userForm" :rules="rules" label-width="80px" class="login-box">
				<h3 class="login-title">XXX旅游账号登录</h3>

				<el-form-item label="用户名" prop="username">
					<el-input type="text" placeholder="请输入账号" v-model="userForm.username" />
				</el-form-item>

				<el-form-item label="密码" prop="password">
					<el-input type="password" placeholder="请输入密码" v-model="userForm.password" />
				</el-form-item>

				<el-form-item label="姓名" prop="name">
					<el-input type="text" placeholder="请输入姓名" v-model="userForm.name" />
				</el-form-item>
				
				<el-form-item label="手机号" prop="name">
					<el-input type="text" placeholder="请输入手机号" v-model="userForm.phone" />
				</el-form-item>

				<el-form-item label="性别">
					<el-radio-group v-model="userForm.sex">
						<el-radio label="1">男</el-radio>
						<el-radio label="0">女</el-radio>
					</el-radio-group>
				</el-form-item>

				<el-form-item label="头像">
					<el-upload class="avatar-uploader" name="file" action="http://localhost:92/user/upload/" :show-file-list="false"
					 :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
						<img v-if="imageUrl" :src="imageUrl" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="onSubmit('loginForm')">注册</el-button>
				</el-form-item>


			</el-form>
			<div class="bottom-link">
				<font style="color: white;">已有账号？</font>
				<router-link :to="{path:'/login'}">
					<font style="color: yellow;">去登录</font>
				</router-link>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		name: "Login",
		data() {
			return {
				district: [],
				imageUrl: '',
				userForm: {
					username: null,
					password: null,
					name: null,
					sex: null,
					phone:null,
					portrait:null
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
		created() {
		},
		methods: {
			handleAvatarSuccess(res, file) {
				this.userForm.portrait = res.data;
				this.imageUrl = URL.createObjectURL(file.raw);
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			},
			onSubmit(formName) {
				console.log(this.userForm)
				this.axios.post("http://localhost:92/user/regist", this.userForm).then((res) => {
					if (res.data.code == 1001) {
						this.$message({
							type:'success',
							message:'注册成功'
						})
						this.$router.push({
							path: "/login"
						});

					} else {
						this.$message.error("注册失败");
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

	.bottom-link {
		width: 140px;
		margin: 10px auto;
		/* background-color: #000; */
		border-radius: 15px;
		background-color: rgba(0, 0, 0, .2);
		text-align: center;
		font-size: 12px;
		color: #fff;
		padding: 4px 0;
		text-shadow: 1px 1px 1px rgba(0, 0, 0, .4);
	}

	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}

	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
</style>
