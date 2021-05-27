<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2021-03-07 21:47:41
 * @LastEditors: Seven
 * @LastEditTime: 2021-03-09 23:11:42
-->
<template>
  <view class='box'>
    <view class='content'>
      <view class='top'>
        <view>单曲播放</view>
      </view>
      <view class='list'>
        <view :class="item.id==currentID?'list-item activeStyle':'list-item'" v-for="(item,index) in list" :key='index' @click='selectItem(item)'>{{item.name}}</view>
      </view>
      <view class='bottom' @click='showListCancel(id)'>取消</view>
    </view>
  </view>
</template>

<script>
export default {
  data(){
    return{
      activeMusic:1
    }
  },
  //获取vuex数据
  computed:{
    list(){
      return this.$store.state.musicList
    },
    currentID(){
      return this.$store.state.currentID 
    },
  },
  methods:{
    showListCancel(){
      //father
      this.$emit('showListCancel')
    },
    selectItem(item){
      this.$store.commit('changeAcStyle',item.id)
      this.$store.commit('addselectMusic',item)
      this.$store.commit('getCurrentMusic',{name:item.name,cover:item.cover})
      this.getPlayMusic(item)
    },
    getPlayMusic(item){
      console.log(item)
      const bgAudioMannager = uni.getBackgroundAudioManager();
      bgAudioMannager.title=item.name
      bgAudioMannager.src=item.url
    } 
  },
  mounted(){
    console.log(this.$store.state.currentID)
  }

}
</script>

<style lang='stylus'>
.activeStyle{
  color #8B658B
}
  .box
    position fixed
    top 0
    left 0
    bottom 0
    right 0
    background rgba(1,1,1,.3)
    .content
      // z-index 1000
      position absolute
      bottom 0
      width 750rpx
      height 260rpx
      margin-right 30%
      padding 0 16rpx 
      background-color #fff
      .bottom
        position absolute
        bottom 0
        width 750rpx
        height 40rpx
        line-height 40rpx
        margin-bottom 6rpx
        font-size 40rpx
        text-align center
        background-color #fff

</style>