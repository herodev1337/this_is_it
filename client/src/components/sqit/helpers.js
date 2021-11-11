import $, { type } from 'jquery';

const realWidth = percent => (window.innerWidth / 100) * percent;

const view_2_px = (vh, height = true) =>
  $(window)[height ? 'height' : 'width']() * (vh / 100);

// Code validation


const get_pureReturn = (codeStr, undefiniedRet=false) => {
  try {
    const value = new Function(codeStr)()
    return undefiniedRet ? undefiniedRet : value
  } catch (e) {
    return e.message
  }
};

const get_userCode = (codeStr, tarVar) => {
  let retString = `return ${tarVar}`;

  codeStr = codeStr[codeStr.length - 1] === ';' ? codeStr : codeStr + ';';

  try {
    let result = new Function(codeStr + retString);
    return [result(), true];
  } catch (e) {
    return [e.message, false];
  }
};

const get_validation = (codeStr, validator, variable) => {
  const [ret, _] = get_userCode(codeStr, variable);
  return ret === validator;
};

const animate_progressBar = seconds => {
  let width = 100;
  const ret = () => {
    const frame = () => {
      if (width <= 0) {
        clearInterval(id);
      } else {
        width--;
        $('.gameTimer .value').css({ transform: `translateX(${width * -1}%)` });
      }
    };
    let id = setInterval(frame, (seconds / 100) * 1000);
  };
  return ret;
};

const get_progressAnim = seconds => {
  let start;
  // let seconds = 60;
  let width = 100;

  const update_progressAnim = timestamp => {
    if (start === undefined) start = timestamp;

    const elapsed = (timestamp - start) / 1000 / seconds;
    const curWidth = width * elapsed;

    if (curWidth >= 100) return;

    $('.gameTimer .value').css({
      transform: `translateX(${-width + curWidth}%)`,
    });
    requestAnimationFrame(timestamp => update_progressAnim(timestamp));
  };

  return update_progressAnim;
};

export {
  realWidth,
  view_2_px,
  get_userCode,
  get_validation,
  get_pureReturn,
  animate_progressBar,
  get_progressAnim,
};
