export function splitTitleIntoTwoLines(title: string): [string, string] {
  const [first, ...rest] = title.split(" ");
  return [first, rest.join(" ")];
}
