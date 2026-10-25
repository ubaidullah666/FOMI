export async function POST(request) {
  const body = await request.json();
  if (!body.prompt?.trim()) {
    return Response.json({ error: 'A prompt is required.' }, { status: 400 });
  }
  return Response.json({
    status: 'completed',
    mode: body.mode || 'image',
    createdAt: new Date().toISOString(),
    results: ['variation-1', 'variation-2', 'variation-3', 'variation-4']
  });
}
