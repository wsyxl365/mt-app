import Router from "koa-router";
import Config from '../dbs/config';
import axios from "./utils/axios"
import Province from "../dbs/models/province"

let router = new Router({
  prefix: "/geo"
})

const sign = Config.sign;

router.get('/getPosition', async (ctx)=>{
  let {status, data: {province,city}} = await axios.get(`http://cp-tools.cn/geo/getPosition?sign=${sign}`)
    if(status === 200) {
        ctx.body = {
          province,
          city
        }
    }
    else
    {
      ctx.body = {
        province: '',
        city: ''
      }
    }
})

router.get('/menu', async (ctx)=>{
  let {status, data: {menu}} = await axios.get(`${Config.requestUrl}/geo/menu?sign=${sign}`);
  if(status === 200) {
    ctx.body = {
      menu
    }
  } else {
    ctx.body = {
      menu: []
    }
  }
})

router.get('/province', async (ctx)=>{
  // let province = await Province.find();
  // console.log(province);
  // ctx.body = {
  //   province: province.map(item => {
  //     return {
  //       id: item.id,
  //       name: item.value[0]
  //     }
  //   })
  // }

  let {status, data: {province}} = await axios.get(`${Config.requestUrl}/geo/province?sign=${sign}`)
  ctx.body = {
    province:status === 200 ? province : []
  }
})

router.get('/province/:id', async (ctx)=>{

})

export default router;
