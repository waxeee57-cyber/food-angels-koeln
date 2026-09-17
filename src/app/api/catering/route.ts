import { NextResponse } from "next/server";

type Payload = {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  date?: string;
  guests?: string;
  packageId?: string;
  message?: string;
};

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "Ungültige Anfrage." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const date = body.date?.trim() ?? "";
  const guests = Number(body.guests);
  const packageId = body.packageId?.trim() ?? "";

  if (name.length < 2 || !email.includes("@") || phone.length < 6 || !date || !packageId) {
    return NextResponse.json({ ok: false, error: "Pflichtfelder fehlen." }, { status: 400 });
  }
  if (!Number.isFinite(guests) || guests < 8) {
    return NextResponse.json({ ok: false, error: "Mindestens 8 Personen." }, { status: 400 });
  }

  const stamp = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  const id = `FA-${stamp}-${Math.floor(1000 + Math.random() * 9000)}`;

  return NextResponse.json({
    ok: true,
    id,
    demo: true,
  });
}
