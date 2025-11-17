# Friends Components

Các components được tách nhỏ từ trang Friends để dễ quản lý và tái sử dụng.

## 📁 Structure

```
friends/
├── FriendsHeader.tsx      # Hero banner và page header
├── FriendsSearch.tsx      # Search bar component
├── FriendsTabs.tsx        # Tabs để chuyển giữa Friends và Suggestions
├── FriendsList.tsx        # Danh sách bạn bè với message button
├── SuggestionsList.tsx    # Danh sách gợi ý kết bạn
└── index.ts               # Central export
```

## 🧩 Components

### 1. FriendsHeader
**Purpose**: Hiển thị hero banner và page header

**Props**: None

**Features**:
- Hero banner với background image
- Page title và breadcrumb
- Icon và description

---

### 2. FriendsSearch
**Purpose**: Search bar để tìm kiếm bạn bè

**Props**:
- `searchTerm: string` - Giá trị search hiện tại
- `onSearchChange: (value: string) => void` - Callback khi search thay đổi

**Features**:
- Real-time search
- Icon search
- Placeholder text

---

### 3. FriendsTabs
**Purpose**: Tabs để chuyển đổi giữa Friends và Suggestions

**Props**:
- `activeTab: "friends" | "suggestions"` - Tab đang active
- `onTabChange: (tab) => void` - Callback khi đổi tab
- `friendsCount: number` - Số lượng bạn bè
- `suggestionsCount: number` - Số lượng gợi ý

**Features**:
- 2 tabs: My Friends và Suggestions
- Hiển thị count cho mỗi tab
- Active state với màu blue
- Icons cho mỗi tab

---

### 4. FriendsList
**Purpose**: Hiển thị danh sách bạn bè

**Props**:
- `friends: User[]` - Danh sách bạn bè
- `onMessageClick: (userId: string) => void` - Callback khi click message
- `onNavigateToMessages: () => void` - Callback để đi đến Messages page

**Features**:
- Grid layout responsive (2-6 columns)
- UserCard cho mỗi friend
- Message button trên mỗi card
- Messages button ở header
- Empty state khi không có bạn bè

---

### 5. SuggestionsList
**Purpose**: Hiển thị danh sách gợi ý kết bạn

**Props**:
- `suggestions: User[]` - Danh sách gợi ý

**Features**:
- Grid layout responsive (2-6 columns)
- UserCard cho mỗi suggestion
- Add Friend button trên mỗi card
- Empty state khi không có gợi ý

---

## 📝 Usage Example

```typescript
import {
  FriendsHeader,
  FriendsSearch,
  FriendsTabs,
  FriendsList,
  SuggestionsList,
} from "../components/friends";

export const Friends: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"friends" | "suggestions">("friends");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-8">
      <FriendsHeader />
      
      <FriendsSearch 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm} 
      />
      
      <FriendsTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        friendsCount={friends.length}
        suggestionsCount={suggestions.length}
      />
      
      {activeTab === "friends" ? (
        <FriendsList
          friends={filteredFriends}
          onMessageClick={handleMessageClick}
          onNavigateToMessages={handleNavigateToMessages}
        />
      ) : (
        <SuggestionsList suggestions={filteredSuggestions} />
      )}
    </div>
  );
};
```

## 🎯 Benefits

1. **Separation of Concerns**: Mỗi component có một trách nhiệm rõ ràng
2. **Reusability**: Có thể tái sử dụng components ở nơi khác
3. **Maintainability**: Dễ dàng maintain và update từng phần
4. **Testability**: Dễ dàng test từng component riêng lẻ
5. **Readability**: Code dễ đọc và hiểu hơn

## 🔄 Data Flow

```
Friends Page (Container)
    ↓
    ├─→ FriendsHeader (Presentational)
    ├─→ FriendsSearch (Controlled)
    │       ↓
    │   searchTerm state
    ├─→ FriendsTabs (Controlled)
    │       ↓
    │   activeTab state
    └─→ FriendsList / SuggestionsList (Presentational)
            ↓
        Callbacks to parent
```

## 📦 Dependencies

- `lucide-react` - Icons
- `../cards/UserCard` - User card component
- `../../assets/mock/users` - User type definition
