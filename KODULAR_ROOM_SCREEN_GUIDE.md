# Kodular Room Screen Implementation Guide

## Screen Setup: RoomScreen

### 1. Screen Properties
```
Screen Name: RoomScreen
Title: "Room Experience"
Background Color: #1a1a2e
Icon: Dynamic based on room type
Orientation: Portrait (with landscape support)
Sizing: Responsive
Fullscreen: Optional (for immersive experience)
```

### 2. Components Layout (Adaptive to Room Type)

#### A. Background and Overlay System
```
Component: Canvas
Name: BackgroundCanvas
Width: Fill Parent
Height: Fill Parent
Background Color: Dynamic based on room type

Component: Vertical Arrangement (Main Container)
Name: MainRoomArrangement
Width: Fill Parent
Height: Fill Parent
Position: Over canvas
Background: Semi-transparent overlay
```

#### B. Header with Back Button
```
Component: Horizontal Arrangement
Name: RoomHeaderArrangement
Width: Fill Parent
Height: 60 pixels
Background Color: rgba(0,0,0,0.7)
Position: Top of screen

Inside RoomHeaderArrangement:
├── Button (BackToTemplateButton)
│   ├── Text: "← Back"
│   ├── Width: 80 pixels
│   ├── Height: 40 pixels
│   ├── Background Color: rgba(255,255,255,0.2)
│   ├── Text Color: #ffffff
│   └── Shape: Rounded corners
├── Label (RoomTitle)
│   ├── Text: "WakeRoom" (dynamic)
│   ├── Width: Fill Parent
│   ├── Text Color: #ffffff
│   ├── Font Size: 18
│   ├── Font Typeface: Bold
│   └── Text Alignment: Center
└── Label (RoomIcon)
    ├── Text: "🌅" (dynamic)
    ├── Font Size: 24
    └── Width: 50 pixels
```

#### C. Central Experience Area
```
Component: Vertical Arrangement
Name: ExperienceArrangement
Width: Fill Parent
Height: Fill Parent
Alignment: Center
Margin: 20 pixels all sides

Inside ExperienceArrangement:
├── Label (ExperienceTitle)
│   ├── Text: Dynamic based on room type
│   ├── Font Size: 28
│   ├── Text Color: #ffffff
│   ├── Font Typeface: Bold
│   ├── Text Alignment: Center
│   └── Margin: 20 pixels bottom
├── Label (ExperienceSubtitle)
│   ├── Text: Dynamic based on room type
│   ├── Font Size: 16
│   ├── Text Color: #a0aec0
│   ├── Text Alignment: Center
│   └── Margin: 10 pixels bottom
├── Label (ExperienceText)
│   ├── Text: Dynamic description
│   ├── Font Size: 14
│   ├── Text Color: #ffffff
│   ├── Text Alignment: Center
│   ├── Width: 80%
│   └── Margin: 20 pixels bottom
└── Vertical Arrangement (InteractiveArea)
    └── [Dynamic content based on room type]
```

#### D. Room-Specific Interactive Areas

##### For Wake Room:
```
Component: Vertical Arrangement
Name: WakeInteractiveArea
├── Button (WakeActivationButton)
│   ├── Text: "🌅 ACTIVATE MORNING EXPERIENCE"
│   ├── Width: 80%
│   ├── Height: 60 pixels
│   ├── Background Color: #ff6b6b
│   ├── Text Color: #ffffff
│   ├── Font Size: 16
│   ├── Font Typeface: Bold
│   └── Shape: Rounded corners
├── Label (WakeTimer)
│   ├── Text: "00:00" (timer display)
│   ├── Font Size: 48
│   ├── Text Color: #ff6b6b
│   ├── Font Typeface: Monospace
│   └── Text Alignment: Center
└── Horizontal Arrangement (WakeControls)
    ├── Button: "Start"
    ├── Button: "Pause" 
    └── Button: "Reset"
```

##### For Zang Room:
```
Component: Vertical Arrangement
Name: ZangInteractiveArea
├── Label (AudioPlayerTitle)
│   ├── Text: "🎵 AUDIO MEDITATION SPACE"
│   ├── Font Size: 20
│   ├── Text Color: #6c5ce7
│   └── Text Alignment: Center
├── Horizontal Arrangement (AudioTabs)
│   ├── Button (DefaultAudioTab)
│   │   ├── Text: "Default Audio"
│   │   ├── Background Color: #6c5ce7 (active)
│   │   └── Width: 50%
│   └── Button (LocalAudioTab)
│       ├── Text: "Local Audio"
│       ├── Background Color: #2d3748 (inactive)
│       └── Width: 50%
├── Vertical Arrangement (AudioPlayerArea)
│   ├── Label (TrackTitle)
│   │   ├── Text: "BabyElephantWalk60.wav"
│   │   ├── Font Size: 16
│   │   └── Text Color: #ffffff
│   ├── Horizontal Arrangement (AudioControls)
│   │   ├── Button (PlayPauseButton)
│   │   │   ├── Text: "▶️" or "⏸️"
│   │   │   ├── Width: 60 pixels
│   │   │   └── Background Color: #6c5ce7
│   │   ├── Slider (ProgressSlider)
│   │   │   ├── Min Value: 0
│   │   │   ├── Max Value: 100
│   │   │   └── Width: 60%
│   │   └── Label (TimeDisplay)
│   │       ├── Text: "00:00 / 03:45"
│   │       └── Font Size: 12
│   └── Horizontal Arrangement (VolumeControls)
│       ├── Label: "🔊"
│       ├── Slider (VolumeSlider)
│       │   ├── Min Value: 0
│       │   ├── Max Value: 100
│       │   ├── Initial Value: 80
│       │   └── Width: 70%
│       └── Label (VolumePercent): "80%"
├── Button (LocalAudioPicker)
│   ├── Text: "📁 Choose Local Audio File"
│   ├── Visible: false (initially)
│   ├── Background Color: #00d9ff
│   └── Width: 80%
└── Label (LocalAudioStatus)
    ├── Text: "No local audio selected"
    ├── Visible: false (initially)
    └── Text Color: #a0aec0
```

##### For Beamer Room:
```
Component: Vertical Arrangement
Name: BeamerInteractiveArea
├── Label (BeamerTitle)
│   ├── Text: "📽️ PROJECTION VISUALIZATION"
│   ├── Font Size: 20
│   ├── Text Color: #00d9ff
│   └── Text Alignment: Center
├── Button (BeamerActivationButton)
│   ├── Text: "🎥 START PROJECTION"
│   ├── Width: 80%
│   ├── Height: 60 pixels
│   ├── Background Color: #00d9ff
│   ├── Text Color: #1a1a2e
│   ├── Font Size: 16
│   └── Font Typeface: Bold
├── Canvas (ProjectionCanvas)
│   ├── Width: 90%
│   ├── Height: 200 pixels
│   ├── Background Color: #000000
│   └── Border: 2px #00d9ff
└── Label (ProjectionStatus)
    ├── Text: "Ready for projection..."
    ├── Text Color: #00d9ff
    └── Text Alignment: Center
```

#### E. Bottom Info Area
```
Component: Vertical Arrangement
Name: BottomInfoArrangement
Width: Fill Parent
Height: Automatic
Position: Bottom of screen
Background Color: rgba(0,0,0,0.8)
Margin: 20 pixels all sides

Inside BottomInfoArrangement:
├── Horizontal Arrangement (QRTokenArea)
│   ├── Label: "QR Token:"
│   ├── Label (QRTokenDisplay)
│   │   ├── Text: Dynamic token
│   │   ├── Font Family: Monospace
│   │   ├── Text Color: #00d9ff
│   │   └── Font Size: 12
│   └── Button (RegenerateToken)
│       ├── Text: "🔄"
│       ├── Width: 40 pixels
│       └── Background Color: #6c5ce7
├── Label (ActivationInfo)
│   ├── Text: "Room activated and ready for use"
│   ├── Text Color: #00b894
│   ├── Font Size: 12
│   └── Text Alignment: Center
└── Button (QRCodeButton)
    ├── Text: "📱 Show QR Code"
    ├── Background Color: #6c5ce7
    ├── Width: 60%
    └── Height: 35 pixels
```

### 3. Variables Setup

#### Global Variables
```
Variable Name: currentRoom
Type: Dictionary
Initial Value: Empty Dictionary

Variable Name: roomType
Type: Text
Initial Value: ""

Variable Name: roomToken
Type: Text
Initial Value: ""

Variable Name: isPlaying
Type: Boolean
Initial Value: false

Variable Name: currentTrackPosition
Type: Number
Initial Value: 0

Variable Name: trackDuration
Type: Number
Initial Value: 0

Variable Name: currentVolume
Type: Number
Initial Value: 80

Variable Name: localAudioPath
Type: Text
Initial Value: ""

Variable Name: timerSeconds
Type: Number
Initial Value: 0

Variable Name: isTimerRunning
Type: Boolean
Initial Value: false
```

### 4. Components to Add

#### Required Components
```
1. Player Component
   Name: AudioPlayer
   For: Zang room audio playback

2. File Component
   Name: AudioFilePicker
   For: Local audio selection

3. Clock Component
   Name: RoomTimer
   For: Timer functionality and audio progress

4. QR Code Generator Extension
   Name: QRGenerator
   For: Token QR codes

5. TinyDB Component
   Name: RoomDB
   For: Room data storage
```

### 5. Block Programming - Step by Step

#### A. Screen Initialize Event
```
When RoomScreen.Initialize:
├── Set global currentRoom to TinyDB.GetValue("current_room")
├── Set global roomType to TinyDB.GetValue("room_type")
├── If currentRoom is empty:
│   ├── Show notification: "No room data found"
│   ├── Close screen
│   └── Open TemplateScreen
├── Call GenerateRoomToken
├── Call SetupRoomExperience
├── Call LoadRoomSpecificData
└── Call InitializeInteractiveElements
```

#### B. Room Experience Setup
```
Procedure: SetupRoomExperience
├── Set RoomTitle.Text to get currentRoom "name"
├── Set room-specific styling based on roomType:
│   ├── If roomType = "wake":
│   │   ├── Set BackgroundCanvas.BackgroundColor to #ff6b6b
│   │   ├── Set ExperienceTitle.Text to "MORNING ACTIVATION"
│   │   ├── Set ExperienceSubtitle.Text to "Begin your day with intention"
│   │   ├── Set RoomIcon.Text to "🌅"
│   │   └── Show WakeInteractiveArea
│   ├── If roomType = "zang":
│   │   ├── Set BackgroundCanvas.BackgroundColor to #6c5ce7
│   │   ├── Set ExperienceTitle.Text to "AUDIO MEDITATION"
│   │   ├── Set ExperienceSubtitle.Text to "Immerse in soundscapes"
│   │   ├── Set RoomIcon.Text to "🎵"
│   │   └── Show ZangInteractiveArea
│   └── If roomType = "beamer":
│       ├── Set BackgroundCanvas.BackgroundColor to #00d9ff
│       ├── Set ExperienceTitle.Text to "PROJECTION SPACE"
│       ├── Set ExperienceSubtitle.Text to "Visualize your experience"
│       ├── Set RoomIcon.Text to "📽️"
│       └── Show BeamerInteractiveArea
└── Set ExperienceText.Text to get currentRoom "description"
```

#### C. Token Generation
```
Procedure: GenerateRoomToken
├── Set currentYear to current year
├── Set roomPrefix based on roomType:
│   ├── "wake" → "WK"
│   ├── "zang" → "ZG" 
│   └── "beamer" → "BM"
├── Set randomNumber to random integer 1000-9999
├── Set global roomToken to join(roomPrefix, currentYear, randomNumber)
├── Set QRTokenDisplay.Text to roomToken
└── Store token in TinyDB for QR generation
```

#### D. Audio System (Zang Room)
```
When DefaultAudioTab.Click:
├── Set DefaultAudioTab.BackgroundColor to #6c5ce7
├── Set LocalAudioTab.BackgroundColor to #2d3748
├── Set AudioPlayerArea.Visible to true
├── Set LocalAudioPicker.Visible to false
├── Set LocalAudioStatus.Visible to false
├── Set TrackTitle.Text to "BabyElephantWalk60.wav"
└── Call LoadDefaultAudio

When LocalAudioTab.Click:
├── Set LocalAudioTab.BackgroundColor to #6c5ce7
├── Set DefaultAudioTab.BackgroundColor to #2d3748
├── Set AudioPlayerArea.Visible to true
├── Set LocalAudioPicker.Visible to true
├── Set LocalAudioStatus.Visible to true
└── If localAudioPath is not empty: Call LoadLocalAudio

Procedure: LoadDefaultAudio
├── Set AudioPlayer.Source to default audio file
├── Set trackDuration to audio file length
├── Set ProgressSlider.MaxValue to trackDuration
├── Set TrackTitle.Text to "BabyElephantWalk60.wav"
└── Update time displays

When LocalAudioPicker.Click:
├── Call AudioFilePicker.Open
└── Wait for file selection

When AudioFilePicker.AfterPicking:
├── Set global localAudioPath to AudioFilePicker.Selection
├── Set LocalAudioStatus.Text to "Local audio loaded: " + filename
├── Set LocalAudioStatus.TextColor to #00b894
├── Set TrackTitle.Text to filename
└── Call LoadLocalAudio

Procedure: LoadLocalAudio
├── Set AudioPlayer.Source to localAudioPath
├── Set trackDuration to audio file length
├── Set ProgressSlider.MaxValue to trackDuration
└── Update displays
```

#### E. Audio Controls
```
When PlayPauseButton.Click:
├── If isPlaying = false:
│   ├── Call AudioPlayer.Start
│   ├── Set PlayPauseButton.Text to "⏸️"
│   ├── Set global isPlaying to true
│   └── Start progress timer
├── Else:
│   ├── Call AudioPlayer.Pause  
│   ├── Set PlayPauseButton.Text to "▶️"
│   ├── Set global isPlaying to false
│   └── Stop progress timer

When VolumeSlider.PositionChanged:
├── Set global currentVolume to VolumeSlider.ThumbPosition
├── Set VolumePercent.Text to join(currentVolume, "%")
└── Set AudioPlayer.Volume to (currentVolume / 100)

When ProgressSlider.PositionChanged:
├── Set global currentTrackPosition to ProgressSlider.ThumbPosition
├── Set AudioPlayer.Position to currentTrackPosition
└── Update time display
```

#### F. Timer System (Wake Room)
```
When WakeActivationButton.Click:
├── If isTimerRunning = false:
│   ├── Set global isTimerRunning to true
│   ├── Set WakeActivationButton.Text to "⏸️ PAUSE EXPERIENCE"
│   ├── Start RoomTimer
│   └── Begin timer updates
├── Else:
│   ├── Set global isTimerRunning to false
│   ├── Set WakeActivationButton.Text to "🌅 RESUME EXPERIENCE"
│   └── Stop RoomTimer

When RoomTimer.Timer:
├── If isTimerRunning = true:
│   ├── Set global timerSeconds to (timerSeconds + 1)
│   ├── Calculate minutes and seconds for display
│   └── Set WakeTimer.Text to formatted time
```

#### G. Projection System (Beamer Room)
```
When BeamerActivationButton.Click:
├── Set BeamerActivationButton.Text to "⏹️ STOP PROJECTION"
├── Set ProjectionStatus.Text to "Projection active..."
├── Set ProjectionCanvas.BackgroundColor to cycling colors
├── Start projection animation timer
└── Show fullscreen option

When ProjectionCanvas.Touched:
├── Cycle through different visual patterns
├── Change colors and shapes
└── Update projection display
```

#### H. QR Code Generation
```
When QRCodeButton.Click:
├── Call QRGenerator.GenerateQR(roomToken)
├── Show QR code in dialog or new screen
├── Include room type and expiration info
└── Add save/share options

Procedure: RegenerateToken
├── Call GenerateRoomToken
├── Update all displays with new token
├── Show notification: "Token regenerated"
└── Update QR code if displayed
```

#### I. Back Navigation
```
When BackToTemplateButton.Click:
├── If isPlaying = true: Call AudioPlayer.Stop
├── If isTimerRunning = true: Stop all timers
├── Clear current room data
├── Close screen
└── Open TemplateScreen

When Screen.BackPressed:
├── Call BackToTemplateButton.Click logic
└── Return true
```

### 6. Extensions Required

```
1. QR Code Generator Extension
   - For room token QR codes
   - Search: "QR Generator" in Kodular

2. Audio Player Extension (Advanced)
   - Enhanced audio controls
   - Progress tracking
   - Search: "Advanced Audio Player"

3. File Picker Extension
   - For local audio file selection
   - Search: "File Picker" or use built-in File component

4. Animation Extension (Optional)
   - For smooth visual effects
   - Projection animations
```

### 7. Audio Files Setup

#### Default Audio Files (Add to Assets)
```
1. BabyElephantWalk60.wav
   - Duration: ~60 seconds
   - Format: WAV (preferred) or MP3
   - Size: Optimize for mobile

2. Additional ambient tracks (optional):
   - MorningBirds.mp3
   - OceanWaves.mp3
   - RainForest.mp3
```

### 8. Testing Checklist

- [ ] All room types display correctly
- [ ] Audio player works with default audio
- [ ] Local audio picker functions
- [ ] Timer system operates properly
- [ ] Projection canvas responds to touch
- [ ] QR token generation works
- [ ] Back navigation preserves state
- [ ] Volume and progress controls functional
- [ ] Room-specific colors applied
- [ ] Error handling for missing files
- [ ] Performance on different devices

### 9. Troubleshooting

#### Common Issues:
```
1. Audio not playing:
   - Check file formats (MP3, WAV supported)
   - Verify file paths in assets
   - Test audio player permissions

2. Timer not updating:
   - Check Clock component enabled
   - Verify timer interval (1000ms recommended)
   - Test timer state variables

3. QR generation failing:
   - Check QR extension installation
   - Verify token string format
   - Test with simple text first

4. File picker not working:
   - Check storage permissions
   - Test with File component
   - Verify supported file types

5. Navigation issues:
   - Check screen names match exactly
   - Verify TinyDB data passing
   - Test back button functionality
```

### 10. Performance Optimization

```
1. Audio Optimization:
   - Compress audio files appropriately
   - Use lower bitrates for longer tracks
   - Implement audio preloading

2. Visual Effects:
   - Limit canvas drawing frequency
   - Use efficient color cycling
   - Optimize projection animations

3. Memory Management:
   - Clear unused variables
   - Stop timers when leaving screen
   - Release audio resources properly
```

### 11. Final Assembly Order

1. Create basic screen layout
2. Add room detection logic
3. Implement audio system (Zang room)
4. Add timer functionality (Wake room)
5. Create projection system (Beamer room)
6. Implement token generation
7. Add QR code functionality
8. Test all room types thoroughly
9. Optimize performance
10. Polish UI and animations

This completes the comprehensive Kodular implementation guide for all three main screens!