// Data Management System using localStorage
// This replaces the PHP/MySQL backend with browser-based storage

const DB = {
    // Initialize database with default data
    init() {
        if (!localStorage.getItem('users')) {
            const defaultUsers = [
                {
                    id: 1,
                    email: 'admin@university.edu',
                    password: 'admin123',
                    firstName: 'Admin',
                    lastName: 'User',
                    profilePicture: 'https://via.placeholder.com/150?text=Admin',
                    course: '',
                    yearOfStudy: '',
                    bio: 'System Administrator',
                    interests: '',
                    isAdmin: true,
                    createdAt: new Date().toISOString()
                },
                {
                    id: 2,
                    email: 'alex@university.edu',
                    password: 'alex123',
                    firstName: 'Alex',
                    lastName: 'Johnson',
                    profilePicture: 'https://via.placeholder.com/150?text=Alex',
                    course: 'Computer Science',
                    yearOfStudy: '3',
                    bio: 'Passionate about coding and campus life',
                    interests: 'Technology, Sports, Music',
                    isAdmin: false,
                    createdAt: new Date().toISOString()
                },
                {
                    id: 3,
                    email: 'sarah@university.edu',
                    password: 'sarah123',
                    firstName: 'Sarah',
                    lastName: 'Williams',
                    profilePicture: 'https://via.placeholder.com/150?text=Sarah',
                    course: 'Business Administration',
                    yearOfStudy: '2',
                    bio: 'Business student with a love for photography',
                    interests: 'Photography, Travel, Marketing',
                    isAdmin: false,
                    createdAt: new Date().toISOString()
                },
                {
                    id: 4,
                    email: 'john@university.edu',
                    password: 'john123',
                    firstName: 'John',
                    lastName: 'Davis',
                    profilePicture: 'https://via.placeholder.com/150?text=John',
                    course: 'Engineering',
                    yearOfStudy: '4',
                    bio: 'Engineering student and campus event organizer',
                    interests: 'Engineering, Events, Leadership',
                    isAdmin: false,
                    createdAt: new Date().toISOString()
                }
            ];
            localStorage.setItem('users', JSON.stringify(defaultUsers));
        }

        if (!localStorage.getItem('posts')) {
            localStorage.setItem('posts', JSON.stringify([]));
        }

        // Add sample posts if posts array is empty
        const posts = JSON.parse(localStorage.getItem('posts') || '[]');
        if (posts.length === 0 && !localStorage.getItem('sampleDataAdded')) {
            const samplePosts = [
                {
                    id: 1001,
                    userId: 2,
                    caption: 'Beautiful sunset on campus today! #campuslife #sunset',
                    imagePath: [
                        'https://picsum.photos/600/600?random=1',
                        'https://picsum.photos/600/600?random=2',
                        'https://picsum.photos/600/600?random=3'
                    ],
                    createdAt: new Date(Date.now() - 86400000).toISOString()
                },
                {
                    id: 1002,
                    userId: 3,
                    caption: 'Study session at the library with friends. Great vibes! #study #library',
                    imagePath: [
                        'https://picsum.photos/600/600?random=4',
                        'https://picsum.photos/600/600?random=5'
                    ],
                    createdAt: new Date(Date.now() - 172800000).toISOString()
                },
                {
                    id: 1003,
                    userId: 4,
                    caption: 'Campus event was amazing! So many people showed up. #events #community',
                    imagePath: 'https://picsum.photos/600/600?random=6',
                    createdAt: new Date(Date.now() - 259200000).toISOString()
                }
            ];
            localStorage.setItem('posts', JSON.stringify(samplePosts));

            // Add sample comments
            const sampleComments = [
                {
                    id: 2001,
                    userId: 3,
                    postId: 1001,
                    ideaId: null,
                    commentText: 'Amazing shot! The colors are incredible.',
                    createdAt: new Date(Date.now() - 80000000).toISOString()
                },
                {
                    id: 2002,
                    userId: 4,
                    postId: 1001,
                    ideaId: null,
                    commentText: 'I was there too! Beautiful evening.',
                    createdAt: new Date(Date.now() - 70000000).toISOString()
                },
                {
                    id: 2003,
                    userId: 2,
                    postId: 1002,
                    ideaId: null,
                    commentText: 'Library is the best place to study! 👍',
                    createdAt: new Date(Date.now() - 160000000).toISOString()
                }
            ];
            localStorage.setItem('comments', JSON.stringify(sampleComments));

            // Add sample likes
            const sampleLikes = [
                {
                    id: 3001,
                    postId: 1001,
                    userId: 1,
                    likedAt: new Date(Date.now() - 85000000).toISOString()
                },
                {
                    id: 3002,
                    postId: 1001,
                    userId: 4,
                    likedAt: new Date(Date.now() - 82000000).toISOString()
                },
                {
                    id: 3003,
                    postId: 1002,
                    userId: 1,
                    likedAt: new Date(Date.now() - 170000000).toISOString()
                },
                {
                    id: 3004,
                    postId: 1003,
                    userId: 2,
                    likedAt: new Date(Date.now() - 260000000).toISOString()
                }
            ];
            localStorage.setItem('likes', JSON.stringify(sampleLikes));

            // Add sample follow relationships
            const sampleFollows = [
                {
                    id: 4001,
                    followerId: 1,
                    followingId: 2,
                    followedAt: new Date(Date.now() - 500000000).toISOString()
                },
                {
                    id: 4002,
                    followerId: 1,
                    followingId: 3,
                    followedAt: new Date(Date.now() - 400000000).toISOString()
                },
                {
                    id: 4003,
                    followerId: 2,
                    followingId: 3,
                    followedAt: new Date(Date.now() - 300000000).toISOString()
                },
                {
                    id: 4004,
                    followerId: 3,
                    followingId: 2,
                    followedAt: new Date(Date.now() - 200000000).toISOString()
                },
                {
                    id: 4005,
                    followerId: 4,
                    followingId: 2,
                    followedAt: new Date(Date.now() - 100000000).toISOString()
                }
            ];
            localStorage.setItem('followers', JSON.stringify(sampleFollows));

            // Add sample notifications
            const sampleNotifications = [
                {
                    id: 5001,
                    userId: 1,
                    type: 'like',
                    message: 'Alex liked your post',
                    createdAt: new Date(Date.now() - 3600000).toISOString(),
                    read: false
                },
                {
                    id: 5002,
                    userId: 1,
                    type: 'comment',
                    message: 'Sarah commented on your post',
                    createdAt: new Date(Date.now() - 7200000).toISOString(),
                    read: false
                },
                {
                    id: 5003,
                    userId: 1,
                    type: 'follow',
                    message: 'John started following you',
                    createdAt: new Date(Date.now() - 86400000).toISOString(),
                    read: true
                },
                {
                    id: 5004,
                    userId: 1,
                    type: 'event',
                    message: 'You have a new university event',
                    createdAt: new Date(Date.now() - 172800000).toISOString(),
                    read: true
                }
            ];
            localStorage.setItem('notifications', JSON.stringify(sampleNotifications));

            localStorage.setItem('sampleDataAdded', 'true');
        }

        if (!localStorage.getItem('events')) {
            localStorage.setItem('events', JSON.stringify([]));
        }

        if (!localStorage.getItem('feedback')) {
            localStorage.setItem('feedback', JSON.stringify([]));
        }

        if (!localStorage.getItem('ideas')) {
            localStorage.setItem('ideas', JSON.stringify([]));
        }

        if (!localStorage.getItem('comments')) {
            localStorage.setItem('comments', JSON.stringify([]));
        }

        if (!localStorage.getItem('likes')) {
            localStorage.setItem('likes', JSON.stringify([]));
        }

        if (!localStorage.getItem('eventRegistrations')) {
            localStorage.setItem('eventRegistrations', JSON.stringify([]));
        }

        if (!localStorage.getItem('ideaVotes')) {
            localStorage.setItem('ideaVotes', JSON.stringify([]));
        }

        if (!localStorage.getItem('savedPosts')) {
            localStorage.setItem('savedPosts', JSON.stringify([]));
        }

        if (!localStorage.getItem('followers')) {
            localStorage.setItem('followers', JSON.stringify([]));
        }

        if (!localStorage.getItem('notifications')) {
            localStorage.setItem('notifications', JSON.stringify([]));
        }


    },

    // Helper functions
    getUsers() {
        return JSON.parse(localStorage.getItem('users') || '[]');
    },

    saveUsers(users) {
        localStorage.setItem('users', JSON.stringify(users));
    },

    getPosts() {
        return JSON.parse(localStorage.getItem('posts') || '[]');
    },

    savePosts(posts) {
        localStorage.setItem('posts', JSON.stringify(posts));
    },

    getEvents() {
        return JSON.parse(localStorage.getItem('events') || '[]');
    },

    saveEvents(events) {
        localStorage.setItem('events', JSON.stringify(events));
    },

    getFeedback() {
        return JSON.parse(localStorage.getItem('feedback') || '[]');
    },

    saveFeedback(feedback) {
        localStorage.setItem('feedback', JSON.stringify(feedback));
    },

    getIdeas() {
        return JSON.parse(localStorage.getItem('ideas') || '[]');
    },

    saveIdeas(ideas) {
        localStorage.setItem('ideas', JSON.stringify(ideas));
    },

    getComments() {
        return JSON.parse(localStorage.getItem('comments') || '[]');
    },

    saveComments(comments) {
        localStorage.setItem('comments', JSON.stringify(comments));
    },

    getLikes() {
        return JSON.parse(localStorage.getItem('likes') || '[]');
    },

    saveLikes(likes) {
        localStorage.setItem('likes', JSON.stringify(likes));
    },

    getEventRegistrations() {
        return JSON.parse(localStorage.getItem('eventRegistrations') || '[]');
    },

    saveEventRegistrations(registrations) {
        localStorage.setItem('eventRegistrations', JSON.stringify(registrations));
    },

    getIdeaVotes() {
        return JSON.parse(localStorage.getItem('ideaVotes') || '[]');
    },

    saveIdeaVotes(votes) {
        localStorage.setItem('ideaVotes', JSON.stringify(votes));
    },

    getSavedPosts() {
        return JSON.parse(localStorage.getItem('savedPosts') || '[]');
    },

    saveSavedPosts(savedPosts) {
        localStorage.setItem('savedPosts', JSON.stringify(savedPosts));
    },

    getFollowers() {
        return JSON.parse(localStorage.getItem('followers') || '[]');
    },

    saveFollowers(followers) {
        localStorage.setItem('followers', JSON.stringify(followers));
    },

    getNotifications() {
        return JSON.parse(localStorage.getItem('notifications') || '[]');
    },

    saveNotifications(notifications) {
        localStorage.setItem('notifications', JSON.stringify(notifications));
    },

    // User operations
    createUser(userData) {
        const users = this.getUsers();
        const newUser = {
            id: Date.now(),
            ...userData,
            createdAt: new Date().toISOString()
        };
        users.push(newUser);
        this.saveUsers(users);
        return newUser;
    },

    findUserByEmail(email) {
        const users = this.getUsers();
        return users.find(u => u.email === email);
    },

    findUserById(id) {
        const users = this.getUsers();
        return users.find(u => u.id === id);
    },

    updateUser(userId, updates) {
        const users = this.getUsers();
        const index = users.findIndex(u => u.id === userId);
        if (index !== -1) {
            users[index] = { ...users[index], ...updates };
            this.saveUsers(users);
            return users[index];
        }
        return null;
    },

    // Post operations
    createPost(postData) {
        const posts = this.getPosts();
        const newPost = {
            id: Date.now(),
            ...postData,
            createdAt: new Date().toISOString()
        };
        posts.unshift(newPost);
        this.savePosts(posts);
        return newPost;
    },

    deletePost(postId) {
        const posts = this.getPosts().filter(p => p.id !== postId);
        this.savePosts(posts);
        // Also delete associated comments and likes
        const comments = this.getComments().filter(c => c.postId !== postId);
        this.saveComments(comments);
        const likes = this.getLikes().filter(l => l.postId !== postId);
        this.saveLikes(likes);
    },

    // Event operations
    createEvent(eventData) {
        const events = this.getEvents();
        const newEvent = {
            id: Date.now(),
            ...eventData,
            createdAt: new Date().toISOString()
        };
        events.push(newEvent);
        this.saveEvents(events);
        return newEvent;
    },

    deleteEvent(eventId) {
        const events = this.getEvents().filter(e => e.id !== eventId);
        this.saveEvents(events);
        const registrations = this.getEventRegistrations().filter(r => r.eventId !== eventId);
        this.saveEventRegistrations(registrations);
    },

    // Event registration
    registerForEvent(eventId, userId) {
        const registrations = this.getEventRegistrations();
        const existing = registrations.find(r => r.eventId === eventId && r.userId === userId);
        if (existing) {
            // Unregister
            const newRegistrations = registrations.filter(r => r.id !== existing.id);
            this.saveEventRegistrations(newRegistrations);
            return false;
        } else {
            // Register
            const newRegistration = {
                id: Date.now(),
                eventId,
                userId,
                registeredAt: new Date().toISOString()
            };
            registrations.push(newRegistration);
            this.saveEventRegistrations(registrations);
            return true;
        }
    },

    isUserRegisteredForEvent(eventId, userId) {
        const registrations = this.getEventRegistrations();
        return registrations.some(r => r.eventId === eventId && r.userId === userId);
    },

    getEventRegistrationCount(eventId) {
        const registrations = this.getEventRegistrations();
        return registrations.filter(r => r.eventId === eventId).length;
    },

    // Feedback operations
    createFeedback(feedbackData) {
        const feedback = this.getFeedback();
        const newFeedback = {
            id: Date.now(),
            ...feedbackData,
            status: 'pending',
            createdAt: new Date().toISOString()
        };
        feedback.unshift(newFeedback);
        this.saveFeedback(feedback);
        return newFeedback;
    },

    updateFeedbackStatus(feedbackId, status) {
        const feedback = this.getFeedback();
        const index = feedback.findIndex(f => f.id === feedbackId);
        if (index !== -1) {
            feedback[index].status = status;
            this.saveFeedback(feedback);
        }
    },

    // Idea operations
    createIdea(ideaData) {
        const ideas = this.getIdeas();
        const newIdea = {
            id: Date.now(),
            ...ideaData,
            votes: 0,
            createdAt: new Date().toISOString()
        };
        ideas.push(newIdea);
        this.saveIdeas(ideas);
        return newIdea;
    },

    voteForIdea(ideaId, userId) {
        const votes = this.getIdeaVotes();
        const existing = votes.find(v => v.ideaId === ideaId && v.userId === userId);
        const ideas = this.getIdeas();
        const ideaIndex = ideas.findIndex(i => i.id === ideaId);

        if (existing) {
            // Remove vote
            const newVotes = votes.filter(v => v.id !== existing.id);
            this.saveIdeaVotes(newVotes);
            if (ideaIndex !== -1) {
                ideas[ideaIndex].votes--;
                this.saveIdeas(ideas);
            }
            return false;
        } else {
            // Add vote
            const newVote = {
                id: Date.now(),
                ideaId,
                userId,
                votedAt: new Date().toISOString()
            };
            votes.push(newVote);
            this.saveIdeaVotes(votes);
            if (ideaIndex !== -1) {
                ideas[ideaIndex].votes++;
                this.saveIdeas(ideas);
            }
            return true;
        }
    },

    hasUserVotedForIdea(ideaId, userId) {
        const votes = this.getIdeaVotes();
        return votes.some(v => v.ideaId === ideaId && v.userId === userId);
    },

    // Comment operations
    createComment(commentData) {
        const comments = this.getComments();
        const newComment = {
            id: Date.now(),
            ...commentData,
            createdAt: new Date().toISOString()
        };
        comments.push(newComment);
        this.saveComments(comments);
        return newComment;
    },

    getCommentsByPost(postId) {
        return this.getComments().filter(c => c.postId === postId);
    },

    getCommentsByIdea(ideaId) {
        return this.getComments().filter(c => c.ideaId === ideaId);
    },

    deleteComment(commentId) {
        const comments = this.getComments().filter(c => c.id !== commentId);
        this.saveComments(comments);
    },

    // Like operations
    toggleLike(postId, userId) {
        const likes = this.getLikes();
        const existing = likes.find(l => l.postId === postId && l.userId === userId);

        if (existing) {
            // Unlike
            const newLikes = likes.filter(l => l.id !== existing.id);
            this.saveLikes(newLikes);
            return false;
        } else {
            // Like
            const newLike = {
                id: Date.now(),
                postId,
                userId,
                likedAt: new Date().toISOString()
            };
            likes.push(newLike);
            this.saveLikes(likes);
            return true;
        }
    },

    hasUserLikedPost(postId, userId) {
        const likes = this.getLikes();
        return likes.some(l => l.postId === postId && l.userId === userId);
    },

    getLikeCount(postId) {
        const likes = this.getLikes();
        return likes.filter(l => l.postId === postId).length;
    },

    // Save/Bookmark operations
    toggleSave(postId, userId) {
        const savedPosts = this.getSavedPosts();
        const existing = savedPosts.find(s => s.postId === postId && s.userId === userId);

        if (existing) {
            // Unsave
            const newSavedPosts = savedPosts.filter(s => s.id !== existing.id);
            this.saveSavedPosts(newSavedPosts);
            return false;
        } else {
            // Save
            const newSavedPost = {
                id: Date.now(),
                postId,
                userId,
                savedAt: new Date().toISOString()
            };
            savedPosts.push(newSavedPost);
            this.saveSavedPosts(savedPosts);
            return true;
        }
    },

    hasUserSavedPost(postId, userId) {
        const savedPosts = this.getSavedPosts();
        return savedPosts.some(s => s.postId === postId && s.userId === userId);
    },

    getSavedPostsByUser(userId) {
        const savedPosts = this.getSavedPosts();
        const posts = this.getPosts();
        const userSavedPosts = savedPosts.filter(s => s.userId === userId);
        return userSavedPosts.map(s => posts.find(p => p.id === s.postId)).filter(p => p);
    },

    // Follow system operations
    toggleFollow(followerId, followingId) {
        const followers = this.getFollowers();
        const existing = followers.find(f => f.followerId === followerId && f.followingId === followingId);

        if (existing) {
            // Unfollow
            const newFollowers = followers.filter(f => f.id !== existing.id);
            this.saveFollowers(newFollowers);
            return false;
        } else {
            // Follow
            const newFollow = {
                id: Date.now(),
                followerId,
                followingId,
                followedAt: new Date().toISOString()
            };
            followers.push(newFollow);
            this.saveFollowers(followers);
            return true;
        }
    },

    isFollowing(followerId, followingId) {
        const followers = this.getFollowers();
        return followers.some(f => f.followerId === followerId && f.followingId === followingId);
    },

    // Notification operations
    createNotification(notificationData) {
        const notifications = this.getNotifications();
        const newNotification = {
            id: Date.now(),
            ...notificationData,
            read: false,
            createdAt: new Date().toISOString()
        };
        notifications.unshift(newNotification);
        this.saveNotifications(notifications);
        return newNotification;
    },

    markNotificationAsRead(notificationId) {
        const notifications = this.getNotifications();
        const index = notifications.findIndex(n => n.id === notificationId);
        if (index !== -1) {
            notifications[index].read = true;
            this.saveNotifications(notifications);
        }
    },

    markAllNotificationsAsRead(userId) {
        const notifications = this.getNotifications();
        notifications.forEach(n => {
            if (n.userId === userId) {
                n.read = true;
            }
        });
        this.saveNotifications(notifications);
    },

    getUnreadNotifications(userId) {
        const notifications = this.getNotifications();
        return notifications.filter(n => n.userId === userId && !n.read);
    },

    // Statistics
    getStats() {
        return {
            totalUsers: this.getUsers().length,
            totalPosts: this.getPosts().length,
            totalEvents: this.getEvents().length,
            totalFeedback: this.getFeedback().length,
            totalIdeas: this.getIdeas().length,
            pendingFeedback: this.getFeedback().filter(f => f.status === 'pending').length
        };
    }
};

// Initialize database on load
DB.init();

// Uncomment the line below to reset all data (for testing)
// localStorage.clear(); DB.init();
