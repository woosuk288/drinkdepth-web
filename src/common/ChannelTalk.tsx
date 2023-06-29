import { useEffect } from 'react';
import { useUser } from 'reactfire';
import ChannelService from 'src/utils/channelService';

export default function ChannelTalk() {
  const { data: user } = useUser();

  useEffect(() => {
    const pluginKey = process.env.NEXT_PUBLIC_CHANNEL_IO_KEY;
    if (!pluginKey) {
      console.warn('Check ChannelIO pluginKey!');
      return;
    }

    const channelTalk = new ChannelService();
    if (user) {
      const {
        uid,
        displayName: name,
        phoneNumber: mobileNumber,
        email,
        photoURL: avatarUrl,
      } = user;
      channelTalk.boot({
        pluginKey,
        memberId: uid,
        profile: {
          name,
          mobileNumber,
          email,
          avatarUrl,
        },
      });
    } else {
      channelTalk.boot({
        pluginKey,
      });
    }
    return () => {
      channelTalk.shutdown();
    };
  }, [user]);

  return null;
}
