<template>
  <div id="classes">
    <div class="tourism-content">
      <el-header style="width: 1348px; height: 153px; padding:0;" class='top-header'>
        <el-row>
          <el-col :span="4" :offset="2">
            <div class="grid-content">
              <!-- <img style="width: 140px;" src="./assets/flower.jpg"> -->
            </div>
          </el-col>
          <el-col :span="10">
            <div class="grid-content text-shadow">
              去哪嗨
            </div>
          </el-col>
          <el-col :span="8" class="el-col-phone">
            <div class="grid-content">
              <i class="el-icon-phone-outline"></i> 24小时服务热线：
              <span class="tel">123-456-7890</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="el-row-header">
          <el-col :span="16" :offset="2">
            <div class="grid-content">
              <el-menu background-color="#4ce230" text-color="#fff" active-text-color="#ffd04b" :default-active="activeIndex" class="el-menu-header" mode="horizontal" @select="handleSelect" :router="true">
                <el-menu-item v-for='list in menuData' :key="list.id" :index="list.href">{{list.title}}
                </el-menu-item>
              </el-menu>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content search-content">
              <el-input placeholder="请输入内容" prefix-icon="el-icon-search">
              </el-input>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-container class='main-content' style="width: 1270px;">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-container>
      <el-footer style="width: 1348px; height: 80px;" class='bottom-footer'>
        <p>© 2018 finish xiaoying</p>
      </el-footer>
    </div>
  </div>
</template>
<script>
export default {
  name: 'app',
  data() {
    return {
      activeIndex: './',
      menuData: [{
        id: '1',
        title: '首页',
        href: './'
      }, {
        id: '2',
        title: '旅行攻略',
        href: '/helloWorld'
      }, {
        id: '3',
        title: '酒店推荐',
        href: '/a'
      }, {
        id: '4',
        title: '美食景点',
        href: '/b'
      }, {
        id: '5',
        title: '旅游资讯',
        href: '/c'
      }, {
        id: '6',
        title: '问路达人',
        href: '/d'
      }]
    }
  },
  mounted: function() {
    const h = this.$createElement;
    this.$notify({
      title: '2018新年出游计划',
      message: h('div', { style: 'color: red;font-weight: bold;font-size: 30px;' }, '全场最高立减五百元'),
      duration: 50000
    });
  },
  methods: {
    handleSelect(key, keyPath) {
      this.activeIndex = key;
      console.log(key, keyPath)
    }
  }
}

</script>
<style>
* {
  margin: 0;
  padding: 0;
}

html,
body,
#app,
.tourism-content {
  width: 100%;
  height: 100%;
  background: #f0f2f5;
}

a:link,
a:visited,
a:hover,
a:active {
  text-decoration: none;
}

ul>li {
  list-style-type: none;
}

.top-header {
  background: #fff;
}

.bottom-footer {
  background: #e3e4e8;
  line-height: 80px;
  color: #8a8686;
  text-align: center;
}

.main-content {
  margin: 0 auto;
}

.top-header .el-row-header {
  background-color: #4ce230;
}

.top-header .el-menu-header {
  border-bottom: 0;
}

.top-header .el-menu-header .el-menu-item {
  font-size: 18px;
}

.top-header .text-shadow {
  text-shadow: #f7e207 0 0 10px;
  color: white;
  font-size: 60px
}

.top-header .el-col-phone {
  height: 90px;
  line-height: 120px;
  font-size: 25px;
}

.top-header .tel {
  font-family: "微锟斤拷锟脚猴拷";
  color: #C00;
}

.search-content {
  height: 60px;
  line-height: 60px;
}

.el-notification__group {
  cursor: default;
}

</style>
