export function formatTable(head: string[], body: string[][]) {
  const widths = head.map((cell) => {
    return Math.max(cell.length, 1)
  })

  body.forEach((row) => {
    row.forEach((cell, cellIndex) => {
      widths[cellIndex] = Math.max(cell.length, widths[cellIndex])
    })
  })

  const separator = formatSeparator(widths)

  return (
    separator +
    formatRow(head, widths) +
    separator +
    body.map((row) => formatRow(row, widths)).join('') +
    separator
  )
}

/*
+----------------------------------+---------+------------------------+----------------+
|               Col1               |  Col2   |          Col3          | Numeric Column |
+----------------------------------+---------+------------------------+----------------+
| Value 1                          | Value 2 | 123                    |           10.0 |
| Separate                         | cols    | with a tab or 4 spaces |       -2,027.1 |
| This is a row with only one cell |         |                        |                |
+----------------------------------+---------+------------------------+----------------+
 */
function formatSeparator(widths: number[]) {
  return '┼' + widths.map((w) => times(w + 2, '─')).join('┼') + '┼\n'
}

function formatRow(row: string[], widths: number[]) {
  return (
    '│' +
    row.map((cell, index) => alignLeft(cell, widths[index])).join('│') +
    '│\n'
  )
}

function alignLeft(cell: string, width: number) {
  return ' ' + cell + times(width - cell.length, ' ') + ' '
}

function times(n: number, what: string) {
  return new Array(n)
    .fill(1)
    .map((_) => what)
    .join('')
}
