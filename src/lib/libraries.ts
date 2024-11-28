"use client";

export type Libraries = {
  o1js: typeof import("o1js");
  zkcloudworker: typeof import("zkcloudworker");
};

let libraries: Libraries | null = null;
let librariesPromise: Promise<Libraries> | null = null;

export async function loadLibraries(): Promise<Libraries> {
  if (libraries) {
    return libraries;
  }
  if (!librariesPromise) librariesPromise = loadLibrariesInternal();
  const librariesResolved = await librariesPromise;
  if (!libraries) libraries = librariesResolved;
  return libraries;
}

async function loadLibrariesInternal(): Promise<Libraries> {
  const o1jsPromise = import("o1js");
  const zkcloudworkerPromise = import("zkcloudworker");
  const o1js = await o1jsPromise;
  const zkcloudworker = await zkcloudworkerPromise;
  libraries = { o1js, zkcloudworker };
  return libraries;
}

/*
npm install o1js o1js_v1@npm:o1js@1.9.1
*/
