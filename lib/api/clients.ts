export async function fetchTrendingTopics() {
  const response = await fetch("/api/trending");
  return response.ok ? await response.json() : [];
}

export async function fetchMessages() {
  const response = await fetch("/api/messages");
  return response.ok ? await response.json() : [];
}

export async function fetchNotifications() {
  const response = await fetch("/api/notifications");
  return response.ok ? await response.json() : [];
}

export async function fetchUserProfile() {
  const response = await fetch("/api/profile");
  return response.ok ? await response.json() : null;
}
