// YouTube Background Music Controller & Autoplay Handler
// Plays custom YouTube track in background with seamless autoplay & loop

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

export function extractYouTubeVideoId(urlOrId: string): string {
  if (!urlOrId) return 'PpXoKtxADdE';
  const trimmed = urlOrId.trim();

  // Pure 11-char alphanumeric ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  // Shorts URL: https://youtube.com/shorts/PpXoKtxADdE?si=...
  const shortsMatch = trimmed.match(/\/shorts\/([a-zA-Z0-9_-]{11})/);
  if (shortsMatch && shortsMatch[1]) return shortsMatch[1];

  // Watch URL: https://www.youtube.com/watch?v=PpXoKtxADdE
  const watchMatch = trimmed.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (watchMatch && watchMatch[1]) return watchMatch[1];

  // Share URL: https://youtu.be/PpXoKtxADdE
  const shareMatch = trimmed.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (shareMatch && shareMatch[1]) return shareMatch[1];

  // Embed URL: https://www.youtube.com/embed/PpXoKtxADdE
  const embedMatch = trimmed.match(/\/embed\/([a-zA-Z0-9_-]{11})/);
  if (embedMatch && embedMatch[1]) return embedMatch[1];

  return 'PpXoKtxADdE';
}

type Listener = () => void;

class YouTubeAudioManager {
  private player: any = null;
  private currentVideoId: string = 'PpXoKtxADdE';
  private isPlaying: boolean = false;
  private isMuted: boolean = false;
  private volume: number = 85;
  private isReady: boolean = false;
  private listeners: Set<Listener> = new Set();
  private hasUnlockedAudio: boolean = false;
  private initStarted: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.setupGlobalUnlock();
    }
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((fn) => {
      try {
        fn();
      } catch (err) {
        console.error('Listener error in YouTubeAudioManager:', err);
      }
    });
  }

  public getState() {
    return {
      isPlaying: this.isPlaying,
      isMuted: this.isMuted,
      volume: this.volume,
      isReady: this.isReady,
      videoId: this.currentVideoId,
    };
  }

  // Ensure first user click/touch unlocks autoplay if browser blocked audio initially
  private setupGlobalUnlock() {
    const unlock = () => {
      if (this.hasUnlockedAudio) return;
      this.hasUnlockedAudio = true;

      if (this.player && typeof this.player.playVideo === 'function') {
        try {
          if (!this.isMuted) {
            this.player.unMute();
          }
          this.player.setVolume(this.volume);
          this.player.playVideo();
        } catch {}
      }
    };

    window.addEventListener('click', unlock, { passive: true });
    window.addEventListener('touchstart', unlock, { passive: true });
    window.addEventListener('keydown', unlock, { passive: true });
    window.addEventListener('pointerdown', unlock, { passive: true });
  }

  public init(initialVideoIdOrUrl?: string) {
    if (typeof window === 'undefined') return;

    if (initialVideoIdOrUrl) {
      this.currentVideoId = extractYouTubeVideoId(initialVideoIdOrUrl);
    }

    if (this.initStarted) {
      if (this.isReady && this.player && typeof this.player.loadVideoById === 'function') {
        try {
          this.player.loadVideoById(this.currentVideoId);
          this.player.playVideo();
        } catch {}
      }
      return;
    }

    this.initStarted = true;

    // Create hidden DOM container if not present
    let container = document.getElementById('yt-audio-player-wrapper');
    if (!container) {
      container = document.createElement('div');
      container.id = 'yt-audio-player-wrapper';
      container.style.position = 'fixed';
      container.style.top = '-9999px';
      container.style.left = '-9999px';
      container.style.width = '1px';
      container.style.height = '1px';
      container.style.opacity = '0';
      container.style.pointerEvents = 'none';
      container.style.zIndex = '-100';

      const playerDiv = document.createElement('div');
      playerDiv.id = 'yt-audio-player-element';
      container.appendChild(playerDiv);
      document.body.appendChild(container);
    }

    // Load YouTube Iframe API if not loaded
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      tag.async = true;
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);

      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prevCallback) prevCallback();
        this.createPlayer();
      };
    } else if (window.YT && window.YT.Player) {
      this.createPlayer();
    } else {
      const checkInterval = setInterval(() => {
        if (window.YT && window.YT.Player) {
          clearInterval(checkInterval);
          this.createPlayer();
        }
      }, 100);
    }
  }

  private createPlayer() {
    try {
      const origin =
        typeof window !== 'undefined' && window.location.origin && window.location.origin !== 'null'
          ? window.location.origin
          : undefined;

      const playerVars: Record<string, any> = {
        autoplay: 1,
        loop: 1,
        playlist: this.currentVideoId,
        playsinline: 1,
        controls: 0,
        disablekb: 1,
        enablejsapi: 1,
        fs: 0,
        iv_load_policy: 3,
        rel: 0,
        modestbranding: 1,
      };

      if (origin) {
        playerVars.origin = origin;
      }

      this.player = new window.YT.Player('yt-audio-player-element', {
        height: '100',
        width: '100',
        videoId: this.currentVideoId,
        playerVars,
        events: {
          onReady: (event: any) => {
            this.isReady = true;

            // Ensure iframe has autoplay permissions
            try {
              const iframe = document.getElementById('yt-audio-player-element') as HTMLIFrameElement | null;
              if (iframe) {
                iframe.allow = 'autoplay; encrypted-media; picture-in-picture';
              }
            } catch {}

            try {
              event.target.unMute();
              event.target.setVolume(this.volume);
              event.target.playVideo();
              this.isPlaying = true;
            } catch {}
            this.notify();
          },
          onStateChange: (event: any) => {
            // YT.PlayerState: -1 (unstarted), 0 (ended), 1 (playing), 2 (paused), 3 (buffering), 5 (video cued)
            if (event.data === 1) {
              this.isPlaying = true;
            } else if (event.data === 2) {
              this.isPlaying = false;
            } else if (event.data === 0) {
              // Seamless loop
              try {
                event.target.seekTo(0);
                event.target.playVideo();
                this.isPlaying = true;
              } catch {}
            }
            this.notify();
          },
          onError: (err: any) => {
            console.warn('YouTube Player Error:', err);
          },
        },
      });
    } catch (e) {
      console.error('Failed to create YouTube player:', e);
    }
  }

  public setVideo(urlOrId: string) {
    const videoId = extractYouTubeVideoId(urlOrId);
    this.currentVideoId = videoId;
    if (this.player && typeof this.player.loadVideoById === 'function') {
      try {
        this.player.loadVideoById({
          videoId: videoId,
          startSeconds: 0,
        });
        this.player.playVideo();
        this.isPlaying = true;
      } catch {}
    } else {
      this.init(videoId);
    }
    this.notify();
  }

  public play() {
    if (this.player && typeof this.player.playVideo === 'function') {
      try {
        if (!this.isMuted) {
          this.player.unMute();
        }
        this.player.playVideo();
        this.isPlaying = true;
      } catch {}
    }
    this.notify();
  }

  public pause() {
    if (this.player && typeof this.player.pauseVideo === 'function') {
      try {
        this.player.pauseVideo();
        this.isPlaying = false;
      } catch {}
    }
    this.notify();
  }

  public togglePlay(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public mute() {
    this.isMuted = true;
    if (this.player && typeof this.player.mute === 'function') {
      try {
        this.player.mute();
      } catch {}
    }
    this.notify();
  }

  public unMute() {
    this.isMuted = false;
    if (this.player && typeof this.player.unMute === 'function') {
      try {
        this.player.unMute();
        this.player.setVolume(this.volume);
      } catch {}
    }
    this.notify();
  }

  public toggleMute(): boolean {
    if (this.isMuted) {
      this.unMute();
      return false;
    } else {
      this.mute();
      return true;
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(100, vol));
    if (this.player && typeof this.player.setVolume === 'function') {
      try {
        this.player.setVolume(this.volume);
      } catch {}
    }
    if (this.volume === 0) {
      this.mute();
    } else if (this.isMuted) {
      this.unMute();
    }
    this.notify();
  }
}

export const youtubeAudio = new YouTubeAudioManager();
