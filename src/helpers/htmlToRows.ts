import parser from "node-html-parser";
import {HTMLElement} from "node-html-parser";

export function htmlToRows(html: string, findFn: (row: HTMLElement) => boolean) {
  // @ts-ignore
  const parsed = parser.parse(html);
  const table = parsed.querySelector(".data");
  const head = table?.querySelector("thead tr");
  const body = table?.querySelector("tbody");

  if (!table || !head || !body) {
    throw new Error("Table elements missing")
  }

  const tableHead = Array.from(head.querySelectorAll('th'))
    .map((cell) => cell.textContent?.trim() || '')

  const emptyColumnIndex = tableHead.findIndex((c: string) => c === 'Mängija')
  tableHead.splice(emptyColumnIndex, 1)


  const rows = body.querySelectorAll('tr')
  const teamRows = rows.filter(findFn);

  const tableBody = teamRows.map((value: any) => {
    const cells = value.querySelectorAll('td')
    return cells.map((cell: HTMLElement) => cell.textContent?.trim().replace(/[\n\t]/g, ''))
  })

  tableBody.map((row: string[]) => row.splice(emptyColumnIndex, 1));

  return {
    tableHead, tableBody
  }
}
