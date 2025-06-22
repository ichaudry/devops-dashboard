
export async function getAlertSummary(alertsText) {
  const response = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'mistral',
      prompt: `Summarize the following infrastructure alerts clearly for a DevOps engineer:\n\n${alertsText}`,
      stream: false
    }),
  });

  const data = await response.json();
  return data.response || 'No summary generated.';
}
