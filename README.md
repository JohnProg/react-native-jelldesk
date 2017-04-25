# react-native-jelldesk
A React Native module which includes UI and business code to allows you to integrate with [Jelldesk](http://www.jelldesk.com/) with minimal effort.

<p align="center">
 <a href="#"><img src="https://lh3.googleusercontent.com/4D7Mr6N5HyQS_HIVRF1n8MqcuJIT8DjkpqKkyhCjBGUdy8eVBeLQycdMBvFnQjwNDgKzuCmKcbg693Y=w1600-h770-rw" height="450" width="300"></a>
 <a href="#"><img src="https://lh5.googleusercontent.com/pNCfcGNi-JBWRLzyr2KYhBfe04st6HlRZdCOB6wlbwghSBXgDpFZtk9MXQ2P7TKclXIJOlmDa47JnGk=w1600-h770-rw" height="450" width="300">
 </a>
</p>

## Install
`npm install react-native-jelldesk@latest --save`

## Dependencies configuration
1. react-native-file-picker (Android)
### Android
```gradle
// file: android/settings.gradle
...

include ':react-native-file-picker'
project(':react-native-file-picker').projectDir = new File(settingsDir, '../node_modules/react-native-file-picker/android')
```
```gradle
// file: android/app/build.gradle
...

dependencies {
    ...
    compile project(':react-native-file-picker')
}
```
```xml
<!-- file: android/src/main/AndroidManifest.xml -->
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.myApp">

    <uses-permission android:name="android.permission.INTERNET" />

    <!-- add following permissions -->
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
    <uses-feature android:name="android.hardware.camera" android:required="true"/>
    <uses-feature android:name="android.hardware.camera.autofocus" />
    <!-- -->
    ...
```
```java
// file: MainApplication.java
...

import com.filepicker.FilePickerPackage; // import package

public class MainApplication extends Application implements ReactApplication {

   /**
   * A list of packages used by the app. If the app uses additional views
   * or modules besides the default ones, add more packages here.
   */
    @Override
    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new FilePickerPackage() // Add package
        );
    }
...
}
```

## Usage
 Use it like so:
 When you want to display Jelldesk embeded widget:  
 **token**: token from Jira Service Desk  
 **projectKey**: Jira Service Desk project key  
 
```js
  import { JelldeskBox } from 'react-native-jelldesk';
  
  export default class JelldeskSample extends Component {
  render() {    
	    return (
	      <View style={styles.container}>
	        <Text style={styles.welcome}>
	          Welcome to React Native!
	        </Text>
	        <Text style={styles.instructions}>
	          To get started, edit index.android.js
	        </Text>
	        <Text style={styles.instructions}>
	          Double tap R on your keyboard to reload,{'\n'}
	          Shake or press menu button for dev menu
	        </Text>
    
       <JelldeskBox token={token} projectKey={projectkey} />
      </View>
    );
  }
}
```
