import $ from 'jquery';

const realWidth = percent => ($(window).width() / 100) * percent;

const view_2_px = (vh, height = true) =>
  $(window)[height ? 'height' : 'width']() * (vh / 100);

// Code validation

const get_userCode = (codeStr, tarVar) => {
  let retString = `return ${tarVar}`;

  codeStr = codeStr[codeStr.length - 1] === ';' ? codeStr : codeStr + ';';

  try {
    let result = new Function(codeStr + retString);
    return result();
  } catch (e) {
    return e;
  }
};

const get_validation = (codeStr, validator, variable) => {
  const ret = get_userCode(codeStr, variable);
  return ret === validator;
};

export { realWidth, view_2_px, get_userCode, get_validation };
