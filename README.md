# Data Table Manager

A modern, full-featured data management application built with Next.js 14, Redux Toolkit, and Material-UI. Manage your datasets with ease through an intuitive interface that supports CSV operations, dynamic columns, and real-time editing.

##  Features

### Core Functionality
- **Smart Table View** - Clean interface displaying name, email, age, and role columns with instant sorting
- **Universal Search** - Find any record across all fields in real-time
- **Client Pagination** - Smooth navigation through large datasets (10 rows per page)

### Dynamic Column Management
- **Flexible Columns** - Add custom fields like department, location, or any business-specific data
- **Visibility Control** - Toggle column display with checkbox controls
- **Drag & Drop** - Reorder columns by dragging them into position
- **Persistent State** - Column preferences saved automatically

### Data Operations
- **CSV Import** - Upload files with automatic parsing and validation
- **CSV Export** - Download current view with visible columns only
- **Inline Editing** - Double-click any cell to edit, with type validation
- **Bulk Actions** - Save or cancel multiple edits simultaneously

### User Experience
- **Light/Dark Theme** - Toggle between modes for comfortable viewing
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Row Actions** - Edit and delete with confirmation dialogs
- **Visual Feedback** - Smooth transitions and hover states

##  Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone and setup**
```bash
git clone <repository-url>
cd data-table-manager
npm install
```

2. **Run development server**
```bash
npm run dev
```

3. **Open browser**
Navigate to `http://localhost:3000`

##  Tech Stack

- **Framework**: Next.js 14 (App Router)
- **State Management**: Redux Toolkit with Redux Persist
- **UI Library**: Material-UI v5+ with custom theming
- **Styling**: Tailwind CSS with custom color palette
- **Icons**: Lucide React
- **CSV Processing**: PapaParse
- **File Export**: FileSaver.js
- **Drag & Drop**: React Beautiful DnD
- **Language**: TypeScript

##  Design System

The interface follows a professional 60-30-10 color rule:
- **60% Primary (Olive)** - Main backgrounds and headers
- **30% Secondary (Timber)** - Borders and supporting elements
- **10% Accent (Flame)** - Call-to-action buttons and highlights

Additional colors: Cream (light backgrounds), Eerie (dark backgrounds)

Typography: Inter font family for modern, readable text

## Project Structure

```
src/
├── app/              # Next.js pages and layouts
├── components/       # React components
├── store/           # Redux slices and configuration
├── types/           # TypeScript definitions
├── utils/           # Helper functions
└── theme/           # MUI theme configuration
```

##  Usage Guide

### Importing Data
1. Click "Import" button in toolbar
2. Select a CSV file with headers: name, email, age, role
3. Data appears instantly in the table

### Managing Columns
1. Click "Columns" button
2. Add new columns with ID and label
3. Drag to reorder, uncheck to hide
4. Changes reflect immediately

### Editing Data
1. Double-click any cell to enter edit mode
2. Make changes (age validates as number)
3. Click save icon or use "Save All" for bulk edits
4. Cancel discards unsaved changes

### Exporting Data
1. Click "Export" button
2. Only visible columns are included
3. File downloads as CSV format

## Development

### Build for production
```bash
npm run build
npm start
```

### Key Files
- `src/store/tableSlice.ts` - Table state management
- `src/components/DataTable.tsx` - Main table component
- `src/utils/csvHandler.ts` - Import/export logic

##  Sample Data Format

```csv
name,email,age,role
Aarav Mehta,aarav.mehta@example.com,28,Software Engineer
Priya Sharma,priya.sharma@example.com,32,Project Manager
Rohan Gupta,rohan.gupta@example.com,25,UI/UX Designer
Sneha Patel,sneha.patel@example.com,29,Frontend Developer
Vikram Singh,vikram.singh@example.com,35,Backend Developer
Ananya Iyer,ananya.iyer@example.com,27,Data Analyst
Karan Bhatia,karan.bhatia@example.com,31,DevOps Engineer
Diya Nair,diya.nair@example.com,26,QA Tester
Arjun Reddy,arjun.reddy@example.com,30,Full Stack Developer
Ishita Bose,ishita.bose@example.com,24,Graphic Designer
Rahul Chauhan,rahul.chauhan@example.com,33,System Architect
Meera Das,meera.das@example.com,29,Product Manager
Siddharth Jain,siddharth.jain@example.com,28,AI Engineer
Tanya Kapoor,tanya.kapoor@example.com,27,Marketing Specialist
Nikhil Verma,nikhil.verma@example.com,34,Team Lead

```

##  Contributing

Contributions are welcome. Please ensure code follows the existing patterns and maintains type safety.

## 📄 License

MIT License - feel free to use in personal or commercial projects.

---

Built with attention to detail and user experience in mind. Perfect for managing teams, contacts, inventory, or any structured dataset.