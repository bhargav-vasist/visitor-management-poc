# visitor-management-poc

# Missing features
- Image Picker with Camera
- Autocomplete for Past Visitors
- Offline storage of Visitor data
- Alternative authentication methods

# Inefficiencies
- Firestore DB references leaking across multiple files
- Dashboard Count is not real-time
- Dashboard Count is slow and manually aggregates instead of using Firestore functions

# Things that can be better
- Loading States and Refresh Indicators
- Better error messages and handling
- Jest tests for counting logic, auth, DB read/write calls
- Reusing phone number components with logic
- Modular components for text/buttons so we could add animation/themes