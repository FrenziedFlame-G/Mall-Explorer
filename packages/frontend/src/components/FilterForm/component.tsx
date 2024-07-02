import { SORT_TYPE } from '@/enum/param';
import { Button, Form, Input } from 'antd';
import { useState } from 'react';
import DiscountRange from '../DiscountRange';
import PriceRange from '../PriceRange';
import SortTypeSelect from '../SortTypeSelect';

interface Props {
  disabled?: boolean;
  onSearch?: (searchParam: any) => void;
  onStop?: () => void;
}
export default function FilterForm({ disabled, onSearch, onStop }: Props) {
  const [searching, setSearching] = useState(false);

  return (
    <Form
      className="w-[500px]"
      disabled={disabled}
      onFinish={(value) => {
        if (value['discountFilters']) {
          const [lowValue = 0, highValue = 0] = value[
            'discountFilters'
          ] as number[];
          value['discountFilters'] = [`${lowValue * 10}-${highValue * 10}`];
        }
        if (value['priceFilters']) {
          const [lowValue = 0, highValue = 0] = value[
            'priceFilters'
          ] as number[];
          value['priceFilters'] = [`${lowValue * 100}-${highValue * 100}`];
        }
        onSearch?.(value);
        setSearching(true);
      }}
    >
      <Form.Item name="searchValue" label="关键字">
        <Input />
      </Form.Item>

      <Form.Item name="discountFilters" label="折扣">
        <DiscountRange />
      </Form.Item>

      <Form.Item name="priceFilters" label="价格">
        <PriceRange />
      </Form.Item>

      <Form.Item
        name="sortType"
        label="排序"
        initialValue={SORT_TYPE.TIME_DESC}
      >
        <SortTypeSelect />
      </Form.Item>

      <Form.Item>
        <Button
          danger
          className="mr-[12px]"
          disabled={!searching}
          onClick={() => {
            setSearching(false);
            onStop?.();
          }}
        >
          停止搜索
        </Button>

        <Button type="primary" htmlType="submit" disabled={searching}>
          搜索
        </Button>
      </Form.Item>
    </Form>
  );
}
