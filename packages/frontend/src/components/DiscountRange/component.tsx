import { InputNumber } from 'antd';

export default function DiscountRange({
  value = [],
  onChange,
}: CustomFormItemProps) {
  const [lowValue, highValue] = value;

  return (
    <div className="flex items-center">
      <span className="mr-[12px]">
        <InputNumber
          className="mr-[4px]"
          value={lowValue}
          controls={false}
          min={1}
          max={highValue ? highValue - 1 : 9}
          precision={0}
          onChange={(value) => {
            onChange?.([value, highValue]);
          }}
        />
        折
      </span>
      至
      <span className="ml-[12px]">
        <InputNumber
          className="mr-[4px]"
          min={lowValue ? lowValue + 1 : 1}
          max={9}
          value={highValue}
          controls={false}
          precision={0}
          onChange={(value) => {
            onChange?.([lowValue, value ]);
          }}
        />
        折
      </span>
    </div>
  );
}
