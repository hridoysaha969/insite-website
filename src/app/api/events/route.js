import { supabase } from "@/config/Supabase_Client";
import { headers } from "next/headers";
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
  try {
    const authHeader = (await headers()).get("authorization");
    const { name, domain, description } = await req.json();

    if (authHeader && authHeader.startsWith("Bearer ")) {
      const apiKey = authHeader.split("Bearer ")[1];
      const { data, error } = await supabase
        .from("users")
        .select()
        .eq("api", apiKey);

      if (data.length > 0) {
        if (name.trim() == "" || domain.trim() == "") {
          return NextResponse.json(
            { message: "Undefind name or domain", success: false },
            { status: 400 },
            { headers: corsHeaders }
          );
        } else {
          const { data: events, error: errorMsg } = await supabase
            .from("events")
            .insert([
              {
                event_name: name.toLowerCase(),
                website_id: domain,
                message: description,
              },
            ]);

          if (errorMsg) {
            return NextResponse.json(
              { message: errorMsg },
              { status: 400 },
              { headers: corsHeaders }
            );
          } else {
            return NextResponse.json(
              { message: "Event triggered successfully" },
              { status: 200 },
              { headers: corsHeaders }
            );
          }
        }
      } else {
        return NextResponse.json(
          { message: "Invalid API key" },
          { status: 401 }
        );
      }
    }
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 },
      { headers: corsHeaders }
    );
  }
}
