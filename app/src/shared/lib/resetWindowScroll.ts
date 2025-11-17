async function resetScrollOnRedirect(delayDurationMS: number = 50) {
  await new Promise((r) => setTimeout(r, delayDurationMS));
  return window.scrollTo({ top: 0, behavior: "smooth" });
}

export default resetScrollOnRedirect;
