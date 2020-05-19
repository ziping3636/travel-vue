<template>
  <div class="chapter">
    <el-container>
      <el-aside class='left-menu' width="360px">
        <div class="index-left-block">
          <h2>旅行资讯</h2>
          <div class="container-list pic_news">
            <template v-for='inf in informationData' v-if='inf.img'>
              <img :src="inf.img" :alt="inf.title">
              <h3>
                <a href="javascript:void(0);">{{inf.title}}</a>
              </h3>
              <p>{{inf.msg}}</p>
            </template>
            <ul>
              <li v-for='inf in informationData' v-if='!inf.img'>
                <span>{{inf.time}}</span>
                <a href="javascript:void(0);">【{{inf.title}}】</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="index-left-block">
          <h2>旅行攻略</h2>
          <div class="container-list product_list">
            <img :src="raidersData.img" :alt="raidersData.title">
            <h3><a href="javascript:void(0);">{{raidersData.title}}</a></h3>
            <div class="address-tag-container">
              <el-tag v-for="address in raidersAddressDt" :key="address.id" type="success">{{address}}</el-tag>
            </div>
          </div>
        </div>
        <div class="index-left-block">
          <h2>美食景点</h2>
          <div class="container-list food">
            <el-carousel height="150px" indicator-position="outside">
              <el-carousel-item v-for="item in deliciousFoodDt" :key="item.id">
                <a :href="item.href" target="_blank">
                <img width="300px" height="150px" :src="item.img"></a>
                <div class="mask">
                  <h3>{{ item.title }}</h3>
                  <p>{{ item.description }}</p>
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
      </el-aside>
      <el-main style="padding: 15px 0;">
        <el-carousel :interval="500000" height="500px" arrow="always">
          <el-carousel-item v-for="scenery in nepalSceneryDt" :key="scenery.id">
            <img width="908px" height="500px" :src="scenery.img">
            <div class="mask">
              <h3>尼泊尔优美风景</h3>
            </div>
          </el-carousel-item>
        </el-carousel>
        <div class="fiery-activity">
          <el-container>
            <el-aside width="252px">
              <a class="xinchun-link" target="_blank" href="http://www.tuniu.com/szt/SpringFestival2018/2702.html"></a>
              <div class="xinchun-memu">
                <ul>
                  <li class="xinchun_item" v-for="xcList in xinchunData">
                    <a target="_blank" :href="xcList.href">{{xcList.title}}</a>
                  </li>
                </ul>
              </div>
            </el-aside>
            <el-main class="fiery-activity-main">
              <el-row>
                <el-col :span="11" v-for="list in sellWellDt" :key="list.id" v-if="list.id<3">
                  <div class="grid-content">
                    <a target="_blank" :href="list.href">
                      <img :src="list.img" :alt="list.title">
                    </a>
                    <div class="activity_mess">
                      <a target="_blank" :href="list.href">
                        <span><{{list.title}}></span>
                        {{list.msg}}
                      </a>
                    </div>
                    <div class="activity_price">
                      <el-row>
                        <el-col :span="12">
                          ¥<span>{{list.price}}</span>起
                        </el-col>
                        <el-col :span="12">{{list.feedback}}</el-col>
                      </el-row>
                    </div>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="11" v-for="list in sellWellDt" :key="list.id" v-if="list.id>2">
                  <div class="grid-content">
                    <a target="_blank" :href="list.href">
                      <img :src="list.img" :alt="list.title">
                    </a>
                    <div class="activity_mess">
                      <a target="_blank" :href="list.href">
                        <span><{{list.title}}></span>
                        {{list.msg}}
                      </a>
                    </div>
                    <div class="activity_price">
                      <el-row>
                        <el-col :span="12">
                          ¥<span>{{list.price}}</span>起
                        </el-col>
                        <el-col :span="12">{{list.feedback}}</el-col>
                      </el-row>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </el-main>
          </el-container>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
	export default {
	  components: {},
	  data() {
	    return {
	      informationData: [{
	          id: 1,
	          title: '520 我在路上等着你！',
	          msg: '活动时间：5月20日—5月25日获奖公布时间：5月26日',
	          time: '2017-05-20',
	          img: require('./../assets/news.jpg')
	        }, {
	          id: 2,
	          title: '达人访谈 用户篇',
	          msg: '“有为屌丝”在路上',
	          time: '2017-06-20'
	        }, {
	          id: 3,
	          title: '有奖活动',
	          msg: '写给父亲三行书信',
	          time: '2017-06-22'
	        }, {
	          id: 4,
	          title: '朋友，请晒出你的足迹',
	          msg: '活动获奖公告',
	          time: '2017-07-01'
	        },
	        {
	          id: 5,
	          title: '旅行语录',
	          msg: '邂逅——最美的风景永远在路上',
	          time: '2017-08-05'
	        }
	      ],
	      raidersData: {
	        id: 5,
	        title: '10天尼泊尔自由行游记兼攻略',
	        msg: ' 加德满都～帕坦～博卡拉～奇特旺，从签证、机票、服装、生活用品、药品汇率解析如何玩转尼泊尔。内含闺蜜拍照技巧分享，想去尼泊尔吃喝玩乐的小伙伴速速get吧。',
	        time: '2017-08-05',
	        img: require('./../assets/css.jpg')
	      },
	      raidersAddressDt: ['加德满都', '帕坦', '博卡拉', '哈尔滨', '奇特旺'],
	      deliciousFoodDt: [{
	        id: 1,
	        href: 'http://www.mafengwo.cn/cy/10035/8962.html',
	        title: '辣到忘不掉的美味火锅',
	        description: '川菜中最具革命性的是火锅，锅底多样...',
	        img: require('./../assets/meishi1.jpeg')
	      }, {
	        id: 2,
	        href: 'http://www.mafengwo.cn/cy/10035/13359.html',
	        title: '成都人气川菜餐厅推荐',
	        description: '川菜早在千余年前就颇负盛名，以其色...',
	        img: require('./../assets/meishi2.jpeg')
	      }, {
	        id: 3,
	        href: 'http://www.mafengwo.cn/cy/10035/8959.html',
	        title: '最受欢迎的风味烧烤店',
	        description: '烧烤，这一风味小吃，其火...',
	        img: require('./../assets/meishi3.jpeg')
	      }, {
	        id: 4,
	        href: 'http://www.mafengwo.cn/cy/10035/13364.html',
	        title: '私享宽窄巷子人气餐厅',
	        description: '在宽窄巷子里，选择一处佳地...',
	        img: require('./../assets/meishi4.jpeg')
	      }, {
	        id: 5,
	        href: 'http://www.mafengwo.cn/cy/10035/13363.html',
	        title: '锦里的超人气风味美食店',
	        description: '尽管锦里并不以美食为主，但其...',
	        img: require('./../assets/meishi5.jpeg')
	      }],
	      nepalSceneryDt: [{
	        id: 1,
	        img: require('./../assets/niboer1.jpg')
	      }, {
	        id: 2,
	        img: require('./../assets/niboer2.jpg')
	      }, {
	        id: 3,
	        img: require('./../assets/niboer3.jpg')
	      }, {
	        id: 4,
	        img: require('./../assets/niboer4.jpg')
	      }, {
	        id: 5,
	        img: require('./../assets/niboer5.jpg')
	      }],
	      xinchunData: [{
	        id: 1,
	        title: '新春出境 好礼换购',
	        href: 'http://www.tuniu.com/szt/SpringFestival2018/2702.html'
	      }, {
	        id: 2,
	        title: '海南新春行 享壕礼',
	        href: 'http://www.tuniu.com/szt/hainanwintour/2702.html'
	      }, {
	        id: 3,
	        title: '东北雪国 满5000元减50元',
	        href: 'http://www.tuniu.com/szt/17winortheast/2702.html'
	      }, {
	        id: 4,
	        title: '邮轮年终特惠 1599起',
	        href: 'http://www.tuniu.com/szt/youlunnianzhong/2702.html'
	      }],
	      sellWellDt: [{
	        id: 1,
	        title: '泰国曼谷-芭提雅机票+当地5晚6日游',
	        msg: '美食之旅 发班3年老字号 1晚泳池别墅  希尔顿下午茶 杜拉拉水上市场 无自费 五星海航 微信管家',
	        img: require('./../assets/chunjie1.jpg'),
	        href: 'http://www.tuniu.com/tour/210125600',
	        price: '4009',
	        feedback: '满意度 91%'
	      }, {
	        id: 2,
	        title: '日本本州8日游',
	        msg: '西安直飞大阪，本州环岛，优选世界文化遗产白川乡，升级一晚温泉酒店，穿日式和服浴衣体验日式温泉，东京一天自由活动',
	        img: require('./../assets/chunjie2.jpg'),
	        href: 'http://www.tuniu.com/tour/210140583',
	        price: '6031',
	        feedback: '满意度 99%'
	      }, {
	        id: 3,
	        title: '泰国-普吉岛6或7日游',
	        msg: '西安直飞，连住2或3晚芭东凯悦酒店或同级，日游斯米兰，快艇珊瑚岛，神仙半岛，浮潜，4顿特色餐，含600礼包',
	        img: require('./../assets/chunjie3.jpg'),
	        href: 'http://www.tuniu.com/tour/210162944',
	        price: '3039',
	        feedback: '满意度 92%'
	      }, {
	        id: 4,
	        title: '日本东京-大阪-京都-富士山7日游',
	        msg: '两点进出，东京大阪全天自由活动含车接送，指定酒店，鲍鱼海鲜锅、蟹道乐，27种烤肉自助，46KG行李直挂',
	        img: require('./../assets/chunjie4.jpg'),
	        href: 'http://www.tuniu.com/tour/210147716',
	        price: '7927',
	        feedback: '满意度 97%'
	      }]
	    }
	  }
	}
</script>

<style>
	<style scoped>
	.index-wrap {
	  width: 100%;
	}
	
	.index-left-block {
	  margin: 15px;
	  background: #fff;
	  box-shadow: 0 0 1px #ddd;
	  padding-bottom: 15px;
	}
	
	.index-wrap .index-left-block h2 {
	  background: #4fc08d;
	  color: #fff;
	  padding: 10px 15px;
	  margin-bottom: 20px;
	  font-size: 14px;
	}
	
	.container-list.pic_news {
	  padding: 0 3px;
	}
	
	.container-list.pic_news h3 {
	  text-align: right;
	}
	
	.pic_news img {
	  float: left;
	  margin: 0 5px;
	}
	
	.pic_news img {
	  width: 113px;
	  height: 77px;
	}
	
	.pic_news p {
	  font-size: 14px;
	  padding: 8px 0;
	  color: #928c8d;
	}
	
	.pic_news ul>li span {
	  float: right;
	  color: #999;
	}
	
	.pic_news a,
	.product_list a {
	  color: #C00;
	  text-decoration: none;
	}
	
	.pic_news li {
	  padding-left: 10px;
	  margin: 8px;
	  border-bottom: 1px dotted #CCC;
	  height: 17px;
	  line-height: 17px;
	}
	
	.container-list.product_list img {
	  width: 280px;
	  padding: 0 22px;
	}
	
	.container-list.product_list h3 {
	  text-align: center;
	  padding-top: 10px;
	}
	
	.container-list.product_list p {
	  padding: 15px;
	  text-indent: 35px;
	}
	
	.address-tag-container {
	  padding: 13px 15px;
	}
	
	.address-tag-container span {
	  cursor: default;
	}
	
	.container-list.food {
	  width: 302px;
	  margin: 0 auto;
	}
	
	.container-list.food .mask,
	.el-carousel__item .mask {
	  position: absolute;
	  bottom: 0;
	  left: 0;
	  background-color: rgba(0, 0, 0, 0.6);
	}
	
	.container-list.food .mask {
	  width: 300px;
	  padding: 0 20px;
	}
	
	.el-carousel__item .mask {
	  text-align: center;
	  width: 100%;
	  padding: 23px 20px;
	  color: #fff;
	}
	
	.fiery-activity {
	  margin-top: 15px;
	  background: url('./../assets/nianwei.jpeg') 0 0 no-repeat;
	  width: 100%;
	  background-size: 100%;
	}
	
	.fiery-activity .xinchun-link {
	  width: 225px;
	  height: 225px;
	  display: block;
	}
	
	.xinchun-memu {
	  padding: 0 8px;
	}
	
	.xinchun_item {
	  background: url('./../assets/xinchun.png') 0 0 no-repeat;
	  background-size: 100%;
	  width: 230px;
	  height: 30px;
	  margin-bottom: 5px;
	  line-height: 30px;
	}
	
	.xinchun-memu .xinchun_item a {
	  font-family: "microsoft yahei";
	  font-size: 14px;
	  font-weight: bold;
	  color: #ff6284;
	  display: block;
	  padding-left: 10px;
	}
	
	.fiery-activity-main {
	  padding: 20px 0;
	}
	
	.fiery-activity-main img {
	  width: 216px;
	  height: 120px;
	}
	
	.el-main.fiery-activity-main .el-col.el-col-11 {
	  margin-left: 10px;
	  padding: 0 10px 15px 10px;
	}
	
	.el-main.fiery-activity-main .grid-content {
	  background-color: #fff;
	}
	
	.el-main.fiery-activity-main .el-col.el-col-11 a {
	  display: block;
	  text-align: center;
	  padding-top: 8px;
	}
	
	.el-main.fiery-activity-main .activity_mess {
	  position: absolute;
	  padding-bottom: 5px;
	  color: #fff;
	  width: 216px;
	  height: 38px;
	  margin-left: 0px;
	  bottom: 50px;
	  font-size: 12px;
	  background-color: rgba(0, 0, 0, 0.6);
	  overflow: hidden;
	}
	
	.el-main.fiery-activity-main .activity_mess a:link,
	.el-main.fiery-activity-main .activity_mess a:visited,
	.el-main.fiery-activity-main .activity_mess a:hover,
	.el-main.fiery-activity-main .activity_mess a:active {
	  color: #fff;
	}
	
	.el-main.fiery-activity-main .activity_mess a span {
	  font-weight: bold;
	}
	
	.el-main.fiery-activity-main .activity_price {
	  padding: 5px 17px 5px 17px;
	}
	
	.activity_price .el-col.el-col-12:nth-child(1) {
	  color: #f60;
	  font-size: 14px;
	  padding-left: 5px;
	  margin-top: -5px;
	}
	
	.activity_price .el-col.el-col-12:nth-child(1) span {
	  font-weight: bold;
	  font-size: 20px;
	}
	
	.activity_price .el-col.el-col-12:nth-child(2) {
	  text-align: right;
	  color: #999;
	  font-size: 12px;
	}
</style>
