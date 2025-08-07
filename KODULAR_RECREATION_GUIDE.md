# Kardiverse D6 - Kodular Recreation Guide

## App Overview
**Original**: React web app with room-based audio/visual experiences
**Target**: Native Android app using Kodular visual programming

## App Structure & Kodular Mapping

### 1. Main Screens Setup

#### Screen 1: HomeScreen (Index.tsx)
**Kodular Components:**
```
- Vertical Arrangement (main container)
- Label (title: "Kardiverse D6")
- Label (subtitle: "Room Integration System") 
- Label (version info, clickable for admin)
- Card View (stats container)
- Text Box (search input)
- List View (template list)
- Button (Activate Template)
```

**Key Variables:**
- `searchQuery` (text)
- `adminClickCount` (number, initial: 0)
- `activatedTemplates` (list)
- `lockedTemplates` (list)

**Logic Blocks:**
```
When Screen Initialize:
  - Call LoadTemplatesFromTinyDB
  - Set activatedTemplates to filtered activated list
  - Set lockedTemplates to filtered locked list

When SearchTextBox.TextChanged:
  - Filter template lists by search text
  - Update List View

When VersionLabel.Click:
  - Increment adminClickCount
  - If adminClickCount >= 5: Show admin panel
```

#### Screen 2: TemplateScreen
**Kodular Components:**
- Card View (template details)
- 3 Buttons (WakeRoom, ZangRoom, BeamerRoom)
- Image (template background)
- Label (template title/description)

#### Screen 3: RoomScreen  
**Kodular Components:**
- Image (background)
- Label (room title)
- Label (room description)
- Button (back button)
- Web Viewer (for audio player) OR Audio Player component
- Button (main action button)

### 2. Data Storage (TinyDB)

**TinyDB Structure:**
```
Key: "templates"
Value: JSON list of 100 template objects

Key: "activated_templates" 
Value: List of activated template IDs

Key: "activation_codes"
Value: JSON object with valid codes

Example Template Object:
{
  "id": "Template_001",
  "name": "Template_001 - Advanced Integration", 
  "isUnlocked": false,
  "config": {
    "title": "Kardiverse Template_001",
    "description": "Advanced room integration template 1",
    "theme": {
      "primaryColor": "#ff6b6b",
      "backgroundColor": "#1a1a2e"
    }
  },
  "rooms": {
    "wake": {...},
    "zang": {...}, 
    "beamer": {...}
  }
}
```

### 3. Core Features Implementation

#### Template Generation (Procedure)
```
Procedure: GenerateTemplate(templateNumber)
  - Create templateId: "Template_" + padded templateNumber
  - Set theme colors based on templateNumber formula
  - Create 3 room configs (wake, zang, beamer)
  - Return complete template object
```

#### Audio System
**For ZangRoom Audio:**
```
Option A: Web Viewer Component
- Load HTML with audio player
- Use JavaScript interface for controls

Option B: Player Component  
- Direct audio file playback
- Custom controls with buttons

Option C: Extension
- Import Audio Player extension from community
```

#### QR Code Generation
```
Extension: QR Generator
- Input: room token string
- Generate QR code image
- Display in Image component
```

### 4. Navigation Flow

```
HomeScreen
├── Search & Filter Templates
├── TemplateScreen (when template selected)
│   ├── RoomScreen (WakeRoom)
│   ├── RoomScreen (ZangRoom) 
│   └── RoomScreen (BeamerRoom)
└── Activation Modal (when Activate button pressed)
```

### 5. Key Procedures

#### LoadTemplatesFromTinyDB
```
If TinyDB.GetValue("templates") is empty:
  For i = 1 to 100:
    Call GenerateTemplate(i)
    Add to templates list
  Store templates in TinyDB
Else:
  Load templates from TinyDB
```

#### ActivateTemplate(code, templateId)
```
If code exists in activation_codes:
  Get current activated list from TinyDB
  Add templateId to activated list  
  Store updated list in TinyDB
  Show success notifier
  Refresh template displays
Else:
  Show "Invalid code" notifier
```

### 6. Visual Design

**Color Scheme (CSS to Kodular):**
- Background: Dark (#1a1a2e)
- Primary: Cyan (#00d9ff) 
- Accent: Purple (#6c5ce7)
- Success: Green (#00b894)
- Warning: Orange (#fdcb6e)

**Fonts:**
- Title: Large, Bold
- Body: Medium, Regular
- Buttons: Medium, Semi-bold

### 7. Audio File Requirements

**Supported Formats:**
- MP3 (primary)
- WAV 
- OGG
- M4A

**Default Audio:**
- Store sample audio files in assets
- BabyElephantWalk60.wav for Template_001

### 8. Extensions Needed

1. **QR Code Generator** - for room tokens
2. **Audio Player** - enhanced audio controls
3. **File Picker** - for local audio uploads (ZangRoom)
4. **JSON Utilities** - for complex data handling

### 9. Implementation Order

1. Create HomeScreen with basic layout
2. Setup TinyDB structure and template generation  
3. Implement template list and search
4. Create TemplateScreen navigation
5. Build RoomScreen with basic functionality
6. Add audio system for ZangRoom
7. Implement activation system
8. Add QR code generation
9. Polish UI and test all flows

### 10. Testing Activation Codes

```
"KARDI-001-UNLOCK" → Template_001
"KARDI-002-UNLOCK" → Template_002  
"KARDI-DEBUG-ADMIN" → Template_001
"QR-TEST-001" → Template_001
"QR-TEST-002" → Template_002
```

This guide provides a complete roadmap for recreating your React app in Kodular using visual programming components and blocks.