import React, { useState } from 'react';

import { Switch as ChakraSwitch } from '@chakra-ui/react';

interface ICustomSwitch {
  defaultValue: boolean;

  onChange(type: boolean): void;
}

export const Switch = ({ defaultValue, onChange }: ICustomSwitch) => {
  const [isChecked, setIsChecked] = useState(defaultValue);
  const changeValue = () => {
    setIsChecked(!isChecked);
    onChange(!isChecked);
  };
  return <ChakraSwitch ml={2} isChecked={isChecked} onChange={changeValue} />;
};
