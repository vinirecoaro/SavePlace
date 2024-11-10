import Input from '@/components/Input'
import {router} from 'expo-router'
import React, {useEffect, useState} from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import {FloatingAction} from 'react-native-floating-action'
import { Container } from './styles'
import Icon from 'react-native-vector-icons/FontAwesome'; 

export default function HomeScreen(){

  const actions = [
    {
      text: 'Adicionar localização',
      icon: <Icon name="plus" size={20} color="#fff" />,
      name: 'bt_add_loc',
      position: 1,
    },
  ];

  const handleAddLoc = (name?: string) => {
    if (name) {
      console.log('Ação pressionada:', name);
    } else {
      console.log('Ação pressionada sem nome');
    }
  };


  return (
    
    <Container>
      <Text>Mapa</Text>
      <FloatingAction 
        color='#f4511e' 
        overrideWithAction={true}
        actions={actions}
        onPressItem={handleAddLoc}
      />
    </Container>
    
  )
}

  