interface Props {
  goodsList: Good[];
}

const GoodCard = ({ good }: { good: Good }) => {
  return (
    <div
      className="flex flex-col padding-[12px] cursor-pointer"
      onClick={() => {
        window.open(
          `https://mall.bilibili.com/neul-next/index.html?page=magic-market_detail&noTitleBar=1&itemsId=${good.c2cItemsId}&from=market_index`
        );
      }}
    >
      <img
        src={`http:${good.detailDtoList[0].img}`}
        alt=""
        referrerPolicy="no-referrer"
      />
      <span className="truncate" title={good.c2cItemsName}>
        {good.c2cItemsName}
      </span>
      <span>价格: {good.showPrice}</span>
    </div>
  );
};
export default function GoodsList({ goodsList }: Props) {
  return (
    <div className="grid grid-cols-4 min-h-0 overflow-auto">
      {(goodsList || []).map((good) => (
        <GoodCard key={good.c2cItemsId} good={good} />
      ))}
    </div>
  );
}
