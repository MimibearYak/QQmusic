<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2021-03-06 15:42:53
 * @LastEditors: Seven
 * @LastEditTime: 2021-03-06 22:55:48
-->
<template>
  <view class='share'>
    <view class='share-top App-flex-bc'>
      <button open-type="share" class='iconfont icon-weixin btn'>
        <text>分享到朋友</text>
      </button>
      <button open-type="share" class='iconfont icon-weibiaoti--- btn' @click='download'>
        分享到朋友圈
      </button>
    </view>
    <view class='share-bottom' @click='cancel'>
      取消
    </view>
  </view>
</template>

<script>

export default {
  props:{
    neturl:{
      type:String
    }
  },
  data(){
    return{

    }
  },
  methods:{
    download(){
      uni.showLoading({
        title:'生成中..'
      })
      uni.downloadFile({
        url: this.neturl,
        success: (res) => {
          if (res.statusCode === 200) {
              console.log('下载成功');
              console.log(res.tempFilePath)
              this.getpreservation(res.tempFilePath)
          }
        }
      });
    },
    getpreservation(url){
      console.log(1)
      uni.saveImageToPhotosAlbum({
        filePath:url,
        cuccess:function(){
          console.log('save success')
          console.log(2)
          uni.hideLoading()
        },
        complete:()=>{
          console.log(3)
          uni.hideLoading()
        }
      })
    },
    cancel(){
      this.$emit('cancel')
    },
  }
}
</script>

<style lang='stylus'>
  .share
    position fixed
    bottom 0
    left 0
    width 750rpx
    height 160rpx
    border-top 2rpx solid red
    background-color #fff
    .share-top
      .btn::after
        border none
      .btn
        flex 1
        font-size 40rpx
        font-weight 600
        color rgba(34,200,34,.8)
        border none 
        border-radius 0
        border: 1px solid transparent
        padding-left 0
        padding-right 0
        margin-top 20rpx
        background-color transparent 
        line-height inherit 
    .share-bottom
      font-size 40rpx
      font-weight 600
      color rgba(205,201,201,.9)
      text-align center
      margin-top 18rpx
      
</style>