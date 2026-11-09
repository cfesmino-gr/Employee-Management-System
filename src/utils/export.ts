function downloadFile(
  filename: string,
  content: string,
  mimeType: string
) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function toCsv(rows: Record<string, unknown>[]): string {
  if (rows.length === 0) return "";

  const headers = Object.keys(rows[0]);

  const escape = (value: unknown) => {
    const text = String(value ?? "");
    return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  };

  const lines = [headers.join(",")];
  for (const row of rows) {
    lines.push(headers.map((header) => escape(row[header])).join(","));
  }
  return lines.join("\r\n");
}

export function downloadCsv(
  filename: string,
  rows: Record<string, unknown>[]
) {
  downloadFile(
    filename,
    `\uFEFF${toCsv(rows)}`,
    "text/csv;charset=utf-8;"
  );
}

export function downloadJson(filename: string, data: unknown) {
  downloadFile(
    filename,
    JSON.stringify(data, null, 2),
    "application/json;charset=utf-8;"
  );
}