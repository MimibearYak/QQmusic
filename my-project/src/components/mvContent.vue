<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2021-03-04 23:17:49
 * @LastEditors: Seven
 * @LastEditTime: 2021-03-05 21:30:13
-->
<template>
  <view class='mv'>
    <view class='header App-flex'>
      <view :class="activeIndex==1?'selectActive':''" @click="select(1)">推荐</view>
      <view :class="activeIndex==2?'selectActive':''" @click="select(2)">MV</view>
    </view>
    <swiper class="swiper" :current="current" :style="activeIndex==1?'height:'+Rheight+'rpx':'height:'+Mheight+'rpx'">
      <swiper-item>
        <view class='swiper-item-recommend'>
          <view class="recomment-top App-ft" >
            <image :src='mvList[0].cover'></image>
            <view class="'iconfont icon-bofang1 App-son"></view>
          </view>
          <view class="music-list App-flex-one">
            <view class="list-item" v-for="(item,index) in mvList" :key='index'>
              <image :src="item.cover"></image>
              <view class="item-time">{{item.duration | formate}}</view>
              <view class="text .App-text-hd">{{item.name}}</view>
            </view>
          </view>
        </view>
      </swiper-item>
      <swiper-item>
        <view class='swiper-item-MV'>
          <view class="music-list App-flex-one">
            <view class="list-item" v-for="(item,index) in RmvList" :key='index' @click="goplay(item.id)">
              <image :src="item.cover"></image>
              <view class="item-time">{{item.duration | formate}}</view>
              <view class="text .App-text-hd">{{item.name}}</view>
            </view>
          </view>
        </view>
      </swiper-item>

    </swiper>
  </view>
</template>

<script>
import moment from 'moment'
export default {
  props:{
    mvList:{
      type:Array
    },
    Rheight:{
      type:Number
    },
    RmvList:{
      type:Array
    },
    Mheight:{
      type:Number
    }
  },
  data(){
    return{
      activeIndex:1,
      current:0,
    }
  },
  filters:{
    formate(val){
      let time=moment(val).format("mm:ss")
      return time
    }
  },
  methods:{
    select(num){
      this.activeIndex=num
      this.current=num-1
      if(num==2){
        this.$emit('allow',10)
			}else{
				this.$emit('allow',100)
			}
    },
    goplay(id){
      uni.navigateTo({
        url:'/pages/mv/mv?id='+id
      })
    },  

  },
}
</script>

<style lang='stylus'>
  .selectActive
    font-weight 600
    color rgba(255,140,0,.8)
    border-bottom 4rpx solid rgb(0,255,42)
  .mv
    padding 0 16rpx
    .header
      view:nth-of-type(2)
        margin-left 30rpx
    .swiper
      .swiper-item-recommend
      .swiper-item-MV
        .recomment-top
          padding-top 16rpx
          image
            width 730rpx
            height 400rpx
            border-radius 40rpx
          view:nth-of-type(1)
            font-size 60rpx
            color #fff
        .music-list
          .list-item
            position relative
            height 200rpx
            width 350rpx
            margin-top 20rpx
            // padding-top 50rpx
            view:nth-of-type(2)
              font-size 18rpx
            image
              height 140rpx
              width 350rpx
              border-radius 20rpx 20rpx 0 0
            .item-time
              position absolute
              top 95rpx
              right 6rpx
              width 100rpx
              height 30rpx
              text-align center
              color #fff
      // .swiper-item-MV
        

</style>