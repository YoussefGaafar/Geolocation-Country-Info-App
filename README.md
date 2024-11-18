# 🌍 **Geolocation & Country Info App**

This project is a web application that allows users to retrieve their **current location** and detailed information about the country they are in. It uses **Geolocation API**, **Geoapify Reverse Geocoding API**, and **Rest Countries API** to provide a seamless and interactive experience.

---

## 🔥 **Features**

- 📍 **Get Your Current Location**: Automatically fetches your latitude and longitude using the browser's Geolocation API.
- 🌏 **Country Information**: Provides detailed information about the country you're in, including:
  - Population
  - Language
  - Currency
  - Region
- 🌟 **Dynamic UI**: Renders visually appealing country cards with flags and descriptive details.
- ⚡ **Asynchronous JavaScript**: Utilizes Promises and APIs for smooth data fetching and rendering.

---

## ⚙️ **Setup and Usage**

### **1. Clone the Repository**
```bash
git clone https://github.com/your-username/geolocation-country-info.git
cd geolocation-country-info
```
### **2. Open the HTML File**
Simply open the `index.html` file in your browser.

### **3. Use the App**
- Click on the **"Where am I?"** button to get your location and country information.

---

## 📚 **Code Overview**

### **Key Components**
- **Geolocation API**: Retrieves the user's coordinates.
- **Geoapify Reverse Geocoding**: Converts coordinates to a readable location (city, country).
- **Rest Countries API**: Fetches country-specific information.
- **Dynamic DOM Manipulation**: Updates the UI with country information using JavaScript.

### **Code Snippet**
```javascript
const getPosition = function () {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = function () {
  getPosition()
    .then((pos) => {
      const { latitude: lat, longitude: lon } = pos.coords;
      return fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=YOUR_API_KEY`);
    })
    .then((response) => response.json())
    .then((data) => {
      const { city, country } = data.features.pop().properties;
      return fetch(`https://restcountries.com/v3.1/name/${country.toLowerCase()}`);
    })
    .then((response) => response.json())
    .then((data) => {
      renderCountry(data.pop());
    });
};
```
## 🔑 **API Keys**

This project uses the **Geoapify Reverse Geocoding API**. Replace `YOUR_API_KEY` with your actual API key in the code:

```javascript
const authKey = 'YOUR_API_KEY';
```
Get your API key from [Geoapify](https://www.geoapify.com/).

---

## 🌟 **Future Enhancements**

- Add support for neighboring countries.
- Include error handling for unsupported browsers or denied permissions.
- Enhance UI/UX with animations and additional visuals.

---

## 💻 **Contributing**

Contributions are welcome! Feel free to submit a pull request or open an issue for feature requests and bugs.

---

## 📜 **License**

This project is licensed under the **MIT License**. Feel free to use it for personal and commercial projects.

---

## 🙌 **Acknowledgments**

- [Geoapify Reverse Geocoding API](https://www.geoapify.com/)
- [Rest Countries API](https://restcountries.com/)
