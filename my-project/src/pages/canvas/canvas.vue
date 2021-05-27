<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2021-03-10 18:29:00
 * @LastEditors: Seven
 * @LastEditTime: 2021-03-11 11:36:23
-->
<template>
  <view>
    <canvas
      style="width: 600rpx; height: 800rpx"
      canvas-id="firstCanvas"
      id="firstCanvas"
    ></canvas>
  </view>
</template>

<script>
export default {
  data(){
    return {
      img:'../../static/logo.png',
      canvasObj:{},
      
    }
  },
  onLoad(){
    this.getData()
  },
  onReady(){
    // const ctx = uni.createCanvasContext('firstCanvas')
    // this.getCanvasImage(ctx)
      

    // ctx.setFillStyle('red')//填充颜色 
    // // ctx.fillRect(0, 0, 300, 250)//回执矩形 x y w h
    // ctx.drawImage(this.img, 75, 20, 150, 100)
    // ctx.setFontSize(20)
    // ctx.fillText('Hello', 20, 140)
    // ctx.drawImage(this.img, 75, 160, 150, 100)
    // ctx.draw()//绘制到canvas去
  },
  methods:{
    getCanvas(){
      const ctx = uni.createCanvasContext('firstCanvas')
      this.getCanvasImage(ctx)
    },
    getData(){
      this.request('/dj/banner').then(res=>{
        this.canvasObj=res.data[0]
        this.getCanvas()
      })
    },
    getCanvasText(ctx){
      ctx.setFontSize(20)
      ctx.fillText(this.canvasObj.typeTitle, 20, 140)
      ctx.draw()
      setTimeout(()=>{
        this.CanvasImage()
      },1000)
    },
    getCanvasImage(ctx){
      uni.downloadFile({
        url: this.canvasObj.pic,
        success: (res) => {
          if (res.statusCode === 200) {
            // console.log(res.tempFilePath);
            ctx.drawImage(res.tempFilePath, 75, 20, 150, 100)
            this.getCanvasText(ctx)
          }
        }
      });
    },
    CanvasImage(){
      uni.canvasToTempFilePath({
        x:0,
        y:0,
        width:300,
        heihgt:400,
        desWidth:300,
        destHeiht:400,
        canvasId:'firstCanvas',
        success:function(res){
          console.log(res.tempFilePath)
          // this.preservationImg(res)
          uni.saveImageToPhotosAlbum({
            filePath:res.tempFilePath,
            success:(res)=>{
              console.log(res)
            },
          })
        }
      })
    },
    // preservationImg(Cres){
    //   uni.saveImageToPhotosAlbum({
    //     filePath:Cres.tempFilePath,
    //     success:(res)=>{
    //       console.log(res)
    //     },
    //   })
    // },
    
  }
};
</script>

<style lang='stylus'>
  canvas 
    border 2rpx solid red
</style>