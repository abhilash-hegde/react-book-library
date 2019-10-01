import React from 'react';
import { message } from 'antd';
message.config({
    top: 70,
    duration: 2,
    maxCount: 3,
  });

export const successNotification = (msg) => {
    message.success(msg);
};

export const errorNotification = (msg) => {
    message.error(msg);
};

export const warningNotification = (msg) => {
    message.warning(msg);
};

export const infoNotification = (msg) => {
    message.info(msg);
};

export const loadingNotification = () => {
    const hide = message.loading('Action in progress..', 0);
    setTimeout(hide, 2500);
  };