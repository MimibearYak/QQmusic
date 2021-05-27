<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2021-03-06 22:48:02
 * @LastEditors: Seven
 * @LastEditTime: 2021-03-06 23:37:31
-->
<template>
  <view class='music'>
    <view class='search'>
      <text class='iconfont icon-search'>搜索</text>  
    </view>  
    <view class=''>
      <view class='newtitle'>最新音乐</view>
    </view>
    <view class='App-flex' v-for="(item,index) in RnewMusic" :key='index' @click='play(item.id)'>
      <image :src='item.picUrl'></image>
      <text class='App-flex-bc'>{{item.name}}</text>
    </view>
  </view>  
</template>

<script>
export default {
  props:{
    RnewMusic:{
      type:Array,
    }
  },
  methods:{
    play(id){
      uni.navigateTo({
        url:'/pages/playMusic/playMusic?id='+id
      })
    }
  }
}
</script>

<style lang='stylus'>
  .music
    background-color #fff
    view
      .newtitle
        font-size 34rpx
        font-weight normal
        padding 6rpx 6rpx
    .search
      width 750rpx
      height 50rpx
      line-height 50rpx
      text-align center
      border-radius 240rpx
      // background-color pink
      background-color rgba(255,105,180,.1)
      text 
        color rgb(255,130,71)
    .App-flex
      margin 10rpx 0
      image
        width 300rpx
        height 200rpx
        margin-right 20rpx
        // padding-right 30rpx
        border-radius 40rpx
      text 
        font-size 28rpx
        max-width 50%

      

</style>