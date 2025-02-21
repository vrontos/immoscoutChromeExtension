(function() {
  // Function to initialize our popup
  function initPopup() {
    // Retrieve various elements from the page
    const titleElement = document.getElementById("expose-title");
    const descriptionElement = document.querySelector(".is24qa-objektbeschreibung");
    const garageLabelElement = document.querySelector(".is24qa-garage-stellplatz-label");
    const garageValueElement = document.querySelector(".is24qa-objektbeschreibung");
    const ausstattungElement = document.querySelector(".is24qa-ausstattung");
    const balconyElement = document.querySelector(".is24qa-balkon-terrasse-label");
    const kitchenElement = document.querySelector(".is24qa-einbaukueche-label");
    // Price elements (used for waiting purposes)
    const priceElements = document.querySelectorAll(".align-right.number-width");
    // Element for Dachgeschoss info
    const dachElement = document.querySelector("dd.is24qa-typ.grid-item.three-fifths");
    // Element for Renovierungsbedürftig
    const renovElement = document.querySelector("dd.is24qa-objektzustand.grid-item.three-fifths");
    // Elements for additional info:
    const m2PriceElement = document.querySelector(".is24qa-kaufpreis-main-label.is24-label.font-s span");
    const hausgeldElement = document.querySelector("dd.is24qa-hausgeld.grid-item.three-fifths");

    // If price elements haven't loaded yet, wait and try again.
    if (priceElements.length === 0) {
      setTimeout(initPopup, 500);
      return;
    }

    // Get text content from available elements
    const titleText = titleElement ? (titleElement.textContent || titleElement.innerText) : "";
    const descriptionText = descriptionElement ? (descriptionElement.textContent || descriptionElement.innerText) : "";
    const garageLabelText = garageLabelElement ? (garageLabelElement.textContent || garageLabelElement.innerText) : "";
    const garageValueText = garageValueElement ? (garageValueElement.textContent || garageValueElement.innerText) : "";
    const ausstattungText = ausstattungElement ? (ausstattungElement.textContent || ausstattungElement.innerText) : "";

    // Convert texts to lowercase for case-insensitive search
    const lowerTitle = titleText.toLowerCase();
    const lowerDescription = descriptionText.toLowerCase();
    const lowerGarageLabel = garageLabelText.toLowerCase();
    const lowerGarageValue = garageValueText.toLowerCase();
    const lowerAusstattung = ausstattungText.toLowerCase();

    // --- Rented condition ---
    const keywordsTitle = ["kapitalanlage", "geldanlage", "immobilienanlage", "rented", "vermietet"];
    const keywordsDesc = ["mietverhältn", "mieteinnahm"];
    const isRentedFromTitle = keywordsTitle.some(keyword => lowerTitle.includes(keyword));
    const isRentedFromDesc = keywordsDesc.some(keyword => lowerDescription.includes(keyword));
    const isRented = isRentedFromTitle || isRentedFromDesc;

    // --- Parking condition ---
    const parkingTerms = ["garag", "stellpl", "parkpl"];
    const hasParking = parkingTerms.some(term =>
      lowerTitle.includes(term) ||
      lowerDescription.includes(term) ||
      lowerGarageLabel.includes(term) ||
      lowerGarageValue.includes(term) ||
      lowerAusstattung.includes(term)
    );

    // --- Altbau condition ---
    const isAltbau = lowerTitle.includes("altbau") || lowerDescription.includes("altbau");

    // --- Balcony and Kitchen existence ---
    const hasBalcony = !!balconyElement;
    const hasKitchen = !!kitchenElement;

    // --- Provisionsfrei condition ---
    // Look for containers that mention "Maklerprovision" and then select the last .align-right.number-width element.
    let isProvisionsfrei = false;
    const maklerContainers = document.querySelectorAll(".legend-row-marker-container");
    maklerContainers.forEach(container => {
      if (container.textContent.toLowerCase().includes("maklerprovision")) {
        const parentDiv = container.parentElement;
        if (parentDiv) {
          const priceDivs = parentDiv.querySelectorAll(".align-right.number-width");
          if (priceDivs.length > 0) {
            const commissionText = priceDivs[priceDivs.length - 1].textContent.trim();
            if (commissionText.indexOf("€") !== -1) {
              let numStr = commissionText.replace("€", "").trim();
              numStr = numStr.replace(/\./g, ""); // Remove thousand separators.
              numStr = numStr.replace(/,/g, "."); // Normalize decimal separator.
              const value = parseFloat(numStr);
              if (!isNaN(value) && value === 0) {
                isProvisionsfrei = true;
              }
            }
          }
        }
      }
    });

    // --- Dachgeschoss condition ---
    let isDachgeschoss = false;
    if (lowerTitle.includes("dach") || lowerDescription.includes("dachgeschoss")) {
      isDachgeschoss = true;
    }
    if (dachElement) {
      const dachText = (dachElement.textContent || "").trim().toLowerCase();
      if (dachText.includes("dachgeschoss")) {
        isDachgeschoss = true;
      }
    }

    // --- Renovierungsbedürftig condition ---
    let isRenovierungsbeduerftig = false;
    if (renovElement) {
      const renovText = (renovElement.textContent || "").trim().toLowerCase();
      if (renovText.includes("renovierungsbedürftig") || renovText.includes("renovierungsbeduerftig")) {
        isRenovierungsbeduerftig = true;
      }
    }

    // --- Additional Information ---
    const m2Price = m2PriceElement ? m2PriceElement.textContent.trim() : " - ";
    const hausgeld = hausgeldElement ? hausgeldElement.textContent.trim() : " - ";

    // Prepare indicator groups: green ones (left) and red ones (right)
    const greenIndicators = [
      { label: "Parkplatz", active: hasParking },
      { label: "Balkon", active: hasBalcony },
      { label: "Einbauküche", active: hasKitchen },
      { label: "Provisionsfrei", active: isProvisionsfrei }
    ];
    const redIndicators = [
      { label: "Vermietet", active: isRented },
      { label: "Altbau", active: isAltbau },
      { label: "Dachgeschoss", active: isDachgeschoss },
      { label: "Renovierungsbedürftig", active: isRenovierungsbeduerftig }
    ];

    // Create the popup container
    const popup = document.createElement("div");
    popup.id = "indicator-popup";
    Object.assign(popup.style, {
      position: "fixed",
      top: "60px",
      right: "10px",
      padding: "10px",
      backgroundColor: "white",
      border: "1px solid #ccc",
      boxShadow: "0 0 5px rgba(0,0,0,0.3)",
      zIndex: "10000",
      fontFamily: "Arial, sans-serif",
      fontSize: "14px",
      display: "inline-block",
      whiteSpace: "nowrap"
    });

    // Create a container for the additional information and add it above the indicators
    const infoContainer = document.createElement("div");
    infoContainer.style.marginBottom = "10px";
    infoContainer.style.whiteSpace = "nowrap";

    const m2PriceRow = document.createElement("div");
    m2PriceRow.style.whiteSpace = "nowrap";
    m2PriceRow.textContent = "Price per m²: " + m2Price;
    infoContainer.appendChild(m2PriceRow);

    const hausgeldRow = document.createElement("div");
    hausgeldRow.style.whiteSpace = "nowrap";
    hausgeldRow.textContent = "Hausgeld: " + hausgeld;
    infoContainer.appendChild(hausgeldRow);

    popup.appendChild(infoContainer);

    // Helper function to create an indicator line
    function createIndicatorLine(label, active) {
      const container = document.createElement("div");
      container.style.display = "inline-flex";
      container.style.alignItems = "center";
      container.style.whiteSpace = "nowrap";

      const light = document.createElement("div");
      let activeColor = "grey";
      if (active) {
        if (label === "Vermietet" || label === "Altbau" || label === "Dachgeschoss" || label === "Renovierungsbedürftig") {
          activeColor = "red";
        } else {
          activeColor = "green";
        }
      }
      Object.assign(light.style, {
        width: "12px",
        height: "12px",
        borderRadius: "50%",
        marginRight: "8px",
        backgroundColor: activeColor
      });

      const textSpan = document.createElement("span");
      textSpan.textContent = label;
      textSpan.style.whiteSpace = "nowrap";

      container.appendChild(light);
      container.appendChild(textSpan);
      return container;
    }

    // Create rows by pairing green and red indicators side-by-side
    const maxRows = Math.max(greenIndicators.length, redIndicators.length);
    for (let i = 0; i < maxRows; i++) {
      const row = document.createElement("div");
      row.style.display = "flex";
      row.style.alignItems = "center";
      row.style.gap = "20px";
      row.style.whiteSpace = "nowrap";
      row.style.marginBottom = "5px";

      const leftCell = document.createElement("div");
      leftCell.style.whiteSpace = "nowrap";
      if (greenIndicators[i]) {
        leftCell.appendChild(createIndicatorLine(greenIndicators[i].label, greenIndicators[i].active));
      }

      const rightCell = document.createElement("div");
      rightCell.style.whiteSpace = "nowrap";
      if (redIndicators[i]) {
        rightCell.appendChild(createIndicatorLine(redIndicators[i].label, redIndicators[i].active));
      }

      row.appendChild(leftCell);
      row.appendChild(rightCell);
      popup.appendChild(row);
    }

    // Append the popup to the page if not already added
    if (!document.getElementById("indicator-popup")) {
      document.body.appendChild(popup);
    }

    // --- Golden Notification ---
    if (greenIndicators.every(ind => ind.active) && redIndicators.every(ind => !ind.active)) {
      document.title = "🌟 " + document.title;
      const canvas = document.createElement("canvas");
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "gold";
      ctx.fillRect(0, 0, 64, 64);
      const dataUrl = canvas.toDataURL("image/png");
      let link = document.querySelector("link[rel*='icon']") || document.createElement("link");
      link.type = "image/png";
      link.rel = "shortcut icon";
      link.href = dataUrl;
      document.getElementsByTagName("head")[0].appendChild(link);
    }
  }

  // Execute only after everything is fully loaded.
  if (document.readyState !== "complete") {
    window.addEventListener("load", function() {
      setTimeout(initPopup, 1500);
    });
  } else {
    setTimeout(initPopup, 1500);
  }
})();
