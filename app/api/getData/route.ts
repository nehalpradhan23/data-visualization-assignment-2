export async function GET(request: Request) {
  const apiKey = process.env.GOOGLE_SHEET_API_KEY; // Replace with your API key
  const spreadsheetId = "1l7GstWHc69HPV0irSdvoMIyHgtufUPKsbtCiNw7IKR0"; // Replace with your spreadsheet ID
  const range = "Sheet3"; // Adjust the range as needed

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    // console.log("route data: ", data);

    if (data.values) {
      return new Response(JSON.stringify(data.values), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      return new Response(JSON.stringify({ message: "No data found." }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: "Failed to fetch data from Google Sheets" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
