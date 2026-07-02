import { revalidatePath, revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";

const allowedStaticTags = new Set([
  "home",
  "projects",
  "labs",
  "experience",
  "technologies",
  "settings",
  "hero",
]);

const localizedPathPattern = /^\/(en|fr)(\/projects\/[^/?#]+)?$/;
const projectTagPattern = /^project:[a-zA-Z0-9._-]+$/;

type RevalidationPayload = {
  secret?: string;
  path?: string;
  paths?: string[] | string;
  tag?: string;
  tags?: string[] | string;
};

function splitCsvItems(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeItems(value: string[] | string | null | undefined) {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value.flatMap((item) => splitCsvItems(item));
  }

  return splitCsvItems(value);
}

function getAuthorizationSecret(
  request: NextRequest,
  payload: RevalidationPayload,
) {
  const authorization = request.headers.get("authorization");

  if (authorization?.startsWith("Bearer ")) {
    return authorization.slice("Bearer ".length).trim();
  }

  return (
    request.headers.get("x-revalidation-secret") ??
    request.nextUrl.searchParams.get("secret") ??
    payload.secret ??
    ""
  );
}

function isAllowedPath(path: string) {
  return localizedPathPattern.test(path);
}

function isAllowedTag(tag: string) {
  return allowedStaticTags.has(tag) || projectTagPattern.test(tag);
}

function getRequestItems(request: NextRequest, payload: RevalidationPayload) {
  const queryPaths = [
    ...request.nextUrl.searchParams.getAll("path"),
    ...request.nextUrl.searchParams.getAll("paths"),
  ];
  const queryTags = [
    ...request.nextUrl.searchParams.getAll("tag"),
    ...request.nextUrl.searchParams.getAll("tags"),
  ];

  return {
    paths: [
      ...normalizeItems(payload.path),
      ...normalizeItems(payload.paths),
      ...normalizeItems(queryPaths),
    ],
    tags: [
      ...normalizeItems(payload.tag),
      ...normalizeItems(payload.tags),
      ...normalizeItems(queryTags),
    ],
  };
}

async function readPayload(request: NextRequest) {
  if (request.method === "GET") {
    return {} satisfies RevalidationPayload;
  }

  try {
    return (await request.json()) as RevalidationPayload;
  } catch {
    return {} satisfies RevalidationPayload;
  }
}

async function handleRevalidation(request: NextRequest) {
  const configuredSecret = process.env.REVALIDATION_SECRET;

  if (!configuredSecret) {
    return Response.json(
      { revalidated: false, message: "REVALIDATION_SECRET is not configured." },
      { status: 500 },
    );
  }

  const payload = await readPayload(request);
  const providedSecret = getAuthorizationSecret(request, payload);

  if (providedSecret !== configuredSecret) {
    return Response.json(
      { revalidated: false, message: "Invalid revalidation secret." },
      { status: 401 },
    );
  }

  const { paths, tags } = getRequestItems(request, payload);
  const invalidPaths = paths.filter((path) => !isAllowedPath(path));
  const invalidTags = tags.filter((tag) => !isAllowedTag(tag));

  if (invalidPaths.length > 0 || invalidTags.length > 0) {
    return Response.json(
      {
        revalidated: false,
        message: "Invalid paths or tags requested.",
        invalidPaths,
        invalidTags,
      },
      { status: 400 },
    );
  }

  const uniquePaths = [...new Set(paths)];
  const uniqueTags = [...new Set(tags)];

  if (uniquePaths.length === 0 && uniqueTags.length === 0) {
    return Response.json(
      {
        revalidated: false,
        message: "Provide at least one path or tag to revalidate.",
      },
      { status: 400 },
    );
  }

  uniquePaths.forEach((path) => {
    if (path.includes("[")) {
      revalidatePath(path, "page");
      return;
    }

    revalidatePath(path);
  });
  uniqueTags.forEach((tag) => revalidateTag(tag, { expire: 0 }));

  return Response.json({
    revalidated: true,
    paths: uniquePaths,
    tags: uniqueTags,
    revalidatedAt: new Date().toISOString(),
  });
}

export async function GET(request: NextRequest) {
  return handleRevalidation(request);
}

export async function POST(request: NextRequest) {
  return handleRevalidation(request);
}
