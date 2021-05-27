<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2021-03-04 13:36:24
 * @LastEditors: Seven
 * @LastEditTime: 2021-03-06 22:43:09
-->
<template>
  <view class='mv-box'>
    <video :src="mvurl" class='video'></video>
    <view class='correlation'>
      <view>相关视频</view>
      <view class='correlation-list'>
        
      </view>
    </view>
    <view class='sharefriends'>
      <view class='item' @click='getShare'>分享给好友</view>
    </view>
    <uniShare v-if="share" :neturl='neturl' @cancel='sharecancel'></uniShare>
  </view>
</template>

<script>
import uniShare from '../../components/uniShare'
export default {
  data(){
    return{
      mvurl:'',
      AllMV:[],
      share:false,
      neturl:"http://p1.music.126.net/i6LioXu0LFy9hCAUFw2AUA==/109951163451884013.jpg"
    }
  },
  components:{
    uniShare,
  },
  onLoad(options){  
    console.log(options.id)
    this.getMVurl(options.id)
    this.getAllMvurl()
  },
  methods:{
    getMVurl(id){
      this.request("/mv/url",'GET',{id:id}).then(res=>{
        console.log(res)
        this.mvurl=res.data.url
      })
    },
    getAllMvurl(id){
      this.request('/mv/all','GET',{limit:12,area:'韩国',offset:1}).then(res=>{
        console.log(res)
        this.AllMV=res.data
      })
    },
    onShareAppMessage(res){
      console.log(res)
      if (res.from === 'button') {// 来自页面内分享按钮
        console.log(res.target)
      }
      return {
        title: '自定义分享标题',
        path: '/pages/test/test?id=123'
      }
    },
    getShare(){
      this.share=true
    },
    sharecancel(){
      this.share=false
    }
  },
}
</script>

<style lang='stylus'>
  .mv-box
    padding-top 310rpx
    .video
      position fixed
      top 0
      left 0
      width 750rpx
      height 300rpx
    .sharefriends
      position fixed
      bottom 0
      left 0
      width 750rpx
      height 80rpx
      .item
        width 400rpx
        height 60rpx
        line-height 60rpx
        background-color green  
        border-radius 30rpx
        margin 0 auto
        text-align center

</style>