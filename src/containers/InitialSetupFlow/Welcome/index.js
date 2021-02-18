import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import WelcomeView from './view';
import openSocket from 'socket.io-client';
import Geolocation from '@react-native-community/geolocation';
import { getStorageItem } from '../../../utils';

const Welcome = (props) => {
  const [timerDay, setDay] = useState('00');
  const [timerHour, setHour] = useState('00');
  const [timerMinute, setMinute] = useState('00');
  const [timerSecond, setSecond] = useState('00');

  useEffect(() => {
    // socket = openSocket("http://192.168.43.143:5000");
    socket = openSocket("https://xehen-lynx.herokuapp.com");
    cosnole.log("WELCOME SOCKET", socket)
    createTimer();
    // setInterval(sendLocation, 2000);
  }, []);

  const sendLocation = async () => {
    console.log('connecting...');
    const busId = await getStorageItem('BusID');
    Geolocation.getCurrentPosition(
      (position) => {
        const initialPosition = JSON.stringify(position);
        console.log(initialPosition);
        socket.emit('sendBusLocation', { busId, location: initialPosition });
      },
      (error) => {
        socket.emit('sendBusLocation', { busId, location: error });
        console.log(error);
      },
      { enableHighAccuracy: true, timeout: 2000, maximumAge: 3600000 },
    );
  };

  const onNext = () => {
    props.navigation.navigate('ChooseProduct');
  };

  const createTimer = () => {
    var countDownDate = Date.now() + 14 * 24 * 60 * 60 * 1000;
    console.log('future -->', Date.now() + 14 * 24 * 60 * 60 * 1000);
    // Update the count down every 1 second Date.now() + (14 * 24 * 60 * 60)
    // var x = setInterval(function () {
    //   // Get today's date and time
    //   var now = new Date().getTime();
    //   // console.log('now -->', now);
    //   // Find the distance between now and the count down date
    //   var distance = countDownDate - now;
    //   // console.log('distance -->', distance);
    //   // Time calculations for days, hours, minutes and seconds
    //   var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    //   var hours = Math.floor(
    //     (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    //   );
    //   var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    //   var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    //   setDay(days.toString());
    //   setHour(hours.toString());
    //   setMinute(minutes.toString());
    //   setSecond(seconds.toString());
    //   // If the count down is over, write some text
    //   if (distance < 0) {
    //     clearInterval(x);
    //   }
    // }, 1000);
  };

  // createTimer()
  const viewProps = {
    timerDay,
    timerHour,
    timerMinute,
    timerSecond,
    onNext,
    ...props,
  };
  // console.log("nav", props.navigation)

  return <WelcomeView {...viewProps} />;
};

const mapStateToProps = (state) => {
  cons;
};

export default Welcome;
