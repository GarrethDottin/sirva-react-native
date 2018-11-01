package com.imove;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.idehub.GoogleAnalyticsBridge.GoogleAnalyticsBridgePackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.airbnb.android.react.lottie.LottiePackage;
import com.cmcewen.blurview.BlurViewPackage;
import com.RNTextInputMask.RNTextInputMaskPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.horcrux.svg.SvgPackage;
import com.reactnativepayments.ReactNativePaymentsPackage;
import com.reactnativepayments.ReactNativePaymentsPackage;
import com.horcrux.svg.SvgPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new GoogleAnalyticsBridgePackage(),
            new LinearGradientPackage(),
            new LottiePackage(),
            new BlurViewPackage(),
            new RNTextInputMaskPackage(),
            new ReactNativeConfigPackage(),
            new SvgPackage(),
            new ReactNativePaymentsPackage(),
            new ReactNativePaymentsPackage(),
            new SvgPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
