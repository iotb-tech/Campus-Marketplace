# Campus Marketplace

A modern marketplace platform designed for students to buy and sell items within their campus community.

The application allows users to create accounts, list items for sale, browse available products, view detailed listing information, and manage their own listings.

## 📌 Project Overview

Campus Marketplace was built to provide students with a simple and convenient way to sell items they no longer need and discover products being sold by other students.

Instead of relying on informal messaging platforms or scattered social media posts, users can create structured listings containing information such as:

* Product title
* Description
* Price
* Category
* Product image
* Listing status

Each listing is connected to the user who created it, allowing buyers to see the seller associated with a product.

## ✨ Features

### Authentication

* User sign-up
* User sign-in
* Authentication handled with Supabase
* Protected user-specific functionality
* User session management

### Listings

Users can:

* Create product listings
* Add a title and description
* Set a price
* Select a category
* Upload or attach an image
* View available listings
* View detailed information about a listing
* Edit their own listings
* View the current listing status

### Listing Details

Each product has its own details page containing:

* Product image
* Product title
* Price
* Category
* Description
* Listing status
* Seller information

The seller displayed on the listing details page is retrieved using the `user_id` associated with the listing and matched with the corresponding user profile.

### Seller Profiles

The application stores user profile information separately from listings.

Profile information currently includes:

* Name
* Avatar URL
* Phone number
* Major
* Bio

This allows listings to remain connected to the user who created them.

### Responsive UI

The interface is designed to provide a clean and consistent experience across different screen sizes.

The project uses reusable components to maintain consistency across the application.

## 🛠️ Technologies Used

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

### Backend and Database

* Supabase
* PostgreSQL
* Supabase Authentication

### Additional Tools

* Zod for form validation
* TanStack Query for data fetching and state management
* Cloudinary for image hosting and storage
* GitHub for version control and collaboration

## 🗂️ Project Structure

The application follows the Next.js App Router structure.

```text
src/
├── app/
│   ├── auth/
│   ├── components/
│   ├── dashboard/
│   ├── lib/
│   ├── listings/
│   │   ├── [id]/
│   │   │   ├── edit/
│   │   │   └── page.tsx
│   │   ├── new/
│   │   └── page.tsx
│   ├── my-listings/
│   ├── profile/
│   ├── signin/
│   ├── signup/
│   ├── layout.tsx
│   └── page.tsx
│
└── ...
```

Reusable UI components are stored in the `components` directory.

## 🗄️ Database Structure

The application currently uses two important tables.

### `profiles`

Stores information about users.

Example fields include:

```text
id
name
avatar_url
phone
major
bio
created_at
updated_at
```

### `listings`

Stores products listed for sale.

Example fields include:

```text
id
user_id
title
description
price
category
image_url
status
created_at
```

Each listing contains a `user_id` that connects the listing to the profile of the user who created it.

## 🔗 Listing and Seller Relationship

A listing is connected to its seller using the following relationship:

```text
listings.user_id → profiles.id
```

When viewing a listing, the application:

1. Retrieves the listing.
2. Gets the `user_id` associated with the listing.
3. Searches the `profiles` table using that ID.
4. Displays the seller's name and profile information.

This ensures that the correct seller is displayed for each product.

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
```

### 2. Navigate into the project

```bash
cd Campus-Marketplace
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create your environment variables

Create a `.env.local` file and add the required Supabase environment variables.

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

If Cloudinary is configured, add the required Cloudinary environment variables as well.

> Never commit your `.env.local` file to GitHub.

### 5. Run the development server

```bash
npm run dev
```

Open the application in your browser:

```text
http://localhost:3000
```

## 👥 Collaboration

This project is being developed as a team project using GitHub for collaboration.

The general workflow is:

1. Create or work on a feature branch.
2. Make changes locally.
3. Commit changes.
4. Push the branch to GitHub.
5. Create a Pull Request.
6. Review the Pull Request.
7. Merge approved changes into the `main` branch.

This workflow helps prevent unfinished or unreviewed code from being added directly to the production branch.

## 🔮 Planned Improvements

The project currently provides the foundation for a functional campus marketplace. Future improvements may include:

### 💬 Buyer and Seller Messaging

Allow buyers to contact sellers directly from the listing details page.

The seller section on the listing details page is structured so that messaging functionality can later be added beside the seller information.

### 🔍 Advanced Search and Filtering

Potential improvements include:

* Search by product name
* Filter by category
* Filter by price range
* Sort listings by newest
* Sort listings by price

### ❤️ Saved Listings

Allow users to:

* Save listings
* Create a favourites list
* Easily return to products they are interested in

### 🖼️ Improved Image Management

Possible improvements include:

* Multiple images per listing
* Image previews
* Better image upload validation
* Image deletion and replacement

### 👤 Enhanced User Profiles

Future profile features may include:

* Profile pictures
* Contact information
* Course or department
* User bio
* Seller listing history

### 📱 Improved Mobile Experience

Further improvements will focus on:

* Mobile navigation
* Responsive listing layouts
* Improved touch interactions

### 🔔 Notifications

Potential notification features include:

* Messages from buyers
* Updates to listings
* Product status changes

## 🎯 Project Goals

The main goal of Campus Marketplace is to create a practical platform where students can easily connect with other students to buy and sell products.

The project also demonstrates the implementation of:

* Modern React and Next.js development
* TypeScript
* Authentication
* Database relationships
* CRUD operations
* Form validation
* Image handling
* Responsive UI design
* Team collaboration using GitHub

## 📈 Current Status

The project currently has a functional marketplace foundation with authentication, listings, listing details, seller information, image support, and listing management.

Additional features and improvements are planned as development continues.

---

Built with Next.js, TypeScript, Tailwind CSS, and Supabase.
