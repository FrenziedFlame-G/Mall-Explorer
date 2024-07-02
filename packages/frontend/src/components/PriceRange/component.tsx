import { InputNumber } from 'antd';

export default function PriceRange({
  value = [],
  onChange,
}: CustomFormItemProps) {
  const [lowValue, highValue] = value;

  return (
    <div className="flex items-center">
      <InputNumber
        className="mr-[12px]"
        value={lowValue}
        controls={false}
        onChange={(value) => {
          onChange?.([value, highValue]);
        }}
      />
      至
      <InputNumber
        className="ml-[12px]"
        value={highValue}
        controls={false}
        onChange={(value) => {
          onChange?.([lowValue, value]);
        }}
      />
    </div>
  );
}
