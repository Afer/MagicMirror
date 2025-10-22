Module.register("MMM-FlashImage", {
    // Default module config
    defaults: {
        imagePath: "modules/MMM-FlashImage/images/image.png", // Path to your image
        flashDuration: 2000, // Duration in milliseconds (2 seconds)
        interval: 60000, // Interval in milliseconds (1 minute)
        imageWidth: "100vw", // Full viewport width
        imageHeight: "100vh", // Full viewport height
        zIndex: 9999, // High z-index to appear on top
        backgroundColor: "rgba(0, 0, 0, 0.8)", // Semi-transparent background
        showClock: false, // Option to show time during flash
        clockFormat: "HH:mm:ss"
    },

    // Module start
    start: function() {
        Log.info("Starting module: " + this.name);
        this.isFlashing = false;
        this.startTimer();
    },

    // Start the timer for flashing
    startTimer: function() {
        setInterval(() => {
            this.flashImage();
        }, this.config.interval);
    },

    // Flash the image
    flashImage: function() {
        if (this.isFlashing) return; // Prevent overlapping flashes
        
        this.isFlashing = true;
        this.updateDom();
        
        // Hide the image after flash duration
        setTimeout(() => {
            this.isFlashing = false;
            this.updateDom();
        }, this.config.flashDuration);
    },

    // Get DOM content
    getDom: function() {
        const wrapper = document.createElement("div");
        wrapper.className = "mmm-flash-image-wrapper";
        
        if (this.isFlashing) {
            const imageContainer = document.createElement("div");
            imageContainer.className = "mmm-flash-image-container";
            imageContainer.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background-color: ${this.config.backgroundColor};
                z-index: ${this.config.zIndex};
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
            `;

            const image = document.createElement("img");
            image.src = this.config.imagePath;
            image.className = "mmm-flash-image";
            image.style.cssText = `
                max-width: ${this.config.imageWidth};
                max-height: ${this.config.imageHeight};
                object-fit: contain;
                border-radius: 10px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
            `;

            imageContainer.appendChild(image);

            // Add clock if enabled
            if (this.config.showClock) {
                const clock = document.createElement("div");
                clock.className = "mmm-flash-clock";
                clock.style.cssText = `
                    color: white;
                    font-size: 2em;
                    font-weight: bold;
                    margin-top: 20px;
                    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
                `;
                clock.textContent = moment().format(this.config.clockFormat);
                imageContainer.appendChild(clock);
            }

            wrapper.appendChild(imageContainer);
        }

        return wrapper;
    },

    // Get styles
    getStyles: function() {
        return ["MMM-FlashImage.css"];
    },

    // Notification received
    notificationReceived: function(notification, payload, sender) {
        if (notification === "FLASH_IMAGE_NOW") {
            this.flashImage();
        }
    }
});
