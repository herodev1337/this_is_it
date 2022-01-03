import $ from 'jquery';

/** @module Sqit-General */

/**
 * Calculate width by percent.
 *
 * @param {number} percent Percentage to calculate
 * @returns {number} The real width in pixels
 */
const realWidth = (percent:number):number => (window.innerWidth / 100) * percent;

/**
 * Calculate width by view(height|width).
 *
 * @param {number} vh View(height|width) to calculate
 * @param {boolean} [height=true] Determine if height or width should be calculated
 * @returns View(height|width) in pixels
 */
const view_2_px = (vh:number, height = true) =>
  $(window)[height ? 'height' : 'width']() * (vh / 100);

/**
 * Eval code and return original return value or defined value.
 *
 * @param {string} codeStr A string representing javascript code
 * @param {(boolean|*)} [undefiniedRet=false] Determine if original return should be used or this value.
 * @returns {*}
 */
const get_pureReturn = (codeStr:string, undefiniedRet = false) => {
  //! get out of here
  try {
    const value = new Function(codeStr)();
    return undefiniedRet ? undefiniedRet : value;
  } catch (e) {
    return e.message;
  }
};

/**
 * This function tries to get a value from an variable inside an code text.
 * We will construct a function by appending a return statement to the given text ($codeStr) which returns the given variable ($tarVar).
 * We then try to execute the constructed function and save it's result.
 * We also catch if any error happens (eg. because of bad code).
 * We return the result, either the result of the constructed function or the error,
 * plus an status message indicating if we run into an error as an array.
 *
 * This whole process should be worked out as iframe for the future.
 * This whole process is way to unsecure to be actually released. Sry :/
 *
 * @param {string} codeStr A string representing javascript code
 * @param {string} tarVar A string containing the name of the variable which should be returned
 * @returns {Array} Array containing the returned message and a boolean value indicating the error state.
 */
const get_userCode = <T>(codeStr:string, tarVar:string):[string,boolean]|[T[],boolean]|[any,boolean] => {
  let retString = `return ${tarVar}`;

  codeStr = codeStr[codeStr.length - 1] === ';' ? codeStr : codeStr + ';';

  try {
    let result = new Function(codeStr + retString);
    return [result(), true];
  } catch (e) {
    return [e.message, false];
  }
};

const get_validation = (codeStr:string, validator:string, variable:string):boolean => {
  const [ret, _] = get_userCode(codeStr, variable);
  return ret === validator;
};

const animate_progressBar = (seconds:number) => {
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

const get_progressAnim = (seconds:number) => {
  let start: undefined | number
  // let seconds = 60;
  let width = 100;

  const update_progressAnim = (timestamp:number) => {
    if (start === undefined) start = timestamp;

    const elapsed = (timestamp - start) / 1000 / seconds;
    const curWidth = width * elapsed;

    if (curWidth >= 100) return;

    $('.gameTimer .value').css({
      transform: `translateX(${-width + curWidth}%)`,
    });
    requestAnimationFrame((timestamp) => update_progressAnim(timestamp));
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
