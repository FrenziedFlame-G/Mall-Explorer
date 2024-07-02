import { Button, Input, Modal } from 'antd';
import { Props } from './component';

export default function CookieSetter({}: Props) {
  const [isCookieSetterOpen, setIsCookieSetterOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => {
          setIsCookieSetterOpen(true);
        }}
      >
        设置cookie
      </Button>
      <Modal
        open={isOpen}
        closable={false}
        onCancel={() => setIsCookieSetterOpen(false)}
        onOk={() => {
          setCookie({ a: '123' }).then(({ data: { status } }) => {
            if (status === RESPONSE_STATUS.SUCCESS) {
              setHasCookie(true);
              setIsCookieSetterOpen(false);
            }
          });
        }}
      >
        <Input.TextArea rows={8}></Input.TextArea>
      </Modal>
    </>
  );
}
