import React, { Component } from 'react';
import {
  Image,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
  Platform
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import RNTesseractOcr from 'react-native-tesseract-ocr';
import styles from './styles';

const Button = (Platform.OS === 'android') ? TouchableNativeFeedback : TouchableOpacity;

const imagePickerOptions = {
  quality: 1.0,
  storageOptions: {
    skipBackup: false,
  },
};
const tessOptions = {
  whitelist: '',
  blacklist: ''
};

class ImagePickerScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSource: null,
      text: ''
    };
    this.selectImage = this.selectImage.bind(this);
  }

  selectImage() {
    ImagePicker.showImagePicker(imagePickerOptions, (response) => {
      if (!response.didCancel) {
        const source = { uri: response.uri };
        this.setState({ imageSource: source });
        this.extractText(response.path);
      }
      console.log('Image : ', response);
      
    });
  }

  extractText(imgPath) {
    const lang = 'LANG_INDONESIAN';
    const tessOptions = {
        whitelist : null,
        blacklist : null,
    }
    RNTesseractOcr.recognize(imgPath, lang, tessOptions)
    .then((result) => {
      this.setState({ ocrResult: result });
      console.log("OCR Result: ", result);
    })
    .catch((err) => {
      console.log("OCR Error: ", err);
    })
  .done();
  }

  render() {
    const { imageSource } = this.state;
    return (
      <View style={styles.container}>
        <Button onPress={this.selectImage} >
          <View style={[styles.image, styles.imageContainer, !imageSource && styles.rounded]}>
            {
              imageSource === null
                ? <Text>Tap me!</Text>
                : <Image style={styles.image} source={imageSource} />
            }
          </View>
        </Button>
        <Text>{this.state.text}</Text>
      </View>
    );
  }
}

ImagePickerScreen.navigationOptions = {
  title: 'Image Picker Example',
};

export default ImagePickerScreen;