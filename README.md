# 🧠 Quiz App

A modern, responsive trivia quiz application built with React. Challenge yourself with 10 multiple-choice questions fetched from the Open Trivia Database API.

![Quiz App Preview](https://img.shields.io/badge/React-18.x-blue?logo=react&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)
![Deployment](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)

## ✨ Features

- 📊 **10 Random Questions** - Fresh trivia questions from various categories
- 🎯 **Multiple Choice** - Four options per question with instant feedback
- 🎨 **Modern UI** - Beautiful gradient design with smooth animations
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- ⚡ **Real-time Scoring** - Track your progress throughout the quiz
- 🔄 **Restart Functionality** - Take the quiz again with new questions
- 🌐 **API Integration** - Powered by Open Trivia Database
- ✅ **Visual Feedback** - Color-coded answers with animations

## 🚀 Live Demo

[View Live Demo](https://quiz-plum-iota.vercel.app)

## 🛠️ Tech Stack

- **Frontend**: React 18.x
- **Styling**: CSS3 with modern features
- **API**: [Open Trivia Database](https://opentdb.com/)
- **Build Tool**: Create React App
- **Deployment**: Vercel
- **Package Manager**: npm

## 🏃‍♂️ Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Vedant1607/Quiz.git
   cd quiz-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
Quiz App/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   ├── data.js
│   │   └── react.svg
│   ├── Components/
│   │   └── Quiz/
│   │       ├── Quiz.css
│   │       └── Quiz.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js

```

## 🎮 How to Play

1. **Start the Quiz** - Click on the quiz to begin
2. **Answer Questions** - Click on one of the four multiple-choice options
3. **Get Feedback** - Correct answers turn green, wrong answers turn red
4. **Continue** - Click "Next" to move to the next question
5. **View Results** - See your final score out of 10
6. **Play Again** - Click "Reset" to start a new quiz with fresh questions

## 🔧 Customization

### Change Number of Questions

Edit the API URL in `Quiz.jsx`:
```javascript
const response = await fetch("https://opentdb.com/api.php?amount=15&type=multiple");
```

### Add Difficulty Levels

Modify the API URL to include difficulty:
```javascript
const response = await fetch("https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple");
```

### Customize Categories

Add category parameter to the API:
```javascript
const response = await fetch("https://opentdb.com/api.php?amount=10&category=9&type=multiple");
```

Popular categories:
- 9: General Knowledge
- 17: Science & Nature
- 21: Sports
- 23: History

## 🎨 Styling

The app uses a modern gradient design with:
- **Primary Colors**: Purple gradients (#667eea to #764ba2)
- **Success Color**: Green (#00d397)
- **Error Color**: Red (#FF4A4A)
- **Animations**: Smooth transitions and hover effects
- **Responsive**: Mobile-first design approach

## 📦 Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)


## 🐛 Troubleshooting

### Common Issues

**Blank Screen**
- Check browser console for errors
- Ensure all dependencies are installed
- Verify API is accessible

**API Errors**
- Check internet connection
- Verify Open Trivia DB is accessible
- Look for CORS issues in console

**Build Errors**
- Run `npm run build` locally first
- Check for syntax errors
- Ensure all imports are correct

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Open Trivia Database](https://opentdb.com/) for providing the trivia questions
- [React](https://reactjs.org/) for the amazing framework
- [Vercel](https://vercel.com/) for free hosting
- Community contributors and testers

## 📞 Contact

Your Name - [@Vedant_Sinha_](https://x.com/Vedant_Sinha_?s=09) - sinhavedant0705@gmail.com

Project Link: [Quiz](https://github.com/Vedant1607/Quiz)

---

<div align="center">
  <p>Made with ❤️ by Vedant Sinha</p>
  <p>⭐ Star this repo if you found it helpful!</p>
</div>