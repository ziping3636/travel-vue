<template>
	<div>
		<el-row>
			<el-col :span="16">
				<el-form ref="searchScenic" :model="searchScenic" label-width="80px" inline>
					<el-form-item label="景点名称">
						<el-input v-model="searchScenic.name"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="initData">搜索</el-button>
					</el-form-item>
				</el-form>
			</el-col>
			<el-col :span="8">
				<el-button type="primary" @click="addScenic" plain>添加景区</el-button>
			</el-col>
		</el-row>

		<el-table :data="tableData" style="width: 100%">
			<el-table-column prop="name" label="景点名称" width="100">
			</el-table-column>
			<el-table-column label="门票价格" width="100">
				<template slot-scope="scope">
					{{scope.row.price}}元
				</template>
			</el-table-column>
			<el-table-column prop="star" label="景点级别" width="100">
				<template slot-scope="scope">
					<span v-if="scope.row.star==1">A</span>
					<span v-if="scope.row.star==2">AA</span>
					<span v-if="scope.row.star==3">AAA</span>
					<span v-if="scope.row.star==4">AAAA</span>
					<span v-if="scope.row.star==5">AAAAA</span>
				</template>
			</el-table-column>
			<el-table-column label="图片" width="150">
				<template slot-scope="scope">
					<el-image style="width: 100px; height: 100px" :src="scope.row.pic" :fit="fit"></el-image>
				</template>
			</el-table-column>
			<el-table-column prop="address" label="地理位置" width="150">
				<template slot-scope="scope">
					{{scope.row.provinceName}}
					{{scope.row.cityName}}
					{{scope.row.countyName}}
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button icon="el-icon-info" size="small" type="primary" plain>详情</el-button>
					<el-button icon="el-icon-info" size="small" type="danger" plain>修改</el-button>
					<el-button icon="el-icon-info" size="small" type="success" plain>删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="searchScenic.current"
		 :page-sizes="sizes" :page-size="searchScenic.size" layout="total, sizes, prev, pager, next, jumper" :total="total"
		 background>
		</el-pagination>


		<el-dialog title="添加景区" :visible.sync="addScenicDialog" width="30%">
			<el-form ref="form" :model="form" label-width="80px">
				<el-form-item label="景区名称">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="景区价格">
					<el-input v-model="form.price"></el-input>
				</el-form-item>
				<el-form-item label="景区星级">
					<el-input-number v-model="form.star" :min="1" :max="5"></el-input-number>
				</el-form-item>
				<el-form-item label="景区图片">
					<el-upload class="avatar-uploader" name="file" action="http://localhost:92/user/upload/" :show-file-list="false"
					 :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
						<img v-if="imageUrl" :src="imageUrl" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
				<el-form-item label="所属地区">
					<el-cascader v-model="value" :options="districts" :props="props" @change="handleChange"></el-cascader>
				</el-form-item>
				<el-form-item label="景区简介">
					 <el-input type="textarea" v-model="form.info"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmitAddScenic">保存</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tableData: [],
				value: [],
				sizes: [3, 5, 10],
				total: 0,
				fit: 'fill',
				addScenicDialog: false,
				imageUrl: '',
				districts: [],
				form: {
					name: null,
					price: null,
					star: null,
					pic: null,
					provinceId:null,
					cityId:null,
					countyId:null,
					info:null
				},
				searchScenic: {
					current: 1,
					size: 5,
					name: null,
				},
				props: {
					value: "id",
					label: 'name',
					children: 'districtVoList'
				}
			}
		},
		created() {
			this.initData();
			this.initDistrictData();
		},
		methods: {
			initData() {
				this.axios.get("http://localhost:93/scenic_area/list", {
					params: this.searchScenic
				}).then((res) => {
					this.tableData = res.data.records;
					this.total = res.data.total;
				})
			},
			initDistrictData() {
				this.axios.get("http://localhost:93/district/list").then((res) => {
					this.districts = res.data;
				})
			},
			handleChange() {
				this.form.provinceId = this.value[0];
				this.form.cityId = this.value[1];
				this.form.countyId = this.value[2];
			},
			handleCurrentChange(val) {
				this.searchScenic.current = val;
				this.initData();
			},
			handleSizeChange(val) {
				this.searchScenic.size = val;
				this.initData();
			},
			addScenic() {
				this.form = {};
				this.addScenicDialog = true;
			},
			onSubmitAddScenic() {
				this.axios.post("http://localhost:93/scenic_area/insert", this.form).then((res) => {
					if (res.data.code == 1001) {
						this.$message({
							type:'success',
							message:'添加景区成功'
						})
						this.initData();
					} else {
						this.$message.error("添加景区失败");
					}
				})
			},
			handleAvatarSuccess(res, file) {
				this.form.pic = res.data;
				this.imageUrl = URL.createObjectURL(file.raw);
			},
			beforeAvatarUpload(file) {
				/* const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;
			
				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M; */
			},
		}
	}
</script>

<style>
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
