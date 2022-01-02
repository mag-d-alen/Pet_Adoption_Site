/** @format */

import React, { useState } from 'react';
import { IKImage, IKContext, IKUpload } from 'imagekitio-react';
import { v4 as uuidv4 } from 'uuid';
import { useField } from 'formik';

export default function ProfileImg(props) {
  const [image, setImage] = useState('');
  const [field, meta, helpers] = useField({ name: props.name });

  const onError = (err) => {
    console.log('Error', err);
  };

  const onSuccess = (res) => {
    setImage(res.name);
    helpers.setValue(res.url);
  };

  return (
    <IKContext
      publicKey='public_2jIz52z8w7n/jiO/gw6VCXTS/ic='
      urlEndpoint='https://ik.imagekit.io/idfq3nty6jr'
      authenticationEndpoint='http://localhost:8000/auth'
    >
      <span>Upload Profile photo</span>

      <IKUpload
        fileName={image}
        tags={['sample-tag1']}
        customCoordinates={'10,10,10,10'}
        isPrivateFile={false}
        useUniqueFileName={true}
        responseFields={['tags']}
        folder={'/'}
        onError={onError}
        onSuccess={onSuccess}
      />

      <IKImage
        path={image}
        transformation={[
          {
            height: '100',
            width: '100',
          },
        ]}
        lqip={{ active: true, quality: 10 }}
      />
    </IKContext>
  );
}
