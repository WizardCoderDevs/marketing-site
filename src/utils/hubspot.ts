/**
 * HubSpot Forms API Submission Utility
 * 
 * Documentation: https://legacydocs.hubspot.com/docs/methods/forms/submit_form_v3_authentication
 */

interface HubSpotSubmissionData {
  portalId?: string;
  formGuid: string;
  fields: {
    name: string;
    value: string;
  }[];
  context?: {
    hutk?: string;
    pageUri?: string;
    pageName?: string;
  };
}

export async function submitToHubSpot(data: HubSpotSubmissionData) {
  const { portalId, formGuid, fields, context } = data;
  
  // Call our internal API route
  const endpoint = '/api/contact';

  const body = {
    portalId,
    formGuid,
    fields,
    context: {
      ...context,
      pageUri: typeof window !== 'undefined' ? window.location.href : undefined,
      pageName: typeof document !== 'undefined' ? document.title : undefined,
    },
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error('API Contact Error:', errorData);
        return false;
    }

    return true;
  } catch (error) {
    console.error('Error submitting to contact API:', error);
    return false;
  }
}

/**
 * Helper to get HubSpot Cookie (hutk)
 */
export function getHubSpotCookie() {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(/hubspotutk=([^;]+)/);
  return match ? match[1] : undefined;
}
