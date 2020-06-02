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
			<el-table-column prop="id" label="景区id" width="80"></el-table-column>
			<el-table-column prop="name" label="景区名称" width="80"></el-table-column>
			<el-table-column prop="info" label="景区简介" width="80"></el-table-column>
			<el-table-column prop="price" label="门票价格" width="80"></el-table-column>
			<el-table-column prop="star" label="景区级别" width="80">
				<template slot-scope="scope">
					<span v-if="scope.row.star==1">A</span>
					<span v-if="scope.row.star==2">AA</span>
					<span v-if="scope.row.star==3">AAA</span>
					<span v-if="scope.row.star==4">AAAA</span>
					<span v-if="scope.row.star==5">AAAAA</span>
				</template>
			</el-table-column>
			<el-table-column prop="address" label="地理位置" width="160">
				<template slot-scope="scope">
					{{scope.row.provinceName}}
					{{scope.row.cityName}}
					{{scope.row.countyName}}
				</template>
			</el-table-column>
			<el-table-column prop="pic" label="图片" width="160">
				<template slot-scope="scope">
					<el-image style="width: 100px; height: 100px" :src="scope.row.pic" :fit="fit"></el-image>
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<!-- <el-link href="http://localhost:93/scenic_area/getById?id" target="_blank">查看<i class="el-icon-view el-icon--right"></i> </el-link>&nbsp;&nbsp;&nbsp;&nbsp; -->
					<!-- <el-button icon="el-icon-info" size="small" type="primary" plain>详情</el-button> -->
					<el-button @click="handleEdit(scope.row.id)" type="warning" size="small" plain>修改</el-button>
					<el-button @click="handleDelete(scope.row.id)" type="danger" size="small" plain>删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="searchScenic.current"
		 :page-sizes="sizes" :page-size="searchScenic.size" layout="total, sizes, prev, pager, next, jumper" :total="total"
		 background>
		</el-pagination>
		
		
		<el-dialog title="修改" :visible.sync="updateScenicDialog" width="30%">
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
					<el-button type="primary" @click="onSubmitUpdateScenic">保存</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>


		<el-dialog title="添加" :visible.sync="addScenicDialog" width="30%">
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
				updateScenicDialog: false,
				imageUrl: '',
				districts: [],
				form: {
					id: null,
					name: null,
					price: null,
					star: null,
					pic: null,
					provinceId: null,
					cityId: null,
					countyId: null,
					info: null
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
				this.value = [];
				this.imageUrl = null;
				this.form = {};
				this.addScenicDialog = true;
			},
			onSubmitAddScenic() {
				console.log(this.form)
				this.axios.post("http://localhost:93/scenic_area/insert", this.form).then((res) => {
					if (res.data.code == 1001) {
						this.$message({
							type: 'success',
							message: '编辑景区成功'
						})
						this.addScenicDialog = false;
						this.initData();
					} else {
						this.$message.error("编辑景区失败");
					}
				})
			},
			onSubmitUpdateScenic() {
				console.log(this.form)
				this.axios.post("http://localhost:93/scenic_area/update", this.form).then((res) => {
					if (res.data.code == 1001) {
						this.$message({
							type: 'success',
							message: '编辑景区成功'
						})
						this.updateScenicDialog = false;
						this.initData();
					} else {
						this.$message.error("编辑景区失败");
					}
				})
			},
			handleAvatarSuccess(res, file) {
				this.form.pic = res.data;
				this.imageUrl = URL.createObjectURL(file.raw);
			},
			beforeAvatarUpload(file) {
			},
			handleEdit(id) {
				this.id = id;
				this.updateScenicDialog = true; // 打开窗口
				if (id !== '') { // 修改
					this.axios.get("http://localhost:93/scenic_area/getById", {
						params: {
							id: id
						}
					}).then(response => {
						if (response.data.code == 1001) {
							this.form = response.data.data;
							this.imageUrl = response.data.data.pic;
							this.value[0] = response.data.data.provinceId;
							this.value[1] = response.data.data.cityId;
							this.value[2] = response.data.data.countyId;
						}
					})
				} 
			},
			handleDelete(id) {
				this.$confirm('确定要删除此纪录吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.axios.get("http://localhost:93/scenic_area/delete/", {
						params: {
							id: id
						}
					}).then(response => {
						this.$message({
							message: response.data.data,
							type: (response.data.code == 1001 ? 'success' : 'error')
						})
						if (response.data.code == 1001) {
							this.initData() // 刷新数据
						}
					})
				})
			}
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
