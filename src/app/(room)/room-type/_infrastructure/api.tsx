const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getRoomTypes() {
  const res = await fetch(`${baseUrl}/api/v1/rooms/`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export async function getRoomDetail(id: string) {
  const res = await fetch(`${baseUrl}/api/v1/rooms/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}
