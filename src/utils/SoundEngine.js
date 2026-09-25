// Web Audio API Sound Engine (Muted / Disabled)
class SoundEngine {
  constructor() {
    this.muted = true;
  }

  initContext() {}
  resume() {}
  toggle() { return false; }
  isEnabled() { return false; }
  playClick() {}
  playHover() {}
  playPop() {}
  playSuccess() {}
}

export const sounds = new SoundEngine();
