import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import AuthLayout from '../../../components/AuthLayout';
import Input from '../../../components/TextInput';
import Checkbox from '../../../components/Checkbox';
import { color, font } from '../../../../theme';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
// import { white } from 'react-native-paper/lib/typescript/src/styles/colors';
import { useNavigation } from '@react-navigation/core';
import Icon from 'react-native-vector-icons/Ionicons';


const { height, width } = Dimensions.get("window")

const AlreadyVerifiedView = (props) => {
  console.log("DRIVER DAA", props)
  const navigation = useNavigation()
  const loginProfile = (email) => {
    console.log("USELESSSSSS", email)
    navigation.navigate('Signin', {
      logemail: email
    })
  }
  // const layoutProps = {
  //   heading: 'Please reset your password',
  //   buttonLabel: 'Reset',
  //   clickText: "Don't have an account?",
  //   onAuthToggle: props.navigateToSignup,
  //   onPress: props.onSubmit,
  //   page: 'Forget',
  //   loading: props.loading,
  // };

  return (
    <>


      <View style={{
        justifyContent: "center", alignContent: "center",
        alignItems: "center", height: height, backgroundColor: "#5CA8D6"
      }}>


        <View style={styles.CardMain}>
          <View style={styles.heading}>

            <Text style={styles.firstheading}>Choose an account</Text>
            {/* <Text style={styles.secondheading}>to continue to </Text> */}
          </View>
          <SafeAreaView style={styles.container}>
            { props.driverData?.length > 0 ?
            <ScrollView style={styles.scrollView}>

              <View>
                {
                  props.driverData?.map((driver,index) =>

                    (
                      <TouchableOpacity onPress={() => { loginProfile(driver.email) }} key={index}>



                        <View style={styles.card}>

                          <View style={styles.imageView}>
                            <Image style={styles.image} />
                          </View>

                          <View style={styles.textBox}>




                            <Text style={styles.text}>
                              {driver.name}

                            </Text>
                            <Text style={styles.time}>
                              {driver.email}
                            </Text>

                          </View>

                        </View>
                      </TouchableOpacity>
                    ))

                }



              </View>
            </ScrollView>
          :
          <View>
            <Text>NO DRIVER FOUND</Text>
          </View>
              }</SafeAreaView>
          <TouchableWithoutFeedback onPress={() => navigation.navigate('LoginEmail')} style={{ marginLeft: 0, paddingVertical: 10 }}>

            <View style={styles.bottomHeading}>
              <Icon
                name="person-add-outline"
                size={20}
                style={{ marginRight: 10 }} />
              <Text style={styles.lowertext}>Use another Account</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>

    </>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginBottom: 20
  },
  scrollView: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 10
  },
  actionWrapper: {
    flexDirection: 'row',
    marginTop: 22,
  },
  checkboxWrapper: {
    flexDirection: 'row',
  },
  checkboxText: {
    fontSize: 13,
    color: color.primary,
    fontFamily: font.regular,
    textAlignVertical: 'center',
  },
  forgetText: {
    fontSize: 13,
    color: color.primary,
    fontFamily: font.regular,
    marginTop: 8,
    width: 160,
    textAlign: 'right',
  },
  CardMain: {

    flexDirection: 'column',
    // justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    width: 500,
    height: height * 0.7,
    backgroundColor: "white",


  },

  firstheading: {

    fontSize: 30,
    fontFamily: font.thin,
    letterSpacing: 0.1,
    marginBottom: 5,
    textAlign: "center",
    color: "black",
    marginTop: 30
  },
  secondheading: {

    fontSize: 18,
    fontFamily: font.thin,
    letterSpacing: 0.1,
    textAlign: "center",
    color: "black",
    marginBottom: 50
  },
  card: {
    // marginTop:-20,
    height: 87.5,
    width: 450,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 29,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    // marginBottom: 5,
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, .5)'

  },
  image:
  {
    width: 40,
    height: 40,
    borderRadius: 100
  },
  imageView: {

    width: 40,
    height: 40,
    borderRadius: 200,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: '#5877AE'


  },
  textBox: {
    flex: 1,

    // marginTop: 20

  },
  text: {
    fontFamily: font.bold,
    fontSize: 16,
    color: '#373C44',
    marginTop: -5
  },
  time: {
    fontFamily: font.regular,
    marginTop: 4,
    fontSize: 14,
    color: '#949494'

  },
  bottomHeading: {

    flexDirection: "row",
    alignItems: "baseline",
    alignContent: "center",
marginBottom:20
    // justifyContent:"space-between"



  },
  lowertext: {
    fontSize: 16,
    color: "black",


  }



});

export default AlreadyVerifiedView;
