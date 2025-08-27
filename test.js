const { AssemblyAI } = require("assemblyai")

const client = new AssemblyAI({
  apiKey: "20ad2a0457124b10aadfbd20d2a2af9f"
});

async function getVideoTranscription(url) {
  try {
    const params = {
      audio: url,
      speech_model: "universal",
      language_code: 'en',
      punctuate: true,
      format_text: true
    };
    const response = await client.transcripts.transcribe(params);
    console.log("Text: ", response.text)
    return response.text || '';
  } catch (error) {
    console.error("Error getting video transcription:", error);
    process.exit(1)
  }
}


// === test ===
(async () => {
  // const url = "https://6sitqt9zb6.ufs.sh/f/Bw2H5pOHKAejiX5n6RDh6yOH4MXaVnWEUqA7g1opBtJTmSjZ"; // exemple d'URL audio/vidéo publique
  // const url = "https://www.youtube.com/embed/ry9SYnV3svc"
  const url = "https://6sitqt9zb6.ufs.sh/f/Bw2H5pOHKAejxRrvSVFi35Krd7IetOfY1bZETw8GMSFNhWLc"
  const text = await getVideoTranscription(url);
  console.log("Final transcription:", text);
})();
