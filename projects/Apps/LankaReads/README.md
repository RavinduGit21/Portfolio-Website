# LankaReads - Sri Lankan Reading Community App

A modern Android application built with Jetpack Compose, featuring a beautiful Glassmorphism UI design for the Sri Lankan reading community. Users can browse, add, and organize books by ISBN with an elegant, user-friendly interface.

## 📱 Features

### Core Features
- ✨ **Splash Screen** - Animated welcome screen with app branding
- 📚 **Book Library** - Browse all books in a beautiful grid layout
- 🔍 **Search & Filter** - Search books by title, author, or ISBN
- ➕ **Add Books** - Easy book addition with image picker
- 📖 **Book Details** - Comprehensive view with cover, description, and metadata
- ✏️ **Edit Books** - Update book information (Admin only)
- 🗑️ **Delete Books** - Remove books from library (Admin only)
- 👤 **Admin Mode** - Toggle between user and admin privileges
- 📱 **My Library** - Personal collection separate from public books
- 🏛️ **Public Library** - Books added by admins for everyone

### UI/UX Features
- 🎨 **Glassmorphism Design** - Frosted glass panels with blur effects
- 🌈 **Gradient Animations** - Beautiful animated backgrounds
- 🎭 **Material 3** - Modern Material Design components
- 📱 **Responsive Layout** - Adapts to different screen sizes
- ⚡ **Smooth Animations** - Fluid transitions between screens
- 🎯 **Tab Navigation** - Easy switching between All, Public, and My Library

## 🛠️ Tech Stack

### Core Technologies
- **Language**: Kotlin
- **UI Framework**: Jetpack Compose
- **Architecture**: MVVM (Model-View-ViewModel)
- **Database**: Room Database
- **Navigation**: Jetpack Navigation Compose
- **Image Loading**: Coil

### Libraries & Dependencies
```gradle
- Jetpack Compose BOM 2023.10.01
- Room Database 2.6.1
- Navigation Compose 2.7.5
- Coil 2.5.0
- Material 3
- Kotlin Coroutines 1.7.3
- Accompanist Permissions 0.32.0
```

## 📂 Project Structure

```
app/
├── data/
│   ├── dao/
│   │   └── BookDao.kt              # Database access object
│   ├── database/
│   │   └── AppDatabase.kt          # Room database instance
│   ├── model/
│   │   └── Book.kt                 # Book entity
│   └── repository/
│       └── BookRepository.kt       # Data repository
├── navigation/
│   ├── NavGraph.kt                 # Navigation setup
│   └── Screen.kt                   # Screen routes
├── ui/
│   ├── components/
│   │   └── GlassmorphismComponents.kt  # Reusable UI components
│   ├── screens/
│   │   ├── AddEditBookScreen.kt    # Add/Edit book form
│   │   ├── BookDetailsScreen.kt    # Book details view
│   │   ├── HomeScreen.kt           # Main screen with book grid
│   │   └── SplashScreen.kt         # Splash screen
│   └── theme/
│       ├── Color.kt                # Color definitions
│       ├── Theme.kt                # Theme setup
│       └── Type.kt                 # Typography
├── viewmodel/
│   └── BookViewModel.kt            # ViewModel for book operations
└── MainActivity.kt                 # Main activity
```

## 🎨 Design System

### Glassmorphism Style
- **Frosted Glass Effect**: Semi-transparent cards with blur
- **Soft Shadows**: Subtle elevation with colored shadows
- **Gradient Backgrounds**: Animated gradient transitions
- **Rounded Corners**: Modern, smooth corner radius
- **Border Highlights**: Subtle white borders for depth

### Color Palette
- **Primary**: Glass Blue (#42A5F5)
- **Secondary**: Glass Cyan (#4DD0E1)
- **Accent**: Purple (#7E57C2)
- **Background**: Light Blue Gray (#F0F4F8)
- **Highlights**: Gold (#FFD700), Pink (#FF4081)

## 🗄️ Database Schema

### Book Entity
```kotlin
@Entity(tableName = "books")
data class Book(
    @PrimaryKey(autoGenerate = true) val id: Int = 0,
    val title: String,
    val author: String,
    val isbn: String,
    val description: String?,
    val coverUri: String?,
    val addedByAdmin: Boolean = false,
    val addedToMyLibrary: Boolean = false,
    val timestamp: Long = System.currentTimeMillis()
)
```

## 🚀 Getting Started

### Prerequisites
- Android Studio Hedgehog or later
- JDK 17
- Android SDK 34
- Minimum SDK 24 (Android 7.0)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd LankaReads
   ```

2. **Open in Android Studio**
   - Launch Android Studio
   - Select "Open an existing project"
   - Navigate to the LankaReads directory

3. **Sync Gradle**
   - Wait for Gradle sync to complete
   - Resolve any dependency issues if prompted

4. **Run the app**
   - Connect an Android device or start an emulator
   - Click "Run" or press Shift+F10
   - Select your target device

### Build Commands

Using Gradle wrapper (Windows PowerShell):
```powershell
# Build debug APK
.\gradlew assembleDebug

# Build release APK
.\gradlew assembleRelease

# Install on connected device
.\gradlew installDebug

# Run tests
.\gradlew test
```

## 📖 Usage Guide

### Admin Mode
By default, the app starts in Admin Mode (hardcoded for testing). To toggle:
1. Tap the admin icon in the top-right corner of the home screen
2. Admin mode allows:
   - Adding books to the Public Library
   - Editing any book
   - Deleting any book

### Adding a Book
1. Tap the floating "+" button
2. Fill in the required fields:
   - Title (required)
   - Author (required)
   - ISBN (required)
   - Description (optional)
3. Tap the cover area to select an image from your gallery
4. Tap "Add Book" to save

### Searching for Books
1. Use the search bar at the top of the home screen
2. Type title, author, or ISBN
3. Results filter in real-time

### Managing Your Library
1. Toggle between tabs:
   - **All Books**: View everything
   - **Public**: Books added by admins
   - **My Library**: Your personal collection
2. Tap any book to view details
3. Add public books to your library with the "Add to My Library" button

## 🔮 Future Enhancements

### Planned Features
- [ ] User authentication & registration
- [ ] Firebase integration for cloud sync
- [ ] Cloud image storage (Firebase Storage/AWS S3)
- [ ] Book sharing to social media
- [ ] Wishlist functionality
- [ ] Dark mode support
- [ ] Barcode scanner for ISBN
- [ ] Book ratings & reviews
- [ ] Reading progress tracking
- [ ] Book recommendations
- [ ] Export/Import library data

### Potential Improvements
- [ ] Offline-first architecture
- [ ] Pagination for large libraries
- [ ] Advanced filtering (genre, year, language)
- [ ] Multiple image support
- [ ] Book lending/borrowing system
- [ ] Reading statistics & analytics

## 🤝 Contributing

This is an educational/demonstration project. Feel free to fork and modify as needed!

## 📄 License

This project is created for educational purposes.

## 👨‍💻 Author

Created as a demonstration of modern Android development with Jetpack Compose and Material 3 design.

## 🙏 Acknowledgments

- Material 3 Design Guidelines
- Jetpack Compose Documentation
- Android Developer Community
- Sri Lankan Reading Community

## 📞 Support

For issues or questions, please create an issue in the repository.

---

**Built with ❤️ for the Sri Lankan Reading Community**
