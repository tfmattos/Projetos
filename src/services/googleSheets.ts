const API_URL = "https://script.google.com/macros/s/AKfycbz0ptK4FINL9DWhtkwZWGN0BAnwc-X6-jhSfELMD6d4R2zMFVS3b2G3PordmjJDCwPObQ/exec";

export async function fetchProjetos() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function adicionarProjeto(projeto: any) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(projeto),
  });
  return res.json();
}
