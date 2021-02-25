package com.lynxbus;
import android.os.Bundle; // here 

import com.facebook.react.ReactActivity;
import com.lynxbus.nativecomponents.RNTDeepAR;

// react-native-splash-screen >= 0.3.1 
import org.devio.rn.splashscreen.SplashScreen; // here 
 

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "frontOffice";
  }

    private RNTDeepAR deepArView;

     @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);  // here 
        super.onCreate(savedInstanceState);
    }

    @Override
    protected void onStart() {
        super.onStart();
        if (this.deepArView != null) {
            this.deepArView.onStart();
        }
    }

    @Override
    protected void onStop() {
        super.onStop();
        if (this.deepArView != null) {
            this.deepArView.onStop();
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        this.deepArView = null;
    }

    public void setDeepArView(RNTDeepAR view) {
        this.deepArView = view;
    }
}

