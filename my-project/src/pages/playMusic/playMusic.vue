<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2021-03-06 23:30:44
 * @LastEditors: Seven
 * @LastEditTime: 2021-03-12 00:54:03
-->
<template>
  <view class='play-box' :style="{'background-image':'url('+musicImage+')'}">
    <view class='play-content'>
      <view class='musicName'>
        {{musicName}}
      </view>
      <view class='musicCover App-ft'> 
        <image :src='musicImage'></image>
        <view v-if='showplay' class='iconfont icon-bofang2 App-son icon' @click='playMusic'></view>
        <view v-else class='iconfont icon-iconstop App-son icon'  @click='playMusic'></view>
      </view>
      
      <view class='lyric'>
        <view class='name'>{{musicName}}</view>
        <scroll-view
          class='lyric-box'
          scroll-y="true"
          :scroll-top="scrollIndex"
          style="width:750rpx;height:700rpx;overflow:auto;margin-top:10rpx;transition:scrollTop.3s"
          ref='lyricScroll'
        >
          <view
            v-for="(item,i) in lrcObject"
            :key='i'
            :style="{color:lyricIndex===i? 'red': 'black'}"
          >{{item.c}}
          </view>
        </scroll-view>
      </view>

      <view class='copy' @click='copyData'>
        <text class='iconfont icon-xiazai'></text>
        下载
      </view>
      <view class='copy' @click='shareF'>
        <text class='iconfont icon-xiazai'></text>
        分享朋友圈
      </view>

      <view class='music-list'>
        <view class='left' @click='showList'>
          <view class='iconfont icon-liebiao'></view>
          <view>列表</view>
        </view>
        <view class='right'>
          <view class='iconfont icon-search'></view>
          <view>搜索</view>
        </view>
      </view>
      <canvas canvas-id="firstCanvas" id="firstCanvas"></canvas>
      <musicList v-if='showlist' @showListCancel='cancelList'></musicList>
    </view>
  </view>
</template>

<script>
import musicList from '../../components/musicList'
export default {
  data(){
    return{
      showplay:true,
      showlist:false,
      musicImage:'',
      musicName:'',
      playUrl:'',
      id:'',
      lrcObject:[],
      lyricIndex:0,
      scrollIndex:0,
      canvasObj:{},
      musicImageCanvas:''
      

    }
  },
  onLoad(options){
    this.id=options.id
    this.getMusicDetail(options.id)
    this.getMusicUrl(options.id)
    this.monitor()
    setTimeout(()=>{
      this.addVuex()
      this.playMusic()
    },2000)
    this.getlyric(options.id)
    this.getData()
  },
  onShow(){
    console.log(this.selectMusic)
  },
  components:{
    musicList,
  },
  methods:{
    getcanvas(){
      return uni.createCanvasContext('firstCanvas')
    },
    shareF(){
      uni.showLoading({
        title: '正在生成中....'
      });
      let context = this.getcanvas()
      this.backcanvas(context)
      console.log(555)
    },
    backcanvas(ctx){
      ctx.setFillStyle('black')
      ctx.fillRect(0,0,340,500)
      this.wImagec(ctx)
      // ctx.draw()
    },
    wImagec(ctx){
      console.log(500)
      uni.downloadFile({
        url:this.musicImage,
        success: (res) => {
          if (res.statusCode === 200) {
            console.log(res.tempFilePath);
            ctx.drawImage(res.tempFilePath, 10, 10, 320, 200)
            this.wTextC(ctx)
            // ctx.draw()
          }
        },
        fail:(err)=>{
          console.log(err)
        }
      });
    },
    wTextC(ctx){
      ctx.setFillStyle('#fff')
      ctx.setFontSize(20)
      ctx.fillText(this.musicName,10,230)
      this.QRcode(ctx)
    },
    QRcode(ctx){
      uni.downloadFile({
        url:this.canvasObj.pic,
        success: (res) => {
          if (res.statusCode === 200) {
            console.log(res.tempFilePath);
            ctx.drawImage(res.tempFilePath, 10, 240, 100, 100)
            ctx.draw()
            setTimeout(()=>{
              this.canvasImg()
            },1000)
          }
        },
        fail:(err)=>{
          console.log(err)
        }
      });
    },
    canvasImg(){
      uni.canvasToTempFilePath({
        x:0,
        y:0,
        width:340,
        heihgt:500,
        desWidth:340,
        destHeiht:500,
        canvasId:'firstCanvas',
        success:function(res){
          uni.saveImageToPhotosAlbum({
            filePath:res.tempFilePath,
            success:(res)=>{
              console.log(res)
              uni.hideLoading();
              uni.showToast({
                title: '完成',
                duration: 2000
              });
            },
            fail:(err)=>{
            uni.showToast({
              title: '失败',
              duration: 2000
            });
            },
            complete:(res)=>{
              uni.hideLoading();
            }
          })
        }
      })
    },
    getMusicUrl(id){
      this.request('/song/url','GET',{id:id}).then(res=>{
        console.log(res)
        this.playUrl=res.data[0].url
      })
    },
    getMusicDetail(id){
      this.request('/song/detail','GET',{
        ids:id
      }).then(res=>{
        console.log(res,'in')
        this.musicImage=res.songs[0].al.picUrl
        this.musicImageCanvas=res.songs[0].al.picUrl
        console.log(this.musicImage,'iiiii')
        this.musicName=res.songs[0].name
      })
    },
    playMusic(){
      this.showplay=!this.showplay
      const bgAudioMannager = uni.getBackgroundAudioManager();
      if(!this.showplay){
        bgAudioMannager.title=this.musicName
        bgAudioMannager.src=this.playUrl
      }else{
        bgAudioMannager.pause()
      }
    },
    monitor(){
      const bgAudioMannager = uni.getBackgroundAudioManager();
      bgAudioMannager.onPlay(()=>{
        this.showplay=false
        this.$store.commit('getPlay',false)
      })
      bgAudioMannager.onPause(()=>{
        this.showplay=true
        this.$store.commit('getPlay',true)
      })
      bgAudioMannager.onTimeUpdate((res)=>{
        let time=parseFloat(bgAudioMannager.currentTime)
        this.getDuration(time)
      })
      bgAudioMannager.onEnded((res)=>{
        if(this.playStyle==1){
          bgAudioMannager.title=this.musicName
          bgAudioMannager.src=this.playUrl
        }else if(this.playStyle==2){

        }else{
          
        }

      })
    },
    getDuration(time) {
      for (let i = 0; i < this.lrcObject.length; i++) {
        //这里使用小于符号判断是为了 保证回退音乐进度事件的效果实现性
        if (time <= parseFloat(this.lrcObject[i].t)) {
          if (this.lyricIndex === i - 1) {
            break;
          }
          //找到比当前时间点 大一点的后一位的歌词的索引值
          this.lyricIndex = i - 1;
          this.scrollIndex = this.scrollIndex + 10;
          console.log(this.scrollIndex);
          break;
        }
      }
    },
    showList(){
      this.showlist=true
    },
    cancelList(){
      this.showlist=false
    },
    addVuex(){
      this.$store.commit('add',
        {
          name:this.musicName,
          id:this.id,
          url:this.playUrl,
          cover:this.musicImage
        }
      )
      this.$store.commit('changeAcStyle',this.id)
      this.$store.commit('addselectMusic',{
        name:this.musicName,
        id:this.id,
        url:this.playUrl,
        cover:this.musicImage})
      this.$store.commit('getCurrentMusic',{name:this.musicName,cover:this.musicImage})

      const bgAudioMannager = uni.getBackgroundAudioManager();

      this.$store.commit('getMusic',bgAudioMannager)
      
      console.log(this.$store.state.musicList)
    },   
    getlyric(id){
      this.request('/lyric','GET',{id:id}).then(res=>{
        console.log(res)
        this.createLrcObj(res.lrc.lyric)
      })
    },
    createLrcObj(lrc) {
      var oLRC = {
        ms: [], //歌词数组{t:时间,c:歌词}
      };
      if (lrc.length == 0) return;
      var lrcs = lrc.split("\n"); //用回车拆分成数组 (每一句歌词都用换行隔开了)
      for (var i in lrcs) {
        //遍历歌词数组
        lrcs[i] = lrcs[i].replace(/(^\s*)|(\s*$)/g, ""); //去除前后空格
        var arr = lrcs[i].match(/\[(\d+:.+?)\]/g); //提取时间字段，可能有多个
        var start = 0;
        for (var k in arr) {
          start += arr[k].length; //计算歌词位置 长度叠加
        }
        var content = lrcs[i].substring(start); //获取歌词内容 相当于减去时间字符串的长度剩下的就是内容
        for (var k in arr) {
          var t = arr[k].substring(1, arr[k].length - 1); //取[]间的内容
          // var t = arr[k]
          var s = t.split(":"); //分离:前后文字 便于计算成毫秒数
          oLRC.ms.push({
            //对象{t:时间,c:歌词}加入ms数组
            // t: t,
            t: (parseFloat(s[0]) * 60 + parseFloat(s[1])).toFixed(3),
            c: content === "" ? ".............." : content,
          });
        }
      }
      oLRC.ms.sort(function (a, b) {
        //按时间顺序排序
        return a.t - b.t;
      });
      // for (var i in oLRC) {
      //   //查看解析结果
      //   console.log(i, ":", oLRC[i]);
      // }
      this.lrcObject = oLRC.ms;
      console.log(this.lrcObject);
    },
    copyData(){
      uni.showModal({
        title: 'qq音乐',
        content: '点击复制,打开浏览器并在地址栏粘贴',
        confirmText:'复制',
        success: function (res) {
        if (res.confirm) {
            console.log('复制');
            uni.setClipboardData({
              data: 'hello',
              success: function () {
                uni.showToast({
                  title: '复制成功',
                  duration: 2000,
                  icon:'none'
                });
              }
            });
          } else if (res.cancel) {
            console.log('取消');
            uni.showToast({
              title: '取消复制成功',
              duration: 2000,
            });
          }
        }
      });
    },
    getData(){
      this.request('/dj/banner').then(res=>{
        this.canvasObj=res.data[0]
        // this.getCanvas()
      })
    },
  },
  computed:{
    selectMusic(){
      return this.$store.state.selectMusic
    },
    
  },
  watch:{
    selectMusic(val){
      console.log(val,55)
      if(val.id!=this.id){
        this.id=val.id
        this.musicImage=val.cover
      }
    }    
  }
}
</script>

<style lang='stylus'>
#firstCanvas{
  position absolute
  top -900rpx
  left 20rpx
  width 730rpx
  height 800rpx
  border 2rpx solid red
}
  .play-box
    .play-content
      height 100vh
      background-color rgba(1,1,1,.9)
      .musicName
        height 40rpx
        color #fff
        text-align center
        margin 20rpx 0
      .musicCover
        width 400rpx
        height 400rpx
        margin 0 auto
        image
          width 400rpx
          height 400rpx
          border-radius 50rpx
        .icon
          font-size 50rpx
          color #fff
      .lyric
        height 500rpx
        width 750rpx
        margin 0 auto
        margin-top 16rpx
        background-color: rgba(255,193,193,0.3);
        color #fff
        border-radius 30%
        overflow hidden
        .name
          text-align center
        .lyric-box
          padding 0 180rpx
          view 
            width 450rpx
            white-space:normal
            color #fff
      .copy
        width 400rpx
        border-radius 30rpx
        background-color rgba(14,190,73,0.644)
        padding 10rpx 0
        margin 0 auto
        margin-top 40rpx
        text-align center
        font-size 25rpx
      .music-list
        position fixed
        right 16rpx
        bottom 300rpx
        width 80rpx
        height 200rpx
        padding 20rpx 14rpx 
        background-color #ccc
        border-radius 40rpx
        .left
          .icon-liebiao
            padding-top 4rpx
            color #CD950C
          view 
            font-size 26rpx
            text-align center
        .right
          margin-top 30rpx
          .icon-search
            font-size 38rpx
            color #FF6A6A
          view 
            font-size 26rpx
            text-align center


</style>