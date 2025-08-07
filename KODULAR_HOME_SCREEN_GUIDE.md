# Kodular Home Screen Implementation Guide

## Screen Setup: HomeScreen

### 1. Screen Properties
```
Screen Name: HomeScreen
Title: "Kardiverse D6"
Background Color: #1a1a2e
Icon: Use default or upload custom icon
Orientation: Portrait
Sizing: Responsive
```

### 2. Components Layout (Top to Bottom)

#### A. Title Section
```
Component: Vertical Arrangement
Name: TitleArrangement
Width: Fill Parent
Height: Automatic
Alignment: Center Horizontal

Inside TitleArrangement:
├── Label (AppTitle)
│   ├── Text: "Kardiverse D6"
│   ├── Font Size: 28
│   ├── Text Color: #00d9ff
│   ├── Font Typeface: Default Bold
│   └── Text Alignment: Center
├── Label (Subtitle)
│   ├── Text: "Room Integration System"
│   ├── Font Size: 16
│   ├── Text Color: #ffffff
│   └── Text Alignment: Center
└── Label (VersionLabel)
    ├── Text: "Version 1.0"
    ├── Font Size: 12
    ├── Text Color: #6c5ce7
    ├── Text Alignment: Center
    └── Clickable: true (for admin access)
```

#### B. Stats Section
```
Component: Horizontal Arrangement
Name: StatsArrangement
Width: Fill Parent
Height: Automatic
Background Color: #2d3748
Margin: 10 pixels all sides

Inside StatsArrangement (3 equal cards):
├── Vertical Arrangement (TotalStats)
│   ├── Label: "Total Templates"
│   ├── Label: "100" (dynamic)
│   └── Text Color: #00d9ff
├── Vertical Arrangement (ActiveStats)
│   ├── Label: "Activated"
│   ├── Label: "0" (dynamic)
│   └── Text Color: #00b894
└── Vertical Arrangement (LockedStats)
    ├── Label: "Locked"
    ├── Label: "100" (dynamic)
    └── Text Color: #fdcb6e
```

#### C. Search and Activation Section
```
Component: Horizontal Arrangement
Name: SearchArrangement
Width: Fill Parent
Height: Automatic
Margin: 10 pixels

Inside SearchArrangement:
├── TextBox (SearchBox)
│   ├── Width: 70%
│   ├── Hint: "Search templates..."
│   ├── Background Color: #2d3748
│   ├── Text Color: #ffffff
│   └── Border: 1px #6c5ce7
└── Button (ActivateButton)
    ├── Text: "Activate Template"
    ├── Width: 28%
    ├── Background Color: #6c5ce7
    ├── Text Color: #ffffff
    └── Font Size: 12
```

#### D. Template Lists Section
```
Component: Scroll Arrangement
Name: TemplateScrollArrangement
Width: Fill Parent
Height: Fill Parent

Inside TemplateScrollArrangement:
├── Label (ActiveTitle)
│   ├── Text: "Active Templates (0)"
│   ├── Font Size: 18
│   ├── Text Color: #00b894
│   └── Font Typeface: Bold
├── List View (ActiveTemplatesList)
│   ├── Background Color: Transparent
│   ├── Selection Color: #6c5ce7
│   └── Text Color: #ffffff
├── Label (LockedTitle)
│   ├── Text: "Locked Templates (100)"
│   ├── Font Size: 18
│   ├── Text Color: #fdcb6e
│   └── Font Typeface: Bold
└── List View (LockedTemplatesList)
    ├── Background Color: Transparent
    ├── Selection Color: #6c5ce7
    ├── Text Color: #ffffff
    └── Show Filter Bar: false
```

### 3. Variables Setup

#### Global Variables
```
Variable Name: allTemplates
Type: List
Initial Value: Empty List

Variable Name: activatedTemplates  
Type: List
Initial Value: Empty List

Variable Name: lockedTemplates
Type: List
Initial Value: Empty List

Variable Name: searchQuery
Type: Text
Initial Value: ""

Variable Name: adminClickCount
Type: Number
Initial Value: 0
```

### 4. Components to Add

#### Required Components
```
1. TinyDB (for data storage)
   Name: TemplateDB

2. Notifier (for messages)
   Name: AppNotifier

3. Clock (for timing)
   Name: AppClock
```

### 5. Block Programming - Step by Step

#### A. Screen Initialize Event
```
When HomeScreen.Initialize:
├── Call LoadTemplatesFromTinyDB
├── Call UpdateStats
├── Call RefreshTemplateLists
└── Set SearchBox.Hint to "Search 100 templates..."
```

#### B. Template Loading Procedure
```
Procedure: LoadTemplatesFromTinyDB
├── If TinyDB.GetValue("templates") is empty:
│   ├── Set global allTemplates to empty list
│   ├── For count from 1 to 100:
│   │   ├── Call GenerateTemplate(count)
│   │   └── Add result to global allTemplates
│   └── Call TinyDB.StoreValue("templates", global allTemplates)
├── Else:
│   └── Set global allTemplates to TinyDB.GetValue("templates")
└── Set global activatedTemplates to TinyDB.GetValue("activated_templates", empty list)
```

#### C. Template Generation Procedure
```
Procedure: GenerateTemplate(templateNumber)
Parameters: templateNumber (number)
Returns: Dictionary

Blocks:
├── Set templateId to join("Template_", format templateNumber as 3-digit)
├── Create dictionary templateData:
│   ├── "id": templateId
│   ├── "name": join(templateId, " - Advanced Integration")
│   ├── "isUnlocked": false
│   ├── "version": "1.0"
│   ├── "author": "Kardiverse"
│   ├── "description": join("Advanced room integration template ", templateNumber)
│   ├── "config": [nested dictionary with theme colors]
│   └── "rooms": [nested dictionary with wake/zang/beamer rooms]
└── Return templateData
```

#### D. Search Functionality
```
When SearchBox.TextChanged:
├── Set global searchQuery to SearchBox.Text
├── Call FilterTemplates
└── Call RefreshTemplateLists

Procedure: FilterTemplates
├── If searchQuery is empty:
│   ├── Set activatedTemplates to all activated templates
│   └── Set lockedTemplates to all locked templates
├── Else:
│   ├── Filter activatedTemplates by searchQuery in name
│   └── Filter lockedTemplates by searchQuery in name
```

#### E. Template List Click Events
```
When ActiveTemplatesList.AfterPicking:
├── Get selected template from activatedTemplates
├── Store selected template in TinyDB as "current_template"
├── Open TemplateScreen
└── Close current screen

When LockedTemplatesList.AfterPicking:
├── Show notification: "Template is locked. Use activation code to unlock."
├── Set AppNotifier.TextColor to #fdcb6e
└── Call AppNotifier.ShowAlert
```

#### F. Admin Panel Access
```
When VersionLabel.Click:
├── Set global adminClickCount to (adminClickCount + 1)
├── If adminClickCount >= 5:
│   ├── Show notification: "Admin mode activated"
│   ├── Set VersionLabel.Text to "Admin Mode"
│   ├── Set VersionLabel.TextColor to #ff6b6b
│   └── Make admin functions visible
├── Else:
│   └── Set VersionLabel.Text to join("Version 1.0 (", adminClickCount, "/5)")
```

#### G. Activation Button
```
When ActivateButton.Click:
├── Create new screen or dialog for activation
├── Add TextBox for activation code
├── Add confirm/cancel buttons
└── Handle activation logic
```

### 6. Extensions Needed

```
1. JSON Utilities Extension
   - For complex template data parsing
   - Download from: Kodular Extensions Gallery

2. Advanced List View Extension (Optional)
   - For better template card displays
   - Search "Advanced ListView" in extensions
```

### 7. Testing Data

#### Sample Template Structure
```
Template_001:
{
  "id": "Template_001",
  "name": "Template_001 - Advanced Integration",
  "isUnlocked": false,
  "version": "1.0",
  "author": "Kardiverse",
  "description": "Advanced room integration template 1",
  "rooms": {
    "wake": {
      "name": "WakeRoom",
      "type": "wake", 
      "description": "Morning activation experience"
    },
    "zang": {
      "name": "ZangRoom", 
      "type": "zang",
      "description": "Audio meditation space"
    },
    "beamer": {
      "name": "BeamerRoom",
      "type": "beamer", 
      "description": "Projection visualization room"
    }
  }
}
```

### 8. Color Scheme Reference

```
Background: #1a1a2e (Dark Blue)
Primary: #00d9ff (Cyan)
Secondary: #6c5ce7 (Purple)
Success: #00b894 (Green)
Warning: #fdcb6e (Orange)
Error: #ff6b6b (Red)
Text: #ffffff (White)
Text Secondary: #a0aec0 (Light Gray)
```

### 9. Final Assembly Checklist

- [ ] All components added and positioned
- [ ] Variables initialized
- [ ] TinyDB component added
- [ ] Template generation procedure created
- [ ] Search functionality implemented
- [ ] List click events programmed
- [ ] Admin access programmed
- [ ] Color scheme applied
- [ ] Extensions imported
- [ ] Test with sample data

### Next Steps
Once HomeScreen is complete, proceed to TemplateScreen implementation guide.