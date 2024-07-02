import CookieSetter from '@/components/CookieSetter/component';
import FilterForm from '@/components/FilterForm';
import GoodsList from '@/components/GoodsList';
import { useRemote } from '@/hooks/useRemote';
import { Modal } from 'antd';
import { useCallback, useRef, useState } from 'react';

export default function HomePage() {
  const [hasCookie, setHasCookie] = useState(false);
  const [goodsList, setGoodsList] = useState<Good[]>([]);
  const stop = useRef(false);
  const { search } = useRemote();

  const searchGoods = useCallback(
    async (params: any, initNextId: string | null = null) => {
      const {
        data: { data, status },
      } = await search({
        ...params,
        nextId: initNextId,
      });

      if (status === 'UNAUTHORIZED') {
        Modal.error({ content: '无效的cookie，请重新设置' });
        stop.current = false;
        return;
      }
      if (stop.current) {
        stop.current = false;
        return;
      }

      const { data: list, nextId } = data;
      setGoodsList((goodsList) => [...(goodsList || []), ...(list || [])]);

      await new Promise((resolve) => setTimeout(() => resolve(null), 1000));
      searchGoods(params, nextId);
    },
    [search]
  );

  return (
    <div className="p-[24px] flex flex-col max-h-screen">
      <div className="flex items-center mb-[24px]">
        <h1 className="text-xl mr-[12px]">市集搜索器</h1>
        <CookieSetter
          onClose={(status) => {
            if (status === 'SUCCESS') {
              setHasCookie(true);
            }
          }}
        />
      </div>
      <div>
        <FilterForm
          disabled={!hasCookie}
          onSearch={(params) => {
            setGoodsList([]);
            searchGoods(params);
          }}
          onStop={() => (stop.current = true)}
        />
      </div>
      <GoodsList goodsList={goodsList} />
    </div>
  );
}
