import Router from "koa-router";
import Config from '../dbs/config';
import axios from "./utils/axios"
import Poi from "../dbs/models/poi"

const router = new Router({
  prefix: '/search'
})

const sign = Config.sign;

router.get('/top', async (ctx)=>{
      let {status, data: {top}} = await axios.get(`${Config.requestUrl}/search/top`, {
        params: {
          input: ctx.query.input,
          city: ctx.query.city,
          sign
        }
      })
      ctx.body = {
        top: status === 200 ? top : []
      }
})

router.get('/hotPlace', async (ctx)=>{
  let city = ctx.store ? ctx.store.geo.position.city : ctx.query.city;
  let {status, data: {result}} = await axios.get(`${Config.requestUrl}/search/hotPlace`, {
    params: {
      city: city,
      sign
    }
  })
  ctx.body = {
    result: status === 200 ? result : []
  }
})

router.get('/resultsByKeywords', async (ctx)=>{
  const {city, keyword} = ctx.query;
  let {status, data:{count, pois}} = await axios.get(`${Config.requestUrl}/search/resultsByKeywords`, {
    params: {
      city,
      keyword,
      sign
    }
  })
  ctx.body = {
    count: status === 200 ? count : 0,
    pois: status === 200 ? pois: []
  }
})

export default router;
