import { NextResponse } from "next/server";

const API_URL = process.env.API_URL || "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBJEYyK76IosoofagpsETW9Q_NqjyxLiZ8"; // put your AI API endpoint here

export async function POST(req: Request) {
  try {
    const form = await req.json();
    const activity: string = form.activity;

    if (!activity) {
      return NextResponse.json(
        { error: "No activity details provided" },
        { status: 400 }
      );
    }

    console.debug(`Received activity details: ${activity}`);

    const prompt = `
    Given the following job activity in a JSA (Job Safety Analysis) report:

    Activity: ${activity}

    Please provide a detailed analysis including:
    1. Potential Hazards: List one possible hazards associated with this activity, give only the most relevant and common.
    2. Severity Before Mitigation: Rate the severity for hazard before any safety measures are implemented. Use a scale of Low, Medium, High, or Critical.
    3. Required Control & Checks: Provide a comprehensive text of all necessary safety measures, equipment, and procedures to mitigate each hazard in one paragraph.
    4. Severity After Mitigation: Re-evaluate the severity for each hazard after the proposed safety measures are implemented.
    5. Action Party: Specify who is responsible for implementing and maintaining each safety measure.

    Provide as much detail as possible for each section and give only 1 hazard and corresponding details. 
    Format the response as a JSON object with these fields - 
    'Hazards', 'SeverityBeforeMitigation', 'ControlAndChecks', 'SeverityAfterMitigation', 'ActionParty'
    `;

    const payload = {
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    };

    const headers = {
      "Content-Type": "application/json",
    };

    const response = await fetch(API_URL, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    const responseJson = await response.json();
    console.debug("API response:", responseJson);

    if (responseJson.candidates && responseJson.candidates.length > 0) {
      let generatedText: string =
        responseJson.candidates[0].content.parts[0].text || "";

      generatedText = generatedText.replace("```json", "").replace("```", "").trim();
      console.debug("Generated text:", generatedText);

      // Try to extract JSON object
      const jsonMatch = generatedText.match(/\{.*\}/s);
      if (jsonMatch) {
        const result = JSON.parse(jsonMatch[0]);

        // Ensure all expected keys exist
        const expectedKeys = [
          "Hazards",
          "SeverityBeforeMitigation",
          "ControlAndChecks",
          "SeverityAfterMitigation",
          "ActionParty",
        ];
        expectedKeys.forEach((key) => {
          if (!(key in result)) {
            result[key] = "Not provided";
          }
        });

        return NextResponse.json(result, { status: 200 });
      } else {
        console.error("No JSON object found in generated text");
        return NextResponse.json(
          { error: "Failed to extract JSON from generated text" },
          { status: 500 }
        );
      }
    } else if (responseJson.filters) {
      console.warn("Content filtered by API:", responseJson.filters);
      return NextResponse.json(
        { error: "Content filtered by API", details: responseJson.filters },
        { status: 422 }
      );
    } else {
      console.error("Unexpected API response format:", responseJson);
      return NextResponse.json(
        { error: "Unexpected API response format" },
        { status: 500 }
      );
    }
  } catch (err: any) {
    console.error("Error during analyze_activity:", err);
    return NextResponse.json(
      { error: err.message || "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
