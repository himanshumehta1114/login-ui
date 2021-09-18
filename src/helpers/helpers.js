/**
 * adds spaces on supplied index
 *
 * @param {string} num - mobile number string
 * @param {*} idx - index to add space on
 * @returns returns mobile number string with spaces
 */

const insertSpace = (num, idx) => {
  // check if space already exists
  if (num[idx] === " ") {
    return num;
  }

  num = num.split("");
  num.splice(idx, 0, " ");
  num = num.join("");

  return num;
};

/**
 * formats mobile number input to human readable string
 *
 * @param {string} mobNum - mobile number string
 * @returns returns human readable mobile number string
 */
export const formatMobileInput = (mobNum) => {
  if (mobNum.length > 3) {
    mobNum = insertSpace(mobNum, 3);
  }

  if (mobNum.length > 7) {
    mobNum = insertSpace(mobNum, 8);
  }

  return mobNum;
};

/**
 * formats mobile number output to plain text without spaces
 *
 * @param {string} mobNum - mobile number string
 * @returns returns plain mobile number string
 */
export const formatMobileOutput = (mobNum) =>
  mobNum
    .split("")
    .filter((_) => _ !== " ")
    .join("");
