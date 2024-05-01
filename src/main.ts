import { reactive, onBeforeUnmount } from 'vue';

export const CHANNEL_NAME = Symbol(`channel-${location.origin}`);

export const useBroadcast = (channelName: Symbol = CHANNEL_NAME) => {
    let broadcastChannel: BroadcastChannel | null = null;

    onBeforeUnmount(() => {
        if (broadcastChannel) {
            broadcastChannel.close();
        }
    });

    const receivedMessages = reactive([] as string[]);
    const subscribeToChannel = () => {
        if (broadcastChannel) {
            return;
        }
        broadcastChannel = new BroadcastChannel(channelName.toString());
        broadcastChannel.onmessage = (event: MessageEvent<any>) => {
            receivedMessages.push(event.data);
        };
    }

    const postMessage = (message: string) => {
        if (!broadcastChannel) {
            throw new Error('Channel not initialized');
        }
        broadcastChannel.postMessage(message);
    }

    const closeChannel = () => {
        if (broadcastChannel) {
            broadcastChannel.close();
        }
    };

    return {
        subscribeToChannel,
        closeChannel,
        receivedMessages,
        postMessage,
    };
};

