import React, { useEffect, useCallback, useState } from 'react';
import { View, Image, Text } from 'react-native';
import { Bubble, GiftedChat, Send, Time } from 'react-native-gifted-chat/src';
import { HeaderBack, TextboxBorder } from '../../components';
import {
  colors,
  icons,
  messagesDummy,
  SCREEN_WIDTH,
  sizes,
} from '../../constants';
import 'dayjs/locale/id';

const ChatDetailScreen = () => {
  const findStep = step => message => message._id === step;
  const [messages, setMessages] = useState(messagesDummy);
  const [step, setStep] = useState(1);

  useEffect(() => {
    // setMessages([
    //   {
    //     _id: 1,
    //     text: 'Hello developerHello developerHello developerHello developer',
    //     createdAt: new Date(),
    //     user: {
    //       _id: 2,
    //       name: 'React Native',
    //       avatar: 'https://placeimg.com/140/140/any',
    //     },
    //   },
    // ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
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

  const renderSend = props => {
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

  const renderAction = props => {
    return (
      <View
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
      </View>
    );
  };

  const renderComposer = props => {
    return (
      <TextboxBorder
        {...props}
        onChangeText={props.onTextChanged}
        value={props.text}
        multiline
        style={{
          width: SCREEN_WIDTH * 0.7,
          borderRadius: sizes.padding,
          marginVertical: 4,
          maxHeight: 100,
        }}
        textBoxStyle={{ paddingVertical: 6, paddingLeft: 0 }}
      />
    );
  };

  const renderTime = props => {
    return (
      <Time
        {...props}
        containerStyle={{
          left: {
            alignSelf: 'flex-end',
            flex: 1,
          },
        }}
      />
    );
  };

  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: colors.tonalLightPrimary,
          },
          right: {
            backgroundColor: colors.primary,
          },
        }}
        textStyle={{
          left: {
            color: colors.bodyText,
          },
          right: {
            color: colors.white,
          },
        }}
      />
    );
  };

  const renderTicks = message => {
    return (
      (message.received || message.sent) && (
        <Text style={{ color: 'black' }}>Read</Text>
      )
    );
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
        renderAvatar={null}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
        messagesContainerStyle={{
          backgroundColor: colors.white,
          paddingBottom: sizes.padding,
          paddingHorizontal: sizes.padding / 2,
        }}
        renderTime={props => renderTime(props)}
        scrollToBottom
        locale="id"
        renderTicks={message => renderTicks(message)}
        renderBubble={props => renderBubble(props)}
        renderComposer={props => renderComposer(props)}
        renderActions={props => renderAction(props)}
        render={props => <View {...props} style={{ borderWidth: 0 }} />}
        renderSend={props => renderSend(props)}
        timeTextStyle={{
          left: {
            color: colors.primaryLight,
            fontSize: 13,
          },
          right: {
            color: colors.primaryLight,
            fontSize: 13,
          },
        }}
      />
    </View>
  );
};

export default ChatDetailScreen;
