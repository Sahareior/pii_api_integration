import React, { useState } from 'react';
import { Button, Modal } from 'antd';
const Reusable_Modal = ({isModalOpen,setIsModalOpen,children}) => {


  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal
        style={{ top: 20 }}
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div className='py-6'>
            {children}
        </div>
      </Modal>
    </>
  );
};
export default Reusable_Modal;