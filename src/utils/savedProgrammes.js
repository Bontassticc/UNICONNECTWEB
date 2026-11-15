
const STORAGE_PREFIX = "uniConnectSavedProgrammes";

const getStorageKey = () => {
  const email = localStorage
    .getItem("uniConnectUserEmail")
    ?.trim()
    .toLowerCase();

  return email
    ? `${STORAGE_PREFIX}:${email}`
    : null;
};

export const getSavedProgrammes = () => {
  const key = getStorageKey();

  if (!key) return [];

  try {
    const saved = JSON.parse(localStorage.getItem(key) || "[]");

    return Array.isArray(saved)
      ? saved.filter((id) => Number.isInteger(id))
      : [];
  } catch {
    return [];
  }
};

export const toggleSavedProgramme = (programmeId) => {
  const key = getStorageKey();

  if (!key) return null;

  const saved = getSavedProgrammes();
  const id = Number(programmeId);

  const updated = saved.includes(id)
    ? saved.filter((savedId) => savedId !== id)
    : [...saved, id];

  localStorage.setItem(key, JSON.stringify(updated));

  window.dispatchEvent(new Event("uniConnectSavedChanged"));

  return updated;
};
