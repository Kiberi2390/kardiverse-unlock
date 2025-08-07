# Kodular Template Screen Implementation Guide

## Screen Setup: TemplateScreen

### 1. Screen Properties
```
Screen Name: TemplateScreen
Title: "Template Details"
Background Color: #1a1a2e
Icon: Use template icon or default
Orientation: Portrait
Sizing: Responsive
```

### 2. Components Layout (Top to Bottom)

#### A. Header Section with Back Button
```
Component: Horizontal Arrangement
Name: HeaderArrangement
Width: Fill Parent
Height: 60 pixels
Background Color: #2d3748
Alignment: Center Vertical

Inside HeaderArrangement:
├── Button (BackButton)
│   ├── Text: "← Back"
│   ├── Width: 80 pixels
│   ├── Height: 40 pixels
│   ├── Background Color: #6c5ce7
│   ├── Text Color: #ffffff
│   └── Font Size: 14
├── Label (TemplateTitle)
│   ├── Text: "Template_001" (dynamic)
│   ├── Width: Fill Parent
│   ├── Text Color: #00d9ff
│   ├── Font Size: 20
│   ├── Font Typeface: Bold
│   └── Text Alignment: Center
└── Label (ActiveBadge)
    ├── Text: "ACTIVE"
    ├── Width: 70 pixels
    ├── Background Color: #00b894
    ├── Text Color: #ffffff
    ├── Font Size: 10
    └── Shape: Rectangle with rounded corners
```

#### B. Template Overview Card
```
Component: Vertical Arrangement
Name: OverviewCard
Width: Fill Parent
Height: Automatic
Background Color: #2d3748
Margin: 15 pixels all sides
Shape: Rectangle with rounded corners

Inside OverviewCard:
├── Label (OverviewTitle)
│   ├── Text: "Template Overview"
│   ├── Font Size: 18
│   ├── Text Color: #ffffff
│   ├── Font Typeface: Bold
│   └── Margin: 10 pixels top/left/right
├── Horizontal Arrangement (StatsRow1)
│   ├── Label: "Version:"
│   ├── Label: "1.0" (dynamic)
│   ├── Label: "Rooms:"
│   └── Label: "3" (dynamic)
├── Horizontal Arrangement (StatsRow2)
│   ├── Label: "Components:"
│   ├── Label: "12" (dynamic)
│   ├── Label: "Author:"
│   └── Label: "Kardiverse" (dynamic)
└── Label (Description)
    ├── Text: "Advanced room integration template with multiple experiences" (dynamic)
    ├── Text Color: #a0aec0
    ├── Font Size: 14
    └── Margin: 10 pixels all sides
```

#### C. Available Rooms Section
```
Component: Scroll Arrangement
Name: RoomsScrollArrangement
Width: Fill Parent
Height: Fill Parent
Margin: 15 pixels left/right/bottom

Inside RoomsScrollArrangement:
├── Label (RoomsTitle)
│   ├── Text: "Available Rooms"
│   ├── Font Size: 18
│   ├── Text Color: #ffffff
│   ├── Font Typeface: Bold
│   └── Margin: 10 pixels bottom
├── Vertical Arrangement (WakeRoomCard)
│   └── [Room Card Structure - see below]
├── Vertical Arrangement (ZangRoomCard)
│   └── [Room Card Structure - see below]
└── Vertical Arrangement (BeamerRoomCard)
    └── [Room Card Structure - see below]
```

#### D. Room Card Structure (Template for each room)
```
Component: Vertical Arrangement
Name: [RoomType]RoomCard (e.g., WakeRoomCard)
Width: Fill Parent
Height: Automatic
Background Color: #2d3748
Margin: 8 pixels bottom
Shape: Rectangle with rounded corners
Clickable: true

Inside Each Room Card:
├── Horizontal Arrangement (RoomHeader)
│   ├── Label (RoomIcon)
│   │   ├── Text: "🌅" (for Wake), "🎵" (for Zang), "📽️" (for Beamer)
│   │   ├── Font Size: 24
│   │   └── Width: 50 pixels
│   ├── Vertical Arrangement (RoomInfo)
│   │   ├── Label (RoomName)
│   │   │   ├── Text: "WakeRoom" (dynamic)
│   │   │   ├── Font Size: 16
│   │   │   ├── Text Color: #ffffff
│   │   │   └── Font Typeface: Bold
│   │   ├── Label (RoomType)
│   │   │   ├── Text: "WAKE ROOM" (dynamic)
│   │   │   ├── Font Size: 10
│   │   │   ├── Text Color: room-specific color
│   │   │   └── Background Color: room-specific background
│   │   └── Label (RoomDescription)
│   │       ├── Text: "Morning activation experience" (dynamic)
│   │       ├── Font Size: 12
│   │       ├── Text Color: #a0aec0
│   │       └── Width: Fill Parent
│   └── Button (EnterRoomButton)
│       ├── Text: "Enter Room"
│       ├── Width: 100 pixels
│       ├── Height: 35 pixels
│       ├── Background Color: #6c5ce7
│       ├── Text Color: #ffffff
│       └── Font Size: 12
├── Horizontal Arrangement (RoomStats)
│   ├── Label: "Components: 4" (dynamic)
│   ├── Label: "Settings: 8" (dynamic)
│   └── Text Color: #a0aec0
└── Label (KeySettings)
    ├── Text: "Key Settings: Audio Enabled, Visuals: Advanced, Timer: 5min" (dynamic)
    ├── Font Size: 11
    ├── Text Color: #6c5ce7
    └── Margin: 5 pixels all sides
```

### 3. Variables Setup

#### Global Variables
```
Variable Name: currentTemplate
Type: Dictionary
Initial Value: Empty Dictionary

Variable Name: templateRooms
Type: List
Initial Value: Empty List

Variable Name: selectedRoom
Type: Dictionary
Initial Value: Empty Dictionary
```

### 4. Block Programming - Step by Step

#### A. Screen Initialize Event
```
When TemplateScreen.Initialize:
├── Set global currentTemplate to TinyDB.GetValue("current_template")
├── If currentTemplate is empty:
│   ├── Show notification: "No template selected"
│   ├── Close screen
│   └── Open HomeScreen
├── Call LoadTemplateData
├── Call PopulateRoomCards
└── Call UpdateTemplateDisplay
```

#### B. Template Data Loading
```
Procedure: LoadTemplateData
├── Set TemplateTitle.Text to get currentTemplate "name"
├── Set Description.Text to get currentTemplate "description"
├── Set global templateRooms to get currentTemplate "rooms"
├── Update stats labels with template data:
│   ├── Version: get currentTemplate "version"
│   ├── Author: get currentTemplate "author"
│   ├── Rooms: length of templateRooms
│   └── Components: calculated from rooms
```

#### C. Room Cards Population
```
Procedure: PopulateRoomCards
├── For each room in templateRooms:
│   ├── Get room type (wake/zang/beamer)
│   ├── Call SetupRoomCard(roomType, roomData)
│   └── Set room-specific colors and icons

Procedure: SetupRoomCard(roomType, roomData)
Parameters: roomType (text), roomData (dictionary)
├── Set room name and description
├── Set room-specific icon and colors:
│   ├── Wake: Icon "🌅", Color #ff6b6b
│   ├── Zang: Icon "🎵", Color #6c5ce7  
│   └── Beamer: Icon "📽️", Color #00d9ff
├── Set component and settings counts
└── Set key settings preview
```

#### D. Room Navigation Events
```
When WakeRoomCard.Click:
├── Store room data: TinyDB.StoreValue("current_room", wake room data)
├── Store room type: TinyDB.StoreValue("room_type", "wake")
├── Open RoomScreen
└── Close current screen

When ZangRoomCard.Click:
├── Store room data: TinyDB.StoreValue("current_room", zang room data)
├── Store room type: TinyDB.StoreValue("room_type", "zang")
├── Open RoomScreen
└── Close current screen

When BeamerRoomCard.Click:
├── Store room data: TinyDB.StoreValue("current_room", beamer room data)
├── Store room type: TinyDB.StoreValue("room_type", "beamer")
├── Open RoomScreen
└── Close current screen
```

#### E. Enter Room Button Events
```
When WakeEnterRoomButton.Click:
├── Call same logic as WakeRoomCard.Click
└── Add entrance animation (optional)

When ZangEnterRoomButton.Click:
├── Call same logic as ZangRoomCard.Click
└── Add entrance animation (optional)

When BeamerEnterRoomButton.Click:
├── Call same logic as BeamerRoomCard.Click
└── Add entrance animation (optional)
```

#### F. Back Navigation
```
When BackButton.Click:
├── Clear current template data
├── Close screen
└── Open HomeScreen

When Screen.BackPressed:
├── Call BackButton.Click logic
└── Return true
```

### 5. Room Type Colors and Icons

#### Color Mapping
```
Wake Room:
├── Primary Color: #ff6b6b (Red/Orange)
├── Background: #ff6b6b with 20% opacity
├── Icon: 🌅 or ☀️
└── Badge Text: "WAKE ROOM"

Zang Room:
├── Primary Color: #6c5ce7 (Purple)
├── Background: #6c5ce7 with 20% opacity
├── Icon: 🎵 or 🎧
└── Badge Text: "ZANG ROOM"

Beamer Room:
├── Primary Color: #00d9ff (Cyan)
├── Background: #00d9ff with 20% opacity
├── Icon: 📽️ or 🎥
└── Badge Text: "BEAMER ROOM"
```

### 6. Dynamic Data Structure

#### Room Data Example
```
Wake Room Data:
{
  "name": "WakeRoom",
  "type": "wake",
  "description": "Morning activation experience",
  "components": 4,
  "settings": 8,
  "keySettings": "Audio Enabled, Visuals: Advanced, Timer: 5min",
  "config": {
    "audioEnabled": true,
    "visualsLevel": "advanced",
    "timerMinutes": 5,
    "backgroundImage": "sunrise.jpg"
  }
}

Zang Room Data:
{
  "name": "ZangRoom", 
  "type": "zang",
  "description": "Audio meditation space",
  "components": 6,
  "settings": 12,
  "keySettings": "Local Audio, Default: BabyElephantWalk, Loop: On",
  "config": {
    "defaultAudio": "BabyElephantWalk60.wav",
    "localAudioEnabled": true,
    "loopEnabled": true,
    "volumeLevel": 0.8
  }
}

Beamer Room Data:
{
  "name": "BeamerRoom",
  "type": "beamer", 
  "description": "Projection visualization room",
  "components": 3,
  "settings": 6,
  "keySettings": "QR Token, Auto-display, Fullscreen Mode",
  "config": {
    "qrTokenEnabled": true,
    "autoDisplay": true,
    "fullscreenMode": true,
    "backgroundColor": "#1a1a2e"
  }
}
```

### 7. Extensions Required

```
1. Advanced Cards Extension (Optional)
   - For better room card animations
   - Enhanced visual feedback

2. Animation Extension (Optional)
   - Smooth transitions between cards
   - Enter/exit animations
```

### 8. Testing Checklist

- [ ] Template data loads correctly
- [ ] All room cards display properly
- [ ] Room-specific colors applied
- [ ] Icons display correctly
- [ ] Click events work for all rooms
- [ ] Back navigation functions
- [ ] Data passes correctly to RoomScreen
- [ ] Error handling for missing data
- [ ] Responsive layout on different screen sizes

### 9. Troubleshooting

#### Common Issues:
```
1. Template data not loading:
   - Check TinyDB key "current_template"
   - Verify data structure matches expected format

2. Room cards not displaying:
   - Check templateRooms list population
   - Verify room data structure

3. Navigation not working:
   - Check screen names match exactly
   - Verify TinyDB storage before navigation

4. Colors not applying:
   - Check room type detection logic
   - Verify color hex codes
```

### Next Steps
Once TemplateScreen is complete, proceed to RoomScreen implementation guide.