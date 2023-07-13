import { createAudioElement, createButton } from './html.js';

const sounds = ['clap', 'hihat', 'kick', 'perc', 'snare', 'tom'];

// 1. Render Audio Tags

sounds.forEach((sound) => {
    const audio = createAudioElement(sound);
    const button = createButton(sound);

    button.addEventListener('click', () => {
        button.classList.add('playing');
        audio.play();
    });

    audio.addEventListener('ended', () => {
        button.classList.remove('playing');
    });

    document.getElementById('audios').append(audio);
    document.getElementById('buttons').append(button);
});
