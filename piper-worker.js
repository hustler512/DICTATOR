/* Piper worker protocol. The package caches downloaded models in browser storage. */
const PIPER_VERSION = '1.0.5';
let piper = null;
let activeVoice = null;
const cancelled = new Set();

const voices = { en:'en_US-hfc_female-medium', pt:'pt_BR-faber-medium', es:'es_ES-davefx-medium', fr:'fr_FR-siwis-medium', de:'de_DE-thorsten-medium', it:'it_IT-riccardo-x_low', ru:'ru_RU-denis-medium' };

async function init(language) {
  const voiceId = voices[language] || voices.en;
  if (piper && activeVoice === voiceId) return;
  piper = await import(`https://esm.sh/@mintplex-labs/piper-tts-web@${PIPER_VERSION}`);
  activeVoice = voiceId;
}

self.onmessage = async event => {
  const message = event.data || {};
  if (message.type === 'cancel') { cancelled.add(message.requestId); return; }
  if (message.type === 'init') {
    try {
      await init(message.language);
      self.postMessage({ type:'ready', language:message.language, voiceId:activeVoice, version:PIPER_VERSION });
    } catch (error) { self.postMessage({ type:'error', stage:'init', message:error.message }); }
    return;
  }
  if (message.type === 'synthesize') {
    if (cancelled.delete(message.requestId)) return;
    try {
      if (!piper) await init(message.language);
      const wav = await piper.predict({ text:message.text, voiceId:activeVoice }, progress => self.postMessage({ type:'progress', requestId:message.requestId, progress }));
      if (cancelled.delete(message.requestId)) return;
      const audioBuffer = await wav.arrayBuffer();
      self.postMessage({ type:'audio', requestId:message.requestId, audioBuffer }, [audioBuffer]);
    } catch (error) { self.postMessage({ type:'error', requestId:message.requestId, stage:'synthesize', message:error.message }); }
  }
};
