import {showMessage} from 'react-native-flash-message';
import {colors} from '../Colors';

export const ShowError = message => {
  showMessage({
    message: message,
    backgroundColor: colors.error,
    color: colors.white,
    type: 'info',
  });
};

export const ShowSuccess = message => {
  showMessage({
    message: message,
    backgroundColor: colors.primary,
    color: colors.white,
    type: 'info',
  });
};
