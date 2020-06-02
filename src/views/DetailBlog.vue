<template>
	<div class="DetailBlog">
		<el-container direction="vertical" class="detail-container">

			<el-row type="flex" justify="center">
				<el-col>
					<div class="detail-blog-box">
						<h2>{{blog.title}}</h2>
						<el-row align="middle">
							<img src="../assets/logo.png" align="center" />
						</el-row>
						<article class="detail-blog-article">{{blog.content}}</article>
						<el-row class="detail-inscribe" type="flex" align="bottom" justify="start">
							<el-col :span="4">作者：{{blog.username}}</el-col>
						</el-row>
					</div>
				</el-col>
			</el-row>

			<el-row v-for="comment in blog.blogCommentList">
				<el-col>
					<div align="left">
					</div>
					<div class="blog-comment-box" align="left">
						{{comment.username}}:<article class="detail-blog-comment">{{comment.content}}</article> {{comment.created}}
					</div>
					<br />
				</el-col>

			</el-row>

			<el-row>
				<div class="comment-box">评论回复</div>
				<div class="comment-text-box">
					<el-input type="textarea" :rows="9" v-model="blogComment.content"></el-input>
				</div>
				<br />
				<div align="right">
					<el-button class="button" @click="saveBlogComment">发表评论</el-button>
				</div>
			</el-row>

		</el-container>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				id: this.$route.query.id,
				blog: {},
				blogComment: {
					blogComment: '',
					userId: '',
					blogId: '',
					username: ''
				}
			}
		},
		created() {
			this.initBlogDetail();
		},
		methods: {
			initBlogDetail() {
				this.axios.get("http://localhost:91/blog/getBlogById", {
						params: {
							id: this.id
						}
					}) //axios请求方法
					.then((res) => {
						this.blog = res.data;
						this.blogComment.blogId = res.data.id;
						this.blogComment.userId = 1;			//
						this.blogComment.username = "wangwu";	//数据模拟
					})
			},
			saveBlogComment() {

				if (this.blogComment == '') {
					alert("请输入评论内容");

				} else {

					this.axios.post("http://localhost:91/blog_comment/insert", this.blogComment).then((res) => {
						this.initBlogDetail();
					})
				}
			}
		}
	}
</script>

<style scoped>
	.detail-container {
		width: 850px;
		background: #fff;
		-webkit-border-radius: 8px;
		-moz-border-radius: 8px;
		border-radius: 8px;
		/* 博客详情  页面的背景图 */
		background-color: aliceblue;
	}

	.detail-blog-box {
		line-height: 30px;
		padding: 20px;
		border-radius: 8px;
	}

	.detail-blog-box h2 {
		text-align: center;
		margin-bottom: 10px;
	}

	.detail-blog-article {
		color: #696969;
		text-indent: 2em;
	}

	.detail-inscribe {
		font-size: 13px;
		color: #8c8c8c;
	}


	.el-col-category ul li {
		list-style: none;
		padding: 0;
		margin-right: 10px;
		display: inline-block;
	}


	/* 评论 */
	.blog-comment-box {
		line-height: 30px;
		padding: 20px;
		border-radius: 8px;
		background-color: #8C939D;
	}

	.blog-comment-box h2 {
		text-align: left;
		margin-bottom: 10px;
	}

	.detail-blog-comment {
		color: #696969;
		text-indent: 2em;
	}

	.comment-box {
		text-align: left;
		color: #42B983;
		font-size: 2.25rem;
	}

	.button {
		background-color: coral;
		color: #FFFFFF;

	}
</style>
