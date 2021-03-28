//
//  RNTDeepAR.m
//  deeparRNExample
//
//  Created by Matej Trbara on 02/03/2020.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RNTDeepAR.h"
#import "React/UIView+React.h"

@implementation RNTDeepAR {
  CGRect _frame;
  ARView* _arview;
  CameraController* _cameraController;
  UIImageView* _backgroundView;
}


-(instancetype)init {
  if ((self = [super init])) {
//    _arview = [[ARView alloc] init];
    _arview = [[ARView alloc] initWithFrame:[UIScreen mainScreen].bounds];
    // Set your app licence key for iOS project here (created through developer.deepar.ai)
    [_arview setLicenseKey:@"880135c4ea71ffe7fef203c8a76c45c501b254bd35f0ae7093a7d6efbe9499d4996d7cdb85eced8d"];
    
    _arview.delegate = self;
    [self addSubview:_arview];
    
    _cameraController = [[CameraController alloc] init];
    _cameraController.arview = _arview;
    
    [_arview initialize];
    [_cameraController startCamera];
//    UIInterfaceOrientation orientation = [[UIApplication sharedApplication] statusBarOrientation];
//    [self setupDeepARViewFrame];
//    [_arview initialize];
    
//    [_arview initializeWithCaptureSessionPreset:AVCaptureSessionPreset1280x720 orientation:orientation cameraPosition:AVCaptureDevicePositionFront];
  }
  
  return self;
}

- (void)dealloc {
  [_arview shutdown];
  _arview.delegate = nil;
}


//-(void)switchCamera {
//  if (_arview) {
////    AVCaptureDevicePosition position =  [_arview getCameraPosition] == AVCaptureDevicePositionBack ? AVCaptureDevicePositionFront : AVCaptureDevicePositionBack;
////    [_arview switchCamera:position];
//
//    NSString* message;
//    if (position == AVCaptureDevicePositionBack) {
//      message = @"back";
//    } else {
//      message = @"front";
//    }
//    self.onEventSent(@{ @"type": @"cameraSwitch", @"value": message});
//  }
//}

-(void)pause {
  
  if (_arview) {
    [_arview pause];
  }
}

-(void)resume {
  if (_arview) {
    [_arview resume];
  }
}

- (void)reactSetFrame:(CGRect)frame {
  [super reactSetFrame: frame];
  _frame = frame;
  [self setupDeepARViewFrame];
}


//-(void)startRecording {
//  if (self.flashOn && [_arview getCameraPosition] == AVCaptureDevicePositionBack) {
//    Class captureDeviceClass = NSClassFromString(@"AVCaptureDevice");
//    if (captureDeviceClass != nil) {
//      AVCaptureDevice *device = [AVCaptureDevice defaultDeviceWithMediaType:AVMediaTypeVideo];
//      if ([device hasTorch] && [device hasFlash]){
//
//        [device lockForConfiguration:nil];
//        [device setTorchMode:AVCaptureTorchModeOn];
//        [device setFlashMode:AVCaptureFlashModeOn];
//        [device unlockForConfiguration];
//
//        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, 0.25 * NSEC_PER_SEC), dispatch_get_main_queue(), ^{
//          if(self->_arview) {
//            [self->_arview startVideoRecordingWithOutputWidth:self.frame.size.width*0.75 outputHeight:self.frame.size.height*0.75];
//            //[self->_arview startRecordingWithScale:0.5];
//          }
//        });
//      }
//    }
//  } else {
//    if(_arview) {
//      [self->_arview startVideoRecordingWithOutputWidth:self.frame.size.width*0.75 outputHeight:self.frame.size.height*0.75];
//     //[_arview startRecordingWithScale:0.5];
//    }
//  }
//
//}

//-(void)finishRecording {
//
//  // Turn of torch
//  if (self.flashOn) {
//    // check if flashlight available
//    Class captureDeviceClass = NSClassFromString(@"AVCaptureDevice");
//    if (captureDeviceClass != nil) {
//      AVCaptureDevice *device = [AVCaptureDevice defaultDeviceWithMediaType:AVMediaTypeVideo];
//      if ([device hasTorch] && [device hasFlash]){
//        [device lockForConfiguration:nil];
//        [device setTorchMode:AVCaptureTorchModeOff];
//        [device setFlashMode:AVCaptureFlashModeOff];
//        [device unlockForConfiguration];
//      }
//    }
//  }
//
//  if(_arview) {
//    [_arview finishRecording];
//  }
//}
//
//-(void)takeScreenshot {
//  if (self.flashOn && [_arview getCameraPosition] == AVCaptureDevicePositionBack) {
//    Class captureDeviceClass = NSClassFromString(@"AVCaptureDevice");
//    if (captureDeviceClass != nil) {
//      AVCaptureDevice *device = [AVCaptureDevice defaultDeviceWithMediaType:AVMediaTypeVideo];
//      if ([device hasTorch] && [device hasFlash]){
//
//        [device lockForConfiguration:nil];
//        [device setTorchMode:AVCaptureTorchModeOn];
//        [device setFlashMode:AVCaptureFlashModeOn];
//        [device unlockForConfiguration];
//
//        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, 0.25 * NSEC_PER_SEC), dispatch_get_main_queue(), ^{
//          if(self->_arview) {
//            [self->_arview takeScreenshot];
//          }
//        });
//      }
//    }
//  } else {
//    if(_arview) {
//      [_arview takeScreenshot];
//    }
//  }
//}

-(void)switchEffect:(NSString*)effect andSlot:(NSString*)slot {
  NSString* path = [[NSBundle mainBundle]  pathForResource:effect ofType:@""];
  [_arview switchEffectWithSlot:slot path:path];
}


#pragma mark - ARViewDelegate methods

// Called when the engine initialization is complete. Do not call ARView methods before initialization.
- (void)didInitialize {
  
  [self setupDeepARViewFrame];
}

-(void) setupDeepARViewFrame {
  if(_arview.initialized && !CGRectIsEmpty(_frame) &&
                            (_arview.frame.size.height != _frame.size.height ||
                             _arview.frame.size.width != _frame.size.width ||
                             _arview.frame.origin.x != _frame.origin.x ||
                             _arview.frame.origin.y != _frame.origin.y ) ) {
    [_arview setFrame:_frame];
                              
    //[_arview switchEffectWithSlot:@"watermark" path:[[NSBundle mainBundle]  pathForResource:@"watermark" ofType:@""]];
    self.onEventSent(@{ @"type": @"initialized", @"value": @""});
  }
}

// Called when the finished the preparing for video recording.
- (void)didFinishPreparingForVideoRecording {
  
}

// Called when the video recording is started.
- (void)didStartVideoRecording {
  self.onEventSent(@{ @"type": @"didStartVideoRecording", @"value": @""});
}

// Called when the video recording is finished and video file is saved.
- (void)didFinishVideoRecording:(NSString*)videoFilePath {
  self.onEventSent(@{ @"type": @"didFinishVideoRecording", @"value": videoFilePath});
}

// Called if there is error encountered while recording video
- (void)recordingFailedWithError:(NSError*)error {
  self.onEventSent(@{ @"type": @"recordingFailedWithError", @"value": [error description]});
}

// Called when screenshot is taken
- (void)didTakeScreenshot:(UIImage*)screenshot {
  
  // Turn of torch
  if (self.flashOn) {
    // check if flashlight available
    Class captureDeviceClass = NSClassFromString(@"AVCaptureDevice");
    if (captureDeviceClass != nil) {
      AVCaptureDevice *device = [AVCaptureDevice defaultDeviceWithMediaType:AVMediaTypeVideo];
      if ([device hasTorch] && [device hasFlash]){
        [device lockForConfiguration:nil];
        [device setTorchMode:AVCaptureTorchModeOff];
        [device setFlashMode:AVCaptureFlashModeOff];
        [device unlockForConfiguration];
      }
    }
  }
  
  NSData *data = UIImageJPEGRepresentation(screenshot, 1.0);
  NSFileManager *fileManager = [NSFileManager defaultManager];
  NSString *cachesDir = [NSSearchPathForDirectoriesInDomains(NSCachesDirectory , NSUserDomainMask, YES) lastObject];
  NSString *fullPath = [cachesDir stringByAppendingPathComponent:@"temp_screenshot.jpg"];
  [fileManager createFileAtPath:fullPath contents:data attributes:nil];
  
  self.onEventSent(@{ @"type": @"screenshotTaken", @"value": fullPath});
  
}

- (void) didSwitchEffect:(NSString *)slot {
   self.onEventSent(@{ @"type": @"didSwitchEffect", @"value": slot});
}

// Called when the face appears or disappears.
- (void)faceVisiblityDidChange:(BOOL)faceVisible {
  
}

-(void)imageVisibilityChanged:(BOOL)imageVisible {
  self.onEventSent(@{ @"type": @"imageVisibilityChanged", @"value": imageVisible ? @"true" : @"false" });
}

@end

