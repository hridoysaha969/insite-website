import { supabase } from "@/config/Supabase_Client";
import { NextResponse } from "next/server";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS(request) {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req) {
  const payload = await req.json();
  const { domain, url, event, source } = payload;

  if (!url.includes(domain)) {
    return NextResponse.json(
      {
        message: "Invalid domain, try again with valid domain.",
        success: false,
      },
      { headers: corsHeaders }
    );
  }

  if (event == "session_start") {
    await supabase
      .from("visits")
      .insert([{ website_id: domain, source: source ?? "Direct" }])
      .select();
  }
  if (event == "pageview") {
    await supabase
      .from("page_views")
      .insert([{ domain, page: url }])
      .select();
  }

  return NextResponse.json(
    { res: payload, success: true },
    { headers: corsHeaders }
  );
}
