import { readFileSync, createReadStream } from "fs";
import readline from "readline";

interface Intervals {
  id: string;
  times: string[];
}

// https://stackoverflow.com/questions/3143070/javascript-regex-iso-datetime
export const datetimeRegexp =
  /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/gm;

export async function solveFirstQuestion(
  inputFilePath: string
): Promise<string> {
  const fileStream = createReadStream(inputFilePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let earliest: Date | null = null;

  for await (const line of rl) {
    let start: Date | null = null;

    const arr = extractDates(line);

    // map over arr to find the earliest date first
    start =
      arr?.sort((a: Date, b: Date) => +a.getTime() - +b.getTime())[0] ?? null;

    if (earliest === null) {
      earliest = start;
    } else if (earliest && start) {
      earliest = earliest.getTime() < start.getTime() ? earliest : start;
    }
  }
  return earliest?.toISOString() ?? "";
}

export async function solveSecondQuestion(
  inputFilePath: string
): Promise<string> {
  const fileStream = createReadStream(inputFilePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let latest: Date | null = null;

  for await (const line of rl) {
    let end: Date | null = null;

    const arr = extractDates(line);

    // map over arr to find the latest date first
    end =
      arr?.sort((a: Date, b: Date) => +b.getTime() - +a.getTime())[0] ?? null;

    if (latest === null) {
      latest = end;
    } else if (latest && end) {
      latest = latest.getTime() > end.getTime() ? latest : end;
    }
  }
  return latest?.toISOString() ?? "";
}

// Did not understand question requirements
export async function solveThirdQuestion(
  inputFilePath: string
): Promise<string[]> {
  // TODO: Solve me!
  return [];
}

export const extractDates = (dates: string): Date[] | null => {
  return dates.match(datetimeRegexp)?.map((x) => new Date(x)) ?? null;
};
