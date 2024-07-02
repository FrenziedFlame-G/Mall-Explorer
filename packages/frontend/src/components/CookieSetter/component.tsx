import { RESPONSE_STATUS } from '@/enum/request';
import { useRemote } from '@/hooks/useRemote';
import { Button, Input, Modal } from 'antd';
import { useState } from 'react';

interface Props {
  onClose?: (status: 'SUCCESS' | 'CANCEL') => void;
}

export default function CookieSetter({ onClose }: Props) {
  const [isCookieSetterOpen, setIsCookieSetterOpen] = useState(false);
  const [cookie, setCookie] = useState('');
  const { setRemoteCookie } = useRemote();

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
        open={isCookieSetterOpen}
        closable={false}
        onCancel={() =>{
          setIsCookieSetterOpen(false);
          onClose?.('CANCEL');
        }}
        onOk={() => {
          if(!cookie) {
            return
          }
          setRemoteCookie(cookie)
            .then(({ data: { status } }) => {
              if (status === RESPONSE_STATUS.SUCCESS) {
                setIsCookieSetterOpen(false);
                onClose?.('SUCCESS');
              }
            });
        }}
      >
        <Input.TextArea
          rows={8}
          value={cookie}
          onChange={({ currentTarget: {value} }) => setCookie(value)}
        ></Input.TextArea>
      </Modal>
    </>
  );
}
