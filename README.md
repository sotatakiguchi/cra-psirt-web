# Extension Dashboard

An Angular-based dashboard application for managing and viewing extensions.

## Overview

This project provides a user-friendly dashboard interface for browsing, searching, and managing extensions. Built with Angular, it offers a responsive design and modern web technologies.

## Features

- Display list of extensions
- View extension details
- Search and filter extensions
- Responsive UI design
- SCSS styling

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Navigate to the project directory:
```bash
cd extension-dashboard
```

3. Install dependencies:
```bash
npm install
```

## Development

Start the development server:
```bash
ng serve
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Building

Build the project for production:
```bash
ng build
```

The build artifacts will be stored in the `dist/` directory.

## Testing

### Unit Tests

Run unit tests via Karma:
```bash
ng test
```

### End-to-End Tests

Run end-to-end tests:
```bash
ng e2e
```

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   └── extension-list/
│   ├── models/
│   │   └── extension.ts
│   ├── services/
│   │   └── extension.service.ts
│   ├── app.component.*
│   └── app.module.ts
├── assets/
│   └── extensions.json
├── main.ts
├── index.html
└── styles.scss
```

## Components

### Extension List Component
Displays a list of all available extensions with filtering capabilities.

## Services

### Extension Service
Handles all HTTP requests and data operations related to extensions.

## Models

### Extension Model
Defines the structure of an extension object.

## Styling

SCSS is used for styling with a modular approach. Main styles are in `styles.scss`.

## Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add some amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues and questions, please open an issue on the repository.
