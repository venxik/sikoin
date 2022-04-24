import React, { useEffect, useCallback, useState, FC } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import {
  ActionsProps,
  Bubble,
  BubbleProps,
  ComposerProps,
  GiftedChat,
  IMessage,
  Send,
  SendProps,
  Time,
  TimeProps,
} from 'react-native-gifted-chat/src';
import { HeaderBack, TextInputBorder } from '../../components';
import {
  apis,
  colors,
  icons,
  messagesDummy,
  SCREEN_WIDTH,
  sizes,
  storage,
} from '../../constants';
import 'dayjs/locale/id';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ChatStackParamList } from '../../config/navigation/model';
import { EncryptedStorage, formatter } from '../../utils';
import { useAppSelector } from '../../config';
import axios from 'axios';

type Props = NativeStackScreenProps<ChatStackParamList, 'ChatDetailScreen'>;

const ChatDetailScreen: FC<Props> = () => {
  const findStep = (step: any) => (message: any) => message._id === step;
  const { conversationId, userId } = useAppSelector(s => s.HomeReducer);
  const [messages, setMessages] = useState<IMessage[]>();
  const [step, setStep] = useState<number>(1);

  useEffect(() => {
    const fetchChat = async () => {
      let accessToken: null | string = null;
      accessToken = await EncryptedStorage.getEncryptedStorage(
        storage.authCode,
      );

      axios(`${apis.baseURL}${apis.endpoints.chat}/${conversationId}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${accessToken}`, // notice the Bearer before your token
        },
      }).then(response => {
        const data = formatter.addMissingBracketJSON(response.data);
        console.log('chat response: ', data);
        setMessages(data?.pesan);
      });
    };
    // setMessages([
    // {
    //   _id: 1,
    //   text: 'Hello developerHello developerHello developerHello developer',
    //   createdAt: new Date(),
    //   user: {
    //     _id: 2,
    //     name: 'React Native',
    //     avatar: 'https://placeimg.com/140/140/any',
    //   },
    // },
    // ]);
    fetchChat();
  }, []);

  const sendChat = async (messages: { text: string }[]) => {
    let accessToken: null | string = null;
    accessToken = await EncryptedStorage.getEncryptedStorage(storage.authCode);

    const data = {
      isi: messages[0].text,
      conversationId: conversationId,
    };

    console.log('DATA', data);

    axios(`${apis.baseURL}${apis.endpoints.chat}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`, // notice the Bearer before your token
      },
      data: JSON.stringify(data),
    })
      .then(response => {
        const data = formatter.addMissingBracketJSON(response.data);
        console.log('chat response: ', data);
        // setMessages(data?.pesan);
        return Promise.resolve();
      })
      .catch(() => {
        return Promise.reject();
      });
  };

  const onSend = useCallback((messages = []) => {
    console.log('TEST', messages);

    const temp = messages[0];
    // temp.sent = true;
    // temp.received = true;
    sendChat(messages)
      .then(() => {
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, temp),
        );
      })
      .catch(err => console.error(err));
    // setMessages(previousMessages => GiftedChat.append(previousMessages, temp));
    // setTimeout(() => botSend(step), Math.round(Math.random() * 1000));
  }, []);

  // const botSend = (step = 0) => {
  //   const newMessage = messagesDummy
  //     .reverse()
  //     // .filter(filterBotMessages)
  //     .find(findStep(step));
  //   if (newMessage) {
  //     setMessages(previousMessages =>
  //       GiftedChat.append(previousMessages, messages),
  //     );
  //   }
  // };

  const renderSend = (props: SendProps<IMessage>) => {
    return (
      <Send
        {...props}
        containerStyle={{
          height: '100%',
        }}>
        <View
          style={{
            justifyContent: 'center',
            height: '100%',
            marginLeft: 14,
          }}>
          <View
            style={{
              backgroundColor: colors.primary,
              borderRadius: sizes.icon_size * 1.6,
              width: sizes.icon_size * 1.6,
              height: sizes.icon_size * 1.6,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={icons.icon_send_chat}
              style={{
                width: sizes.icon_size,
                height: sizes.icon_size,
              }}
            />
          </View>
        </View>
      </Send>
    );
  };

  const renderAction = (props: ActionsProps) => {
    return (
      <TouchableOpacity
        {...props}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          paddingHorizontal: sizes.padding / 2,
        }}>
        <Image
          source={icons.icon_attach_chat}
          style={{
            width: sizes.icon_size * 1.3,
            height: sizes.icon_size * 1.3,
          }}
        />
      </TouchableOpacity>
    );
  };

  const renderComposer = (props: ComposerProps) => {
    const { onTextChanged, text } = props || {};
    return (
      <TextInputBorder
        {...props}
        onChangeText={onTextChanged}
        value={text}
        multiline
        style={{
          width: SCREEN_WIDTH * 0.7,
          borderRadius: sizes.padding,
          marginVertical: 4,
          maxHeight: 100,
        }}
        textBoxStyle={{ paddingVertical: 6, paddingLeft: 0, width: '95%' }}
      />
    );
  };

  const renderTime = (props: TimeProps<IMessage>) => {
    return (
      <Time
        {...props}
        containerStyle={{
          left: {
            maxWidth: SCREEN_WIDTH * 0.7,
          },
        }}
      />
    );
  };

  const renderBubble = (props: BubbleProps<IMessage>) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: colors.tonalLightPrimary,
            padding: sizes.padding / 4,
          },
          right: {
            backgroundColor: colors.primary,
            padding: sizes.padding / 4,
          },
        }}
        textStyle={{
          left: {
            color: colors.bodyText,
            fontFamily: 'Inter-Regular',
          },
          right: {
            color: colors.white,
            fontFamily: 'Inter-Regular',
          },
        }}
      />
    );
  };

  const renderTicks = (message: IMessage) => {
    if (message?.user?._id !== 2) {
      return (
        (message.received || message.sent) && (
          <Image
            style={{
              width: sizes.icon_size,
              height: 10,
              marginTop: 4,
              marginLeft: -10,
            }}
            source={icons.icon_chat_read}
          />
        )
      );
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}>
      <HeaderBack title="test" />
      <GiftedChat
        placeholder="Ketik Sesuatu ..."
        messages={messages}
        alwaysShowSend
        //renderAvatar types doesnt accept null, just leave it like this
        renderAvatar={null}
        showUserAvatar={false}
        showAvatarForEveryMessage={false}
        onSend={messages => onSend(messages)}
        user={{
          id: userId,
        }}
        messagesContainerStyle={{
          backgroundColor: colors.white,
          paddingBottom: sizes.padding,
          paddingHorizontal: sizes.padding / 2,
        }}
        renderTime={props => renderTime(props)}
        scrollToBottom
        locale="id"
        // renderTicks={message => renderTicks(message)}
        renderBubble={props => renderBubble(props)}
        renderComposer={props => renderComposer(props)}
        renderActions={props => renderAction(props)}
        renderSend={props => renderSend(props)}
        timeTextStyle={{
          left: {
            color: colors.primaryLight,
            fontSize: 13,
            fontFamily: 'Poppins-Medium',
          },
          right: {
            color: colors.primaryLight,
            fontSize: 13,
            fontFamily: 'Poppins-Medium',
          },
        }}
        scrollToBottomComponent={() => (
          <Image
            source={icons.arrow_down_black}
            style={{
              width: 24,
              height: 24,
              alignSelf: 'center',
            }}
          />
        )}
      />
    </View>
  );
};

export default ChatDetailScreen;
