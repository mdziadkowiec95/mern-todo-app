// Function to check if color is valid RGB or HEX format
exports.isValidColor = color => {
  const isValidRGB = /rgb\((\d{1,3}),\s?(\d{1,3}),\s?(\d{1,3})\)/;
  const isValidHex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/;
  const isValidColor = isValidHex.test(color) || isValidRGB.test(color);

  return isValidColor;
};
