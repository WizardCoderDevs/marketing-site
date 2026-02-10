import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { portalId: requestPortalId, formGuid, fields, context } = body;

    const envPortalId = process.env.HUBSPOT_PORTAL_ID;
    const accessToken = process.env.HUBSPOT_ACCESS_TOKEN;

    const portalId = envPortalId || requestPortalId;

    if (!portalId || !accessToken) {
      console.error('Missing HubSpot configuration:', { portalId: !!portalId, accessToken: !!accessToken });
      return NextResponse.json(
        { error: 'Server configuration error: Missing Portal ID or Access Token' }, 
        { status: 500 }
      );
    }

    // Authenticated endpoint for HubSpot Forms API v3
    const endpoint = `https://api.hsforms.com/submissions/v3/integration/secure/submit/${portalId}/${formGuid}`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        fields,
        context
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('HubSpot API Error Response:', JSON.stringify(data, null, 2));
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}
