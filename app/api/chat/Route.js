export async function POST(req) {
  const { messages, system } = await req.json();
  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.CLAUDE_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system: system || "",
        messages,
      }),
    });
    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    return Response.json({ error: { message: error.message } }, { status: 500 });
  }
}
