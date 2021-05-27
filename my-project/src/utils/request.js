/*
 * @Description: 99
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2021-03-07 13:45:28
 * @LastEditors: Seven
 * @LastEditTime: 2021-03-10 14:46:11
 */

let baseUrl='https://autumnfish.cn'
export default(url,method='GET',data={})=>{
  uni.showLoading({
    title: '加载中'
  });
  return new Promise((resolve,reject)=>{
    uni.request({
      url:baseUrl+url , //仅为示例，并非真实接口地址。
      method:method,  
      data: data,

      success: (res) => {
        resolve(res.data)
      },
      fail:(err)=>{
        reject(err)
      },
      complete:()=>{
        uni.hideLoading();
      }
  });
  })
}