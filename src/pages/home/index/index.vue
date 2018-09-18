<template lang="pug">
.home
  el-row(:gutter="20")
    el-col(:span="16")
      .user-info
        img.pull-left.w100.h100(v-bind:src="user.img")
        .pull-left.ml20
          h2.mb20 Hi {{user.name}}
          p.mb10 经营行业: {{user.industry}}
          p
            span.mr10(v-for="item in user.shops" v-bind:key="item.id") {{item.name}}
        .pull-right.text-center
          h2.color-red1.mt20.mb20 {{msgList.length}}
          p 待处理任务
        .pull-right.text-center.mr20
          h2.color-red1.mt20.mb20 {{user.shopNum}}
          p 已绑定店铺
    el-col(:span="8")
      ul.msg-list
        li.mb20(
          v-for="item in msgList"
          v-bind:key="item.id")
          .msg-list__top.mb10.color-black3
            router-link.color-black3(:to="{ name: 'msg-center' }")
              i.ft16.el-icon-information.color-blue3.mr10
              span.ft16.mr5 {{item.name}}
              span.ft12 MORE
          .msg-list__bottom
            h4.mb20 {{item.msg}}
            p.color-grey2 {{item.time}}
            p
              el-button(type="text") 客服
              el-button(type="text") 问答
      hr.mb20
      el-button(:plain="true" type="success") 所有更新
</template>

<script>
// import { getUserInfo } from '@/utils/index'

export default {
  data () {
    return {
      /**
       * 用户信息
       * @type {JSON}
       */
      user: {
        id: null,
        name: null,
        industry: null,
        img: null,
        shops: null,
        shopNum: null
      },
      /**
       * 消息
       * @type {Array}
       */
      msgList: [
        {
          id: '1',
          name: '新用户需知1',
          msg: 'BIONG客户群123456，客服7 * 24小时为您服务，有任何问题请及时在群内提问',
          time: '2017-10-10 10:10:00'
        },
        {
          id: '2',
          name: '新用户需知2',
          msg: 'BIONG客户群123456，客服7 * 24小时为您服务，有任何问题请及时在群内提问',
          time: '2017-10-10 10:10:00'
        }
      ]
    }
  },
  created () {
    this.user.id = '1'
    this.user.name = '歪歪'
    this.user.industry = '童装用品'
    this.user.img = 'https://user-gold-cdn.xitu.io/2017/9/25/f3abf1ed9ec6283d5e705987abaa1986?imageView2/1/w/120/h/120/q/85/interlace/1'
    this.user.shops = [
      {
        id: '1',
        name: '小聪聪1店'
      },
      {
        id: '2',
        name: '小聪聪2店'
      },
      {
        id: '3',
        name: '小聪聪3店'
      }
    ]
    this.user.shopNum = '3'
    // getUserInfo().then((res) => {
    //   this.user.id = res.userId
    //   this.user.name = res.userName
    //   this.user.industry = '童装用品'
    //   this.user.img = 'https://user-gold-cdn.xitu.io/2017/9/25/f3abf1ed9ec6283d5e705987abaa1986?imageView2/1/w/120/h/120/q/85/interlace/1'
    //   this.user.shops = [
    //     {
    //       id: '1',
    //       name: '小聪聪1店'
    //     },
    //     {
    //       id: '2',
    //       name: '小聪聪2店'
    //     },
    //     {
    //       id: '3',
    //       name: '小聪聪3店'
    //     }
    //   ]
    //   this.user.shopNum = '3'
    // })
  }
}
</script>
