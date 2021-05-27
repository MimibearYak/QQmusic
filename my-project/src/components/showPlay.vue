<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2021-03-08 14:16:06
 * @LastEditors: Seven
 * @LastEditTime: 2021-03-08 21:23:23
-->
<template>
  <view class='play App-flex-bc'>
    <view class='left App-flex-bc'>
      <image :class="playShow?'':'discAnimation'" :src='showPlayMusic.cover'></image>
      <view>{{showPlayMusic.name}}</view>
    </view>  
    <view class='right App-flex-bc'>
      <view v-if='playShow' class='iconfont icon-bofang1' @click='play'></view>
      <view v-else class='iconfont icon-iconstop' @click='play'></view>
      <view class="iconfont icon-liebiao" style="margin:0 20rpx" @click='list'></view>
    </view>
  </view>  
</template>

<script>
export default {
  data(){
    return{
      
    }
  },
  computed:{
    showPlayMusic(){
      return this.$store.state.currentMusic
    },
    getMusic(){
      return this.$store.state.MusicExample
    },
    playShow(){
      return this.$store.state.play
    }
  },
  methods:{
    play(){
      console.log(this.getMusic)
      let music=this.getMusic
      if(this.playShow){
        music.play()
      }else{
        music.pause()
      }
    },
    list(){
      this.$emit('showList')
    },
  },
}
</script>

<style lang='stylus'>
  .play
    position fixed
    width 750rpx
    height 150rpx
    background-color #fff
    bottom 98rpx
    .left 
      image
        width 130rpx
        height 130rpx
        margin  0 10rpx 0 8rpx
        border-radius 50%  
    .discAnimation{
      animation:disc 6s linear infinite;
    }
    @keyframes disc{
      form{
        transform rotate(0deg)
      }to{
        transform:rotate(360deg)
      }
    }
        
</style>