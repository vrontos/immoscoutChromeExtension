# immoscoutChromeExtension

This Chrome extension adds a small popup to Immobilienscout24 expose pages, displaying light indicators for various property features.  The indicators are color-coded: green for desirable features (e.g., parking, balcony) and red for potentially undesirable ones (e.g., rented, old building, in need of renovation).  It also shows additional information like price per square meter and "Hausgeld".

## Features

* **Real-time Indicators:** Dynamically analyzes the current Immobilienscout24 page and shows indicators for:
    * Parking availability
    * Balcony
    * Fitted kitchen
    * No commission ("Provisionsfrei")
    * Rented status
    * Old building ("Altbau")
    * Top floor apartment ("Dachgeschoss")
    * In need of renovation ("Renovierungsbedürftig")
* **Additional Information:** Displays price per square meter and "Hausgeld".
* **Golden Notification:** If all positive indicators are present and all negative indicators are absent, the page title gets a 🌟 and the favicon becomes gold.
* **Non-intrusive:** The popup is small and positioned out of the way.

## Installation

1. Clone this repository.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable "Developer mode" in the top right corner.
4. Click "Load unpacked".
5. Select the directory where you cloned the repository.

## Usage

Navigate to any Immobilienscout24 expose page. The extension will automatically analyze the page and display the light indicators in a popup.

## Contributing

Contributions are welcome!  Please open an issue or submit a pull request.

## License

[Choose a license - e.g., MIT License]

## Disclaimer

This extension is not affiliated with Immobilienscout24. It is an independent project.  The accuracy of the information displayed is not guaranteed.  Use at your own risk.
