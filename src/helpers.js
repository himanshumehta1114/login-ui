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
export const formatMobile = (mobNum) => {
  if (mobNum.length > 7) {
    return insertSpace(mobNum, 8);
  }

  if (mobNum.length > 3) {
    return insertSpace(mobNum, 3);
  }

  return mobNum;
};
