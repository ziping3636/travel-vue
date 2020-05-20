<template>
	<div>
		<el-form ref="searchScenic" :model="searchScenic" label-width="80px" inline>
			<el-form-item label="景点名称">
				<el-input v-model="searchScenic.name"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="initData">搜索</el-button>
			</el-form-item>
		</el-form>
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
					<el-button icon="el-icon-info" size="small" type="danger" plain>详情</el-button>
					<el-button icon="el-icon-info" size="small" type="success" plain>详情</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="searchScenic.current"
		 :page-sizes="sizes" :page-size="searchScenic.size" layout="total, sizes, prev, pager, next, jumper" :total="total"
		 background>
		</el-pagination>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tableData: [],
				sizes: [3, 5, 10],
				total: 0,
				fit: 'fill',
				searchScenic: {
					current: 1,
					size: 5,
					name: null,
				}
			}
		},
		created() {
			this.initData();
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
			handleCurrentChange(val) {
				this.searchScenic.current = val;
				this.initData();
			},
			handleSizeChange(val) {
				this.searchScenic.size = val;
				this.initData();
			},
		}
	}
</script>

<style>
</style>
