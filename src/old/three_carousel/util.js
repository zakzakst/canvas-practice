export const BREAKPOINT = 768;
export const DEVICE_TYPES = ["pc", "sp"];

/**
 * デバイス判定
 * @returns string デバイスタイプ
 */
export const getDeviceType = () => {
  const index = document.body.clientWidth >= BREAKPOINT ? 0 : 1;
  return DEVICE_TYPES[index];
};
