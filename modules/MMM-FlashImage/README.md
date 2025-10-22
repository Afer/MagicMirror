# MMM-FlashImage

A Magic Mirror module that displays a full-screen image that flashes every minute for 2 seconds.

## Features

- Full-screen image display
- Configurable flash duration (default: 2 seconds)
- Configurable interval (default: 1 minute)
- Optional clock display during flash
- Smooth animations
- Responsive design
- High z-index to appear above all other content

## Installation

1. Clone this module into your Magic Mirror modules directory:
   ```bash
   cd ~/MagicMirror/modules
   git clone <repository-url> MMM-FlashImage
   ```

2. Add the module to your `config.js` file

3. Place your image file in the `images` folder

## Configuration

Add the module to your `config.js`:

```javascript
{
    module: "MMM-FlashImage",
    position: "fullscreen_below", // This doesn't matter for fullscreen modules
    config: {
        imagePath: "modules/MMM-FlashImage/images/your-image.jpg",
        flashDuration: 2000, // 2 seconds in milliseconds
        interval: 60000, // 1 minute in milliseconds
        showClock: true, // Show clock during flash
        clockFormat: "HH:mm:ss", // Clock format
        backgroundColor: "rgba(0, 0, 0, 0.8)", // Background color
        zIndex: 9999 // Z-index for layering
    }
}
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `imagePath` | String | `"modules/MMM-FlashImage/images/sample-image.jpg"` | Path to your image file |
| `flashDuration` | Number | `2000` | Duration of flash in milliseconds |
| `interval` | Number | `60000` | Interval between flashes in milliseconds |
| `imageWidth` | String | `"100vw"` | Image width (CSS value) |
| `imageHeight` | String | `"100vh"` | Image height (CSS value) |
| `zIndex` | Number | `9999` | Z-index for layering |
| `backgroundColor` | String | `"rgba(0, 0, 0, 0.8)"` | Background color during flash |
| `showClock` | Boolean | `false` | Show clock during flash |
| `clockFormat` | String | `"HH:mm:ss"` | Clock format (moment.js format) |

## Manual Trigger

You can manually trigger a flash by sending a notification:

```javascript
this.sendNotification("FLASH_IMAGE_NOW");
```

## Image Requirements

- Supported formats: JPG, PNG, GIF, WebP
- Recommended size: 1920x1080 or similar high resolution
- Place images in the `images` folder within the module directory

## License

MIT
