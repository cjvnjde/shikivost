import { nanoid } from "nanoid";

export function encodeData({
  event,
  data = null,
  id: eventId,
  type = "request",
}: {
  event: string;
  data: unknown | null;
  id?: string;
  type?: "request" | "response";
}) {
  const id = eventId || nanoid();

  return {
    id,
    data: JSON.stringify({
      id,
      type,
      payload: data,
      event,
    }),
  };
}

export function decodeData(data: string) {
  try {
    const { type, payload, id, event } = JSON.parse(data);

    return {
      type,
      payload,
      event,
      id,
    };
  } catch (e: unknown) {
    console.error(e);
  }
}
