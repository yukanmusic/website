const NETLIFY_API_BASE = "https://api.netlify.com/api/v1";
const FORM_NAME = "fan-capture";

function unauthorized() {
  return {
    statusCode: 401,
    headers: {
      "Content-Type": "application/json",
      "WWW-Authenticate": 'Basic realm="Yukan Private List"',
    },
    body: JSON.stringify({ error: "Unauthorized" }),
  };
}

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
    body: JSON.stringify(body),
  };
}

function getBasicCredentials(header = "") {
  if (!header.startsWith("Basic ")) {
    return null;
  }

  try {
    const encoded = header.slice(6);
    const decoded = Buffer.from(encoded, "base64").toString("utf8");
    const separatorIndex = decoded.indexOf(":");
    if (separatorIndex === -1) {
      return null;
    }

    return {
      username: decoded.slice(0, separatorIndex),
      password: decoded.slice(separatorIndex + 1),
    };
  } catch {
    return null;
  }
}

async function netlifyRequest(path, token) {
  const response = await fetch(`${NETLIFY_API_BASE}${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Netlify API ${response.status}: ${text}`);
  }

  return response.json();
}

export async function handler(event) {
  const {
    NETLIFY_API_TOKEN,
    NETLIFY_SITE_ID,
    YUKAN_LIST_USERNAME,
    YUKAN_LIST_PASSWORD,
  } = process.env;

  if (!NETLIFY_API_TOKEN || !NETLIFY_SITE_ID || !YUKAN_LIST_USERNAME || !YUKAN_LIST_PASSWORD) {
    return json(500, { error: "Missing required server configuration." });
  }

  const credentials = getBasicCredentials(event.headers.authorization || event.headers.Authorization);
  if (
    !credentials ||
    credentials.username !== YUKAN_LIST_USERNAME ||
    credentials.password !== YUKAN_LIST_PASSWORD
  ) {
    return unauthorized();
  }

  try {
    const forms = await netlifyRequest(`/sites/${NETLIFY_SITE_ID}/forms`, NETLIFY_API_TOKEN);
    const form = forms.find((entry) => entry.name === FORM_NAME);

    if (!form) {
      return json(404, { error: "Form not found." });
    }

    const submissions = await netlifyRequest(`/forms/${form.id}/submissions`, NETLIFY_API_TOKEN);
    const rows = submissions
      .map((submission) => ({
        id: submission.id,
        fullName: submission.data?.fullName || submission.data?.name || "",
        email: submission.data?.email || "",
        country: submission.data?.country || "",
        city: submission.data?.city || "",
        updates: submission.data?.updates || "",
        submittedAt: submission.created_at,
      }))
      .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));

    return json(200, { submissions: rows });
  } catch (error) {
    return json(500, { error: error.message || "Failed to load submissions." });
  }
}
