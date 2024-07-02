import { SORT_TYPE } from '@/enum/param';
import { Select } from 'antd';

const options: {
  label?: React.ReactNode;
  value?: string | number | null;
}[] = [
  { label: '按发布时间', value: SORT_TYPE.TIME_DESC },
  { label: '价格升序', value: SORT_TYPE.PRICE_ASC },
  { label: '价格降序', value: SORT_TYPE.PRICE_DESC },
];

export default function SortTypeSelect({
  value,
  onChange,
}: CustomFormItemProps) {
  return <Select options={options} value={value} onChange={onChange} />;
}
