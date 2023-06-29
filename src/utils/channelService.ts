// ChannelService.js
// https://developers.channel.io/docs/web-installation

class ChannelService {
  constructor() {
    this.loadScript();
  }

  loadScript() {
    var w = window;
    if (w.ChannelIO) {
      return;
    }
    var ch: IChannelIO = function () {
      ch.c && ch.c(arguments);
    };
    ch.q = [];
    ch.c = function (args) {
      ch.q?.push(args);
    };
    w.ChannelIO = ch;
    function l() {
      if (w.ChannelIOInitialized) {
        return;
      }
      w.ChannelIOInitialized = true;
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.async = true;
      s.src = 'https://cdn.channel.io/plugin/ch-plugin-web.js';
      var x = document.getElementsByTagName('script')[0];
      x.parentNode?.insertBefore(s, x);
    }
    if (document.readyState === 'complete') {
      l();
    } else {
      window.addEventListener('DOMContentLoaded', l, false);
      window.addEventListener('load', l, false);
    }
  }

  // boot(settings) {
  //   window.ChannelIO('boot', settings);
  // }
  boot(option: BootOption, callback?: Callback) {
    window.ChannelIO?.('boot', option, callback);
  }

  shutdown() {
    window.ChannelIO('shutdown');
  }
}

export default ChannelService;

interface IChannelIO {
  c?: (...args: any) => void;
  q?: [methodName: string, ...args: any[]][];
  (...args: any): void;
}

interface BootOption {
  appearance?: string;
  customLauncherSelector?: string;
  hideChannelButtonOnBoot?: boolean;
  hidePopup?: boolean;
  language?: string;
  memberHash?: string;
  memberId?: string;
  mobileMessengerMode?: string;
  pluginKey: string;
  profile?: Profile;
  trackDefaultEvent?: boolean;
  trackUtmSource?: boolean;
  unsubscribe?: boolean;
  unsubscribeEmail?: boolean;
  unsubscribeTexting?: boolean;
  zIndex?: number;
}

interface Callback {
  (error: Error | null, user: CallbackUser | null): void;
}

interface CallbackUser {
  alert: number;
  avatarUrl: string;
  id: string;
  language: string;
  memberId: string;
  name?: string;
  profile?: Profile | null;
  tags?: string[] | null;
  unsubscribeEmail: boolean;
  unsubscribeTexting: boolean;
}

interface Profile {
  [key: string]: string | number | boolean | null;
}
