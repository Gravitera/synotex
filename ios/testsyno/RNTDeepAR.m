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
    
    UIInterfaceOrientation orientation = [[UIApplication sharedApplication] statusBarOrientation];
    [self setupDeepARViewFrame];
    [_arview initialize];
    
//    [_arview initializeWithCaptureSessionPreset:AVCaptureSessionPreset1280x720 orientation:orientation cameraPosition:AVCaptureDevicePositionFront];
  }
  
  return self;
}

- (void)dealloc {
  [_arview shutdown];
  _arview.delegate = nil;
}

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

-(void)switchEffect:(NSString*)effect andSlot:(NSString*)slot {
  NSLog(@"effect :::%@",effect);
  NSLog(@"slot :::%@",slot);
  [_arview switchEffectWithSlot:slot path:effect];
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

