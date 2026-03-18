# Leh Wi Tok - Sierra Leonean Sign Language Learning App

[![Expo](https://img.shields.io/badge/Expo-000000?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React_Native-20232E?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)

**Leh Wi Tok** (Krio for *"Let Us Talk"*) is an educational mobile application developed by the **Directorate of Science, Technology and Innovation (DSTI)** in Sierra Leone.

The app helps users learn **Sierra Leonean Sign Language (SLSL)**, making communication more accessible for the deaf and hard-of-hearing community.

---

## 🎯 Mission

- Provide **free, accessible** sign language education
- Support **offline learning** in areas with limited connectivity
- Deliver **culturally relevant** content specific to Sierra Leone

---

## ✨ Key Features

| Feature              | Description |
|----------------------|-----------|
| **Lessons**          | Progressive video courses (Beginner → Advanced) with individual "nuggets" (signs) |
| **Dictionary**       | Searchable offline dictionary with categories and visual aids (stored in SQLite) |
| **Tok (Translator)** | Text-to-sign translator powered by sign.mt |
| **Progress Tracking**| Real-time progress, level completion, and cross-device sync |
| **Onboarding**       | Interactive 3-page walkthrough with user preference collection |
| **User Profiles**    | Role-based accounts (Student, Teacher, Parent, Volunteer, General User) |

---

## 🛠 Tech Stack

| Category           | Technology                          |
|--------------------|-------------------------------------|
| Framework          | React Native with Expo (SDK 51+)    |
| Language           | TypeScript                          |
| Navigation         | Expo Router (file-based)            |
| Styling            | React Native StyleSheet + Tailwind (via NativeWind if added) |
| Video Playback     | `expo-video`                        |
| Local Database     | `expo-sqlite`                       |
| Image Handling     | `expo-image`                        |
| State Management   | React Hooks + AsyncStorage          |
| Animations         | `react-native-reanimated`           |

---

## 🚀 Quick Start

### Prerequisites
- Node.js v22.10.0 (or use `.nvmrc`)
- Expo CLI
- iOS Simulator / Android Emulator

### Installation

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd LehWiTok

# 2. Install dependencies
npm install

# 3. Start the development server
npx expo start

## 📝 License <a name="license"></a>

This project is [MIT](./LICENSE) licensed.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

