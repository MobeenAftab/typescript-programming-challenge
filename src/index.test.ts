import { join } from "path";

import {
  solveFirstQuestion,
  solveSecondQuestion,
  solveThirdQuestion,
  datetimeRegexp,
  extractDates,
} from "./index";

describe("Input File: input0.txt", () => {
  const inputFilePath = join(__dirname, "../assets/input0.txt");

  it("returns the correct answer for the first question", async () => {
    const answer = await solveFirstQuestion(inputFilePath);

    expect(answer).toEqual("2020-01-01T12:00:00.000Z");
  });

  it("returns the correct answer for the second question", async () => {
    const answer = await solveSecondQuestion(inputFilePath);

    expect(answer).toEqual("2020-01-02T12:00:00.000Z");
  });

  it("returns the correct answer for the third question", async () => {
    const answer = await solveThirdQuestion(inputFilePath);

    expect(answer).toEqual([
      "2020-01-01T18:00:00.000Z/2020-01-01T19:00:00.000Z",
      "2020-01-02T09:00:00.000Z/2020-01-02T10:00:00.000Z",
    ]);
  });
});

describe("Input File: input1.txt", () => {
  const inputFilePath = join(__dirname, "../assets/input1.txt");

  it("returns the correct answer for the first question", async () => {
    const answer = await solveFirstQuestion(inputFilePath);

    expect(answer).toEqual("2020-01-01T12:00:00.000Z");
  });

  it("returns the correct answer for the second question", async () => {
    const answer = await solveSecondQuestion(inputFilePath);

    expect(answer).toEqual("2020-01-02T14:00:00.000Z");
  });

  it("returns the correct answer for the third question", async () => {
    const answer = await solveThirdQuestion(inputFilePath);

    expect(answer).toEqual([
      "2020-01-01T17:00:00.000Z/2020-01-01T19:00:00.000Z",
      "2020-01-02T09:00:00.000Z/2020-01-02T12:00:00.000Z",
    ]);
  });
});

describe("Input File: input2.txt", () => {
  const inputFilePath = join(__dirname, "../assets/input2.txt");

  it("returns the correct answer for the first question", async () => {
    const answer = await solveFirstQuestion(inputFilePath);

    expect(answer).toEqual("2020-01-01T00:15:00.000Z");
  });

  it("returns the correct answer for the second question", async () => {
    const answer = await solveSecondQuestion(inputFilePath);

    expect(answer).toEqual("2020-01-01T19:15:00.000Z");
  });

  it("returns the correct answer for the third question", async () => {
    const answer = await solveThirdQuestion(inputFilePath);

    expect(answer).toEqual([
      "2020-01-01T00:15:00.000Z/2020-01-01T16:00:00.000Z",
      "2020-01-01T16:45:00.000Z/2020-01-01T17:30:00.000Z",
      "2020-01-01T18:30:00.000Z/2020-01-01T19:15:00.000Z",
    ]);
  });
});

describe("test datetime extraction", () => {
  it("regexp should extract datetime from a worker input", () => {
    const datetime = "2020-01-01T00:15:00.000Z/2020-01-01T16:00:00.000Z";
    expect(datetimeRegexp.test(datetime)).toBeTruthy();
  });

  it("should return an array of dates given a string of interval times", () => {
    const datetime = "1@[2020-01-01T12:00:00.000Z/2020-01-02T12:00:00.000Z] ";
    const arr = extractDates(datetime);
    const expectedArr = [
      new Date("2020-01-01T12:00:00.000Z"),
      new Date("2020-01-02T12:00:00.000Z"),
    ];
    expect(arr).toStrictEqual(expectedArr);
  });
});
