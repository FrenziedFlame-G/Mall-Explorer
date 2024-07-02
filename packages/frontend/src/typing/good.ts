interface GoodDetail {
  blindBoxId: number;
  itemsId: number;
  skuId: number;
  name: string;
  img: string;
  marketPrice: number;
  type: number;
  isHidden: boolean;
}

interface Good {
  c2cItemsId: number;
  type: number;
  c2cItemsName: string;
  detailDtoList: GoodDetail[];
  totalItemsCount: number;
  price: number;
  showPrice: string;
  showMarketPrice: string;
  uid: string;
  paymentTime: number;
  isMyPublish: boolean;
  uname: string;
  uspaceJumpUrl: string;
  uface: string;
}
