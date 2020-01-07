const { isValidColor } = require("../utils/validators");

describe("Validators tests", () => {
  describe("isValidColor function", () => {
    it("should return FALSE if color has not valid format", () => {
      expect(isValidColor("c41241")).toBe(false);
      expect(isValidColor("aa")).toBe(false);
      expect(isValidColor("rgba(255,255)")).toBe(false);
    });

    it("should return TRUE if color has valid HEX or RGB format", () => {
      expect(isValidColor("#fff")).toBe(true);
      expect(isValidColor("#fffaaa")).toBe(true);
      expect(isValidColor("rgb(255,255,255)")).toBe(true);
      expect(isValidColor("rgb(255,255,255)")).toBe(true);
    });
  });
});
