const GEMINI_API_KEY = "AIzaSyDuR2sGSBEI_jM7Vj5JGsmfr9RqwYmw8fM";
const systemPrompt = "Hello";
const text = "HEYYY";

fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=' + GEMINI_API_KEY, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    system_instruction: { parts: [{ text: systemPrompt }] },
    contents: [{ parts: [{ text: text }] }]
  })
}).then(res => res.json()).then(data => console.log(JSON.stringify(data, null, 2))).catch(e => console.error(e));
