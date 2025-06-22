export async function getLocalAlertSummary(alertText) {
  const response = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'phi',
      prompt: `Summarize the following infrastructure alerts:\n\n${alertText}`,
      stream: false,
    }),
  });

  const data = await response.json();
  return data.response;
}
