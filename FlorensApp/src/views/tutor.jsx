import React, { useState, useEffect, useContext } from 'react';
import { Alert, View, ImageBackground, Image } from 'react-native';
import { GiftedChat, Send } from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from '../config';
import { AuthContext } from "../../context/AuthContext";
import nurseAvatar from '../../img/enfermera.png';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [Data, setData] = useState("");
  const {checkUserAuthentication} = useContext(AuthContext);

  useEffect(() => {
    checkUserAuthentication();
    loadInitialMessages();
    const intervalId = setInterval(() => {
      checkUserAuthentication();
    }, 2000); 
    
    return () => clearInterval(intervalId);
  }, []);

  const loadInitialMessages = async () => {
    const stored = await AsyncStorage.getItem('userData');
    const userData = JSON.parse(stored);
    setData(userData.usuario);
    console.log(Data);
    try {
      const storedMessages = await AsyncStorage.getItem('chat_history'+userData.usuario);

      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
        console.log(JSON.parse(storedMessages));
      } else {
        setMessages([
          {
            _id: 1,
            text: 'Hola soy Lucia, ¿en qué puedo ayudarte?',
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'Asistente',
              avatar: nurseAvatar,
            },
          },
        ]);
      }
    } catch (error) {
      console.error('Error al cargar mensajes iniciales:', error);
    }
  };

  const onSend = async (newMessages = []) => {
    const userMessage = newMessages[0];

    // Actualiza los mensajes inmediatamente en la interfaz de usuario
    setMessages((prevMessages) => GiftedChat.append(prevMessages, userMessage));
    saveMessagesToStorage([...messages, userMessage]);

    try {
      const response = await sendUserMessage(userMessage.text);

      const botMessage = {
        _id: Math.random().toString(),
        text: response.data.Respuesta,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Asistente',
          avatar: nurseAvatar,
        },
      };

      // Actualiza los mensajes con la respuesta del servidor
      setMessages((prevMessages) => GiftedChat.append(prevMessages, botMessage));
      saveMessagesToStorage([...messages, botMessage]);
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
    }
  };

  const sendUserMessage = async (text) => {
    const data = { text };

    try {
      const response = await axios.post(`${BASE_URL}/Chat/Chatbot`, { Mensaje: data });
      console.log('Respuesta del servidor:', response.data);
      return response;
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
      throw error;
    }
  };

  const saveMessagesToStorage = async (messagesToSave) => {
    try {
      await AsyncStorage.setItem('chat_history'+Data, JSON.stringify(messagesToSave));
    } catch (error) {
      console.error('Error al guardar mensajes en AsyncStorage:', error);
    }
  };

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <Image source={require('../../img/enviar.png')} style={{width: 30, height: 30, marginBottom: 7, marginRight: 8}} />
        </View>
      </Send>
    );
  };

  return (
    <ImageBackground source={require('../../img/fondo.jpg')} style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'transparent' }}>
        <GiftedChat
          messages={messages}
          onSend={(newMessages) => onSend(newMessages)}
          user={{ _id: 1 }}
          placeholder="Ingresa una instrucción"
          renderSend={renderSend}
        />
      </View>
    </ImageBackground>
  );
};

export default ChatScreen;