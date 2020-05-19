<template>
	<div class="about">

		<el-container>
			
			<el-header>
				<el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect"
				 background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
					<el-menu-item index="1">
						<el-avatar icon="el-icon-user-solid"></el-avatar>
					</el-menu-item>
					<el-menu-item index="2">首页</el-menu-item>
					<el-submenu index="3">
						<template slot="title">热门景区</template>
						<el-menu-item index="3-1">选项1</el-menu-item>
						<el-menu-item index="3-2">选项2</el-menu-item>
						<el-menu-item index="3-3">选项3</el-menu-item>
					</el-submenu>
					
					<el-menu-item index="4"><a href="https://www.ele.me" target="_blank">旅游博客</a></el-menu-item>
					<el-menu-item index="5"><a href="https://www.baidu.com" target="_blank">消息中心</a></el-menu-item>
					<el-menu-item align="left"><div>
						<a href="http://localhost:8080/login">登录</a>
					</div></el-menu-item>
				</el-menu>
			</el-header>
			<el-main style="width: 1520px;height: 440px;">

				<div v-for="(imgUrl, index) in bannerList" v-show="index===mark" :key="index" class="slideshow">
					<a href="#">
						<img :src=imgUrl style="width: 1500px;height: 400px;">
					</a>
				</div>
				<!-- <div class="bar">
					                   <span v-for="(item, index) in bannerList" :class="{ 'active':index===mark }" :key="index"></span>
					            </div> -->
			</el-main>
		</el-container>

		<el-container>
			<el-header>
				<el-tabs type="border-card">
					<el-tab-pane label="用户管理">用户管理</el-tab-pane>
					<el-tab-pane label="配置管理">配置管理</el-tab-pane>
					<el-tab-pane label="角色管理">角色管理</el-tab-pane>
					<el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
				</el-tabs>
			</el-header>
			<el-main>Main</el-main>
			<el-footer>Footer</el-footer>
		</el-container>

		<el-container>
			<el-aside width="200px">Aside</el-aside>
			<el-main>Main</el-main>
		</el-container>

		<el-container>
			<el-header>Header</el-header>
			<el-container>
				<el-aside width="200px">Aside</el-aside>
				<el-main>Main</el-main>
			</el-container>
		</el-container>

		<el-container>
			<el-header>Header</el-header>
			<el-container>
				<el-aside width="200px">Aside</el-aside>
				<el-container>
					<el-main>Main</el-main>
					<el-footer>Footer</el-footer>
				</el-container>
			</el-container>
		</el-container>

		<el-container>
			<el-aside width="200px">Aside</el-aside>
			<el-container>
				<el-header>Header</el-header>
				<el-main>Main</el-main>
			</el-container>
		</el-container>

		<el-container>
			<el-aside width="200px">Aside</el-aside>
			<el-container>
				<el-header>Header</el-header>
				<el-main>Main</el-main>
				<el-footer>Footer</el-footer>
			</el-container>
		</el-container>


	</div>
</template>
<script>
	export default {
		data() {
			return {
				activeIndex: '1',
				activeIndex2: '1',
				mark: 0, //比对图片索引的变量  
				bannerList: [
					"https://b1-q.mafengwo.net/s16/M00/92/7D/CoUBUl66xMGAT4Q_AB1_h1fUJsg153.png?imageMogr2%2Finterlace%2F1",
					"https://n1-q.mafengwo.net/s16/M00/70/F8/CoUBUl69VASAAdBkACbWk6NwgvU715.png?imageMogr2%2Finterlace%2F1",
					"https://n1-q.mafengwo.net/s16/M00/E2/DC/CoUBUl68DuiARNJTACkq0FnavXo807.png?imageMogr2%2Finterlace%2F1",
					"https://b1-q.mafengwo.net/s16/M00/92/7D/CoUBUl66xMGAT4Q_AB1_h1fUJsg153.png?imageMogr2%2Finterlace%2F1"
				]
			};
		},
		methods: {
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			},
			autoPlay() {
				this.mark++;
				if (this.mark === 3) { //当遍历到最后一张图片置零  
					this.mark = 0
				}
			},
			play() {
				setInterval(this.autoPlay, 2500)
			},
			change(i) {
				this.mark = i
			}
		},
		created() {
			this.play()
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
		line-height: 200px;
	}

	.el-main {
		background-color: #E9EEF3;
		color: #333;
		text-align: center;
		line-height: 400px;
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

	.slide {
		width: 950px;
		height: 150px;
		margin: 0 auto;
		margin-top: 50px;
		overflow: hidden;
		position: relative;
	}

	.slideshow {
		width: 95px;
		height: 150px;
	}

	li {
		position: absolute;
	}

	img {
		width: 95px;
		height: 150px;
	}

	.bar {
		position: absolute;
		width: 100%;
		bottom: 10px;
		margin: 0 auto;
		z-index: 10;
		text-align: center;
	}

	.bar span {
		width: 20px;
		height: 5px;
		border: 1px solid;
		background: white;
		display: inline-block;
		margin-right: 10px;
	}

	.active {
		background: #bfd6b6 !important;
	}
</style>
