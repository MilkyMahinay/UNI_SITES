// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keyup', handleSearch);
    }

    // Close search results when clicking outside
    document.addEventListener('click', function(e) {
        const searchResults = document.getElementById('searchResults');
        const searchInput = document.getElementById('searchInput');
        if (searchResults && !e.target.closest('.nav-search')) {
            searchResults.classList.remove('active');
        }

        // Close notifications panel when clicking outside
        const notificationsPanel = document.getElementById('notificationsPanel');
        const notificationBtn = document.querySelector('.notification-btn');
        if (notificationsPanel && !e.target.closest('.nav-notifications')) {
            notificationsPanel.classList.remove('active');
        }
    });

    // Load notifications
    loadNotifications();
});

// Search handler
function handleSearch(event) {
    const query = event.target.value.trim().toLowerCase();
    const searchResults = document.getElementById('searchResults');

    if (query.length < 2) {
        searchResults.classList.remove('active');
        return;
    }

    const results = performSearch(query);
    displaySearchResults(results, searchResults);
}

// Perform search across users, posts, and hashtags
function performSearch(query) {
    const results = {
        users: [],
        posts: [],
        hashtags: []
    };

    // Search users
    const users = DB.getUsers();
    results.users = users.filter(user => {
        const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
        const username = `${user.firstName.toLowerCase()}${user.lastName.toLowerCase()}`;
        return fullName.includes(query) || username.includes(query);
    }).slice(0, 5);

    // Search posts
    const posts = DB.getPosts();
    results.posts = posts.filter(post => {
        const caption = (post.caption || '').toLowerCase();
        return caption.includes(query);
    }).slice(0, 5);

    // Search hashtags
    const allPosts = DB.getPosts();
    const allHashtags = new Set();
    allPosts.forEach(post => {
        const hashtags = (post.caption || '').match(/#\w+/g) || [];
        hashtags.forEach(tag => allHashtags.add(tag.toLowerCase()));
    });

    results.hashtags = Array.from(allHashtags)
        .filter(tag => tag.includes(query))
        .slice(0, 5);

    return results;
}

// Display search results
function displaySearchResults(results, container) {
    let html = '';

    if (results.users.length === 0 && results.posts.length === 0 && results.hashtags.length === 0) {
        html = '<div class="no-search-results">No results found</div>';
    } else {
        // Users
        if (results.users.length > 0) {
            html += '<div class="search-result-type">Users</div>';
            results.users.forEach(user => {
                html += `
                    <div class="search-result-item" onclick="goToProfile(${user.id})">
                        <div class="search-result-name">${user.firstName} ${user.lastName}</div>
                        <div class="search-result-details">@${user.firstName.toLowerCase()}${user.lastName.toLowerCase()}</div>
                    </div>
                `;
            });
        }

        // Posts
        if (results.posts.length > 0) {
            html += '<div class="search-result-type">Posts</div>';
            results.posts.forEach(post => {
                const user = DB.findUserById(post.userId);
                const caption = post.caption ? post.caption.substring(0, 50) + (post.caption.length > 50 ? '...' : '') : 'No caption';
                html += `
                    <div class="search-result-item" onclick="goToPost(${post.id})">
                        <div class="search-result-name">${user.firstName} ${user.lastName}</div>
                        <div class="search-result-details">${caption}</div>
                    </div>
                `;
            });
        }

        // Hashtags
        if (results.hashtags.length > 0) {
            html += '<div class="search-result-type">Hashtags</div>';
            results.hashtags.forEach(tag => {
                html += `
                    <div class="search-result-item" onclick="searchHashtag('${tag}')">
                        <div class="search-result-name">${tag}</div>
                        <div class="search-result-details">Click to search posts with this hashtag</div>
                    </div>
                `;
            });
        }
    }

    container.innerHTML = html;
    container.classList.add('active');
}

// Navigation functions
function goToProfile(userId) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.id === userId) {
        window.location.href = 'profile.html';
    } else {
        // For now, just go to profile (in a real app, you'd show other user's profile)
        window.location.href = 'profile.html';
    }
    document.getElementById('searchResults').classList.remove('active');
}

function goToPost(postId) {
    window.location.href = `feed.html?post=${postId}`;
    document.getElementById('searchResults').classList.remove('active');
}

function searchHashtag(tag) {
    document.getElementById('searchInput').value = tag;
    handleSearch({ target: { value: tag } });
}

// Notifications functionality
function loadNotifications() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;

    const notifications = DB.getNotifications().filter(n => n.userId === currentUser.id);
    const unreadCount = notifications.filter(n => !n.read).length;

    // Update badge
    const badge = document.getElementById('notificationBadge');
    if (badge) {
        badge.textContent = unreadCount > 9 ? '9+' : unreadCount;
        badge.classList.toggle('active', unreadCount > 0);
    }

    // Render notifications list
    const notificationsList = document.getElementById('notificationsList');
    if (notificationsList) {
        if (notifications.length === 0) {
            notificationsList.innerHTML = '<div class="no-notifications">No notifications</div>';
        } else {
            notificationsList.innerHTML = notifications.map(notification => {
                const icon = getNotificationIcon(notification.type);
                const timeAgo = getTimeAgo(notification.createdAt);
                return `
                    <div class="notification-item ${notification.read ? '' : 'unread'}" onclick="handleNotificationClick(${notification.id})">
                        <div style="display: flex; align-items: flex-start;">
                            <span class="notification-icon">${icon}</span>
                            <div class="notification-content">
                                <div class="notification-text">${notification.message}</div>
                                <div class="notification-time">${timeAgo}</div>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        }
    }
}

function getNotificationIcon(type) {
    const icons = {
        like: '❤️',
        comment: '💬',
        follow: '👤',
        event: '📅',
        save: '🔖',
        share: '📤'
    };
    return icons[type] || '🔔';
}

function toggleNotifications() {
    const panel = document.getElementById('notificationsPanel');
    panel.classList.toggle('active');
}

function handleNotificationClick(notificationId) {
    DB.markNotificationAsRead(notificationId);
    loadNotifications();
    // You could add navigation logic here based on notification type
}

function markAllRead() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        DB.markAllNotificationsAsRead(currentUser.id);
        loadNotifications();
    }
}

function getTimeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return Math.floor(seconds / 60) + 'm ago';
    if (seconds < 86400) return Math.floor(seconds / 3600) + 'h ago';
    if (seconds < 604800) return Math.floor(seconds / 86400) + 'd ago';
    return date.toLocaleDateString();
}
