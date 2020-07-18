import {request} from "./request"

export function getDetail(iid){
  return request({
    url:'/api/v1/detail',
    params:{
      iid
    }
  })
}

export class GoodsInfo{
  constructor(itemInfo,columns,services){
    this.title=itemInfo.title
    this.desc=itemInfo.desc
    this.newPrice=itemInfo.price
    this.oldPrice=itemInfo.oldPrice
    this.discoint=itemInfo.discountDesc
    this.columns=columns
    this.services=services
    this.realPrice=itemInfo.lowNowPrice
  }
}
export class Shop {
  constructor(shopInfo){
    this.logo =shopInfo.shopLogo;
    this.name=shopInfo.name;
    this.fans=shopInfo.cFans;
    this.sells=shopInfo.cSells;
    this.score=shopInfo.score;
    this.goodsCount=shopInfo.cGodds
  }
}
export class GoodsParam{
  constructor(info,rule){
    this.image=info.image?info.image[0]:'';
    this.infos =info.set;
    this.sizes=rule.tables;
  }
}