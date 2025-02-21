# immoscoutChromeExtension

This Chrome extension adds a small popup to Immobilienscout24 expose pages, displaying light indicators for various property features. The indicators are color-coded: green for desirable features (e.g., parking, balcony) and red for potentially undesirable ones (e.g., rented, old building, in need of renovation). It also shows additional information like price per square meter and "Hausgeld".

![Screenshot of the extension](screenshot.png)

## Features

* **Real-time Indicators:** Dynamically analyzes the current Immobilienscout24 page and shows indicators for:
    * **Parking availability:** Searches for keywords like "Garage," "Stellplatz," or "Parkplatz" within the following elements:
        * `expose-title` (property title element)
        * `.is24qa-objektbeschreibung` (description element)
        * `.is24qa-garage-stellplatz-label` (garage label element)
        * `.is24qa-ausstattung` (equipment element)
    * **Balcony:** Checks for the presence of the `.is24qa-balkon-terrasse-label` element.
    * **Kitchen:** Checks for the presence of the `.is24qa-einbaukueche-label` element.
    * **No commission ("Provisionsfrei"):**  Locates containers with the class `legend-row-marker-container` that contain "Maklerprovision". Then it checks the last `.align-right.number-width` element within the parent of that container. If the text content of that element is a price of 0€, it's considered "Provisionsfrei".
    * **Rented status:** Searches for keywords like "Kapitalanlage," "Geldanlage," "Immobilienanlage," "vermietet," "Mietverhältnis," or "Mieteinnahmen" within the following elements:
        * `expose-title` (property title element)
        * `.is24qa-objektbeschreibung` (description element)
    * **Old building ("Altbau"):** Searches for the keyword "Altbau" within the following elements:
        * `expose-title` (property title element)
        * `.is24qa-objektbeschreibung` (description element)
    * **Top floor apartment ("Dachgeschoss"):** Searches for the keyword "Dachgeschoss" or "Dach" within the following elements:
        * `expose-title` (property title element)
        * `.is24qa-objektbeschreibung` (description element)
        * `dd.is24qa-typ.grid-item.three-fifths` (property type element)
    * **In need of renovation ("Renovierungsbedürftig"):** Searches for keywords like "renovierungsbedürftig" or "renovierungsbeduerftig" within the `dd.is24qa-objektzustand.grid-item.three-fifths` (property condition element).
* **Additional Information:** Displays price per square meter (found in `.is24qa-kaufpreis-main-label.is24-label.font-s span`) and "Hausgeld" (found in `dd.is24qa-hausgeld.grid-item.three-fifths`).
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

Contributions are welcome! Please open an issue or submit a pull request.

## License

MIT License

## Disclaimer

This extension is not affiliated with Immobilienscout24. It is an independent project. The accuracy of the information displayed is not guaranteed. Use at your own risk.
