import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {IconBackDark, IconBackLight} from '../../../assets/icon';

//khusus untuk icon
export default function IconOnly({onPress, icon}) {
  const Icon = () => {
    if (icon === 'back-dark') {
      return <IconBackDark />;
    }
    if (icon === 'back-light') {
      return <IconBackLight />;
    }
    return <IconBackDark />;
  };
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon />
    </TouchableOpacity>
  );
}
