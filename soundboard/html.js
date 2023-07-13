import { nanoid } from 'https://cdn.skypack.dev/pin/nanoid@v4.0.2-yqkBrUTgiH6nlSQz7z2D/mode=imports/optimized/nanoid.js';

export function createAudioElement(sound) {
    const audio = document.createElement('audio');
    audio.setAttribute('controls', 'true');
    audio.setAttribute('src', `/sounds/${sound}.wav`);
    audio.setAttribute('preload', 'auto');
    audio.setAttribute('id', nanoid(10));

    return audio;
}

export function createButton(sound) {
    const button = document.createElement('button');
    button.textContent = sound;
    return button;
}
