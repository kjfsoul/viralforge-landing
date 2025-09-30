export const runtime = "nodejs";
import { NextResponse } from "next/server"
import { selectOracleCardFromSurvey } from "@/lib/oracle-select"
import { generateAdvancedPersonalizedMessage } from "@/lib/oracle-cards" // you already have this

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({} as any))
  const hasSurvey = !!(body?.name || body?.birthMonth || body?.currentFocus || body?.energyLevel)

  const card = hasSurvey
    ? selectOracleCardFromSurvey({
        name: body.name,
        email: body.email,
        birthMonth: body.birthMonth,
        currentFocus: body.currentFocus,
        energyLevel: body.energyLevel,
      })
    : selectOracleCardFromSurvey({ currentFocus: "begin", energyLevel: "balanced" }) // default path

  const message = generateAdvancedPersonalizedMessage(card, {
    name: body.name, birth_month: body.birthMonth, current_focus: body.currentFocus, energy_level: body.energyLevel,
  })

  return NextResponse.json({ card, message })
}

export async function GET() {
  // Anonymous quick-read endpoint: default to Interstellar Journey
  const card = selectOracleCardFromSurvey({ currentFocus: "begin", energyLevel: "balanced" })
  return NextResponse.json({ card })
}