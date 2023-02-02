import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

// when using setOnKeyboardX remember to wrap function in anonymous function example:
// setOnKeyboardShow(()=>()=>console.log("Dont forget to wrap!"))
export default function useKeyboardStateChangeListener() {
  const [onKeyboardShow, setOnKeyboardShow] = useState<() => void>(() => () => undefined);
  const [onKeyboardHide, setOnKeyboardHide] = useState<() => void>(() => () => undefined);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      onKeyboardShow();
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      onKeyboardHide();
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, [onKeyboardShow, onKeyboardHide]);
  return [setOnKeyboardShow, setOnKeyboardHide];
}
