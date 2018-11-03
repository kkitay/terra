const toggleWindow = (window, showWindowCB) => {
  if (window.isVisible()) {
    window.hide();
  } else {
    showWindowCB();
  }
};

export default toggleWindow;
