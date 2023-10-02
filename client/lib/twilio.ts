import { Twilio } from "twilio";

const SID = process.env.TWILIO_SID || "";
const TOKEN = process.env.TWILIO_TOKEN || "";

export const twilio = new Twilio(SID, TOKEN);