import { validate } from "./engine";
import { MastermindColor } from "./types";

describe("Mastermind Engine - Critical Cases", () => {
  test("should return correct matches when guess has more repeated colors than secret", () => {
    //prepare
    const secret: MastermindColor[] = ["RED", "RED", "BLUE", "BLUE"];
    const guess: MastermindColor[] = ["RED", "RED", "RED", "YELLOW"];

    //act
    const result = validate(secret, guess);

    const matches = result.filter((r) => r === "MATCH").length;
    const colorOnly = result.filter((r) => r === "COLOR_ONLY").length;
    const none = result.filter((r) => r === "NONE").length;

    //assert

    expect(matches).toBe(2);
    expect(colorOnly).toBe(0);
    expect(none).toBe(2);
  });

  test("should return all COLOR_ONLY when all colors are present but in wrong positions", () => {
    //prepare
    const secret: MastermindColor[] = ["RED", "BLUE", "GREEN", "YELLOW"];
    const guess: MastermindColor[] = ["BLUE", "RED", "YELLOW", "GREEN"];
    //act
    const result = validate(secret, guess);
    //assert
    expect(result.every((r) => r === "COLOR_ONLY")).toBe(true);
  });

  test("should return only one MATCH when secret has repeated colors but guess has only one", () => {
    //prepare
    const secret: MastermindColor[] = ["RED", "RED", "BLUE", "YELLOW"];
    const guess: MastermindColor[] = ["RED", "GREEN", "GREEN", "GREEN"];
    //act
    const result = validate(secret, guess);

    const matches = result.filter((r) => r === "MATCH").length;
    const none = result.filter((r) => r === "NONE").length;

    //assert
    expect(matches).toBe(1);
    expect(none).toBe(3);
  });
  test("should not give extra COLOR_ONLY clues when guess has repeated colors but secret has only one ", () => {
    //prepare
    const secret: MastermindColor[] = ["RED", "BLUE", "GREEN", "YELLOW"];
    const guess: MastermindColor[] = ["RED", "RED", "PURPLE", "PURPLE"];
    //act
    const result = validate(secret, guess);

    const matches = result.filter((r) => r === "MATCH").length;
    const none = result.filter((r) => r === "NONE").length;

    //assert
    expect(matches).toBe(1);
    expect(none).toBe(3);
  });
  test("should return all NONE when no colors match ", () => {
    //prepare
    const secret: MastermindColor[] = ["RED", "RED", "RED", "RED"];
    const guess: MastermindColor[] = ["BLUE", "BLUE", "BLUE", "BLUE"];
    //act
    const result = validate(secret, guess);

    const none = result.filter((r) => r === "NONE").length;

    //assert
    expect(none).toBe(4);
  });
  test("should mark a color as COLOR_ONLY if it exists in secret and was not matched by position", () => {
    const secret: MastermindColor[] = ["RED", "BLUE", "GREEN", "YELLOW"];
    const guess: MastermindColor[] = ["ORANGE", "RED", "PURPLE", "ORANGE"];

    // RED at guess[1] should not match with secret[0] because secret[0] is reserved for a potential matchPosition
    // In this case, since there is no RED at guess[0], the RED at guess[1] SHOULD be COLOR_ONLY.
    // BUT, if the guess was ["RED", "RED", "PURPLE", "PINK"], the second RED should be NONE.

    const result = validate(secret, guess);
    const colorOnly = result.filter((r) => r === "COLOR_ONLY").length;

    expect(result[1]).toBe("COLOR_ONLY");
  });
  test("should exhaust color supply in second pass", () => {
    const secret: MastermindColor[] = ["RED", "RED", "BLUE", "YELLOW"];
    const guess: MastermindColor[] = ["BLUE", "RED", "RED", "RED"];

    const result = validate(secret, guess);

    expect(result.filter((r) => r === "MATCH").length).toBe(1);
    expect(result.filter((r) => r === "COLOR_ONLY").length).toBe(2);
    expect(result.filter((r) => r === "NONE").length).toBe(1);
  });

  test("should handle multiple swapped positions correctly", () => {
    const secret: MastermindColor[] = ["RED", "BLUE", "GREEN", "YELLOW"];
    const guess: MastermindColor[] = ["BLUE", "RED", "YELLOW", "GREEN"];

    const result = validate(secret, guess);

    // All should be COLOR_ONLY
    expect(result.every((r) => r === "COLOR_ONLY")).toBe(true);
  });
  test("should return a mix of MATCH, COLOR_ONLY and NONE for complex guesses", () => {
    // Prepare
    const secret: MastermindColor[] = ["RED", "BLUE", "RED", "YELLOW"];
    const guess: MastermindColor[] = ["RED", "RED", "GREEN", "BLUE"];

    // Act
    const result = validate(secret, guess);

    // Assert

    expect(result).toEqual(["MATCH", "COLOR_ONLY", "NONE", "COLOR_ONLY"]);
  });

  test("should return all MATCH for a fully correct guess with repetitions", () => {
    // Prepare
    const secret: MastermindColor[] = ["GREEN", "GREEN", "YELLOW", "YELLOW"];
    const guess: MastermindColor[] = ["GREEN", "GREEN", "YELLOW", "YELLOW"];

    // Act
    const result = validate(secret, guess);

    // Assert
    expect(result.every((r) => r === "MATCH")).toBe(true);
  });

});
