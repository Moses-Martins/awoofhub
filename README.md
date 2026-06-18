# AwoofHub

AwoofHub is a **community-driven deal discovery mobile app** built with **Expo (React Native) + TypeScript**.  
It helps users in Nigeria discover, share, and save verified deals, discounts, freebies, and promotions (“awoof”).

## Overview

AwoofHub connects users to real-time deals through a community-powered system where users can:

- Discover trending deals and promotions
- Share verified offers
- Save deals to wishlist
- Get alerts on new or expiring offers
- Engage through comments, reviews, and chat
- Track activity and interactions

## Tech Stack

| Layer | Technology |
|------|------------|
| Framework | Expo (React Native) |
| Language | TypeScript |
| Navigation | Expo Router (File-based routing) |
| Styling | NativeWind (Tailwind CSS) |
| UI Components | Custom React Native components |
| Server State | TanStack Query |
| Client State | Zustand |
| API Layer | Axios |


## Project Structure

### app/ (Routing Layer)

Handles navigation and screens using Expo Router.


```text
app/
├── (auth)/             # Authentication screens
├── (main)/             # Main app flow
│   ├── (drawer)/       # Drawer layout
│   │   └── (tabs)/     # Tab navigation inside drawer
│   │       ├── home          # Home feed
│   │       ├── message       # Chat/messages
│   │       ├── notification  # Notifications
│   │       └── wishlist      # Saved offers
│   ├── offers          # Offers listing + details
│   └── profile         # User profile
├── modal.tsx           # Global modal screen
└── +not-found.tsx      # 404 fallback
```


### components/ (UI Layer)

Reusable UI components only (no business logic).

- `activity/` → Activity feed UI
- `auth/` → Login & signup forms
- `comment/` → Comments UI system
- `dialog/` → Modal dialogs
- `drawer/` → Navigation drawer UI
- `form/` → Input fields & autocomplete
- `header/` → App headers & search UI
- `home/` → Home screen sections
- `offers/` → Offer cards & lists
- `offer/` → Offer detail components
- `profile/` → Profile UI components
- `review/` → Ratings & reviews
- `toast/` → Toast notifications
- `wishlist/` → Wishlist button
- `loading/` → Loading states
- `protected/` → Auth guard wrapper


### features/ (Business Logic Layer)

Contains hooks and domain logic.

- `auth/` → login, signup, logout
- `offers/` → fetching, filtering, creating offers
- `user/` → user profile logic
- `wishlist/` → save/unsave offers
- `comment/` → comment system logic
- `review/` → rating system
- `chat/` → messaging logic
- `activity/` → user activity tracking
- `alert/` → notifications & alerts
- `moderation/` → admin moderation tools
- `category/` → category filtering
- `upload/` → image upload (profile photos)


### services/ (API Layer)

Centralized API communication layer.

```text
services/
├── auth-service.ts
├── offer-service.ts
├── user-service.ts
├── chat-service.ts
├── comment-service.ts
├── wishlist-service.ts
├── review-service.ts
├── alert-service.ts
├── moderation-service.ts
├── file-service.ts
└── category-service.ts
```

### lib/ (Core Utilities)

```text
lib/
├── apiClient.ts       # Axios/fetch wrapper
└── refreshClient.ts   # Token refresh logic
```

### store/ (Global State)

```text
store/
└── notifications/
    └── notifications.ts
```

### providers/ (App Wrappers)

```text
providers/
├── app-provider.tsx
└── react-query-provider.tsx
```

### types/ (TypeScript Models)

```text
types/
├── offer.ts  
├── user.ts   
├── auth.ts   
├── comment.ts  
├── review.ts   
├── activity.ts  
├── alert.ts   
├── wishlist.ts  
├── category.ts  
├── files.ts   
└── api-response.ts
```

### utils/ (Helper Functions)

```text
utils/
├── cn.ts
├── formatDate.ts
├── formatTimeAgo.ts
├── truncate.ts
└── uid.ts
```


### styles/

```
styles/
├── colors.ts  # App color system
└── fonts.ts   # Typography system
```

### assets/

- Fonts (Montserrat, Baloo2)
- App icons
- Splash screens
- Logos

### config/

```text
config/
└── constants.ts  # Global constants (API URLs, keys, etc.)
```

### context/

```text
context/
└── SearchContext.tsx  # Global search state
```