import React from 'react';
import moment from 'moment';
import { Modal, message } from 'antd';
// import { formatMessage } from 'umi/locale';
import Ellipsis from '../components/Ellipsis';

function isResOK(response) {
  if (response && parseInt(response.ok, 10) === 4000 || parseInt(response.ok, 10) === 4010) {
    return true;
  }
  message.error(response.msg);
  return false;
}

function deleteConfirm(text, id, delExcute) {
  Modal.confirm({
    title: `删除${text}`,
    content: `确定删除该${text}吗？`,
    okText: '确认',
    cancelText: '取消',
    onOk: () => delExcute(id),
  });
}

function elliStr(str, num) {
  return (
    <Ellipsis tooltip={str} length={num}>
      {str}
    </Ellipsis>
  );
}

function renderForNull(val, rtnVal) {
  if (!val) return rtnVal;
  return val;
}

function disabledDateCurAfter(current) {
  // Can not select days before today and today
  return current && current < moment().endOf('day');
}

function disabledDateCurBefore(current) {
  // Can not select days before today and today
  return current && current >= moment().endOf('day');
}

export {
  isResOK,
  deleteConfirm,
  elliStr,
  renderForNull,
  disabledDateCurAfter,
  disabledDateCurBefore,
};
