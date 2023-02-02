import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

// when using setOnKeyboardX remember to wrap function in anonymous function example:
// setOnKeyboardShow(()=>()=>console.log("Dont forget to wrap!"))
export default function useKeyboardStateChangeListener() {
  const [onKeyboardShow, setOnKeyboardShow] = useState<() => void>(() => () => undefined);
  const [onKeyboardHide, setOnKeyboardHide] = useState<() => void>(() => () => undefined);
  const [onKeyboardWillShow, setOnKeyboardWillShow] = useState<() => void>(() => () => undefined);
  const [onKeyboardWillHide, setOnKeyboardWillHide] = useState<() => void>(() => () => undefined);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      onKeyboardShow();
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      onKeyboardHide();
    });
    // Doesnt work on android
    const keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', () => {
      onKeyboardWillHide();
    });
    const keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', () => {
      onKeyboardWillHide();
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
      keyboardWillHideListener.remove();
      keyboardWillShowListener.remove();
    };
  }, [onKeyboardShow, onKeyboardHide, onKeyboardWillHide, onKeyboardWillShow]);
  return { setOnKeyboardShow, setOnKeyboardHide, setOnKeyboardWillShow, setOnKeyboardWillHide };
}
