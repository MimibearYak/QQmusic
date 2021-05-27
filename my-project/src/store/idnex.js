/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2021-03-07 22:23:52
 * @LastEditors: Seven
 * @LastEditTime: 2021-03-09 19:37:47
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);//vue的插件机制

//Vuex.Store 构造器选项
const store = new Vuex.Store({
    state:{//存放状态
      musicList:[],
      currentID:'',
      currentMusic:{},
      MusicExample:'',
      play:true,
      selectMusic:{}
    },
    mutations:{
      add(state,item){
        let index=state.musicList.findIndex((items)=>{
          return items.id==item.id
        })
        if(index==-1){
          state.musicList.push(item)
        }
      },
      changeAcStyle(state,item){
        state.currentID=item
      },
      getCurrentMusic(state,item){
        state.currentMusic=item
      },
      getMusic(state,item){
        state.MusicExample=item
      },
      getPlay(state,item){
        state.play=item
      },
      addselectMusic(state,item){
        state.selectMusic=item
      }
    },


})
export default store