import React from 'react';
import MethodView from './view';

const Method = (props) => {
  const cardDetails = [
    /*
    {
      heading: 'OPEN CV',
      desc: '실시간 컴퓨터 비전을 목적으로 한 프로그래밍 Library 이다.  이미지 프로세싱에 중점을 둔 라이브러리 이며 TensorFlow , Torch / PyTorch 및 Caffe 의 딥러닝 프레임워크를 지원한다',
      dateTime: 'April 30, 2014 1:01 PM'
    },
    {
      heading: 'Statistical data',
      desc: '데이터 연구소에 수집된 통계자료을 근거로 사람의 기본적인 신체 정보을 파악을 통해 미리 수집된 데이터로 결과값을 예측합니다. 이것은 정확한 치수와 대조하여 표준편차을 통한 정확한 얼굴의 치수값을 산출합니다.',
      dateTime: 'April 30, 2014 1:01 PM'
    },
    {
      heading: 'Camera Angle',
      desc: '얼굴길이을 측정할때에 사용하는 방식은 카메라의 앵글을 이용한 방식을 사용합니다. 이것은 기존의 레퍼런스 아이템없이 얼굴길이을 잴수있는 독자적인 방법입니다.',
      dateTime: 'April 30, 2014 1:01 PM'
    },
    */
    {
      heading: '카메라 측정 기법',
      desc: '3D 깊이 카메라 (RGB-D) 가 없는 안드로이드 및 예전 휴대폰에서도 얼굴 크기 측정이 가능하도록 OPEN-CV 와 텐서플로우 를 사용하여 얼굴 사진의 픽셀만 가지고도 얼굴 크기를 측정합니다',
      dateTime: 'January 17, 2020 1:01 PM'
    },
    {
      heading: '백데이터 머신러닝 기법',
      desc: '데이터 연구소에 수집된 통계자료을 근거로 입력된 유저의 기본적인 신체 정보를 기반으로 머신러닝 학습된 모델을 사용하여 정확한 얼굴 치수값을 산출합니다',
      dateTime: 'January 10, 2014 1:01 PM'
    },

  ];

  const viewProps = {
    ...props,
    cardDetails
  };

  return <MethodView {...viewProps} />;
};

export default Method;
